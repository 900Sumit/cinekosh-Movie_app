// Packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

// Files
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// Centralized Error Handling
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

// Configuration
dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("Error: JWT_SECRET is not defined");
  process.exit(1);
}

connectDB();

const app = express();
app.disable("x-powered-by");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = Number(process.env.PORT || process.env.POST || 3000);

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

// Serve frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api/")) {
    return next();
  }

  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});

// Error Handling (must be AFTER all routes)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
