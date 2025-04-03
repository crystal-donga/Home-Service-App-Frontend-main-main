import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from 'js-cookie';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/user-details',
    credentials: "include", // Ensures cookies are sent
    prepareHeaders: (headers) => {
      const token = Cookies.get("authToken");
      console.log("token", token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createUserDetails: builder.mutation({
      query: (formData) => {
        
        return {
          url: "/addDetails",
          method: "POST",
          body: formData,
        };
      },
    }),
    

    getUserDetails: builder.query({
      query: (id) => ({
        url: `/get-details-by-id/${id}`, // Use the ID in the URL
        method: "GET",
      }),
    }),
      updateUserDetails: builder.mutation({  
        query: (userDetails) => ({
          url: "/update",
          method: "PUT",
          body: userDetails,
        }),
        transformResponse: (response) => {
          // Convert response into JSON format if it's a string
          if (typeof response === "string") {
            return { message: response };
          }
          return response;
        },
    
    }),
    deleteUser:builder.mutation({
      query: (userDetails) => ({
        url: `/delete`,
        method: "DELETE",
        body: userDetails,
        }),
        transformResponse: (response) => {
          // Convert response into JSON format if it's a string
          if (typeof response === "string") {
            return { message: response };
          }
          return response;
        },
    })
  }),
});


export const { useCreateUserDetailsMutation, useUpdateUserDetailsMutation, useGetUserDetailsQuery ,useDeleteUserMutation } = userApi;
export default userApi; 
