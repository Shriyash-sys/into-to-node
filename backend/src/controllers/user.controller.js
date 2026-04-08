import { User } from "../models/user.model.js";

// Use signup 
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body ?? {};
        
        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6 || password.length > 20) {
            return res.status(400).json({ message: "Password must be between 6 and 20 characters" });
        }

        // Check if user with the same email already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
        }
    
        // Create a new user
        const newUser = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username,
            }
        });
     
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", error: error.message });
    } 
};

// User Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body ?? {};

        if (!email || !password) {
            return res.status(400).json({message: "Email and password are required"});
        }

        const user = await User.findOne({
            email: email.toLowerCase()
         });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({
            message: "Login Successful",
            user: {
                id: user._id,
                email: user.email,
                username: user.username,    
            }
        })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// User Logout
const logoutUser = async (req, res) => {
    try {
        const { email } = req.body ?? {};

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await User.findOneAndUpdate(
            { email: email.toLowerCase() },
            { loggedIn: false },
            { new: true }
        );

        if (!user) return res.status(404).json({ 
            message: "User not found" 
        });

        res.status(200).json({
            message: "Logout Successful"
        })
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


export {
    createUser,
    loginUser,
    logoutUser
}