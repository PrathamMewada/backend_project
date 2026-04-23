import * as bookingController from "../controllers/booking";

describe("Booking Business Rules", () => {
  test("returns booked message for returning customer with group size 50", () => {
    const booking = {
      firstName: "Dhruval",
      lastName: "Solanki",
      groupSize: 50,
      returningCustomer: true
    };

    const result = bookingController.evaluateBooking(booking);

    expect(result).toBe(
      "Congratulations Dhruval Solanki, your room has been booked."
    );
  });

  test("returns deposit required message for group size 200", () => {
    const booking = {
      firstName: "Jay",
      lastName: "Patel",
      groupSize: 200,
      returningCustomer: true
    };

    const result = bookingController.evaluateBooking(booking);

    expect(result).toBe(
      "Congratulations Jay Patel, your room has been reserved. However, a deposit is required to finalize the booking."
    );
  });

  test("returns no room message for group size 5", () => {
    const booking = {
      firstName: "Rajan",
      lastName: "Patel",
      groupSize: 5,
      returningCustomer: true
    };

    const result = bookingController.evaluateBooking(booking);

    expect(result).toBe(
      "I'm sorry Rajan Patel, we do not have a room available to accommodate your group."
    );
  });

  test("returns not returning customer message", () => {
    const booking = {
      firstName: "Parth",
      lastName: "Patel",
      groupSize: 50,
      returningCustomer: false
    };

    const result = bookingController.evaluateBooking(booking);

    expect(result).toBe(
      "I'm sorry Parth, this form is only available to returning customers. Please contact us by phone to complete your booking."
    );
  });

  test("returns no room message for group size above 500", () => {
    const booking = {
      firstName: "Alex",
      lastName: "Smith",
      groupSize: 600,
      returningCustomer: true
    };

    const result = bookingController.evaluateBooking(booking);

    expect(result).toBe(
      "I'm sorry Alex Smith, we do not have a room available to accommodate your group."
    );
  });
});