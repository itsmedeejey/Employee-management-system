import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { pool } from "../db.js";

const SECRET_KEY = process.env.SECRET_KEY;

async function registerAdmin(username, password, role) {
    try {
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into database
        const query = `INSERT INTO maintainer(username, password, role) VALUES (?, ?, ?)`;
        const [result] = await pool.execute(query, [username, hashedPassword, role]);

        return { id: result.insertId, username, role };
    } catch (error) {
        throw error;
    }
}

async function loginAdmin(username, password) {
    try {
        // Fetch admin details
        const query = `SELECT * FROM maintainer WHERE username = ?`;
        const [rows] = await pool.execute(query, [username]);

        if (rows.length === 0) {
            throw new Error("Admin not found");
        }
        const admin = rows[0];
        
        // Compare hashed password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            throw new Error("Password doesn't match");
        }

        // Generate JWT Token including role
        const token = jwt.sign({ username: admin.username, role: admin.role },SECRET_KEY,) 

        return { message: "Login successful", token, role: admin.role };
    } catch (error) {
        throw error;
    }
}

export default { registerAdmin, loginAdmin };
