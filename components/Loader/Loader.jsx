import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import loader from "./../../assets/loader.gif";

const s = StyleSheet.create({
  LoaderView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  LoaderCont: {
    width: 43,
    height: 43,
    borderRadius: 30,
    overflow: "hidden",
  },
  LoaderGif: {
    width: 43,
    height: 43,
  },
});

const Loader = (props) => {
  return (
    <View style={s.LoaderView}>
      <View style={s.LoaderCont}>
        <Image style={s.LoaderGif} source={loader} />
        {props.loaderText ? <Text>props.loaderText</Text> : <Text></Text>}
      </View>
    </View>
  );
};

export default Loader;
