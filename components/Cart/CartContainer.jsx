import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { Cart } from "./Cart";
import {
  useChangeCartItemQuantityMutation,
  useDeleteAllCartsMutation,
  useDeleteCartMutation,
  useGetCartsQuery,
} from "../../redux/services/cartApi";
import Loader from "../Loader/Loader";
import { useMakeAnOrderMutation } from "../../redux/services/ordersApi";

export const CartContainer = ({ navigation }) => {
  const {
    data,
    isError,
    isLoading,
    refetch: refetchCetCartsQuery,
  } = useGetCartsQuery();
  const [deleteCart] = useDeleteCartMutation();
  const [changeCartItemQuantity] = useChangeCartItemQuantityMutation();
  const [deleteAllCarts] = useDeleteAllCartsMutation();
  const [makeAnOrder] = useMakeAnOrderMutation();
  const [isMakeIrderSuccess, setIsMakeIrderSuccess] = useState("noRequest");
  const [money, setMoney] = useState({
    productsCost: 0,
    discount: 0,
    deliveryCost: 250,
    finalCost: 0,
  });

  if (isLoading) {
    return <Loader />;
  }

  useEffect(() => {
    if (data?.cart_items) {
      const productsCost = data.cart_items.reduce((sum, item) => {
        return sum + item.product_details.price * item.quantity;
      }, 0);
      const finalCost = productsCost + money.deliveryCost - money.discount;
      setMoney({ ...money, productsCost: productsCost, finalCost: finalCost });
    }
  }, [data]);

  const sendOrderDataToServer = async (orderInfo) => {
    const orderItems = data.cart_items.map((item) => ({
      product_id: item.product_details.id,
      quantity: item.quantity,
    }));

    const order_data = { orderItems, orderInfo, cartMoney: money };
    try {
      const result = await makeAnOrder(order_data).unwrap();
      console.log("-==-=-=-==-=-=-", result);
      console.log("-==-=-=-==-=-=-", result.message);
      setIsMakeIrderSuccess("true");
      navigation.navigate("MakeAnOrder", {
        sendOrderDataToServer,
        isMakeOrderSuccess: "true",
      });
      deleteAllCarts();
    } catch (error) {
      setIsMakeIrderSuccess("false");
      console.error("-----Failed to create order", error);
      navigation.navigate("MakeAnOrder", {
        sendOrderDataToServer,
        isMakeOrderSuccess: "false",
      });
    }
  };

  return (
    <Cart
      deleteCart={deleteCart}
      carts={data?.cart_items ? data.cart_items : []}
      changeCartItemQuantity={changeCartItemQuantity}
      refetchCetCartsQuery={refetchCetCartsQuery}
      navigation={navigation}
      money={money}
      sendOrderDataToServer={sendOrderDataToServer}
      isMakeIrderSuccess={isMakeIrderSuccess}
    />
  );
};
