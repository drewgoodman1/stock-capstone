import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { fetchStockData } from "../../services/marketData.jsx";
import { CategoryScale, LinearScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import { Button, Form, Row, Col } from "react-bootstrap";
import {
  buyStock,
  sellAllStock,
  sellStock,
} from "../../services/equityServices.jsx";
import { getPositionsByClientId } from "../../services/clientServices.jsx";

export const BasicChart = ({
  chartTicker,
  client,
  setClient,
  positions,
  setPositions,
}) => {
  //const tickerSymbol = "F";
  const [refreshPositions, setRefreshPositions] = useState(false);
  const [numberOfShares, setNumberOfShares] = useState(0);
  const [currentPrice, setCurrentPrice] = useState();
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
    fetchStockData(chartTicker)
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
        setCurrentPrice(prices[prices.length - 1]);
        setStockData({
          labels: labels,
          datasets: [
            {
              label: chartTicker,
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
  }, [chartTicker]);

  // Function to create a vertical gradient
  const createVerticalGradient = (length) => {
    const ctx = document.createElement("canvas").getContext("2d");
    const gradient = ctx.createLinearGradient(200, 0, 0, length * 4); // Adjust the multiplier for desired length

    gradient.addColorStop(0.0, "#F038FF"); // Start color
    gradient.addColorStop(0.5, "#3772FF"); // Middle color
    gradient.addColorStop(1, "#E2EF70"); // End color

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
  const handleBuy = async () => {
    // Handle buy logic here
    console.log("Buy ", numberOfShares, " shares of ", chartTicker);
    const newPosition = {
      ticker: chartTicker,
      purchasePrice: currentPrice,
      shares: numberOfShares,
      clientId: client.id,
    };
    try {
      await buyStock(newPosition);
      const costBasis = numberOfShares * currentPrice;
      const cashBalance = client.cash - costBasis;
      const updatedClient = { ...client, cash: cashBalance };
      setClient(updatedClient);

      setPositions([...positions, newPosition]);
      setNumberOfShares("");
    } catch (error) {
      console.error("Error buying stock:", error);
    }
  };

  const handleSell = async () => {
    console.log(
      "Number of shares ",
      numberOfShares + " Ticker: " + chartTicker
    );
    const positionToSell = positions.find(
      (position) => position.ticker === chartTicker
    );
    const proceeds = positionToSell.purchasePrice * numberOfShares;

    console.log(positionToSell);

    if (positionToSell && parseInt(numberOfShares) === positionToSell.shares) {
      await sellAllStock(positionToSell);
    } else if (positionToSell) {
      positionToSell.shares -= parseInt(numberOfShares);
      await sellStock(positionToSell);
    }
    const newArray = positions.filter(
      (position) => position.id !== positionToSell.id
    );

    setPositions(newArray);
    const cashBalance = client.cash + proceeds;
    const updatedClient = { ...client, cash: cashBalance };
    setClient(updatedClient);
    setNumberOfShares("");
  };

  return (
    <div style={{ width: "75%" }}>
      {stockData.labels.length > 0 && (
        <Line data={stockData} options={options} />
      )}
      {currentPrice && (
        <div>
          <p>Current Price: {currentPrice}</p>
          <Row>
            <Col>
              <Button
                style={{ backgroundColor: "#E2EF70", borderColor: "#3772FF" }}
                variant="success"
                onClick={handleBuy}
              >
                Buy
              </Button>{" "}
              <Button
                style={{ backgroundColor: "#70E4EF", borderColor: "#FF0054" }}
                variant="danger"
                onClick={handleSell}
              >
                Sell
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="numberOfShares">
                <Form.Label>Number of Shares</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter number of shares"
                  value={numberOfShares || ""}
                  onChange={(e) => setNumberOfShares(parseInt(e.target.value))}
                />
              </Form.Group>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};
