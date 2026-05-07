import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./backend/models/User.js";

dotenv.config();

const makeAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    // CHANGE THIS EMAIL to the account you want to make an admin
    const emailToMakeAdmin = "admin@example.com";

    const user = await User.findOne({ email: emailToMakeAdmin });

    if (!user) {
      console.log(`❌ User with email ${emailToMakeAdmin} not found!`);
      console.log("Please create an account first on the website.");
      process.exit(1);
    }

    user.isAdmin = true;
    await user.save();

    console.log(`✅ Success! User ${user.username} (${user.email}) is now an Admin!`);
    console.log("You can now log in and access the Admin Dashboard.");
    process.exit(0);

  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

makeAdmin();
