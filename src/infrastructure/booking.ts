import bookingQueries from "./mongodb/queries/booking";
import { evaluateBooking, createBookingResponse } from "../controllers/booking";

export const createBooking = (dependencies: any) => async (bookingData: any) => {
  const { mongoDbClient } = dependencies;
  const mongoDbBooking = mongoDbClient.Booking;

  const bookingResult = evaluateBooking(bookingData);

  const savedBooking = await bookingQueries.createBooking(mongoDbBooking, {
    ...bookingData,
    status: bookingResult.status,
    message: bookingResult.message
  });

  const bookingObject =
    typeof savedBooking.toObject === "function"
      ? savedBooking.toObject()
      : savedBooking;

  return createBookingResponse(bookingObject, bookingResult);
};

export const getBookings = (dependencies: any) => async () => {
  const { mongoDbClient } = dependencies;
  const bookings = await bookingQueries.getBookings(mongoDbClient.Booking);

  return {
    message: "Bookings fetched successfully",
    data: bookings
  };
};

export const approveBooking = (dependencies: any) => async (id: string) => {
  const { mongoDbClient } = dependencies;

  return await bookingQueries.updateBookingStatus(
    mongoDbClient.Booking,
    id,
    "APPROVED",
    "Booking approved by admin."
  );
};

export const declineBooking = (dependencies: any) => async (id: string) => {
  const { mongoDbClient } = dependencies;

  return await bookingQueries.updateBookingStatus(
    mongoDbClient.Booking,
    id,
    "DECLINED",
    "Booking declined by admin."
  );
};