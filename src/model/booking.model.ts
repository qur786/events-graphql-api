import { Schema, model } from "mongoose";

const BookingStatus = {
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

const BookingSchema = new Schema<Booking>({
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
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: [BookingStatus.CANCELLED, BookingStatus.COMPLETED],
    default: BookingStatus.COMPLETED,
    required: true,
  },
});

export const BookingModel = model("Booking", BookingSchema);
