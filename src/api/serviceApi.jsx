<<<<<<< HEAD
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 
// import Cookies from "js-cookie";
import { Cookies } from "react-cookie";

  const cookie= new Cookies();//react cookie
  const serviceApi = createApi({
    reducerPath: "serviceApi",
    baseQuery:fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/services",
        credentials: "include",
        prepareHeaders:(Header)=>{
            const token = cookie.get("authToken");
            if (token) {
                Header.set("authToken", `Bearer ${token}`);
=======
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";
>>>>>>> a46e343357c35832d1216f0d119589e8f432de23

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
<<<<<<< HEAD
    endpoints:(builder)=>({
        createService:builder.mutation({
            query:(data)=>({
                url: '/register',
                method: 'POST',
                body: data,
            }),
        }),
        getAllServices: builder.query({
            query: (providerId) => ({
                url: `/provider/${providerId}`, 
                method: 'GET',
            }),
    
           
        }),
        updateService:builder.mutation({
            query:(data)=>({
                url: '/update',
                method: 'PATCH',
                body: data,
                }),
                
=======
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
>>>>>>> a46e343357c35832d1216f0d119589e8f432de23

export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;

<<<<<<< HEAD
        }),
        deleteService:builder.mutation({
            query:(id)=>({
                url:`/${id}`,
                method:'DELETE',
            }),
        }),
        getServiceImage:builder.query({
            query:(imageName)=>({
                url:`/image/${imageName}`,
                method:'GET', 
                responseHandler:(response) => response.blob(), 
            }),
        }),
        getAll:builder.query({
            query:()=>({
                url:'/get-all',
                method:'GET',
            })
        })
    })
})
export const { useCreateServiceMutation,useGetAllServicesQuery,
              useDeleteServiceMutation,useUpdateServiceMutation 
              ,useGetServiceImageQuery ,useGetAllQuery} = serviceApi;
export default serviceApi;
=======
export default serviceApi;
>>>>>>> a46e343357c35832d1216f0d119589e8f432de23
