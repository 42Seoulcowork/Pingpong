import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  // server: {
  //   port: 8080, // port 바꾸고 싶을 때 사용
  //   hot: true,
  // },
});
