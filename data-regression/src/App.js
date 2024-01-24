import { useEffect, useState } from "react";
import regression from "regression";
import functionPlot from "function-plot";
import "./App.css";
import { PlotArchived } from "./PlotArchived";

function App() {
  const [selectedCurve, setSelectedCurve] = useState("");
  const [pointSet, setPointSet] = useState([]);
  const [equation, setEquation] = useState("");
  const [fetchData, setFetchData] = useState([]);

  const [isLoading, setLoading] = useState(true);

  let width = 800;
  let height = 500;

  // use useEffect to fetch all archived plots on page refresh
  // GET req to backend

  useEffect(() => {
    fetch("http://localhost:5000")
      .then(res => res.json())
      .then(data => {
        setFetchData(data.data);
        setLoading(false);
      })
  }, []);

  const renderSavedPlots = () => {
    if (isLoading) {
      return <p>Loading ...</p>
    }
    if (fetchData.length === 0) {
      return null;
    }
    console.log(fetchData);
    return fetchData.map((plot, index) => <PlotArchived index={index} equation={plot.equation} key={index} pointSet={plot.pointSet} selectedCurve={plot.selectedCurve} />)
  }

  const handleCurveChange = (e) => {
    setSelectedCurve(e.target.value);
  };

  const handlePlotPoints = () => {
    const inputPoints = document.getElementById("points").value;
    if (inputPoints !== "") {
      const points = inputPoints.split(" ").map((pair) => {
        const [x, y] = pair.split(",").map(Number);
        return [x, y];
      });

      setPointSet(points);

      document.getElementById("graphContainer").innerHTML = "";

      if (selectedCurve === "linear") {
        const result = regression.linear(points);
        const coefficient1 = result.equation[0];
        const coefficient2 = result.equation[1];

        const functionString = coefficient1 + "x" + "+" + coefficient2;
        setEquation(functionString);

        functionPlot({
          target: "#graphContainer",
          title: "y" + " = " + functionString,
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
              points,
              fnType: "points",
              graphType: "scatter",
              color: "red",
            },
            {
              fn: functionString,
              color: "green",
              graphType: "polyline",
            },
          ],
        });
      } else if (selectedCurve === "") {
        functionPlot({
          target: "#graphContainer",
          yAxis: { label: "y" },
          xAxis: { label: "x" },
          width,
          height,
          tip: {
            xLine: true, // dashed line parallel to y = 0
            yLine: true, // dashed line parallel to x = 0
          },
          grid: true,
          data: [
            {
              points,
              fnType: "points",
              graphType: "scatter",
              color: "red",
            },
          ],
        });
      } else if (selectedCurve === "quadratic") {
        const result = regression.polynomial(points, { order: 2 });
        const coefficients = result.equation;
        const functionString =
          coefficients[0] +
          "x^2" +
          "+" +
          coefficients[1] +
          "x" +
          "+" +
          coefficients[2];

        setEquation(functionString);

        functionPlot({
          target: "#graphContainer",
          title: "y" + " = " + functionString,
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
              points,
              fnType: "points",
              graphType: "scatter",
              color: "red",
            },
            {
              fn: functionString,
              color: "green",
              graphType: "polyline",
            },
          ],
        });
      } else {
        const result = regression.polynomial(points, { order: 3 });
        const coefficients = result.equation;
        const functionString =
          coefficients[0] +
          "x^3" +
          "+" +
          coefficients[1] +
          "x^2" +
          "+" +
          coefficients[2] +
          "x" +
          "+" +
          coefficients[3];

        setEquation(functionString);

        functionPlot({
          target: "#graphContainer",
          title: "y" + " = " + functionString,
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
              points,
              fnType: "points",
              graphType: "scatter",
              color: "red",
            },
            {
              fn: functionString,
              color: "green",
              graphType: "polyline",
            },
          ],
        });
      }
    } else {
      document.getElementById("graphContainer").innerHTML =
        "Please provide the coordinates for some 2D points as specified above";
    }
  };

  const handleArchive = async () => {
    // send POST req to backend to save a new plot in DB
    try {
      const res = await fetch("http://localhost:5000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pointSet,
          equation,
          selectedCurve,
        }),
      });

      const result = await res.json();
      console.log(result);
      alert(result.message);
    } catch (error) { }
  };

  return (
    <div className="App">
      <div>
        <div>
          <label htmlFor="points">
            Enter 2D Points coordinates separated by a space. Eg: 1.5,2 3,4 means
            (1.5,2) and (3,4) as points
            <input id="points" type="text" placeholder="eg: 1,2 3,4" />
          </label>
          <button onClick={handlePlotPoints}>Plot Points</button>
        </div>

        <div>
          <label>
            Select Curve:
            <select value={selectedCurve} onChange={handleCurveChange}>
              <option value="">None</option>
              <option value="linear">Linear</option>
              <option value="quadratic">Quadratic</option>
              <option value="cubic">Cubic</option>
            </select>
          </label>
        </div>

        <p>
          You can zoom-in & zoom-out & move within the plot by dragging and
          scrolling along the plot.
        </p>
        <h3>
          Select curve options and click Plot Points button to update graph
        </h3>

        <div id="graphContainer"></div>

        {selectedCurve !== "" && (
          <>
            <button onClick={handleArchive}>ARCHIVE PLOT</button>
            <p>After plotting the best curve of fit, you can archive the desired plot by clicking the button above</p>
          </>
        )}

        <div id="archivedPlots">
          {renderSavedPlots()}
        </div>
      </div>
    </div>
  );
}

export default App;
