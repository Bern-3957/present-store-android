import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useChangeUserInfoOnServerMutation } from "../../redux/services/userApi";
import { changeUserInfo } from "../../redux/slices/userSlice";

export const PersonalArea = (props) => {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm();
  const dispatch = useDispatch();
  const [changeUserInfoOnServer, { isError }] =
    useChangeUserInfoOnServerMutation();

  const handleSaveChanges = () => {
    try {
      changeUserInfoOnServer(props.userInfo);
    } catch {
      console.log(isError);
    }
  };

  const changeUserInfoOnState = (name, value) => {
    console.log(name, " ", value);
    dispatch(changeUserInfo({ [name]: value }));
  };

  const printUserInfo = () => {
    console.log("UserInfo--------------: ", props.userInfo);
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={s.title}>Личный кабинет</Text>
      {/* <Button
        onPress={() => printUserInfo()}
        title="Напечатать данные пользователя"
      ></Button> */}
      <View style={{ flexDirection: "row", gap: 20 }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("MyOrders")}
          style={s.baseBtn}
        >
          <Text>Мои заказы</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={s.blockTitle}>Контактные данные</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Имя"
              onBlur={onBlur}
              onChangeText={(value) =>
                changeUserInfoOnState("first_name", value)
              }
              value={props.userInfo.first_name}
              style={s.textInput}
            />
          )}
          name="first_name"
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Почта"
              onBlur={onBlur}
              onChangeText={(value) => changeUserInfoOnState("email", value)}
              value={props.userInfo.email}
              style={s.textInput}
            />
          )}
          name="email"
        />
      </View>
      <View>
        <Text style={s.blockTitle}>Данные для входа</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Имя пользователя"
              onBlur={onBlur}
              // onChangeText={(value) => changeUserInfoOnState("username", value)}
              editable={false}
              value={props.userInfo.username}
              style={s.textInput}
            />
          )}
          name="username"
        />
      </View>
      <View>
        <Text style={s.blockTitle}>Адрес доставки</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder=""
              onBlur={onBlur}
              onChangeText={(value) => changeUserInfoOnState("address", value)}
              value={props.userInfo.address}
              style={s.textInput}
            />
          )}
          name="address"
        />
      </View>

      <TouchableOpacity
        style={s.baseBtn}
        onPress={handleSubmit(handleSaveChanges)}
      >
        <Text>Сохранить изменения</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.logout()} style={s.forgotPassword}>
        <Text>Выйти</Text>
      </TouchableOpacity>
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
    textDecorationLine: "none",
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
});
