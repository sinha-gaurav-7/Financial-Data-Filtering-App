import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = `https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=${process.env.REACT_APP_API_KEY}`;

const FinancialDataTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minRevenue: "",
    maxRevenue: "",
    minNetIncome: "",
    maxNetIncome: "",
  });

  const [sortConfig, setSortConfig] = useState({ column: "", order: "" });

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const applyFilters = () => {
    const filtered = data.filter((item) => {
      const inDateRange =
        (!filters.startDate ||
          new Date(item.date) >= new Date(filters.startDate)) &&
        (!filters.endDate || new Date(item.date) <= new Date(filters.endDate));
      const inRevenueRange =
        (!filters.minRevenue ||
          item.revenue >= parseFloat(filters.minRevenue)) &&
        (!filters.maxRevenue || item.revenue <= parseFloat(filters.maxRevenue));
      const inNetIncomeRange =
        (!filters.minNetIncome ||
          item.netIncome >= parseFloat(filters.minNetIncome)) &&
        (!filters.maxNetIncome ||
          item.netIncome <= parseFloat(filters.maxNetIncome));

      return inDateRange && inRevenueRange && inNetIncomeRange;
    });
    setFilteredData(filtered);
  };

  const handleSort = (column) => {
    let sortedData = [...filteredData];
    let sortOrder = "asc";

    if (sortConfig.column === column && sortConfig.order === "asc") {
      sortOrder = "desc";
    }

    sortedData.sort((a, b) => {
      if (column === "date") {
        return sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else {
        return sortOrder === "asc"
          ? a[column] - b[column]
          : b[column] - a[column];
      }
    });

    setFilteredData(sortedData);
    setSortConfig({ column, order: sortOrder });
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap gap-4 my-4">
        <input
          type="date"
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
          placeholder="Start Date"
          className="border border-gray-300 p-2 w-full sm:w-auto"
        />
        <input
          type="date"
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          placeholder="End Date"
          className="border border-gray-300 p-2 w-full sm:w-auto"
        />

        <input
          type="number"
          onChange={(e) =>
            setFilters({ ...filters, minRevenue: e.target.value })
          }
          placeholder="Min Revenue"
          className="border border-gray-300 p-2 w-full sm:w-auto"
        />
        <input
          type="number"
          onChange={(e) =>
            setFilters({ ...filters, maxRevenue: e.target.value })
          }
          placeholder="Max Revenue"
          className="border border-gray-300 p-2 w-full sm:w-auto"
        />

        <input
          type="number"
          onChange={(e) =>
            setFilters({ ...filters, minNetIncome: e.target.value })
          }
          placeholder="Min Net Income"
          className="border border-gray-300 p-2 w-full sm:w-auto"
        />
        <input
          type="number"
          onChange={(e) =>
            setFilters({ ...filters, maxNetIncome: e.target.value })
          }
          placeholder="Max Net Income"
          className="border border-gray-300 p-2 w-full sm:w-auto"
        />

        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Apply Filters
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("date")}
              >
                Date{" "}
                {sortConfig.column === "date" &&
                  (sortConfig.order === "asc" ? "🔼" : "🔽")}
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("revenue")}
              >
                Revenue{" "}
                {sortConfig.column === "revenue" &&
                  (sortConfig.order === "asc" ? "🔼" : "🔽")}
              </th>
              <th
                className="border border-gray-300 px-4 py-2 cursor-pointer"
                onClick={() => handleSort("netIncome")}
              >
                Net Income{" "}
                {sortConfig.column === "netIncome" &&
                  (sortConfig.order === "asc" ? "🔼" : "🔽")}
              </th>
              <th className="border border-gray-300 px-4 py-2">Gross Profit</th>
              <th className="border border-gray-300 px-4 py-2">EPS</th>
              <th className="border border-gray-300 px-4 py-2">
                Operating Income
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">
                  {item.date}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.revenue}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.netIncome}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.grossProfit}
                </td>
                <td className="border border-gray-300 px-4 py-2">{item.eps}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.operatingIncome}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinancialDataTable;
