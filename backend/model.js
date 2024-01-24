import mongoose from "mongoose";

const PlotSchema = new mongoose.Schema({
  pointSet: Array,
  equation: String,
  selectedCurve: String,
});

export default mongoose.model("plotss", PlotSchema);
