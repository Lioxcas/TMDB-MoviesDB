import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env.API_KEY": JSON.stringify(process.env.API_KEY),
  },
  plugins: [react()],
});
