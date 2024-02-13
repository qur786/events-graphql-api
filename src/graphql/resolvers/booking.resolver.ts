import { Booking, BookingModel } from "../../model/booking.model.js";

type BookEventInput = Pick<Booking, "createdBy" | "event" | "status">;

export const bookingResolvers = {
  Query: {
    bookings: async () => {
      const bookings = await BookingModel.find()
        .populate("event")
        .populate("createdBy")
        .transform((result) => {
          return result.map((ele) => ({
            ...ele.toObject(),
            createdAt: new Date(ele.createdAt).toISOString(),
            updatedAt: new Date(ele.updatedAt).toISOString(),
          }));
        });
      return bookings;
    },
  },
  Mutation: {
    bookEvent: async (_parent: unknown, { data }: { data: BookEventInput }) => {
      const booking = new BookingModel(data);
      const savedBooking = await booking.save();
      await savedBooking.populate("event");
      await savedBooking.populate("createdBy");
      return savedBooking.toObject();
    },
  },
};
