import { Schema, model } from "mongoose";
import type { Event } from "./event.model.js";

export interface User {
  _id: typeof Schema.Types.ObjectId;
  email: string;
  password: string;
  events: Event[];
}

const UserSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  ],
});

export const UserModel = model("User", UserSchema);
