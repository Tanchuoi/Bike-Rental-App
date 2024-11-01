import knex from "../database/knex.js";
import bcrypt from "bcrypt";

// Login
const login = async (req, res) => {
  console.log("Login request received:", req.body); // Debugging
  const { username, password } = req.body;

  try {
    const user = await knex("user").where({ username }).first();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: error.message });
  }
};

// Register
const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await knex("user").where({ username }).first();
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // '10' is the salt rounds

    await knex("user").insert({ username, password: hashedPassword });
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { login, register };
