const createBooking = async (mongoDbBooking: any, bookingData: any) => {
  const booking = new mongoDbBooking(bookingData);
  return await booking.save();
};

const getBookings = async (mongoDbBooking: any) => {
  return await mongoDbBooking.find();
};

const updateBookingStatus = async (
  mongoDbBooking: any,
  id: string,
  status: string,
  message: string
) => {
  return await mongoDbBooking.findByIdAndUpdate(
    id,
    { status, message },
    { new: true }
  );
};

export default {
  createBooking,
  getBookings,
  updateBookingStatus
};