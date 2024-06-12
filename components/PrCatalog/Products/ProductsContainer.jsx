import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Products } from "./Products";
import { productsApi } from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../../../redux/services/productsApi";
import { useAboutMeQuery } from "../../../redux/services/userApi";
import Loader from "../../Loader/Loader";
import {
  useAddNewCartMutation,
  useGetCartsQuery,
} from "../../../redux/services/cartApi";

export const ProductsContainer = ({ navigation }) => {
  // const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useGetProductsQuery();
  const { refetch: aboutMeRefetch } = useAboutMeQuery();
  const [
    addNewCart,
    { isError: addNewCatError, isLoading: addNewCartLoading },
  ] = useAddNewCartMutation();
  const { data: cartsInner } = useGetCartsQuery();

  if (isLoading) {
    return <Loader />;
  }

  const handleRefresh = () => {
    refetch();
  };
  console.log("-----------------", cartsInner);
  return (
    <Products
      handleRefresh={handleRefresh}
      carts={cartsInner?.cart_items ? cartsInner.cart_items : []}
      navigation={navigation}
      products={data.products}
      addNewCart={addNewCart}
    />
  );
};
