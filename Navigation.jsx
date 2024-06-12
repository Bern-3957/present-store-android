import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PrCatalog } from "./components/PrCatalog/PrCatalog";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Auth } from "./components/Auth-Reg/Auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Stack = createNativeStackNavigator();
import { Cart } from "./components/Cart/Cart";
const Tab = createBottomTabNavigator();
import * as SecureStore from "expo-secure-store";
import Ionicons from "react-native-vector-icons/Ionicons";

import * as Animatable from "react-native-animatable";
import { PersonalAreaContainer } from "./components/PersonalArea/PersonalAreaContainer";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "./redux/slices/authSlice";
import { MyOrders } from "./components/PersonalArea/MyOrders/MyOrders";
import { useAboutMeQuery } from "./redux/services/userApi";
import { setUserInfo } from "./redux/slices/userSlice";
import { CartContainer } from "./components/Cart/CartContainer";
import { MakeAnOrder } from "./components/Cart/MakeAnOrder";

const Icon = ({ type, name, color, size = 24, style }) => {
  const fontSize = 24;
  const Tag = type;
  return (
    <>
      {type && name && (
        <Tag name={name} size={size || fontSize} color={color} style={style} />
      )}
    </>
  );
};

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0.5, rotate: "0deg" },
        1: { scale: 1.5, rotate: "360deg" },
      });
    } else {
      viewRef.current.animate({
        0: { scale: 1.5, rotate: "360deg" },
        1: { scale: 1, rotate: "0deg" },
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { top: 0 }]}
    >
      <Animatable.View ref={viewRef} duration={1000}>
        <Icon
          type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? "#637aff" : "#637aff99"}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
  },
});

const UserNavigator = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <Stack.Navigator>
      {!isAuth ? (
        <Stack.Screen
          name="auth"
          component={Auth}
          options={{ title: "Авторизация", headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="PersonalAreaContainer"
            component={PersonalAreaContainer}
            options={{ title: "Личный кабинет", headerShown: false }}
          />
          <Stack.Screen
            name="MyOrders"
            component={MyOrders}
            options={{ title: "Мои заказы", headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const CartNavigator = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="cart_list"
        component={CartContainer}
        options={{ title: "Личный кабинет", headerShown: false }}
      />
      <Stack.Screen
        name="MakeAnOrder"
        component={MakeAnOrder}
        options={{ title: "Оформление заказа", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export const Navigation = () => {
  const dispatch = useDispatch();

  const authUser = () => {
    try {
      const authToken = SecureStore.getItem("authToken");
      if (authToken) {
        console.log("authTokkken : ", authToken);
        dispatch(setIsAuth(true));
        const { data, isError } = useAboutMeQuery();
        dispatch(setUserInfo(data));
      }
    } catch {
      console.log("User not auth");
    }
  };
  authUser();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            margin: 16,
            borderRadius: 20,
            height: 60,
          },
        }}
      >
        <Tab.Screen
          name="bag-handle"
          component={PrCatalog}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons size={34} color="black" name="bag-handle"></Ionicons>
            ),
          }}
        />
        <Tab.Screen
          name="cart"
          component={CartNavigator}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons size={34} color="black" name="cart"></Ionicons>
            ),
          }}
        />
        <Tab.Screen
          name="person"
          component={UserNavigator}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons size={34} color="black" name="person"></Ionicons>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
