import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {baseURL} from '../../constants/constants'
import * as SecureStore from "expo-secure-store";


export const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({baseUrl: `${baseURL}/api/v1/`}),
    endpoints: (builder)=>({
        getOrders: builder.query({
            query:() =>  ({
                url: `products-app/order/`,
                method: 'GET',
                headers: {'Authorization': `Token ${SecureStore.getItem("authToken")}`},
            })
        }),
        makeAnOrder: builder.mutation({
            query:(data)=>({
                url: `products-app/order/`,
                method: 'POST',
                headers: {'Authorization': `Token ${SecureStore.getItem("authToken")}`},
                body: {order:data}
            }),
        })
    })
})

export const {useGetOrdersQuery, useMakeAnOrderMutation} = ordersApi