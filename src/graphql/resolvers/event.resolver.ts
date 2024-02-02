import { EventModal, type Event } from "../../model/event.model.js";

type CreateEventInput = Exclude<Event, "_id">;

export const resolvers = {
  Query: {
    event: async (_parent: unknown, { id }: { id: string }) => {
      const event = await EventModal.findById(id);
      console.log(event);
      return event;
    },
    events: async () => {
      const events = await EventModal.find();
      console.log(events);
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
      console.log(result);
      return result;
    },
  },
};
