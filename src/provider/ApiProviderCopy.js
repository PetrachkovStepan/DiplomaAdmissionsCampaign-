import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const URL = "https://api.coincap.io/v2/assets";
export const cryptoAPI = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints: (build) => ({
    fetchAllCoins: build.query({
      query: (offset) => ({
        url: "",
        params: {
          offset: offset,
        },
      }),
    }),
    fetchSingleCoin: build.query({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
  }),
});
