import React from "react";
import {
  StatusBar,
  FlatList,
  ScrollView,
  Text,
  Alert,
  View,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { baseURL } from "../../../constants/constants";

const ProductItem = (props) => {
  const imafeUrl = `${baseURL}${props.product.images[0].image}`;
  return (
    <TouchableWithoutFeedback>
      <View style={s.productItem}>
        <Image
          style={s.productImage}
          source={{
            uri: `${baseURL}${props.product.images[0].image}`,
          }}
        />
        <View style={s.productInfo}>
          <Text style={s.vendoreCode}>{props.product.vendor_code}</Text>
          <Text style={s.productTitle}>{props.product.title}</Text>
          <Text style={s.productPrice}>{props.product.price}</Text>
        </View>

        {props.carts.find(
          (cart_item) => cart_item.product_details.id === props.product.id
        ) ? (
          <TouchableOpacity
            style={s.addProductToBasketBtnInCart}
            onPress={() => props.navigation.navigate("cart")}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              В корзину
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={s.addProductToBasketBtn}
            onPress={() => props.addNewCart(props.product.id)}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              В корзину
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export const Products = (props) => {
  const printAuthToken = () => {
    const authToken = SecureStore.getItem("authToken");
    console.log("auth-token", authToken);
  };

  return (
    <View style={s.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={s.title}>Товары</Text>
        {/* <Button
          onPress={() => props.handleRefresh()}
          title="Обновить данные"
        ></Button>
        <Button
          onPress={() => printAuthToken()}
          title="Напечатать токен"
        ></Button> */}
      </View>
      {/*<ScrollView style={s.productInner} showsVerticalScrollIndicator={false}>*/}
      <FlatList
        data={props.products}
        renderItem={({ item, index }) => {
          return (
            <ProductItem
              navigation={props.navigation}
              carts={props.carts}
              addNewCart={props.addNewCart}
              product={item}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
      {/*</ScrollView>*/}

      <StatusBar style="auto" />
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  productInner: {
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // flexWrap: 'wrap',
  },

  productItem: {
    width: 150,
    margin: 10,
  },
  productImage: {
    width: 130,
    height: 180,
  },
  productInfo: {},
  vendoreCode: {
    fontSize: 12,
  },
  productTitle: {
    fontFamily: "Pomidorko",
  },
  productPrice: {
    fontFamily: "Pomidorko",
  },
  addProductToBasketBtn: {
    marginTop: 10,
    width: 130,
    height: 36,
    backgroundColor: "#AD6A75",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#AD6A75",
    justifyContent: "center",
  },
  addProductToBasketBtnInCart: {
    marginTop: 10,
    width: 130,
    height: 36,
    backgroundColor: "#3bdbee",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#3bdbee",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "regular",
    fontFamily: "Pomidorko",
    marginTop: 20,
    marginBottom: 15,
  },
});
