import React, { Component } from "react";
import { View, Platform, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default class App extends Component {
  WEBVIEW_REF = React.createRef();

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#002546",
          justifyContent: "center",
        }}
      >
        <StatusBar style="light" />
        <WebView
          source={{
            uri: "https://international.au.dk/life/studentscomingtoau/auapp/",
          }}
          ref={this.WEBVIEW_REF}
        />
        <View
          style={{
            flex: 0.05,
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingTop: 5,
          }}
        >
          <TouchableOpacity onPress={() => this.WEBVIEW_REF.current.goBack()}>
            <Ionicons
              name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
              size={32}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.WEBVIEW_REF.current.reload()}>
            <Ionicons
              name={Platform.OS === "ios" ? "ios-refresh" : "md-refresh"}
              size={32}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
