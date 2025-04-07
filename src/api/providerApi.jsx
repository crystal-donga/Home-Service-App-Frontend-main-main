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
<<<<<<< HEAD
            const token = cookies.get("authToken");
            console.log("token",token)
=======
            const token = Cookies.get("authToken");
            console.log("token", token)
>>>>>>> a46e343357c35832d1216f0d119589e8f432de23
            if (token) {

<<<<<<< HEAD
=======

>>>>>>> a46e343357c35832d1216f0d119589e8f432de23
                headers.set('authToken', `Bearer ${token}`);
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
<<<<<<< HEAD
    }),
    getProviderImage:builder.query({
        query:(ProviderImage)=>({
            url:`/image/${ProviderImage}`,
            method:'GET',
            responseHandler:(response)=>response.blob()
    
        }),
    }),
=======
>>>>>>> a46e343357c35832d1216f0d119589e8f432de23

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



<<<<<<< HEAD
export const { useCreateProviderMutation,useGetProviderDetailsQuery ,
    useUpdateProviderDetailsMutation ,useDeleteProviderDetailsMutation,
     useGetProviderImageQuery} = providerApi;
=======
export const { useCreateProviderMutation, useGetProviderDetailsQuery, useUpdateProviderDetailsMutation, useDeleteProviderDetailsMutation } = providerApi;
>>>>>>> a46e343357c35832d1216f0d119589e8f432de23
export default providerApi;