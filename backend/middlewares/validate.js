/**
 * Backend Validation Middleware
 *
 * Dedicated request validation for all critical routes.
 * Validates body/params before hitting the controller.
 */
import { isValidObjectId } from "mongoose";

// ── Helper: create a validation error ──
const fail = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({ message });
};

// ══════════════════════════════════════
// USER VALIDATORS
// ══════════════════════════════════════

const validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return fail(res, "Username, email, and password are all required.");
  }

  if (username.trim().length < 2 || username.trim().length > 50) {
    return fail(res, "Username must be between 2 and 50 characters.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return fail(res, "Please provide a valid email address.");
  }

  if (password.length < 6) {
    return fail(res, "Password must be at least 6 characters long.");
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return fail(res, "Email and password are required.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return fail(res, "Please provide a valid email address.");
  }

  next();
};

const validateProfileUpdate = (req, res, next) => {
  const { username, email, password } = req.body;

  if (username !== undefined && (username.trim().length < 2 || username.trim().length > 50)) {
    return fail(res, "Username must be between 2 and 50 characters.");
  }

  if (email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return fail(res, "Please provide a valid email address.");
    }
  }

  if (password !== undefined && password.length < 6) {
    return fail(res, "Password must be at least 6 characters long.");
  }

  next();
};

// ══════════════════════════════════════
// MOVIE VALIDATORS
// ══════════════════════════════════════

const validateCreateMovie = (req, res, next) => {
  const { name, year, genre, detail, duration } = req.body;

  if (!name || !name.trim()) {
    return fail(res, "Movie name is required.");
  }

  if (name.trim().length > 200) {
    return fail(res, "Movie name must be under 200 characters.");
  }

  if (!year) {
    return fail(res, "Release year is required.");
  }

  const yearNum = Number(year);
  if (isNaN(yearNum) || yearNum < 1888 || yearNum > new Date().getFullYear() + 5) {
    return fail(res, `Year must be between 1888 and ${new Date().getFullYear() + 5}.`);
  }

  if (!genre) {
    return fail(res, "Genre is required.");
  }

  if (!isValidObjectId(genre)) {
    return fail(res, "Invalid genre selection.");
  }

  if (!detail || !detail.trim()) {
    return fail(res, "Movie detail/description is required.");
  }

  if (detail.trim().length > 2000) {
    return fail(res, "Movie description must be under 2000 characters.");
  }

  if (duration !== undefined) {
    const durNum = Number(duration);
    if (isNaN(durNum) || durNum < 1) {
      return fail(res, "Duration must be a positive number.");
    }
  }

  next();
};

const validateUpdateMovie = (req, res, next) => {
  const { name, year, genre, detail, duration } = req.body;

  if (name !== undefined && (!name.trim() || name.trim().length > 200)) {
    return fail(res, "Movie name must be 1-200 characters.");
  }

  if (year !== undefined) {
    const yearNum = Number(year);
    if (isNaN(yearNum) || yearNum < 1888 || yearNum > new Date().getFullYear() + 5) {
      return fail(res, `Year must be between 1888 and ${new Date().getFullYear() + 5}.`);
    }
  }

  if (genre !== undefined && !isValidObjectId(genre)) {
    return fail(res, "Invalid genre selection.");
  }

  if (detail !== undefined && detail.trim().length > 2000) {
    return fail(res, "Movie description must be under 2000 characters.");
  }

  if (duration !== undefined) {
    const durNum = Number(duration);
    if (isNaN(durNum) || durNum < 1) {
      return fail(res, "Duration must be a positive number.");
    }
  }

  next();
};

// ══════════════════════════════════════
// REVIEW VALIDATORS
// ══════════════════════════════════════

const validateReview = (req, res, next) => {
  const { rating, comment } = req.body;

  if (rating === undefined || rating === null) {
    return fail(res, "Rating is required.");
  }

  const ratingNum = Number(rating);
  if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return fail(res, "Rating must be between 1 and 5.");
  }

  if (!comment || !comment.trim()) {
    return fail(res, "Review comment is required.");
  }

  if (comment.trim().length > 1000) {
    return fail(res, "Review comment must be under 1000 characters.");
  }

  next();
};

// ══════════════════════════════════════
// GENRE VALIDATORS
// ══════════════════════════════════════

const validateGenre = (req, res, next) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return fail(res, "Genre name is required.");
  }

  if (name.trim().length > 32) {
    return fail(res, "Genre name must be under 32 characters.");
  }

  next();
};

// ══════════════════════════════════════
// DELETE COMMENT VALIDATOR
// ══════════════════════════════════════

const validateDeleteComment = (req, res, next) => {
  const { movieId, reviewId } = req.body;

  if (!movieId || !isValidObjectId(movieId)) {
    return fail(res, "Valid movie ID is required.");
  }

  if (!reviewId || !isValidObjectId(reviewId)) {
    return fail(res, "Valid review ID is required.");
  }

  next();
};

export {
  validateRegister,
  validateLogin,
  validateProfileUpdate,
  validateCreateMovie,
  validateUpdateMovie,
  validateReview,
  validateGenre,
  validateDeleteComment,
};
