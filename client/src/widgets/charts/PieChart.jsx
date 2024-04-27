import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const PieChart = ({ data, width = 500, height = 300 }) => {
  const chartRef = useRef();
  useEffect(() => {
    d3.select(chartRef.current).selectAll("*").remove();
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3.pie().value((d) => d.relevance);

    const arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(Math.min(width, height) / 2);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const arcs = pie(data);

    svg
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => colorScale(d.data.relevance));

    // Add Tooltip
    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg
      .selectAll("path")
      .on("mouseover", (event, d) => {
        const [x, y] = arc.centroid(d);
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip.html(
          `Topic: ${d.data.topic}<br>Relevance: ${d.data.relevance}`
        );
      })
      .on("mouseout", () => {
        tooltip.transition().duration(500).style("opacity", 0);
      });
  }, [data]);

  return <div ref={chartRef} className="svg-container"></div>;
};

export default PieChart;
