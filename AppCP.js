import React from "react";
import { StyleSheet, Text, View, WebView } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "ReactNative WebView Sample"
    };

    this.onWebViewMessage = this.onWebViewMessage.bind(this);
  }
  handleDataReceived(msgData) {
    console.log("msgdata", msgData);
    // this.setState({
    //   text2: `Message from web view ${msgData.data}`
    // });
    // msgData.isSuccessfull = true;
    // msgData.args = [msgData.data % 2 ? "green" : "red"];
    // this.myWebView.postMessage(JSON.stringify(msgData));
  }
  onWebViewMessage(event) {
    // post back reply as soon as possible to enable sending the next message
    this.myWebView.postMessage(event.nativeEvent.data);

    let msgData;
    try {
      msgData = JSON.parse(event.nativeEvent.data);
    } catch (err) {
      console.warn(err);
      return;
    }

    // invoke target function
    const response = this[msgData.targetFunc].apply(this, [msgData]);
    // trigger success callback
    msgData.isSuccessfull = true;
    msgData.args = [response];
    this.myWebView.postMessage(JSON.stringify(msgData));
  }
  render() {
    let html = `
    <html>
    <head>
    <link rel="stylesheet" type="text/css" href="http://ws1.postescanada-canadapost.ca/css/addresscomplete-2.00.min.css?key=PN62-AK87-NW16-FE16" />
        <script type="text/javascript" src="http://ws1.postescanada-canadapost.ca/js/addresscomplete-2.00.min.js?key=PN62-AK87-NW16-FE16"></script>

        <script src="form.js"></script>
        <style>
        body {

          flex-direction: row;
          background: azure;
          justify-content: center;
          align-content: center;
      }
      button {
          text-align: center;
          align-self: center;
          width:100%;
          font-size: 150%;
      }
    label {
        color: blue;
        font-family: verdana;
        font-size: 150%;
    }
    input {
        color: blue;
        font-family: verdana;
        font-size: 150%;
        width:100%;
      }
      p  {
        color: red;
        font-family: courier;
        font-size: 150%;
      }
      .pca .pcatext {
        font: 15px Verdana;
        color: #4682b4;
        width:100%;
  }
    </style>

    </head>
    <body>

    <form action = "" method="post">
    <div>
    <label for="street-address">Address</label>
    <input id="street-address" type="text" placeholder="Start typing your address..." autofocus />
    </div>
    
    <br />
    <br />
    <br />
    <div class="input-line">
    <label for="street-address"></label>
    <input id="street-address1" type="text" placeholder="Address Line 1" />
    </div>
    
    <div class="input-line">
    <label for="street-address2"></label>
    <input id="street-address2" type="text" placeholder="Address Line 2" />
    </div>
    
    <div class="input-line">
    <label for="city"></label>
    <input id="city" type="text" placeholder="City" />
    </div>
    
    <div class="input-line">
    <label for="state"></label>
    <input id="state" type="text" placeholder="State/Province" />
    </div>
    
    <div class="input-line">
    <label for="postcode"></label>
    <input id="postcode" type="text" placeholder="Zip/Postcode" />
    </div>
    
    <div class="input-line">
    <label for="country"></label>
    <input id="country" type="text" placeholder="Country" />
    </div>
    
    <input type="submit" value="Submit">

    <div id="container">
    <button id="button" onclick="clickHandler();" >Send to RN</button>
    </div>
    </form>
    
    </body>
    </html>
    `;
    let jsCode = `
    
    var fields = [
      { element: "street-address", field: "Line1", mode: pca.fieldMode.DEFAULT },
          { element: "street-address1", field: "Line1", mode: pca.fieldMode.POPULATE },
          { element: "street-address2", field: "Line2", mode: pca.fieldMode.POPULATE },
          { element: "city", field: "City", mode: pca.fieldMode.POPULATE },
          { element: "state", field: "ProvinceName", mode: pca.fieldMode.POPULATE },
          { element: "postcode", field: "PostalCode", mode: pca.fieldMode.POPULATE },
          { element: "country", field: "CountryName", mode: pca.fieldMode.COUNTRY }
        ]

        options = {
          key: "PN62-AK87-NW16-FE16",
          autoSearch: true,
          prompt: false,
          setCursor: true,
          setCountryByIP: true,
          culture: "en-ca",
          languagePreference: "eng"
        }

        control = new pca.Address(fields, options);

        window.counter = 5;
    function clickHandler() {
		window.counter++;
        window.webViewBridge.send('handleDataReceived', window.counter, function(res) {
            window.document.getElementById("button").setAttribute("style", "background-color: " + res);
        }, function(err) {
			window.document.getElementById("container").setAttribute("style", "background-color: " + err);
        });
    }
    `;
    console.log("ok");
    return (
      <View style={styles.container}>
        <WebView
          ref={webview => {
            this.myWebView = webview;
          }}
          source={{ html }}
          // source={require('./form.html')}
          style={styles.webView}
          injectedJavaScript={jsCode}
          // injectedJavaScript={require('./form.js')}
          automaticallyAdjustContentInsets={true}
          // onMessage={this.onWebViewMessage}
          onMessage={event => console.log("clicked", event.nativeEvent.data)}
        />
        {/* <Text>Open up App.js to start working on your app!</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50
  },
  webView: {
    backgroundColor: "blue",
    height: 350,
    width: 350
  }
});
