import React, { useEffect, useState } from "react";
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
  Modal,
} from "react-native";

export const MakeAnOrder = (props) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      deliveryMethod: "courier",
    },
  });
  const [addressType, setAddressType] = useState("toAddress");
  const deliveryMethod = watch("deliveryMethod");

  const { sendOrderDataToServer, isMakeOrderSuccess } = props.route.params;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isMakeOrderSuccess === "true" || isMakeOrderSuccess === "false") {
      setModalVisible(true);
    }
  }, [isMakeOrderSuccess]);

  const handleMakeAnOrder = (data) => {
    console.log(data);
    sendOrderDataToServer(data);
  };

  return (
    <View style={s.container}>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
      >
        <View style={s.modalContainer}>
          <View style={s.modal}>
            <TouchableOpacity
              style={s.x_image_wrapper}
              onPress={() => setModalVisible(false)}
            >
              <Image
                style={s.x_image}
                source={require("./../../assets/icons/Modal/x.png")}
              />
            </TouchableOpacity>
            {isMakeOrderSuccess === "true" ? (
              <Text style={s.modalText}>
                Заказ успешно создан, но не оплачен! В ближайшее время с вами
                свяжется менеджер.
              </Text>
            ) : (
              <Text style={s.modalText}>
                Не удалось создать заказ. Попробуйте еще раз.
              </Text>
            )}
          </View>
        </View>
      </Modal>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={s.title}>Оформление заказа</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("cart_list")}
          style={s.baseBtn}
        >
          <Text>Назад</Text>
        </TouchableOpacity>

        <View>
          <View>
            <Text style={s.blockTitle}>Контактные данные</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Имя"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={s.textInput}
                  value={value || ""}
                />
              )}
              name="name"
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Номер телефона"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value || ""}
                  style={s.textInput}
                />
              )}
              name="phone_number"
            />
          </View>
          <View>
            <Text style={s.blockTitle}>Способ получения</Text>
            <Controller
              name="order_receive_method"
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableOpacity
                    style={s.option}
                    onPress={() => onChange("courier")}
                  >
                    <View style={s.radio}>
                      {value === "courier" && (
                        <View style={s.radioSelected}></View>
                      )}
                    </View>

                    <Text>Доставка курьером по Москве</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={s.option}
                    onPress={() => onChange("sdek")}
                  >
                    <View style={s.radio}>
                      {value === "sdek" && (
                        <View style={s.radioSelected}></View>
                      )}
                    </View>

                    <Text>Доставка СДЭК</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={s.option}
                    onPress={() => onChange("pickup")}
                  >
                    <View style={s.radio}>
                      {value === "pickup" && (
                        <View style={s.radioSelected}></View>
                      )}
                    </View>

                    <Text>Самовывоз</Text>
                  </TouchableOpacity>
                </>
              )}
            />
          </View>
          <View>
            <Text style={s.blockTitle}>Адрес доставки</Text>
            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, value, onBlur } }) => (
                <View>
                  <TextInput
                    placeholder="Адрес"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value || ""}
                    style={s.textInput}
                  />
                </View>
              )}
            />
          </View>
          <View>
            <Text style={s.blockTitle}>Комментарий к заказу</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Комментарий к заказу"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value || ""}
                  style={s.commentInput}
                  multiline={true}
                />
              )}
              name="comments_on_the_order"
            />
          </View>
        </View>

        <TouchableOpacity
          style={s.baseBtn}
          onPress={handleSubmit(handleMakeAnOrder)}
        >
          <Text>Оформить заказ</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "regular",
    fontFamily: "Pomidorko",
    marginTop: 20,
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modal: {
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 3,
    position: "relative",
  },
  x_image_wrapper: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  x_image: {
    width: 30,
    height: 30,
  },
  modalText: {
    fontFamily: "Pomidorko",
    fontSize: 21,
    textAlign: "center",
  },
  blockTitle: {
    fontSize: 21,
    fontWeight: "regular",
    fontFamily: "Pomidorko",
    marginTop: 20,
    marginBottom: 20,
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
  commentInput: {
    width: 280,
    height: 100,
    borderWidth: 1,
    borderColor: "#AD6A75",
    padding: 7,
    paddingLeft: 15,
    marginBottom: 10,
    textDecorationLine: "none",
    textAlignVertical: "top",
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

  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radio: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#c42",
  },
  optionText: {
    fontSize: 16,
  },
  submitButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#c42",
    alignItems: "center",
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
