import { Schema, model } from "mongoose";

export const BookingStatus = {
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];

export interface Booking {
  _id: typeof Schema.Types.ObjectId;
  createdBy: typeof Schema.Types.ObjectId;
  event: typeof Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  status: BookingStatus;
}

const BookingSchema = new Schema<Booking>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    event: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Event",
    },
    status: {
      type: String,
      enum: [BookingStatus.CANCELLED, BookingStatus.COMPLETED],
      default: BookingStatus.COMPLETED,
      required: true,
    },
  },
  { timestamps: true }
);

export const BookingModel = model("Booking", BookingSchema);
