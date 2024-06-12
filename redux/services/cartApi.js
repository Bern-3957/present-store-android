import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {baseURL} from '../../constants/constants'
import * as SecureStore from "expo-secure-store";


export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({baseUrl: `${baseURL}/api/v1/`}),
    tagTypes: ['Carts'],
    endpoints: (builder)=>({
        getCarts: builder.query({
            query:() =>  ({
                url: `products-app/cart/`,
                method: 'GET',
                headers: {'Authorization': `Token ${SecureStore.getItem("authToken")}`},
            }),
            providesTags: (result, error, arg) =>{
                
                return result
                  ? [...result.cart_items.map(({ id }) => ({ type: 'Carts', id })), 'Carts']
                  : ['Carts']
                }

        }),
        addNewCart: builder.mutation({
            query:(product_id)=>({
                url: `products-app/cart/`,
                method: 'POST',
                headers: {'Authorization': `Token ${SecureStore.getItem("authToken")}`},
                body: {product_id}
            }),
            invalidatesTags: ['Carts']
        }),
        deleteCart: builder.mutation({
            query:(cart_id)=>({
                url: `products-app/cart/${cart_id}/`,
                method: 'DELETE',
                headers: {'Authorization': `Token ${SecureStore.getItem("authToken")}`},
                
            }),
            invalidatesTags: ['Carts']
        }),
        changeCartItemQuantity: builder.mutation({
            query:({cart_id, quantity})=>({
                url: `products-app/cart/${cart_id}/`,
                method: 'PATCH',
                headers: {'Authorization': `Token ${SecureStore.getItem("authToken")}`},
                body: {quantity}
            }),
            invalidatesTags: ['Carts']
        }),
        deleteAllCarts: builder.mutation({
            query:()=>({
                url: `products-app/cart/delete-all-carts/`,
                method: 'DELETE',
                headers: {'Authorization': `Token ${SecureStore.getItem("authToken")}`},
                
            }),
            invalidatesTags: ['Carts']
        })
    })
})

export const {useGetCartsQuery, 
    useAddNewCartMutation,
    useChangeCartItemQuantityMutation,
    useDeleteAllCartsMutation,
    useDeleteCartMutation,} = cartApi