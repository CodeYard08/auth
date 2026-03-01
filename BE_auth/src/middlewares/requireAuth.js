import { userStore } from "../store/userStore.js";

export const requireAuth = (req, res, next) => {
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({
      code: "NO_SESSION",
      message: "Unauthorized",
    });
  }

  const user = userStore.findById(userId);
  if (!user) {
    // Clean up stale session when user is missing (e.g., in-memory store reset).
    req.session?.destroy(() => {
      res.clearCookie("sid");
    });
    return res.status(401).json({
      code: "USER_NOT_FOUND",
      message: "Unauthorized",
    });
  }

  req.user = user;
  next();
};
