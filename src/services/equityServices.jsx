export const getStocks = () => {
  return fetch("http://localhost:8088/stocks").then((res) => res.json());
};
export const getPositions = (clientId) => {
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
export const sellStock = (thisPosition) => {
  return fetch(`http://localhost:8088/positions/${thisPosition.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(thisPosition),
  });
};
export const sellAllStock = (thisPosition) => {
  return fetch(`http://localhost:8088/positions/${thisPosition.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(thisPosition),
  });
};
