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
    })
})
export const { useCreateServiceMutation,useGetAllServicesQuery } = serviceApi;
export default serviceApi;