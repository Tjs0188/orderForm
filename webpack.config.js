import { watch } from "browser-sync";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: {
    orderForm: "./src/orderForm.js", // Entry point for orderForm.js
    string: "./src/string.js", // Entry point for another file
    preline: "./src/preline.js", // Entry point for preline.js
    templateModal: "./src/templateModal.js", // Entry point for templateModal.js
  },
  output: {
    filename: "[name].bundle.js", // Output filename pattern
    path: path.resolve(__dirname, "public/js"), // Output directory for bundled files
    publicPath: "/js/", // Public path for the output files
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  devtool: "inline-source-map", // Enable source maps for easier debugging
  watch: true, // Enable watch mode
  mode: "development", // Set the mode to development
};
