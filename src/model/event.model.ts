import { Schema, model } from "mongoose";
import { User } from "./user.modal.js";

export interface Event {
  _id: typeof Schema.Types.ObjectId;
  title: string;
  description: string;
  date: Date;
  createdBy: User;
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
