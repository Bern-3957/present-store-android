import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList,
  Platform,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useGetOrdersQuery } from "../../../redux/services/ordersApi";
import Loader from "../../Loader/Loader";
import { StatusBar } from "expo-status-bar";
import { baseURL } from "../../../constants/constants";

const ProductItemInOrder = ({ productItem }) => {
  //   console.log("pppppppppp", productItem);
  return (
    <View style={s.ProductItemInOrder}>
      <Image
        style={s.productImage}
        source={{
          uri: `${baseURL}${productItem.product.images[0].image}`,
        }}
      />
      <View style={s.ProductInfo}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          {productItem.product.title}
        </Text>
        <Text style={{}}>Цена: {productItem.product.price}₽</Text>
        <Text style={{}}>Арт. {productItem.product.vendor_code}</Text>
      </View>
    </View>
  );
};

const Order = ({ order }) => {
  return (
    <View style={s.order}>
      {/* <Text>{order.final_cost}рублей</Text> */}
      <View style={s.orderInfo}>
        <Text>{order.order_date}</Text>
        <Text>{order.order_status}</Text>
      </View>
      <View style={s.orderInner}>
        <FlatList
          data={order.order_details}
          renderItem={({ item, index }) => {
            return <ProductItemInOrder productItem={item} />;
          }}
          keyExtractor={(productItem, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export const MyOrders = (props) => {
  const { data, isError, isLoading } = useGetOrdersQuery();

  if (isLoading) {
    return <Loader />;
  }
  //   console.log("data", data);
  //   console.log("orders", data.orders);

  return (
    <View style={s.container}>
      <Text style={s.title}>Личный кабинет</Text>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("PersonalAreaContainer")}
          style={s.baseBtn}
        >
          <Text>Назад</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("MyOrders")}
          style={s.baseBtn}
        >
          <Text>Мои заказы</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={data.orders}
          renderItem={({ item, index }) => {
            return <Order order={item} />;
          }}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    // paddingVertical: 75,
  },
  title: {
    fontSize: 24,
    fontWeight: "regular",
    fontFamily: "Pomidorko",
    marginTop: 20,
    marginBottom: 5,
  },
  blockTitle: {
    fontSize: 21,
    fontWeight: "regular",
    fontFamily: "Pomidorko",
    marginTop: 20,
    marginBottom: 20,
  },
  textInput: {
    width: 280,
    height: 49,
    borderWidth: 1,
    borderColor: "#AD6A75",
    padding: 7,
    paddingLeft: 15,
    marginBottom: 10,
  },
  baseBtn: {
    width: 170,
    height: 49,
    backgroundColor: "#F0E6DD",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  forgotPassword: {
    fontSize: 16,
    fontWeight: "regular",
    marginTop: 10,
  },

  order: {
    borderWidth: 1,
    borderColor: "#AD6A75",
    borderRadius: 7,
    padding: 10,
    width: 320,
    marginBottom: 10,
  },
  orderInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 20,
  },
  orderInner: {
    gap: 10,
  },
  ProductItemInOrder: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  ProductInfo: {
    alignItems: "flex-start",
  },

  productImage: {
    width: 104,
    height: 146,
  },
});
