export const getBrokerByUserId = (userId) => {
  console.log(userId);
  return fetch(`http://localhost:8088/brokers?userId=${userId}`).then((res) =>
    res.json()
  );
};
export const getClientsByBrokerId = (brokerId) => {
  console.log(brokerId);
  return fetch(
    `http://localhost:8088/clients?brokerId=${brokerId}&_expand=user`
  ).then((res) => res.json());
};
export const getPositionsByClientId = (clientId) => {
  console.log(clientId);
  return fetch(
    `http://localhost:8088/positions?clientId=${clientId}&_expand=stock`
  ).then((res) => res.json());
};

export const buyStock = (newPosition) => {
  return fetch(`http://localhost:8088/postions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPosition),
  });
};
