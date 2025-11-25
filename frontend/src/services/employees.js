import { api } from "./api";

export const employeesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: ({
        search = "",
        sortField = "name",
        sortOrder = "asc",
        page = 1,
        limit = 10,
      }) => ({
        query: `
          query Employees(
            $search: String,
            $sortField: String,
            $sortOrder: String,
            $page: Int,
            $limit: Int
          ) {
            employees(
              search: $search,
              sortField: $sortField,
              sortOrder: $sortOrder,
              page: $page,
              limit: $limit
            ) {
              id
              name
              age
              class
              attendance
              subjects
            }
          }
        `,
        variables: { search, sortField, sortOrder, page, limit },
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Employees"],
    }),

    getEmployeeById: builder.query({
      query: (id) => ({
        query: `
          query GetEmployeeById($id: ID!) {
            employee(id: $id) {
              id
              name
              age
              class
              attendance
              subjects
            }
          }
        `,
        variables: { id },
      }),
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: "Employees", id }],
    }),

    addEmployee: builder.mutation({
      query: (input) => ({
        query: `
          mutation AddEmployee($input: AddEmployeeInput!) {
            addEmployee(input: $input) {
              id
              name
              age
              class
              attendance
              subjects
            }
          }
        `,
        variables: { input },
      }),
      transformResponse: (response) => response.addEmployee,
      invalidatesTags: ["Employees"],
    }),

    updateEmployee: builder.mutation({
      query: (input) => ({
        query: `
          mutation UpdateEmployee($input: UpdateEmployeeInput!) {
            updateEmployee(input: $input) {
              id
              name
              age
              class
              attendance
              subjects
            }
          }
        `,
        variables: { input },
      }),
      transformResponse: (response) => response.updateEmployee,
      invalidatesTags: (result, error, { id }) => [
        "Employees",
        { type: "Employees", id },
      ],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
} = employeesApi;
