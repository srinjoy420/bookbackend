
import User from "../model/user.model.js";

export const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password ,role} = req.body;
    console.log("role",role);
    

    // 1. Validate fields
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // 3. Hash the password
    

    // 4. Create user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      role
    });

    // 5. Respond with created user (excluding password)
     res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        avatar: user.avatar,
        role:user.role
      },
    });
  } catch (error) {
    console.error("User creation failed:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
