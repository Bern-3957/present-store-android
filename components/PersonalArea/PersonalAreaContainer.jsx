import React from "react";
import { PersonalArea } from "./PersonalArea";
import {
  useAboutMeQuery,
  useLogoutUserMutation,
} from "../../redux/services/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "../../redux/slices/authSlice";
import * as SecureStore from "expo-secure-store";

export const PersonalAreaContainer = ({ navigation }) => {
  const dispatch = useDispatch();
  const [logoutUser, { isError }] = useLogoutUserMutation();
  const userInfo = useSelector((state) => state.user.userInfo);
  const logout = async () => {
    logoutUser();
    if (isError) {
      console.log("Выйти из аккаунта не удалось");
      return;
    }
    dispatch(setIsAuth(false));
    await SecureStore.deleteItemAsync("authToken");
    console.log("Пользователь вышел из аккаунта");
  };
  return (
    <PersonalArea navigation={navigation} userInfo={userInfo} logout={logout} />
  );
};
