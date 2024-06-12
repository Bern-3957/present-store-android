import {configureStore} from '@reduxjs/toolkit'
import {productsApi} from './services/productsApi'
import {userApi} from './services/userApi'
import authReducer from './slices/authSlice'
import userSlice from './slices/userSlice'
import { ordersApi } from './services/ordersApi'
import { cartApi } from './services/cartApi'

export const store = configureStore({
    reducer: {
        [productsApi.reducerPath]: productsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        auth: authReducer,
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(productsApi.middleware, userApi.middleware, ordersApi.middleware , cartApi.middleware)
})


