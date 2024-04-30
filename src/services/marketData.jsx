export const getPoly = () => {
  return fetch(
    `https://api.polygon.io/v2/aggs/ticker/I:NDX/range/1/year/2023-03-10/2023-03-10?sort=asc&limit=120&apiKey=GTE7BHpDFGOzxvmpSdKEkOMKnyOyWmpl`
  ).then((res) => res.json());
};
