const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  publicPath: "/recorder-public/",
  css: {
    loaderOptions: {
      stylus: {
        import: ["~@/style/variables.styl", "~@/style/index.styl"]
      }
    }
  },
  chainWebpack: config => {
    config.plugin("html").tap(options => {
      options[0].title = "Assistive Input Recorder";
      return options;
    });
    config
      .plugin("favicon")
      .before("html")
      .use(require("favicons-webpack-plugin"), [
        {
          logo: "@/assets/img/logo.svg",
          cache: true,
          devMode: "webapp",
          prefix: "img/favicon/",
          inject: "force",
          favicons: {
            appName: "Assistive Input Recorder",
            appDescription: "Assistive Input made with Vue.js",
            theme_color: "#abd1b5",
            background: "#68b684",
            appleStatusBarStyle: "black-translucent",
            dir: "auto",
            lang: "en-US",
            version: "1.0",
            display: "standalone",
            orientation: "any",
            start_url: "/recorder-public/",
            icons: {
              android: true,
              appleIcon: true,
              appleStartup: true,
              coast: false,
              favicons: true,
              firefox: true,
              windows: true,
              yandex: false
            }
          }
        }
      ]);
    config.plugin("workbox").use(WorkboxPlugin.GenerateSW, [
      {
        exclude: [/\.map$/, /img\/favicon\//],
        maximumFileSizeToCacheInBytes: 3500000,
        cacheId: "input-recorder",
        importScripts: ["js/skip-waiting.js"],
        clientsClaim: true,
        skipWaiting: false
      }
    ]);
  }
};
