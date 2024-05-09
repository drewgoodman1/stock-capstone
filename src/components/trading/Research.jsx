import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { fetchStockData } from "../../services/marketData.jsx";
import { BasicChart } from "../home/BasicChart.jsx";

export const Research = ({ client, setClient, positions, setPositions }) => {
  const [tickerSymbol, setTickerSymbol] = useState("");
  const [chartTicker, setChartTicker] = useState("");

  const handleInputChange = (event) => {
    setTickerSymbol(event.target.value);
  };

  const handleResearch = () => {
    console.log(tickerSymbol);
    setChartTicker(tickerSymbol);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Enter Ticker Symbol:</Form.Label>
        <Form.Control
          type="text"
          value={tickerSymbol}
          onChange={handleInputChange}
          placeholder="Enter ticker symbol"
        />
      </Form.Group>
      <Button
        style={{ backgroundColor: "#F038FF", borderColor: "#3772FF" }}
        variant="primary"
        onClick={handleResearch}
      >
        Research
      </Button>
      <br></br>
      {chartTicker && (
        <BasicChart
          chartTicker={chartTicker}
          client={client}
          setClient={setClient}
          positions={positions}
          setPositions={setPositions}
        />
      )}
    </Form>
  );
};
