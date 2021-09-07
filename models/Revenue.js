import mongoose from "mongoose";

const RevenueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Required area"],
    maxLength: [20, "Too long to save"],
  },
  date: {
    type: Date,
    required: [true, "Required area"],
    default: Date.now,
  },
  amount: {
    type: Number,
    required: [true, "Required area"],
  },
  source: {
    type: String,
    required: [true, "Required area"],
  },
  installment: {
    type: Number,
    default: 1,
  },
  repeat: {
    type: Number,
    default: 1,
  },
  note: {
    type: String,
    maxLength: [50, "Too long to save"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default mongoose.models.RevenueSchema ||
  mongoose.model("Revenue", RevenueSchema);
