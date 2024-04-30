import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { fetchStockData } from "../../services/marketData.jsx";
import { CategoryScale, LinearScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";

export const BasicChart = ({ currentUser }) => {
  const tickerSymbol = "AAPL";
  const [stockData, setStockData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });

  useEffect(() => {
    fetchStockData(tickerSymbol)
      .then((data) => {
        const labels = data.map((result) => {
          // Convert timestamp to a Date object
          const date = new Date(result.t);
          // Format the date to your desired format
          // For example, "MMM DD, YYYY"
          return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          });
        });
        const prices = data.map((result) => result.o);

        setStockData({
          labels: labels,
          datasets: [
            {
              label: tickerSymbol,
              data: prices,
              backgroundColor: ["gray"],
              borderColor: "black",
              borderWidth: 0.5,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching stock data:", error);
      });
  }, []);

  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
      },
      y: {
        grid: {
          display: false, // Hide y-axis grid lines
        },
      },
    },
  };

  return (
    <div style={{ width: 600 }}>
      <h2></h2>
      {stockData.labels.length > 0 && (
        <Line data={stockData} options={options} />
      )}
    </div>
  );
};
