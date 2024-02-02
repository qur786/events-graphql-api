import { Schema, model } from "mongoose";

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: Date;
}

const EventSchema = new Schema<Event>({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

export const EventModal = model("Event", EventSchema);
