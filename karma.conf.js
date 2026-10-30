const path = require("path");

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "webpack"],
    files: [
      { pattern: "tests/**/*.spec.js", watched: false },
      { pattern: "public/imagenes/**/*", watched: false, included: false, served: true },
    ],
    proxies: {
      "/imagenes/": "/base/public/imagenes/",
    },
    preprocessors: {
      "tests/**/*.spec.js": ["webpack", "sourcemap"],
    },
    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
          "next/link": path.resolve(__dirname, "tests/mocks/nextLinkMock.js"),
          "next/navigation": path.resolve(__dirname, "tests/mocks/nextNavigationMock.js"),
        },
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx|js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  "@babel/preset-env",
                  ["@babel/preset-react", { runtime: "automatic" }],
                  "@babel/preset-typescript",
                ],
                plugins: [["istanbul", { exclude: ["tests/**"] }]],
              },
            },
          },
        ],
      },
    },
    reporters: ["spec", "coverage"],
    coverageReporter: {
      dir: "coverage",
      reporters: [
        { type: "html", subdir: "html" },
        { type: "text-summary" },
      ],
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ["ChromeHeadless"],
    singleRun: true,
    concurrency: Infinity,
  });
};
