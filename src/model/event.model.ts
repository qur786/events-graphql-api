import { Schema, model } from "mongoose";

export interface Event {
  _id: typeof Schema.Types.ObjectId;
  title: string;
  description: string;
  date: Date;
  createdBy: typeof Schema.Types.ObjectId;
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
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const EventModal = model("Event", EventSchema);
