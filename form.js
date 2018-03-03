document.querySelector("#myContent").style.backgroundColor = "red";
var fields = [
  { element: "street-address", field: "Line1", mode: pca.fieldMode.DEFAULT },
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
