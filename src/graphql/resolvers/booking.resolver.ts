import { BookingModel } from "../../model/booking.model.js";

export const userResolvers = {
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
  Mutation: {},
};
