import React from "react";
import functionPlot from "function-plot";

export const PlotArchived = ({ index, pointSet, equation, selectedCurve }) => {

    let width = 800;
    let height = 500;

    functionPlot({
        target: `savedPlot${index}`,
        title: "y" + " = " + equation + "(" + selectedCurve + ")",
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
                pointSet,
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

    return (
        <div id={`savedPlot${index}`}></div>
    )
}