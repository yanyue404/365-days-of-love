import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";

export default defineConfig({
  base: "/365-days-of-love/",
  plugins: [createVuePlugin()],
});
