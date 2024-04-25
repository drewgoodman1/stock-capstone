export const getStocks = () => {
  return fetch("http://localhost:8088/stocks").then((res) => res.json());
};
export const buyStock = (newPosition) => {
  return fetch("http://localhost:8088/positions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPosition),
  });
};
