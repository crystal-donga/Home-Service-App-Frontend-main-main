import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import Cookies from 'js-cookie';
import { Cookies } from "react-cookie";

const cookie= new Cookies();//react cookie
const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/user-details',
    credentials: "include", // Ensures cookies are sent
    prepareHeaders: (headers) => {
      const token = cookie.get("authToken");
      console.log("token", token);
      if (token) {
        headers.set('authToken', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createUserDetails: builder.mutation({
      query: (formData) => {
        
        return {
          url: "/add-details",
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
          method: "PATCH",
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
    }),
     getUserImage:builder.query({
      query:(imageName)=>({
        url:`/image/${imageName}`,
        method:"GET",
        responseHandler:(response)=>response.blob()

        
      }),
     }),
  }),
});


export const { useCreateUserDetailsMutation, useUpdateUserDetailsMutation, useGetUserDetailsQuery 
             ,useDeleteUserMutation ,useGetUserImageQuery} = userApi;
export default userApi; 
