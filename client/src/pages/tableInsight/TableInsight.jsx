import "./tableInsight.scss";
import React, { useEffect, useState } from "react";
import {
  getFilteredInsights,
  getInsights,
} from "@app/services/insightSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "@components/table/Table.jsx";
import Model from "@components/model/Model.jsx";

import { Paginator } from "primereact/paginator";

function TableInsight() {
  const dispatch = useDispatch();
  const { insights, status } = useSelector((state) => state.insight);

  // for pagination
  const [first, setFirst] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
  });

  // for filtering
  const [filters, setFilters] = useState({
    source: "",
    topic: "",
    sector: "",
    region: "",
    country: "",
  });

  // for dropdown
  const filterOptions = {
    source: ["EIA", "sustainablebrands.com", "SBWire", "CleanTechnica"],
    topic: ["gas", "oil", "consumption", "market"],
    sector: ["Energy", "Environment", "Government", "Manufacturing"],
    region: ["Northern America", "Central America", "Western Africa", "Africa"],
    country: ["United States of America", "Mexico", "Nigeria", "Russia"],
  };

  // for table
  const columns = [
    { key: "title", header: "title" },
    { key: "source", header: "source" },
    { key: "topic", header: "topic" },
    { key: "insight", header: "insight" },
    { key: "sector", header: "sector" },
    { key: "region", header: "region" },
    { key: "country", header: "country" },
    { key: "added", header: "added" },
    { key: "published", header: "published" },
  ];

  const onPageChange = (event) => {
    setFirst(event.first);
    setPagination({
      page: event.page + 1,
      per_page: event.rows,
    });
  };

  const handleFilterChange = (filterKey, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  };

  useEffect(() => {
    dispatch(getInsights(pagination));
  }, [pagination]);

  useEffect(() => {
    const hasFilter = Object.values(filters).some((value) => value !== "");
    if (hasFilter) {
      dispatch(getFilteredInsights(filters));
    }
  }, [filters]);

  return (
    <main className="tableInsight">
      <h1>Table Insight</h1>

      <div className="filters">
        {Object.keys(filterOptions).map((filterKey) => (
          <select
            key={filterKey}
            value={filters[filterKey]}
            onChange={(e) => handleFilterChange(filterKey, e.target.value)}
          >
            <option value="">{filterKey}</option>
            {filterOptions[filterKey].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ))}
      </div>

      {status === "loading" && <Model type="loading" />}
      {status === "success" && (
        <>
          {insights.length === 0 ? (
            <Model type="error" messaage="No match" />
          ) : (
            <Table columns={columns} data={insights} />
          )}
          {!Object.values(filters).some((value) => value !== "") && (
            <Paginator
              first={first}
              rows={pagination.per_page}
              totalRecords={999}
              rowsPerPageOptions={[2, 10, 20, 30]}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
      {status === "error" ||
        (insights.length === 0 && <Model type="error" messaage="No match" />)}
    </main>
  );
}

export default TableInsight;
