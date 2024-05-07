import { restClient } from "@polygon.io/client-js";

export const getPoly = () => {
  return fetch(
    `https://api.polygon.io/v2/aggs/ticker/I:NDX/range/1/year/2023-03-10/2023-03-10?sort=asc&limit=120&apiKey=GTE7BHpDFGOzxvmpSdKEkOMKnyOyWmpl`
  ).then((res) => res.json());
};

/*export const fetchStockData = async (tickerSymbol) => {
  const rest = restClient("GTE7BHpDFGOzxvmpSdKEkOMKnyOyWmpl");
  const data = await rest.stocks.aggregates(
    tickerSymbol,
    1,
    "day",
    "2023-04-01",
    "2024-04-01"
  );
  console.log(data);
  return data.results;
};*/

export const getGainers = () => {
  return fetch(
    `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/gainers?apiKey=GTE7BHpDFGOzxvmpSdKEkOMKnyOyWmpl`
  ).then((res) => res.json());
};
export const getGainerTicker = (gainerTicker) => {
  console.log(gainerTicker);
  return fetch(
    `https://api.polygon.io/v2/aggs/ticker/${gainerTicker}/range/1/day/2024-04-01/2024-04-30?adjusted=true&sort=asc&limit=120&apiKey=GTE7BHpDFGOzxvmpSdKEkOMKnyOyWmpl`
  ).then((res) => res.json());
};
export const getAllTickers = () => {
  return fetch(
    `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=GTE7BHpDFGOzxvmpSdKEkOMKnyOyWmpl`
  ).then((res) => res.json());
};
export const fetchStockData = (tickerSymbol) => {
  return fetch(
    `https://api.polygon.io/v2/aggs/ticker/${tickerSymbol}/range/1/day/2024-01-01/2024-05-02?adjusted=true&sort=asc&limit=120&apiKey=GTE7BHpDFGOzxvmpSdKEkOMKnyOyWmpl`
  ).then((res) => res.json());
};
