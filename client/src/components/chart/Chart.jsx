import "./chart.scss";
import React, { memo, useEffect, useRef } from "react";
import * as d3 from "d3";

const Chart = (props) => {
  const { type, data, xStart, xData, yStart, yData, children } = props;
  const [width, height] = [500, 300];
  const margin = { top: 25, right: 25, bottom: 50, left: 50 };
  const chartRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    d3.select(chartRef.current).selectAll("*").remove();

    // create svg
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // setting scales data
    let xScale;
    if (type === "line") {
      xScale = d3
        .scaleLinear()
        .domain([xStart, d3.max(data, (d) => d[xData])])
        .range([0, width - margin.left - margin.right]);
    }

    if (type === "bar") {
      xScale = d3
        .scaleBand()
        .domain(data.map((d) => d[xData]))
        .range([0, width - margin.left - margin.right])
        .padding(0.1);
    }

    const yScale = d3
      .scaleLinear()
      .domain([yStart, d3.max(data, (d) => d[yData])])
      .range([height - margin.top - margin.bottom, 0]);

    // adding axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg.append("g").call(d3.axisLeft(yScale));

    // adding label
    svg
      .append("text")
      .attr("x", width / 2.5)
      .attr("y", height - 50)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("class", "chart-label")
      .text(xData);

    svg
      .append("text")
      .attr("y", -margin.left)
      .attr("x", -height / 4)
      .attr("dy", "1em")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "end")
      .attr("class", "chart-label")
      .text(yData);

    // Add Tooltip
    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    // customise
    if (children) {
      children(svg, data, xScale, yScale, tooltip, margin, height);
    }
  }, [data]);

  return (
    <div ref={chartRef} className="svg-container">
      <div ref={tooltipRef} className="tooltip"></div>
    </div>
  );
};

export default memo(Chart);
