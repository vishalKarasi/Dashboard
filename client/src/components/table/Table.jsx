import "./table.scss";
import React from "react";

export const Table = ({ columns, data }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td key={column.key} head={column.header}>
                {row[column.key] !== "" ? row[column.key] : "null"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
