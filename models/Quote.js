import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Required area"],
  },
});

export default mongoose.models.Quote || mongoose.model("Quote", QuoteSchema);
