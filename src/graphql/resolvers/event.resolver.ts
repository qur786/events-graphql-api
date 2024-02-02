import { isValidObjectId } from "mongoose";
import { EventModal, type Event } from "../../model/event.model.js";
import { UserModal } from "../../model/user.modal.js";

type CreateEventInput = Omit<Event, "_id">;

export const eventResolvers = {
  Query: {
    event: async (_parent: unknown, { id }: { id: string }) => {
      const event = await EventModal.findById(id);
      return event;
    },
    events: async () => {
      const events = await EventModal.find();
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
      const user = await UserModal.findById(createdBy);
      if (!user) {
        throw new Error("User does not exist.");
      }
      const event = new EventModal({
        date,
        description,
        title,
        createdBy,
      });
      const result = await event.save();
      user.events.push(result.id);
      await user.save();
      return result;
    },
  },
};
