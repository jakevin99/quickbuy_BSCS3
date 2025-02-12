const express = require("express")
const app = express()
const port = 5173
const cors = require("cors")
const session = require("express-session")

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
  }),
)
app.use(express.json())
app.use(
  session({
    secret: "e1S$8xN3mB@pL7vC2kF9qY5tZ0wR4uA6",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
)

// Routes
app.post("/api/logout_api", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Could not log out, please try again" })
    }
    res.clearCookie("connect.sid")
    return res.json({ message: "Logged out successfully" })
  })
})

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

