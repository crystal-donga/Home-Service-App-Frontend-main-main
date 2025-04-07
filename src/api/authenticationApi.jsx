import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import Cookies from 'js-cookie';
import { Cookies } from 'react-cookie';

const cookies = new Cookies()
const authenticationApi = createApi({
    reducerPath: 'authenticationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/auth',
        credentials: 'include',
        prepareHeaders: (headers) => {
              const token = cookies.get("authToken");
              console.log("token", token);
              if (token) {
                headers.set('authToken', `Bearer ${token}`);
              }
              return headers;
            },
        }),
        endpoints:(builder)=>({
            userData:builder.query({
                query: (id) => ({
                    url: `/${id}`, // Use the ID in the URL
                    method: "GET",
                  }),

            })
        })
    })
export const{useUserDataQuery} = authenticationApi;
export default authenticationApi;

