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
  ScrollView,
} from "react-native";
import { baseURL } from "../../constants/constants";

// const ProductItemInOrder = ({ productItem }) => {
//   return (
//     <View style={s.ProductItemInOrder}>
//       <Image
//         style={s.productImage}
//         source={{
//           uri: `${baseURL}${productItem.product.images[0].image}`,
//         }}
//       />
//       <View style={s.ProductInfo}>
//         <Text style={{ fontSize: 18, marginBottom: 20 }}>
//           {productItem.product.title}
//         </Text>
//         <Text style={{}}>Цена: {productItem.product.price}₽</Text>
//         <Text style={{}}>Арт. {productItem.product.vendor_code}</Text>
//       </View>
//     </View>
//   );
// };

const CartItem = ({ cartItem, deleteCart, changeCartItemQuantity }) => {
  return (
    <View style={s.order}>
      {/* <Text>{order.final_cost}рублей</Text> */}
      <Image
        style={s.productImage}
        source={{
          uri: `${baseURL}${cartItem.product_details.images[0].image}`,
        }}
      />

      <View style={s.orderInfo}>
        <Text
          style={{
            fontFamily: "Pomidorko",
            fontSize: 20,
            marginBottom: 10,
            width: 145,
          }}
        >
          {cartItem.product_details.title?.length < 30
            ? cartItem.product_details.title
            : cartItem.product_details.title.substring(0, 13) + "..."}
        </Text>
        <Text style={{ color: "#6B6B6B", fontSize: 12, marginBottom: 10 }}>
          арт. {cartItem.product_details.vendor_code}
        </Text>
        <View style={s.changeQuantityInner}>
          <TouchableOpacity
            onPress={() => {
              if (cartItem.quantity < 2) {
                deleteCart(cartItem.id);
              } else {
                return changeCartItemQuantity({
                  cart_id: cartItem.id,
                  quantity: cartItem.quantity - 1,
                });
              }
            }}
            style={s.changeQuantity}
          >
            <View style={s.minus}></View>
          </TouchableOpacity>
          <Text>{cartItem.quantity}</Text>
          <TouchableOpacity
            onPress={() =>
              changeCartItemQuantity({
                cart_id: cartItem.id,
                quantity: cartItem.quantity + 1,
              })
            }
            style={s.changeQuantity}
          >
            <View style={s.minus}></View>
            <View style={s.plus}></View>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: "Pomidorko",
            fontSize: 20,
            marginBottom: 10,
            color: "#464646",
          }}
        >
          {cartItem.product_details.price} ₽
        </Text>
      </View>

      <TouchableOpacity
        style={s.deleteIconBtn}
        onPress={() => deleteCart(cartItem.id)}
      >
        <Image
          style={{ width: 16, height: 16 }}
          source={require("./../../assets/cart/deleteIcon.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const CartSummary = ({
  money,
  navigation,
  sendOrderDataToServer,
  isMakeIrderSuccess,
}) => (
  <View style={{ alignItems: "center" }}>
    <View style={s.money}>
      <Text style={s.moneyItem}>Стоимость товаров: {money.productsCost} ₽</Text>
      <Text style={s.moneyItem}>Ваша скидка: {money.discount} ₽</Text>
      <Text style={s.moneyItem}>
        Стоимость доставки: {money.deliveryCost} ₽
      </Text>
      <Text style={s.totalPrice}>Итого к оплате: {money.finalCost} ₽</Text>
    </View>
    <TouchableOpacity
      style={s.baseBtn}
      onPress={() =>
        navigation.navigate("MakeAnOrder", {
          sendOrderDataToServer,
          isMakeIrderSuccess,
        })
      }
    >
      <Text>Оформить заказ</Text>
    </TouchableOpacity>
  </View>
);

export const Cart = (props) => {
  return (
    <View style={s.container}>
      <Text style={s.title}>Корзина</Text>
      {/* <Button
        onPress={() => props.refetchCetCartsQuery()}
        title="Обновить корзину"
      ></Button> */}

      <View style={{ flex: 1 }}>
        {props.carts.length > 0 ? (
          <FlatList
            data={props.carts}
            renderItem={({ item, index }) => {
              return (
                <CartItem
                  changeCartItemQuantity={props.changeCartItemQuantity}
                  deleteCart={props.deleteCart}
                  cartItem={item}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() =>
              props.carts.length > 0 && (
                <CartSummary
                  money={props.money}
                  navigation={props.navigation}
                  sendOrderDataToServer={props.sendOrderDataToServer}
                  isMakeIrderSuccess={props.isMakeIrderSuccess}
                />
              )
            }
          />
        ) : (
          <Text>Корзина пуста</Text>
        )}
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
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "regular",
    fontFamily: "Pomidorko",
    marginTop: 20,
    marginBottom: 15,
  },
  blockTitle: {
    fontSize: 21,
    fontWeight: "regular",
    fontFamily: "Pomidorko",
    marginTop: 20,
    marginBottom: 20,
  },
  money: {
    backgroundColor: "#F0E6DD",
    padding: 10,
    width: 320,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "regular",
    fontFamily: "Pomidorko",
    marginTop: 5,
    marginBottom: 5,
    color: "#464646",
  },
  moneyItem: {
    fontSize: 16,
    fontWeight: "regular",
    color: "#6B6B6B",
    marginTop: 1,
    marginBottom: 1,
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
  order: {
    borderWidth: 1,
    borderColor: "#AD6A75",
    borderRadius: 7,
    padding: 10,
    width: 320,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderInfo: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
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

  deleteIconBtn: {
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: "#AD6A75",
    justifyContent: "center",
    alignItems: "center",
  },
  changeQuantityInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
  },
  changeQuantity: {
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: "#464646",
    justifyContent: "center",
    alignItems: "center",
  },
  minus: {
    width: 12,
    height: 1.5,
    backgroundColor: "white",
  },
  plus: {
    width: 1.5,
    height: 12,
    backgroundColor: "white",
    position: "absolute",
  },
});
