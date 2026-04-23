import express, { Request, Response } from "express";
import dotenv from "dotenv-safe";
import cors from "cors";

import bookingRoutes from "./ports/rest/routes/booking";
import userRoutes from "./ports/rest/routes/user";
import dependencies from "./infrastructure/dependencies";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

// Load environment variables
dotenv.config();

// Connect database
const { mongoDbClient } = dependencies;
mongoDbClient.ConnectToDb();

// Healthcheck route
app.use("/healthcheck", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Successful" });
});

// User routes
app.use("/user", userRoutes);

// Booking routes
app.use("/booking", bookingRoutes);

// Start server
const port = 3000;

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});