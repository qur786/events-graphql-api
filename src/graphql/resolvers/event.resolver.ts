import { events } from "../../model/event.model.js";
import type { Event } from "../../model/event.model.js";

type CreateEventInput = Exclude<Event, "_id">;

export const resolvers = {
  Query: {
    event: (_parent: unknown, { id }: { id: string }) =>
      events.find((ele) => ele._id === id),
    events: () => events,
  },
  Mutation: {
    createEvent: (
      _parent: unknown,
      { data: { date, description, title } }: { data: CreateEventInput }
    ) => {
      const event: Event = {
        _id: (
          Number.parseInt(events[events.length - 1]?._id ?? 0) + 1
        ).toString(),
        title,
        description,
        date,
      };
      events.push(event);
      return event;
    },
  },
  Event: {
    title: (parent: Event) => {
      return parent.title;
    },
  }, // Parent usage example
};
