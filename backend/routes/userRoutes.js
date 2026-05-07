import express from "express";

// Controllers
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from "../controllers/userController.js";

// Middlewares
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  validateRegister,
  validateLogin,
  validateProfileUpdate,
} from "../middlewares/validate.js";

const router = express.Router();

router
  .route("/")
  .post(validateRegister, createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);

router.post("/auth", validateLogin, loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, validateProfileUpdate, updateCurrentUserProfile);

export default router;
