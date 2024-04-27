import React from "react";
import * as d3 from "d3";
import Chart from "@components/chart/Chart";
import { useSelector } from "react-redux";

const BubbleGraph = ({ data }) => {
  const { theme } = useSelector((state) => state.ui);
  return (
    <Chart
      type="line"
      data={data}
      xStart={0}
      xData={"likelihood"}
      yStart={0}
      yData={"relevance"}
      children={(svg, data, xScale, yScale, tooltip) => {
        const sizeScale = d3
          .scaleLinear()
          .domain([0, d3.max(data, (d) => d.intensity)])
          .range([5, 25]);

        svg
          .selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", (d) => xScale(d.likelihood))
          .attr("cy", (d) => yScale(d.relevance))
          .attr("r", (d) => sizeScale(d.intensity))
          .attr("fill", `${theme}`)
          .attr("opacity", 0.7)
          .on("mouseover", (event, d) => {
            const [x, y] = d3.pointer(event);
            tooltip.transition().duration(200).style("opacity", 0.9);
            tooltip.html(
              `Likelihood: ${d.likelihood}<br>Relevance: ${d.relevance}<br>Intensity: ${d.intensity}`
            );
          })
          .on("mouseout", () => {
            tooltip.transition().duration(500).style("opacity", 0);
          });
      }}
    />
  );
};

export default BubbleGraph;
