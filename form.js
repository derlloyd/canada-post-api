var fields = [
  { element: "street-address", field: "Line1", mode: pca.fieldMode.DEFAULT },
  { element: "street-address1", field: "Line1", mode: pca.fieldMode.POPULATE },
  { element: "street-address2", field: "Line2", mode: pca.fieldMode.POPULATE },
  { element: "city", field: "City", mode: pca.fieldMode.POPULATE },
  { element: "state", field: "ProvinceName", mode: pca.fieldMode.POPULATE },
  { element: "postcode", field: "PostalCode", mode: pca.fieldMode.POPULATE },
  { element: "country", field: "CountryName", mode: pca.fieldMode.COUNTRY }
];

options = {
  key: "PN62-AK87-NW16-FE16",
  autoSearch: true,
  prompt: false,
  setCursor: true,
  setCountryByIP: true,
  culture: "en-ca",
  languagePreference: "eng"
};

control = new pca.Address(fields, options);

window.counter = 5;

function clickHandler() {
  window.counter++;
  window.webViewBridge.send(
    "handleDataReceived",
    window.counter,
    function(res) {
      window.document
        .getElementById("button")
        .setAttribute("style", "background-color: " + res);
    },
    function(err) {
      window.document
        .getElementById("container")
        .setAttribute("style", "background-color: " + err);
    }
  );
}

window.webViewBridge = {
  /**
   * send message to the React-Native WebView onMessage handler
   * @param targetFunc - name of the function to invoke on the React-Native side
   * @param data - data to pass
   * @param success - success callback
   * @param error - error callback
   */
  send: function(targetFunc, data, success, error) {

    var msgObj = {
      targetFunc: targetFunc,
      data: data || {}
    };

    if (success || error) {
      msgObj.msgId = guid();
    }

    var msg = JSON.stringify(msgObj);

    promiseChain = promiseChain.then(function () {
      return new Promise(function (resolve, reject) {
        console.log("sending message " + msgObj.targetFunc);

        if (msgObj.msgId) {
          callbacks[msgObj.msgId] = {
            onsuccess: success,
            onerror: error
          };
        }

        window.postMessage(msg);

        resolve();
      })
    }).catch(function (e) {
      console.error('rnBridge send failed ' + e.message);
    });
  },


};