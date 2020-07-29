import React, { Component } from "react";
import { View, Platform, TouchableOpacity, BackHandler } from "react-native";
import { WebView } from "react-native-webview";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default class App extends Component {
  WEBVIEW_REF = React.createRef();

  state = {
    canGoBack: false,
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    if (this.state.canGoBack) {
      this.WEBVIEW_REF.current.goBack();
      return true;
    }
  };

  onNavigationStateChange = (navState) => {
    this.setState({
      canGoBack: navState.canGoBack,
    });
  };

  render() {
    if (Platform.OS === 'ios') {
      return <SafeAreaView
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
      </SafeAreaView>;

    } else {
      return <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#002546",
          justifyContent: "center",
        }}>
          <WebView
          source={{
            uri: "https://international.au.dk/life/studentscomingtoau/auapp/",
          }}
          ref={this.WEBVIEW_REF}
          onNavigationStateChange={this.onNavigationStateChange}
          />
      </SafeAreaView>;
    }
  }
}
