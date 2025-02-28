import {createApi, fetchBaseQuery } from "../node_modules/@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
  reducerPath: "main",
  tagTypes: ["Kpis"],
  endpoints: (build) => ({
    getKpis: build.query<void, void>({
      query: () => "kpi/kpis",
      providesTags: ["Kpis"]
    }),

  })
})

export const { useGetKpisQuery } = api;