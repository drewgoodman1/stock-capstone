import { restClient } from "@polygon.io/client-js";

export const getPoly = () => {
  return fetch(
    `https://api.polygon.io/v2/aggs/ticker/I:NDX/range/1/year/2023-03-10/2023-03-10?sort=asc&limit=120&apiKey=GTE7BHpDFGOzxvmpSdKEkOMKnyOyWmpl`
  ).then((res) => res.json());
};

export const fetchStockData = async (tickerSymbol) => {
  const rest = restClient("GTE7BHpDFGOzxvmpSdKEkOMKnyOyWmpl");
  const data = await rest.stocks.aggregates(
    tickerSymbol,
    1,
    "week",
    "2023-04-01",
    "2024-04-01"
  );
  console.log(data);
  return data.results;
};
