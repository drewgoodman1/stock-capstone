import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { fetchStockData } from "../../services/marketData.jsx";
import { CategoryScale, LinearScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";

export const BasicChart = ({ currentUser }) => {
  const tickerSymbol = "F";
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
        console.log("Fetched stock data:", data);
        const labels = data.results.map((result) => {
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
        const prices = data.results.map((result) => result.o);

        setStockData({
          labels: labels,
          datasets: [
            {
              label: tickerSymbol,
              data: prices,
              backgroundColor: createVerticalGradient(prices.length),
              borderColor: "black",
              borderWidth: 0.5,
              fill: true,
              pointRadius: 0, // Remove points
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching stock data:", error);
      });
  }, []);

  // Function to create a vertical gradient
  const createVerticalGradient = (length) => {
    const ctx = document.createElement("canvas").getContext("2d");
    const gradient = ctx.createLinearGradient(200, 0, 0, length * 4); // Adjust the multiplier for desired length

    gradient.addColorStop(0.0, "rgba(233, 143, 192, 0.2)"); // Start color
    gradient.addColorStop(0.5, "rgba(220, 233, 86, 0.6)"); // Middle color
    gradient.addColorStop(1, "rgba(94, 222, 239, 0.2)"); // End color

    return gradient;
  };
  // Function to create a horizontal gradient
  // Function to create a horizontal gradient

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
    responsive: true,
  };

  return (
    <div style={{ width: "75%" }}>
      <h2></h2>
      {stockData.labels.length > 0 && (
        <Line data={stockData} options={options} />
      )}
    </div>
  );
};
