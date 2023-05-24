import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import svgLoader from "@andylacko/vite-svg-react-loader";
import dotenv from "dotenv";

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env.API_KEY": JSON.stringify(process.env.API_KEY),
    "process.env.ACCESS": JSON.stringify(process.env.ACCESS),
  },
  plugins: [
    react(),
    svgr({
      exportAsDefault: false,
    }),
  ],
  build: {
    assetsInclude: ["**/*.png", "**/*.jpg", "**/*.svg"],
  },
});
