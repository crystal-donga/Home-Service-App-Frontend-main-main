import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//import Cookies from 'js-cookie';
import { Cookies } from 'react-cookie';

const cookies = new Cookies()

const providerApi = createApi({
    reducerPath: 'providerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/service-providers',
        credentials: "include", // Important: Ensures cookies are sent
        prepareHeaders: (headers) => {

            const token = cookies.get("authToken");
            console.log("token",token)

           
            if (token) {


                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createProvider: builder.mutation({
            query: (providerData) => ({
                url: '/register',
                method: 'POST',
                body: providerData,
            }),

        }),


        getProviderDetails: builder.query({
            query: (userId) => ({
                url: `/user/${userId}`,
                method: 'GET',
            }),


        }),

    
    getProviderImage:builder.query({
        query:(ProviderImage)=>({
            url:`/image/${ProviderImage}`,
            method:'GET',
            responseHandler:(response)=>response.blob()
    
        }),
    }),


        updateProviderDetails: builder.mutation({
            query: (providerData) => ({
                url: `/update`,
                method: 'PATCH',
                body: providerData,
            }),

        }),

        deleteProviderDetails: builder.mutation({
            query: (providerData) => ({
                url: "/delete",
                method: 'DELETE',
                body: providerData,
            }),
        }),

    }),
})




export const { useCreateProviderMutation,useGetProviderDetailsQuery ,
    useUpdateProviderDetailsMutation ,useDeleteProviderDetailsMutation,
     useGetProviderImageQuery} = providerApi;

export default providerApi;