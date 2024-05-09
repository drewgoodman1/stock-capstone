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
  return fetch(`http://localhost:8088/positions?clientId=${clientId}`).then(
    (res) => res.json()
  );
};
