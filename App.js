import React, { Component } from "react";
import { StyleSheet, Text, View, WebView } from "react-native";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: null,
      // street: null,
      // stree2: null,
      // city: null,
      // prov: null,
      // postcode: null,
      // country: null,
    };

    // this.onWebViewMessage = this.onWebViewMessage.bind(this);
  }

  // handleDataReceived(msgData) {
  //   this.setState({
  //     text2: `Message from web view ${msgData.data}`
  //   });
  //   msgData.isSuccessfull = true;
  //   msgData.args = [msgData.data % 2 ? "green" : "red"];
  //   this.myWebView.postMessage(JSON.stringify(msgData));
  // }

  onWebViewMessage = (event) => {
    
    let address;
    try {
      address = JSON.parse(event.nativeEvent.data);
    } catch (err) {
      console.warn(err);
      return;
    }
    console.log("Message received from webview", address);
    
    this.setState({ address });
    // switch (msgData.targetFunc) {
    //   case "handleDataReceived":
    //     this[msgData.targetFunc].apply(this, [msgData]);
    //     break;
    // }
  }

  render() {
    // let jsCode = `
    // var fields = [
    //   { element: "street-address", field: "Line1", mode: pca.fieldMode.DEFAULT },
    //       { element: "street-address1", field: "Line1", mode: pca.fieldMode.POPULATE },
    //       { element: "street-address2", field: "Line2", mode: pca.fieldMode.POPULATE },
    //       { element: "city", field: "City", mode: pca.fieldMode.POPULATE },
    //       { element: "state", field: "ProvinceName", mode: pca.fieldMode.POPULATE },
    //       { element: "postcode", field: "PostalCode", mode: pca.fieldMode.POPULATE },
    //       { element: "country", field: "CountryName", mode: pca.fieldMode.COUNTRY }
    //     ]

    //     options = {
    //       key: "PN62-AK87-NW16-FE16",
    //       autoSearch: true,
    //       prompt: false,
    //       setCursor: true,
    //       setCountryByIP: true,
    //       culture: "en-ca",
    //       languagePreference: "eng"
    //     }

    //     control = new pca.Address(fields, options);

    // }
    // `;
    return (
      <View style={styles.container}>
        {/* <Text style={styles.welcome}>{this.state.text}</Text>
        <Text style={styles.welcome}>{this.state.text2}</Text> */}
        {/* <View style={styles.webViewContainer}> */}
        {this.state.address && 
        <Text>{this.state.address.postcode}</Text>}
          <WebView
            ref={webview => {
              this.myWebView = webview;
            }}
            // scrollEnabled={false}
            // injectedJavaScript={jsCode}
            // automaticallyAdjustContentInsets={true}
            source={require("./webview/index.html")}
            onMessage={this.onWebViewMessage}
          />
        {/* </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center"
  },
  // welcome: {
  //   flex: 1,
  //   paddingTop: 20,
  //   fontSize: 20,
  //   textAlign: "center",
  //   backgroundColor: "skyblue"
  // },
  webViewContainer: {
    flex: 1
  }
});