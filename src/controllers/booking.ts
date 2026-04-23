// This controller contains the main booking decision logic
// All new bookings are saved as PENDING first.
// The message is decided using the validation rules.
// Later, admin can approve or decline the booking.

export const evaluateBooking = (booking: any) => {
  const { firstName, lastName, groupSize, returningCustomer } = booking;

  // Every new request starts as pending
  const status = "PENDING";

  let message = "";

  // Rule 1: If the customer is not returning, do not allow direct online booking
  if (!returningCustomer) {
    message = `I'm sorry ${firstName}, this form is only available to returning customers. Please contact us by phone to complete your booking.`;
  }
  // Rule 2: If group size is too small or too large, no room is available
  else if (groupSize < 10 || groupSize > 500) {
    message = `I'm sorry ${firstName} ${lastName}, we do not have a room available to accommodate your group.`;
  }
  // Rule 3: If group size is between 10 and 100, booking can be booked normally
  else if (groupSize >= 10 && groupSize <= 100) {
    message = `Congratulations ${firstName} ${lastName}, your room has been booked.`;
  }
  // Rule 4: If group size is between 101 and 500, deposit is required
  else if (groupSize > 100 && groupSize <= 500) {
    message = `Congratulations ${firstName} ${lastName}, your room has been reserved. However, a deposit is required to finalize the booking.`;
  }

  return {
    status,
    message
  };
};

export const createBookingResponse = (savedBooking: any, bookingResult: any) => {
  return {
    message: "Booking created successfully",
    data: {
      ...savedBooking,
      status: bookingResult.status,
      message: bookingResult.message
    }
  };
};