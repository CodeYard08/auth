import express from "express";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import authRoutes from "./routes/authRoutes.js";
import { swaggerSpec } from "./swagger.js";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT ?? 5123);
const SESSION_SECRET = process.env.SESSION_SECRET ?? "dev-only-secret";
const isProduction = process.env.NODE_ENV === "production";
const FRONTEND_ORIGINS =
  process.env.FRONTEND_ORIGIN?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean) ?? [];
const defaultDevOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
];
const allowedOrigins =
  FRONTEND_ORIGINS.length > 0 ? FRONTEND_ORIGINS : defaultDevOrigins;

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (same-origin/server-to-server).
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  session({
    name: "sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({
    message: `Not Found: ${req.method} ${req.path}`,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});
