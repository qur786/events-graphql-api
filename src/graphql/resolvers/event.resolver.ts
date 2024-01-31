import { events } from "../../model/event.model.js";
import type { Event } from "../../model/event.model.js";

export const resolvers = {
  Query: {
    event: (_parent: unknown, { id }: { id: string }) =>
      events.find((ele) => ele._id === id),
    events: () => events,
  },
  Event: {
    title: (parent: Event) => {
      return parent.title;
    },
  }, // Parent usage example
};
