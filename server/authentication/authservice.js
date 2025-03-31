import jwt from "jsonwebtoken";
import {pool} from "/db.js";

const SECRET_KEY = env.process.SECRET_KEY;

async function registerAdmin(username, email, password) {
    try {
        const query = `INSERT INTO admins (username, email, password) VALUES (?, ?, ?)`;
        const [result] = await pool.execute(query, [username, email, password]);
        return { id: result.insertId, username, email };
    } catch (error) {
        throw error;
    }

}

async function loginAdmin(username, password) {
    try {
        const query = `SELECT * FROM admins WHERE username = ?`;
        const [rows] = await pool.execute(query, [username]);

        if (rows.length === 0) {
            throw new Error('Admin not found');
        }

        const admin = rows[0];
        if(password!= admin.password){
            throw new Error("password doesn't match" );
        }

        // Generate JWT Token
        const token = jwt.sign({ id: admin.id, role: 'admin' }, SECRET_KEY);

        return { message: 'Login successful', token };
    } catch (error) {
        throw error;
    }
}

export default {registerAdmin, loginAdmin };