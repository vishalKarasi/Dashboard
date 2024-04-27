import "@src/components/chart/chart.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGraphicsData } from "@app/services/insightSlice.js";
import LineChart from "@widgets/charts/LineChart.jsx";
import BarChart from "@widgets/charts/BarChart.jsx";
import PieChart from "@widgets/charts/PieChart.jsx";
import { getCountryCode } from "@utility/getCountryCode.js";
import Model from "@src/components/model/Model";

function ChartInsight() {
  const dispatch = useDispatch();
  const { graphics, status, message } = useSelector((state) => state.insight);

  useEffect(() => {
    dispatch(getGraphicsData());
  }, [dispatch]);

  const lineChartData = graphics
    .map(({ sector, start_year, intensity }) => ({
      sector,
      year: new Date(start_year).getFullYear(),
      intensity,
    }))
    .filter(
      (ele) =>
        Number.isFinite(ele.year) &&
        Number.isFinite(ele.intensity) &&
        ele.sector !== ""
    )
    .sort((a, b) => a.year - b.year);

  const barChartData = graphics
    .map((el) => ({
      country: getCountryCode(el.country),
      intensity: el.intensity,
    }))
    .filter((el) => el.country !== "" && el.intensity >= 20);

  const pieChartData = graphics.map((el) => ({
    topic: el.topic,
    relevance: el.relevance,
  }));

  return (
    <>
      {status === "loading" && <Model type="loading" />}
      <main className="chart-container">
        <h1>ChartInsight page</h1>
        {status === "success" && (
          <>
            <div>
              <h2>Yearly intensity on sectors</h2>
              <LineChart data={lineChartData} />
            </div>
            <div>
              <h2>Relevance of topics</h2>
              <PieChart data={pieChartData} />
            </div>
            <div>
              <h2>Intensity per country</h2>
              <BarChart data={barChartData} />
            </div>
          </>
        )}
      </main>
      {status === "error" && <Model type="error" messaage={message} />}
    </>
  );
}

export default ChartInsight;
