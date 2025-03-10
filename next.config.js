const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  cssModules: true,
});
const withTM = require("next-transpile-modules")([
  "@amcharts/amcharts5",
  "@amcharts/amcharts5/themes/Animated",
  "@amcharts/amcharts5/xy",
]);
const withPlugins = require("next-compose-plugins");
module.exports = withPlugins([withTM], {
  // exportTrailingSlash: true,
  env: {
    // baseUrl: "https://dev-api.africanproverbs.com/munaapi/",
    // imageBaseUrl: "https://dev-api.africanproverbs.com",

    baseUrl: "https://api.africanproverbs.com/munaapi/",
    imageBaseUrl: "https://api.africanproverbs.com",

    // baseUrl: 'http://127.0.0.1:8885/',
    // imageBaseUrl: 'http://127.0.0.1:8885',

    tokenName: "Muna-nRpfanqsQC",

    // projectURL: "https://dev-admin.africanproverbs.com/dashboard",
    // appBaseUrl: "https://dev-admin.africanproverbs.com/",

    // projectURL: "http://localhost:8000/dashboard",
    // appBaseUrl: "http://localhost:8000",

    projectURL: "https://admin.africanproverbs.com/dashboard",
    appBaseUrl: "https://admin.africanproverbs.com",
  },
  trailingSlash: true,
  pageDataCollectionTimeout: 5000000000,
});
