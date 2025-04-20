import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import productRoutes from "./routes/productRoutes";
import cors from "cors";
import session from "express-session";
import { errorHandler } from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_VERSION = 'v1';

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], // Allow both localhost and IP
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      sameSite: "lax",
    },
    name: "session-id",
  })
);

// API version routes
const apiBaseRoute = `/api/${API_VERSION}`;

// Define API routes with versioning
app.use(`${apiBaseRoute}/auth`, userRoutes); // Authentication routes
app.use(`${apiBaseRoute}/admin`, adminRoutes); // Admin routes
app.use(`${apiBaseRoute}/products`, productRoutes); // Product routes

// Legacy routes support (for backward compatibility)
app.use("/api/auth", userRoutes); 
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// API documentation
app.get("/api", (req, res) => {
  res.status(200).json({ 
    message: 'API documentation',
    versions: {
      current: API_VERSION,
      supported: [API_VERSION]
    },
    endpoints: {
      products: `${apiBaseRoute}/products`,
      auth: `${apiBaseRoute}/auth`,
      admin: `${apiBaseRoute}/admin`
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler middleware (must be after all routes)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`API version: ${API_VERSION}`);
});
