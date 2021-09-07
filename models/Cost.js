import mongoose from "mongoose";

const CostSchema = new mongoose.Schema({
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
  type: {
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

export default mongoose.models.Cost || mongoose.model("Cost", CostSchema);
