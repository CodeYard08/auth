import { Router } from "express";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { userStore } from "../store/userStore.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = Router();

const toSafeUser = (user) => ({
  id: user.id,
  email: user.email,
  createdAt: user.createdAt,
});

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Session auth APIs (cookie + session)
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Sign up with email/password and create session
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, confirmPassword]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       201:
 *         description: Signed up and logged in
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */
router.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body ?? {};

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({
      message: "email, password, confirmPassword are required",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      message: "password must be at least 8 characters",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      message: "password and confirmPassword do not match",
    });
  }

  const exists = userStore.findByEmail(email);
  if (exists) {
    return res.status(409).json({
      message: "email already exists",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = userStore.create({
    id: randomUUID(),
    email: email.toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
  });

  req.session.userId = user.id;

  return res.status(201).json({
    message: "signup success",
    user: toSafeUser(user),
  });
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with email/password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login success
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({
      message: "email and password are required",
    });
  }

  const user = userStore.findByEmail(email);
  if (!user) {
    return res.status(401).json({
      message: "invalid credentials",
    });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(401).json({
      message: "invalid credentials",
    });
  }

  req.session.userId = user.id;

  return res.status(200).json({
    message: "login success",
    user: toSafeUser(user),
  });
});

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current login user from session
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user
 *       401:
 *         description: Unauthorized
 */
router.get("/me", requireAuth, (req, res) => {
  return res.status(200).json({
    user: toSafeUser(req.user),
  });
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout and clear session
 *     tags: [Auth]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout success
 */
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("sid");
    res.status(200).json({
      message: "logout success",
    });
  });
});

export default router;
