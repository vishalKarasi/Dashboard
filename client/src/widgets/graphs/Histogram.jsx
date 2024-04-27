import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";

const Histogram = ({ data, width = 500, height = 300 }) => {
  const { theme } = useSelector((state) => state.ui);
  const chartRef = useRef();
  const margin = { top: 25, right: 25, bottom: 50, left: 50 };

  useEffect(() => {
    d3.select(chartRef.current).selectAll("*").remove();
    // create svg
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // set up the scales
    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.intensity)])
      .range([0, width - margin.left - margin.right]);

    const histogram = d3
      .histogram()
      .value((d) => d.intensity)
      .domain(xScale.domain())
      .thresholds(xScale.ticks(10));
    const bins = histogram(data);

    // add axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg.append("g").call(
      d3.axisLeft(
        d3
          .scaleLinear()
          .domain([0, d3.max(bins, (d) => d.length)])
          .range([height - margin.top - margin.bottom, 0])
      )
    );

    // add label

    svg
      .append("text")
      .attr("x", width / 2.5)
      .attr("y", height - 50)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("class", "chart-label")
      .text("Intensity");

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("x", -height / 4)
      .attr("dy", "1em")
      .style("text-anchor", "end")
      .attr("class", "chart-label")
      .text("Frequency");

    // Add Tooltip
    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

    svg
      .selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.x0))
      .attr("y", (d) => height - margin.top - margin.bottom - d.length)
      .attr("width", (d) => xScale(d.x1) - xScale(d.x0))
      .attr("height", (d) => d.length)
      .attr("fill", `${theme}`);
  }, [data]);

  return <div ref={chartRef} className="svg-container"></div>;
};

export default Histogram;
