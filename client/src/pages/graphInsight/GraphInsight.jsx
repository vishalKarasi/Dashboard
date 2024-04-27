import "@src/components/chart/chart.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGraphicsData } from "@app/services/insightSlice.js";
import BubbleGraph from "@widgets/graphs/BubbleGraph.jsx";
import ScatterGraph from "@widgets/graphs/ScatterChart.jsx";
import Histogram from "@widgets/graphs/Histogram.jsx";
import Model from "@components/model/Model.jsx";

function GraphInsight() {
  const dispatch = useDispatch();
  const { graphics, status, message } = useSelector((state) => state.insight);

  useEffect(() => {
    dispatch(getGraphicsData());
  }, [dispatch]);

  const bubbleGraphData = graphics.map(
    ({ likelihood, relevance, intensity }) => ({
      likelihood,
      relevance,
      intensity,
    })
  );

  const scatterGraphData = graphics.map(({ intensity, likelihood }) => ({
    intensity,
    likelihood,
  }));

  const histogramData = graphics.map(({ sector, intensity }) => ({
    sector,
    intensity,
  }));

  return (
    <>
      {status === "loading" && <Model type="loading" />}
      <main className="chart-container">
        {status === "success" && (
          <>
            <h1>GraphInsight page</h1>

            <div>
              <h2>Relation between likelihood and revelance</h2>
              <ScatterGraph data={scatterGraphData} />
            </div>
            <div>
              <h2>
                Relation between likelihood and revelance and its intensity
              </h2>
              <BubbleGraph data={bubbleGraphData} />
            </div>
            <div>
              <h2>Frequency of intensity</h2>
              <Histogram data={histogramData} />
            </div>
          </>
        )}
      </main>
      {status === "error" && <Model type="error" messaage={message} />}
    </>
  );
}

export default GraphInsight;
