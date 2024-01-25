import React, { useEffect } from "react";
import functionPlot from "function-plot";

export const PlotArchived = ({ index, pointSet, equation, selectedCurve }) => {
  let width = 800;
  let height = 500;

  // render out archived plots on page refresh
  useEffect(() => {
    functionPlot({
      target: "#plot" + index,
      title: "y" + " = " + equation + " (" + selectedCurve + ")",
      yAxis: { label: "y" },
      xAxis: { label: "x" },
      tip: {
        xLine: true, // dashed line parallel to y = 0
        yLine: true, // dashed line parallel to x = 0
      },
      width,
      height,
      grid: true,
      data: [
        {
          points: pointSet,
          fnType: "points",
          graphType: "scatter",
          color: "red",
        },
        {
          fn: equation,
          color: "green",
          graphType: "polyline",
        },
      ],
    });
  });

  let rawPoints = pointSet;
  let stringPoints = "";
  for (let point of rawPoints) {
    const str = "(" + point[0] + "," + point[1] + ")  ";
    stringPoints += str;
  }

  return (
    <>
      <p>Evaluated Points: {stringPoints.trim()}</p>
      <div id={`plot${index}`}></div>
      <p>---------------------------------------------------</p>
    </>
  );
};
