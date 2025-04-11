import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Cookies } from 'react-cookie';
const cookies = new Cookies()

const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/orders',
        credentials: "include", // Important: Ensures cookies are sent
        prepareHeaders: (headers) => {

            const token = cookies.get("authToken");
            console.log("token",token)

           
            if (token) {


                headers.set('authToken', `Bearer ${token}`);
            }
            return headers;
        },
        }),
        endpoints:(builder)=>({
            createOrders:builder.mutation({
                query:(order)=>({
                    url:'/create-order',
                    method:'POST',
                    body:order

                }),
            }),

        })

})
export const {useCreateOrdersMutation} = orderApi
export default orderApi;
