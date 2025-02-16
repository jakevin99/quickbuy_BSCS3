import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
import session from "express-session";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Update CORS to allow requests from frontend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Allow both localhost and IP
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      sameSite: 'lax'
    },
    name: 'session-id' // Optional: customize cookie name
  })
);

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Mount user routes under the "/api" path
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
