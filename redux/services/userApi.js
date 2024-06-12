import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {baseURL} from './../../constants/constants'
import * as SecureStore from "expo-secure-store";
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    endpoints: (builder)=>({    
    
        authUser: builder.mutation({
            query: (credentials) => ({
                url: '/auth/token/login/',
                method: 'POST',
                body: credentials,
            })
        }),
        regUser: builder.mutation({
            query: (user_data) => ({
                url: '/api/v1/auth/users/',
                method: 'POST',
                body: user_data,
            })
        }),
        aboutMe: builder.query({
            
            query: () => ({
                url: '/api/v1/auth/users/me/',
                method: 'GET',
                headers: {'Authorization': `Token ${SecureStore.getItem("authToken")}`}
            })
        }),
        changeUserInfoOnServer: builder.mutation({
            
            query: (data) => ({
                url: '/api/v1/auth/users/me/',
                method: 'PATCH',
                headers: {'Authorization': `Token ${SecureStore.getItem("authToken")}`},
                body: data,
            })
        }),
        logoutUser: builder.mutation({
            query: () => ({
                url: '/auth/token/logout/',
                method: 'POST',
                headers: {'Authorization': `Token ${SecureStore.getItem("authToken")}`},
                
            })
        }),
    })
})

export const {useAuthUserMutation, useAboutMeQuery, useLogoutUserMutation, useChangeUserInfoOnServerMutation, useRegUserMutation} = userApi