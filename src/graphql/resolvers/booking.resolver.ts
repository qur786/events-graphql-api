import { isValidObjectId } from "mongoose";
import {
  Booking,
  BookingModel,
  BookingStatus,
} from "../../model/booking.model.js";
import { EventModel } from "../../model/event.model.js";

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
    bookEvent: async (_parent: unknown, args: { data: BookEventInput }) => {
      if (
        !isValidObjectId(args.data.createdBy) ||
        !isValidObjectId(args.data.event)
      ) {
        throw new Error("Either User ID or Event ID is Invalid.");
      }
      const booking = new BookingModel(args.data);
      const savedBooking = await booking.save();
      await savedBooking.populate("event");
      await savedBooking.populate("createdBy");
      return savedBooking.toObject();
    },
    cancelBooking: async (_parent: unknown, args: { eventID: string }) => {
      if (!isValidObjectId(args.eventID)) {
        throw new Error("Event ID is invalid.");
      }

      await BookingModel.updateMany(
        { event: { _id: args.eventID } },
        { $set: { status: BookingStatus.CANCELLED } }
      );

      const event = await EventModel.findById(args.eventID);

      if (event === null) {
        throw new Error("Event not found.");
      }

      await event.populate("createdBy");

      return event.toObject();
    },
  },
};
