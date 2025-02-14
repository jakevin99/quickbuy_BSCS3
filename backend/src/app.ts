import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// Mount user routes under the "/api" path
app.use("/api", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
