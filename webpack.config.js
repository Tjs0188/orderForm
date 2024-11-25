import path from "path";
import { fileURLToPath } from "url";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

// Get __dirname equivalent in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine the mode based on the environment variable
const isProduction = process.env.NODE_ENV === "production";
const mode = isProduction ? "production" : "development";

export default {
  entry: {
    orderForm: "./src/assets/orderForm.js", // Entry point for orderForm.js
    string: "./src/assets/string.js", // Entry point for another file
    preline: "./src/assets/preline.js", // Entry point for preline.js
    templateModal: "./src/assets/templateModal.js", // Entry point for templateModal.js
    tableActions: "./src/assets/tableActions.js", // Entry point for tableActions.js
    packageForms: "./src/assets/packageForms.js", // Entry point for packageForms.js
    style: "./src/assets/styles/tailwind.css", // Entry point for styles.css
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
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/[name].css", // Output CSS files to a different directory
    }),
  ],
  devtool: isProduction ? false : "inline-source-map", // Conditionally enable source maps
  mode,
};
