import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { restClient } from "@polygon.io/client-js";
import { Chart } from "chart.js";
import {
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  TimeScale,
} from "chart.js";

// Register Chart.js components
Chart.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  TimeScale
);

export const Home = ({ currentUser }) => {
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rest = restClient("GTE7BHpDFGOzxvmpSdKEkOMKnyOyWmpl");
        const data = await rest.stocks.aggregates(
          "SPY",
          1,
          "day",
          "2023-04-01",
          "2024-04-01"
        );
        setStockData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className="my-4 text-center">Market Data</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center">Error: {error}</p>
          ) : (
            <div>
              <div className="text-center">
                <p>{stockData ? stockData.ticker + " Last 12 Months" : ""}</p>
              </div>
              <Line
                data={{
                  labels: stockData.results.map((result) => new Date(result.t)),
                  datasets: [
                    {
                      label: stockData.ticker + " last 12 months",
                      data: stockData.results.map((result) => result.c), // Use closing prices
                      fill: false,
                      borderColor: "rgb(75, 192, 192)",
                      tension: 0.1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  scales: {
                    x: {
                      ticks: {
                        display: false, // Hide x-axis labels
                      },
                      grid: {
                        display: false, // Hide x-axis grid lines
                      },
                    },
                    y: {
                      type: "linear",
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  },
                  plugins: {
                    title: {
                      display: true,
                      text: stockData
                        ? stockData.ticker + " Last 12 Months"
                        : "",
                      align: "center", // Center the title
                    },
                    legend: {
                      display: false, // Hide the legend
                    },
                    tooltips: {
                      mode: "index",
                      intersect: false,
                    },
                  },
                }}
                style={{
                  maxWidth: "400px",
                  maxHeight: "300px",
                  margin: "0 auto",
                }} // Custom CSS to make the chart smaller and centered
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/*useEffect(() => {
  getPoly().then((data) => {
    setStockData(data);
    console.log(data);
  });
}, []);*/
