import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const forgotPasswordApi = createApi({
    reducerPath: 'forgotPasswordApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/auth/forgot-password',
        credentials: "include",
        prepareHeaders:(headers)=>{
            const token = cookies.get("authToken");
            console.log("token", token);
      
            if (token) {
              headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    endpoints:(builder)=>({
        generateOtp:builder.mutation({
            query:(data)=>({
                url:'/generate-otp',
                method:'POST',
                body:data
            }),
        }),

        verifyOtp:builder.mutation({
            query:(data)=>({
                url:'/verify-otp',
                method:'POST',
                body:data
            })
        }),
        changePassword:builder.mutation({
            query:(data)=>({
                url:'/reset-password',
                method:'POST',
                body:data
            })
        })
    })
})
export const {useGenerateOtpMutation,useVerifyOtpMutation,useChangePasswordMutation} = forgotPasswordApi
export default forgotPasswordApi;