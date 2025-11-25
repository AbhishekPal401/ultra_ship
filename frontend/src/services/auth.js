import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        query: `
          mutation Login($data: LoginInput!) {
            login(data: $data) {
              token
              user { id name age class attendance subjects }
            }
          }
        `,
        variables: { data: { email, password } },
      }),
      transformResponse: (response) => response.login,
    }),
  }),
});

export const { useLoginMutation } = authApi;
