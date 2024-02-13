import { isValidObjectId } from "mongoose";
import { EventModel, type Event } from "../../model/event.model.js";
import { UserModel } from "../../model/user.modal.js";

type CreateEventInput = Omit<Event, "_id">;

export const eventResolvers = {
  Query: {
    event: async (_parent: unknown, { id }: { id: string }) => {
      const event = await EventModel.findById(id).populate("createdBy");
      return event;
    },
    events: async () => {
      const events = await EventModel.find().populate("createdBy");
      return events;
    },
  },
  Mutation: {
    createEvent: async (
      _parent: unknown,
      {
        data: { date, description, title, createdBy },
      }: { data: CreateEventInput }
    ) => {
      if (isValidObjectId(createdBy) === false) {
        throw new Error("Invalid User ID.");
      }
      const user = await UserModel.findById(createdBy);
      if (!user) {
        throw new Error("User does not exist.");
      }
      const event = new EventModel({
        date,
        description,
        title,
        createdBy,
      });
      const result = await (await event.save()).populate("createdBy");
      user.events.push(result.id);
      await user.save();
      return result;
    },
  },
};
