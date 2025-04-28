import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";
const cookies = new Cookies();

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/orders",
    credentials: "include", // Important: Ensures cookies are sent
    prepareHeaders: (headers) => {
      const token = cookies.get("authToken");
      console.log("token", token);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createOrders: builder.mutation({
      query: (order) => ({
        url: "/create-order",
        method: "POST",
        body: order,
      }),
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),

    getProviderOfAllOrders: builder.query({
      query: (serviceProviderId) => ({
        url: `/by-service-provider/${serviceProviderId}`,
        method: "GET",
      }),
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status?status=${status}`,
        method: "PATCH",
        body: { status },
      }),
    }),
    deleteOrder:builder.mutation({
        query:(orderId)=>({
            url:`/delete/${orderId}`,
            method:"DELETE",
        })
    }),

    updateOrder:builder.mutation({
      query:(order)=>({
        url:`/update`,
        method:'PATCH',
        body:order
      })
    }),

    indivisualOrder:builder.query({
      query:(orderId)=>({
        url:`get/${orderId}`,
        method:"GET"

      })
    }),
    updatePaymentStatus:builder.mutation({
      query:({orderId,serviceProviderId,paymentStatus})=>({
        url:`/payment-status`,
        method:"PUT",
        body:{ orderId, serviceProviderId, paymentStatus }
      })
    })
    
  }),
});
export const {
  useCreateOrdersMutation,
  useGetAllOrdersQuery,
  useGetProviderOfAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
  useIndivisualOrderQuery,
  useUpdatePaymentStatusMutation
  
} = orderApi;
export default orderApi;
