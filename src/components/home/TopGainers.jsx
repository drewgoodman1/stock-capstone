import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import {
  fetchStockData,
  getGainerTicker,
  getGainers,
} from "../../services/marketData.jsx";
import { CategoryScale, LinearScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { BsArrowUp } from "react-icons/bs";

export const TopGainers = () => {
  const [gainerTicker, setGainerTicker] = useState();
  const [gainerData, setGainerData] = useState();
  const [topGainers, setTopGainers] = useState();
  const [stockData, setStockData] = useState({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
      },
    ],
  });

  const handleCardClick = async (ticker) => {
    setGainerTicker(ticker);
  };

  useEffect(() => {
    if (gainerTicker) {
      getGainerTicker(gainerTicker).then((data) => {
        console.log(data);
        setGainerData(data);
      });
    }
  }, [gainerTicker]);

  useEffect(() => {
    getGainers().then((data) => {
      setTopGainers(data.tickers);
    });
  }, []);

  useEffect(() => {
    if (gainerData) {
      const labels = gainerData.results.map((result) => {
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
      const prices = gainerData.results.map((result) => result.o);
      const volumes = gainerData.results.map((result) => result.v);

      setStockData({
        labels: labels,
        datasets: [
          {
            label: gainerTicker,
            data: prices,
            type: "line",
            // Create a gradient for the line color
            borderColor: createHorizontalGradient(prices.length),
            borderWidth: 5,
            pointRadius: 0,
          },
          {
            label: "Volume",
            data: volumes,
            type: "bar",
            borderColor: "rgba(89,209,2,1)",
            backgroundColor: "rgba(89,209,2,0.2)",
            borderWidth: 1,
            yAxisID: "volume-y-axis",
          },
        ],
      });
    }
  }, [gainerData, gainerTicker]);

  const createHorizontalGradient = (length) => {
    const ctx = document.createElement("canvas").getContext("2d");
    const gradient = ctx.createLinearGradient(50, 0, 0, length * 5); // Adjust the multiplier for desired length

    gradient.addColorStop(0, "rgba(135, 17, 193, 0.2)"); // Start color
    gradient.addColorStop(0.5, "rgba(7, 200, 249, 0.2)"); // End color

    return gradient;
  };

  // Add this function to create the second y-axis for volume
  const createVolumeYAxis = () => ({
    id: "volume-y-axis",
    type: "linear",
    position: "right",
  });

  // Declare options for the chart
  const options = {
    plugins: {
      legend: {
        labels: {
          boxWidth: 0, // Set the width of the colored box to 0
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
        ...createVolumeYAxis(), // Spread the properties of createVolumeYAxis
      },
    },
  };

  return (
    <Container>
      <h2 className="mt-4 mb-4">Top Gainers</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {topGainers?.map((stock, index) => (
          <Col key={index}>
            <Card onClick={() => handleCardClick(stock.ticker)}>
              <Card.Body>
                <Card.Title>{stock.ticker}</Card.Title>
                <Card.Text>
                  Percentage Gain:{" "}
                  <span style={{ color: "green" }}>
                    {stock.todaysChangePerc.toFixed(2)}% <BsArrowUp />
                  </span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={8} lg={6}>
          <div>
            <h2>{gainerTicker}</h2>
            {stockData.labels.length > 0 && (
              <Line data={stockData} options={options} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

/*useEffect(() => {
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
    const gradient = ctx.createLinearGradient(0, length / 2, 0, length); // Adjust the multiplier for desired length

    gradient.addColorStop(0, "rgba(233, 143, 192, 0.2)"); // Start color
    gradient.addColorStop(0.4, "rgba(220, 233, 86, 0.6)"); // Middle color
    gradient.addColorStop(1, "rgba(94, 222, 239, 0.2)"); // End color

    return gradient;
  };
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
    <div style={{ width: 600 }}>
      <h2></h2>
      {stockData.labels.length > 0 && (
        <Line data={stockData} options={options} />
      )}
    </div>
  );*/
