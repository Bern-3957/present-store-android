import React from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import {
  useAuthUserMutation,
  useAboutMeQuery,
} from "../../redux/services/userApi";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../redux/slices/authSlice";
import { setUserInfo } from "../../redux/slices/userSlice";

export const AuthForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const [loginUser] = useAuthUserMutation();
  const { refetch: aboutMeRefetch } = useAboutMeQuery();
  const dispatch = useDispatch();

  const onSubmit = async ({ username, password }) => {
    try {
      const response = await loginUser({ username, password }).unwrap();
      SecureStore.setItem("authToken", response.auth_token);
      const meInfo = await aboutMeRefetch();
      // dispatch(setUserInfo(meInfo.data));
      dispatch(setIsAuth(true));
      dispatch(setUserInfo(meInfo.data));
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={s.title}>Авторизация</Text>
      <View style={{ alignItems: "center" }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={s.textInput}
            />
          )}
          name="username"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={s.textInput}
            />
          )}
          name="password"
        />

        <TouchableOpacity style={s.authBtn} onPress={handleSubmit(onSubmit)}>
          <Text>Войти</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.forgotPassword}>
          <Text>Забыли пароль?</Text>
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
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
    marginBottom: 10,
  },
  authBtn: {
    width: 280,
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
});
