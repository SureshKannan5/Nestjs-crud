import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = import.meta.env.VITE_BACKEND_SERVER || "http://localhost:3000";

const BASE_URL = "/rest/api/v1/task";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    createTask: build.mutation({
      query: (payload) => ({
        url: `${BASE_URL}`,
        method: "POST",
        body: payload,
      }),
    }),
    listAllTasks: build.query({
      query: () => `${BASE_URL}`,
    }),
    getSingleTask: build.query({
      query: (id) => `${BASE_URL}/${id}`,
    }),
    updateTask: build.mutation({
      query: ({ id, payload }) => ({
        url: `${BASE_URL}/${id}`,
        method: "PUT",
        body: payload,
      }),
    }),
    deleteTask: build.mutation({
      query: (id) => ({
        url: `${BASE_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    listFilteredTasks: build.mutation({
      query: ({ page, limit, payload }) => ({
        url: `${BASE_URL}/filter/${page}/${limit}`,
        method: "POST",
        body: payload,
      }),
    }),
  }),
  reducerPath: "baseApi",
});

export const {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useLazyGetSingleTaskQuery,
  useListAllTasksQuery,
  useUpdateTaskMutation,
  useListFilteredTasksMutation,
} = api;
