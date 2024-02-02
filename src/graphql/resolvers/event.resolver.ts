import { EventModal, type Event } from "../../model/event.model.js";

type CreateEventInput = Exclude<Event, "_id">;

export const resolvers = {
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
      { data: { date, description, title } }: { data: CreateEventInput }
    ) => {
      const event = new EventModal({
        date,
        description,
        title,
      });
      const result = await event.save();
      return result;
    },
  },
};
