import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 
import Cookies from "js-cookie";
  const serviceApi = createApi({
    reducerPath: "serviceApi",
    baseQuery:fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/services",
        credentials: "include",
        prepareHeaders:(Header)=>{
            const token = Cookies.get("token");
            if (token) {
                Header.set("Authorization", `Bearer ${token}`);

        }
        return Header;
    },

    }),
    endpoints:(builder)=>({
        createService:builder.mutation({
            query:(data)=>({
                url: '/register',
                method: 'POST',
                body: data,
            }),
        }),
        getAllServices: builder.query({
            query: () => ({
                url: `/get-all`, 
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
        deleteService:builder.mutation({
            query:(id)=>({
                url:`/${id}`,
                method:'DELETE',
            }),
        }),
    })
})
export const { useCreateServiceMutation,useGetAllServicesQuery,useDeleteServiceMutation,useUpdateServiceMutation } = serviceApi;
export default serviceApi;