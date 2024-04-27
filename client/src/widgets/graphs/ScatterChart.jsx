// ScatterGraph.jsx
import React from "react";
import * as d3 from "d3";
import Chart from "@components/chart/Chart";
import { useSelector } from "react-redux";

const ScatterGraph = ({ data }) => {
  const { theme } = useSelector((state) => state.ui);

  return (
    <Chart
      type="line"
      data={data}
      xStart={0}
      xData={"likelihood"}
      yStart={0}
      yData={"intensity"}
      children={(svg, data, xScale, yScale, tooltip) => {
        svg
          .selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", (d) => xScale(d.likelihood))
          .attr("cy", (d) => yScale(d.intensity))
          .attr("r", 5)
          .attr("fill", `${theme}`)
          .on("mouseover", (event, d) => {
            const [x, y] = d3.pointer(event);
            tooltip.transition().duration(200).style("opacity", 0.9);
            tooltip.html(
              `Likelihood: ${d.likelihood}<br>Intensity: ${d.intensity}`
            );
          })
          .on("mouseout", () => {
            tooltip.transition().duration(500).style("opacity", 0);
          });
      }}
    />
  );
};

export default ScatterGraph;
