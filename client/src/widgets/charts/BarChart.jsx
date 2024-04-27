import React from "react";
import * as d3 from "d3";
import Chart from "@components/chart/Chart";
import { useSelector } from "react-redux";

const BarChart = ({ data }) => {
  const { theme } = useSelector((state) => state.ui);
  return (
    <Chart
      type="bar"
      data={data}
      xData={"country"}
      yStart={0}
      yData={"intensity"}
      children={(svg, data, xScale, yScale, tooltip, margin, height) => {
        svg
          .selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", (d) => xScale(d.country))
          .attr("y", (d) => yScale(d.intensity))
          .attr("width", xScale.bandwidth())
          .attr(
            "height",
            (d) => height - margin.top - margin.bottom - yScale(d.intensity)
          )
          .attr("fill", `${theme}`)
          .on("mouseover", (event, d) => {
            const [x, y] = d3.pointer(event);
            tooltip.transition().duration(200).style("opacity", 0.9);
            tooltip.html(`Country: ${d.country}<br>Intensity: ${d.intensity}`);
          })
          .on("mouseout", () => {
            tooltip.transition().duration(500).style("opacity", 0);
          });
      }}
    />
  );
};

export default BarChart;
