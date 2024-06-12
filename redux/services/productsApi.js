import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {baseURL} from './../../constants/constants'
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({baseUrl: `${baseURL}/api/v1/`}),
    endpoints: (builder)=>({
        getProducts: builder.query({
            query: () => `products-app/products/`
        }),
        getProduct: builder.query({
            query:(product_id) =>  `products-app/product/${product_id}/`
        })
    })
})

export const {useGetProductsQuery, useGetProductQuery} = productsApi