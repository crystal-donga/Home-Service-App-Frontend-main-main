import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";

const cookies = new Cookies(); // ✅ Create cookie instance

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api/services",
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = cookies.get("authToken"); // ✅ Get token using react-cookie

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery,
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
    getAllServices: builder.query({
      query: () => ({
        url: "/get-all",
        method: "GET",
      }),
    }),
    updateService: builder.mutation({
      query: (data) => ({
        url: "/update",
        method: "PATCH",
        body: data,
      }),
    }),
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;

export default serviceApi;
