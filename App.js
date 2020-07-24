import React, { Component } from "react";
import { BackHandler,StatusBar } from "react-native";
import { WebView } from "react-native-webview";

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
    return <>
      <StatusBar hidden={false} />
      <WebView
        source={{ uri: "https://international.au.dk/life/studentscomingtoau/auapp/" }}
        ref={this.WEBVIEW_REF}
        onNavigationStateChange={this.onNavigationStateChange}
        style={{ marginTop: 10 }} />
     </>
  }
}