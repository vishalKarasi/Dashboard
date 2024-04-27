import React from "react";
import * as d3 from "d3";
import Chart from "@components/chart/Chart";
import { useSelector } from "react-redux";

const LineChart = ({ data }) => {
  const { theme } = useSelector((state) => state.ui);

  return (
    <Chart
      type="line"
      data={data}
      xStart={2015}
      xData={"year"}
      yStart={0}
      yData={"intensity"}
      children={(svg, data, xScale, yScale, tooltip) => {
        const line = d3
          .line()
          .x((d) => xScale(d.year))
          .y((d) => yScale(d.intensity));

        // Add the line to the chart
        svg
          .append("path")
          .datum(data)
          .attr("d", line)
          .attr("fill", "none")
          .attr("stroke", `${theme}`)
          .attr("stroke-width", 4)
          .on("mouseover", (event, d) => {
            const [x, y] = d3.pointer(event);
            const bisect = d3.bisector((d) => d.year).left;
            const index = bisect(data, xScale.invert(x));
            tooltip.transition().duration(200).style("opacity", 0.9);
            tooltip.html(
              `Sector: ${d[index].sector}<br>Year: ${d[index].year}  Intensity: ${d[index].intensity}`
            );
          })
          .on("mouseout", () => {
            tooltip.transition().duration(500).style("opacity", 0);
          });
      }}
    />
  );
};

export default LineChart;
