import { userStore } from "../store/userStore.js";

export const requireAuth = (req, res, next) => {
  const userId = req.session?.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const user = userStore.findById(userId);
  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  req.user = user;
  next();
};
