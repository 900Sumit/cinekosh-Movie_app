import Movie from "../models/Movie.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// @desc    Create a new movie
// @route   POST /api/v1/movies/create-movie
// @access  Admin
const createMovie = asyncHandler(async (req, res) => {
  const newMovie = new Movie(req.body);
  const savedMovie = await newMovie.save();
  res.status(201).json(savedMovie);
});

// @desc    Get all movies with optional pagination
// @route   GET /api/v1/movies/all-movies?page=1&limit=20
// @access  Public
const getAllMovies = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 0; // 0 = no pagination (return all)
  const limit = parseInt(req.query.limit) || 20;

  // If page=0 or not provided, return ALL movies (backward compatible)
  if (page === 0) {
    const movies = await Movie.find().sort({ createdAt: -1 });
    return res.json(movies);
  }

  // Paginated response
  const skip = (page - 1) * limit;
  const total = await Movie.countDocuments();
  const movies = await Movie.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    movies,
    page,
    totalPages: Math.ceil(total / limit),
    totalMovies: total,
    hasMore: page * limit < total,
  });
});

// @desc    Get a specific movie by ID
// @route   GET /api/v1/movies/specific-movie/:id
// @access  Public
const getSpecificMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  res.json(movie);
});

// @desc    Update a movie
// @route   PUT /api/v1/movies/update-movie/:id
// @access  Admin
const updateMovie = asyncHandler(async (req, res) => {
  const updatedMovie = await Movie.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!updatedMovie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  res.json(updatedMovie);
});

// @desc    Add a movie review
// @route   POST /api/v1/movies/:id/reviews
// @access  Private
const movieReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  const alreadyReviewed = movie.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("You have already reviewed this movie");
  }

  const review = {
    name: req.user.username,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  const newNumReviews = movie.reviews.length + 1;
  const newRating =
    (movie.reviews.reduce((acc, item) => item.rating + acc, 0) +
      Number(rating)) /
    newNumReviews;

  // Use findByIdAndUpdate to avoid re-validating existing fields (e.g. genre stored as string)
  await Movie.findByIdAndUpdate(
    req.params.id,
    {
      $push: { reviews: review },
      $set: { numReviews: newNumReviews, rating: newRating },
    },
    { new: true }
  );

  res.status(201).json({ message: "Review added successfully" });
});

// @desc    Delete a movie
// @route   DELETE /api/v1/movies/delete-movie/:id
// @access  Admin
const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  res.json({ message: "Movie deleted successfully" });
});

// @desc    Delete a comment/review
// @route   DELETE /api/v1/movies/delete-comment
// @access  Admin
const deleteComment = asyncHandler(async (req, res) => {
  const { movieId, reviewId } = req.body;
  const movie = await Movie.findById(movieId);

  if (!movie) {
    res.status(404);
    throw new Error("Movie not found");
  }

  const reviewIndex = movie.reviews.findIndex(
    (r) => r._id.toString() === reviewId
  );

  if (reviewIndex === -1) {
    res.status(404);
    throw new Error("Review not found");
  }

  movie.reviews.splice(reviewIndex, 1);
  movie.numReviews = movie.reviews.length;
  movie.rating =
    movie.reviews.length > 0
      ? movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length
      : 0;

  await movie.save();
  res.json({ message: "Review deleted successfully" });
});

// @desc    Get newest movies
// @route   GET /api/v1/movies/new-movies
// @access  Public
const getNewMovies = asyncHandler(async (req, res) => {
  const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10);
  res.json(newMovies);
});

// @desc    Get top-reviewed movies
// @route   GET /api/v1/movies/top-movies
// @access  Public
const getTopMovies = asyncHandler(async (req, res) => {
  const topRatedMovies = await Movie.find()
    .sort({ numReviews: -1 })
    .limit(10);
  res.json(topRatedMovies);
});

// @desc    Get random movies
// @route   GET /api/v1/movies/random-movies
// @access  Public
const getRandomMovies = asyncHandler(async (req, res) => {
  const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }]);
  res.json(randomMovies);
});

export {
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
};
