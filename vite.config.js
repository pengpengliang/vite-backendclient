/*
 * @Date: 2021-03-16 16:49:27
 * @Author: liangzhanpeng
 * @LastEditors: liangzhanpeng
 */
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],

  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
