import React, { Component } from "react";
import { StyleSheet, Text, View, WebView } from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: null
    };
  }

  onWebViewMessage = event => {
    let address;
    try {
      address = JSON.parse(event.nativeEvent.data);
    } catch (err) {
      console.warn(err);
      return;
    }
    console.log("Received from webview", address);

    this.setState({ address });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.webViewContainer}>

          <WebView
            ref={webview => {
              this.myWebView = webview;
            }}
            source={require("./webview/index.html")}
            onMessage={this.onWebViewMessage}
            />
        </View>

        {this.state.address && (
          <View style={styles.addressContainer}>
            <Text>{this.state.address.street}</Text>
            <Text>{this.state.address.street2}</Text>
            <Text>{this.state.address.city}</Text>
            <Text>{this.state.address.prov}</Text>
            <Text>{this.state.address.postcode}</Text>
            <Text>{this.state.address.country}</Text>
          </View>
        )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addressContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  webViewContainer: {
    flex: 3
  }
});
