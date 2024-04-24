export const getBrokerByUserId = (userId) => {
  console.log(userId);
  return fetch(`http://localhost:8088/brokers?userId=${userId}`).then((res) =>
    res.json()
  );
};
export const getClientsByBrokerId = (brokerId) => {
  console.log(brokerId);
  return fetch(`http://localhost:8088/clients?brokerId=${brokerId}`).then(
    (res) => res.json()
  );
};
