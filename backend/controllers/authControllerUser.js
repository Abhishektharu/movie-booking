import db from "../database/connection.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const [existingUser] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        //set http-only cookie ;
        res.cookie("access-token", token, {
            httpOnly: true,
            sameSite: "strict", //prevent csrf attacks
        });
        

        return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.log(error.message);
        
        return res.status(500).json({ error: error.message });
    }
};

export const logoutUser = async(req, res)=>{
    return ;
}