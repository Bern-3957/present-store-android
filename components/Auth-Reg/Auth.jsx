import React, { useState } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AuthForm } from "./AuthForm";
import { RegForm } from "./RegForm";

export const Auth = () => {
  const [currentForm, setCurrentForm] = useState("auth");

  return (
    <View style={[s.container, { padding: 15 }]}>
      <Image
        style={s.logo}
        source={require("./../../assets/icons/Auth-Reg/logo.png")}
      />
      <View style={{ flexDirection: "row", gap: 20 }}>
        <TouchableOpacity
          onPress={() => setCurrentForm("auth")}
          style={s.authBtn}
        >
          <Text>Войти</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentForm("reg")}
          style={s.regBtn}
        >
          <Text>Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>
      {currentForm === "auth" ? <AuthForm /> : <RegForm />}
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
  logo: {
    width: 140,
    height: 44,
    marginBottom: 20,
  },
  authBtn: {
    width: 96,
    height: 49,
    backgroundColor: "#F0E6DD",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  regBtn: {
    width: 180,
    height: 49,
    backgroundColor: "#F0E6DD",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
