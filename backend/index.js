import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { body } from "express-validator";
import { MONGO_DB_URI, PORT } from "./config.js";
import Plot from "./model.js";

const app = express();
app.use(cors());

app.use(express.json());

// set up connection to MongoDB using mongoose
mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);

mongoose
  .connect(MONGO_DB_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

// create a new plot and save to db
// included middleware to check for invalid req body
app.post(
  "/",
  body("pointSet")
    .isArray()
    .withMessage("Error occurred when processing point input!"),
  body("equation")
    .notEmpty()
    .withMessage("Invalid equation. Must not be empty!"),
  body("selectedCurve")
    .notEmpty()
    .withMessage("Curve type invalid! Must be linear or quadratic or cubic"),
  async (req, res) => {
    const { pointSet, equation, selectedCurve } = req.body;
    const newPlot = new Plot({
      pointSet,
      equation,
      selectedCurve,
    });

    await newPlot.save();

    res.status(201).json({
      status: 201,
      message: "Plot archived successfully",
      data: {
        pointSet,
        equation,
        selectedCurve,
      },
    });
  }
);

// retrieve all saved plots
app.get("/", async (req, res) => {
  const allPlots = await Plot.find({});
  let ret = [];
  for (let plot of allPlots) {
    const { equation, pointSet, selectedCurve } = plot;
    ret.push({ equation, pointSet, selectedCurve });
  }

  res.status(200).json({
    status: 200,
    message: "All of your saved plots",
    data: ret,
  });
});

app.listen(PORT, () => {
  console.log(`Server is live at http://localhost:${PORT}`);
});
