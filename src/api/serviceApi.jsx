
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";


const cookies = new Cookies(); //  Create cookie instance

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/api/services",
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = cookies.get("authToken"); //  Get token using react-cookie

    if (token) {
      Headers.set("authToken", `Bearer ${token}`);
    }
    return Headers;
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
                
              }),
 
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
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

