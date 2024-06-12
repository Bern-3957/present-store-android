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
import Checkbox from "expo-checkbox";
import { useForm, Controller } from "react-hook-form";
import * as SecureStore from "expo-secure-store";
import {
  useAboutMeQuery,
  useAuthUserMutation,
  useRegUserMutation,
} from "../../redux/services/userApi";
import Loader from "../Loader/Loader";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../redux/slices/authSlice";
import { setUserInfo } from "../../redux/slices/userSlice";

export const RegForm = () => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    control,
  } = useForm();
  const dispatch = useDispatch();
  const [loginUser] = useAuthUserMutation();
  const { refetch: aboutMeRefetch } = useAboutMeQuery();

  const [regUser, { isLoading, isSuccess, isError, data, error }] =
    useRegUserMutation();

  const onSubmit = async (data) => {
    try {
      const result = await regUser({ ...data });
      if (result) {
        const response = await loginUser({
          username: data.username,
          password: data.password,
        }).unwrap();
        await SecureStore.setItemAsync("authToken", response.auth_token);
        const meInfo = await aboutMeRefetch();
        dispatch(setIsAuth(true));
        dispatch(setUserInfo(meInfo.data));
      }
    } catch (error) {
      console.error("-----Error Reg User", error);
    }

    console.log("------------------", data);
  };

  if (isLoading) {
    return <Loader loaderText={"Идет регистрация"} />;
  }

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={s.title}>Регистрация</Text>
      <View style={{ alignItems: "center" }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Имя пользователя"
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
              placeholder="Имя"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={s.textInput}
            />
          )}
          name="first_name"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={s.textInput}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Пароль"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={s.textInput}
            />
          )}
          name="password"
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Адрес"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={s.textInput}
            />
          )}
          name="address"
        />
        <View style={s.checkboxes}>
          <View style={s.checkboxContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  value={value}
                  onValueChange={onChange}
                  style={s.checkbox}
                />
              )}
              name="consentReceiveNews"
            />
            <Text style={s.label}>
              Я соглашаюсь с Положением о персональных данных и
              конфиденциальности.
            </Text>
          </View>
          <View style={s.checkboxContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  value={value}
                  onValueChange={onChange}
                  style={s.checkbox}
                />
              )}
              name="consentPersonalData"
            />
            <Text style={s.label}>
              Согласен(-на) на получение новостной рассылки
            </Text>
          </View>
        </View>

        <TouchableOpacity style={s.authBtn} onPress={handleSubmit(onSubmit)}>
          <Text>Зарегистрироваться</Text>
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

  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    width: 250,
  },
  checkbox: {
    marginRight: 10,
  },
});
