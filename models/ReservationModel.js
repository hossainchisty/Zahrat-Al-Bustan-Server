// Import the required modules
const mongoose = require("mongoose");
const validator = require("../services/service");

// Define a schema for Reservations
const ReservationSchema = mongoose.Schema(
  {
    full_name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "This field is required. Please input a valid email."],
      unique: false,
      lowercase: true,
      validate: (value) => {
        if (!validator(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    phone_number: {
      type: String,
      required: true,
      unique: false,
      validate: {
        validator: function (v) {
          return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required."],
    },
    numberOfGuests: {
      type: Number,
      max: 50,
      required: true,
      default: 1,
    },
    seating_preference: {
      type: String,
      enum: ["Family Seating", "Single"],
    },
    promoCode: {
      type: String,
      default: null,
      trim: true,
    },
    offer: {
      type: String
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
