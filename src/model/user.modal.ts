import { Schema, model } from "mongoose";

export interface User {
  _id: typeof Schema.Types.ObjectId;
  email: string;
  password: string;
  events: (typeof Schema.Types.ObjectId)[];
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

export const UserModal = model("User", UserSchema);
