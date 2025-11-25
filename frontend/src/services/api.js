import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const graphqlBaseQuery =
  ({ baseUrl }) =>
  async ({ query, variables }, api, extraOptions) => {
    const rawBaseQuery = fetchBaseQuery({
      baseUrl,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      prepareHeaders: (headers, { getState }) => {
        const token = getState().auth?.token;

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }

        headers.set("Content-Type", "application/json");
        return headers;
      },
    });

    const result = await rawBaseQuery(
      {
        url: "/graphql",
        body: JSON.stringify({ query, variables }),
      },
      api,
      extraOptions
    );

    if (result.error) return { error: result.error };

    if (result.data?.errors?.length) {
      return { error: result.data.errors[0] };
    }

    return { data: result.data?.data ?? result.data };
  };

export const api = createApi({
  reducerPath: "api",
  baseQuery: graphqlBaseQuery({ baseUrl: "http://localhost:8000" }),
  endpoints: () => ({}),
});
