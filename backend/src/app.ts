import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enalbe CORS For FRNTEND (http://localhost:5173)
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from FRONTEND register.svelte
    methods: ["GET", "POST", "PUT", "DELETE"], //Allow HTTP methods
    credentials: true, // Allow coockies/auth headers of needed
  })
);

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Mount user routes under the "/api" path
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
