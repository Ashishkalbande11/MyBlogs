import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import blogRoutes from './routes/blog.routes.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; // Required to construct __dirname in ES Modules

dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Error: MONGO_URI is not defined. Please check your .env file.");
  process.exit(1);
}

const app = express();

// Construct __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/blogs", blogRoutes);

// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, "frontendReact/vite-project", "dist")));

// Handle any other routes to serve React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontendReact/vite-project", "dist", "index.html"));
});

// Connect to MongoDB and start the server
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
    app.listen(PORT, () => {
      console.log(`Server is active on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });
