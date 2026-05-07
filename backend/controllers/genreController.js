import Genre from "../models/Genre.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// @desc    Create a new genre
// @route   POST /api/v1/genre
// @access  Admin
const createGenre = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const existingGenre = await Genre.findOne({ name });
  if (existingGenre) {
    res.status(400);
    throw new Error("Genre already exists");
  }

  const genre = await new Genre({ name }).save();
  res.status(201).json(genre);
});

// @desc    Update a genre
// @route   PUT /api/v1/genre/:id
// @access  Admin
const updateGenre = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    res.status(404);
    throw new Error("Genre not found");
  }

  genre.name = name;
  const updatedGenre = await genre.save();
  res.json(updatedGenre);
});

// @desc    Remove a genre
// @route   DELETE /api/v1/genre/:id
// @access  Admin
const removeGenre = asyncHandler(async (req, res) => {
  const removed = await Genre.findByIdAndDelete(req.params.id);

  if (!removed) {
    res.status(404);
    throw new Error("Genre not found");
  }

  res.json({ message: "Genre removed successfully" });
});

// @desc    List all genres
// @route   GET /api/v1/genre/genres
// @access  Public
const listGenres = asyncHandler(async (req, res) => {
  const all = await Genre.find({}).sort({ name: 1 });
  res.json(all);
});

// @desc    Read a single genre by ID
// @route   GET /api/v1/genre/:id
// @access  Public
const readGenre = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) {
    res.status(404);
    throw new Error("Genre not found");
  }

  res.json(genre);
});

export { createGenre, updateGenre, removeGenre, listGenres, readGenre };
