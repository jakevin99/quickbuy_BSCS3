"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../models/db"));
// Registration Controller
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, role } = req.body;
    // Check if all fields are provided
    if (!username || !email || !password || !role) {
        res.status(400).json({ message: "All fields are required!" });
        return;
    }
    // Basic email validation using REgular Epresison
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Invalid email format" });
        return;
    }
    // check For a strong password ( Minimum 8 characters)
    if (password.length < 8) {
        res
            .status(400)
            .json({ message: "Password must be at least 8 characters long" });
    }
    try {
        // Check if the email or username already exists
        const [rows] = yield db_1.default.query("SELECT * FROM users WHERE email = ? OR username = ?", [email, username]);
        if (rows.length > 0) {
            res.status(400).json({ message: "Email or username already exists" });
            return;
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Insert new user into the database
        const query = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
        yield db_1.default.query(query, [username, email, hashedPassword, role]);
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.registerUser = registerUser;
