module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: "/",
  chainWebpack: (config) => {
    config.plugins.delete("prefetch");
  },
  css: {
    extract: true,
  },
  devServer: {
    // host:'0.0.0.0',
    // port:8080,
    disableHostCheck: true
  }
};
