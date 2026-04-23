import express, { Request, Response, NextFunction } from "express";
import dependencies from "../../../infrastructure/dependencies";
import {
  createBooking,
  getBookings,
  approveBooking,
  declineBooking
} from "../../../infrastructure/booking";
import { authenticateToken } from "../middleware/authentication";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await createBooking(dependencies)(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/", authenticateToken, async (_req, res, next) => {
  try {
    const result = await getBookings(dependencies)();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/approve", authenticateToken, async (req, res, next) => {
  try {
    const result = await approveBooking(dependencies)(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking approved successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/decline", authenticateToken, async (req, res, next) => {
  try {
    const result = await declineBooking(dependencies)(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking declined successfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
});

export default router;