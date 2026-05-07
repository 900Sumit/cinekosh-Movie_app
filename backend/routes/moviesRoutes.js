import express from "express";
const router = express.Router();

// Controllers
import {
  createMovie,
  getAllMovies,
  getSpecificMovie,
  updateMovie,
  movieReview,
  deleteMovie,
  deleteComment,
  getNewMovies,
  getTopMovies,
  getRandomMovies,
} from "../controllers/movieController.js";

// Middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import {
  validateCreateMovie,
  validateUpdateMovie,
  validateReview,
  validateDeleteComment,
} from "../middlewares/validate.js";

// Public Routes
router.get("/all-movies", getAllMovies);
router.get("/specific-movie/:id", getSpecificMovie);
router.get("/new-movies", getNewMovies);
router.get("/top-movies", getTopMovies);
router.get("/random-movies", getRandomMovies);

// Restricted Routes
router.post("/:id/reviews", authenticate, checkId, validateReview, movieReview);

// Admin
router.post("/create-movie", authenticate, authorizeAdmin, validateCreateMovie, createMovie);
router.put("/update-movie/:id", authenticate, authorizeAdmin, validateUpdateMovie, updateMovie);
router.delete("/delete-movie/:id", authenticate, authorizeAdmin, deleteMovie);
router.delete("/delete-comment", authenticate, authorizeAdmin, validateDeleteComment, deleteComment);

export default router;
