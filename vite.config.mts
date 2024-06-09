import path from "path";
import { defineConfig } from "vite";
import { name as libName } from './package.json';
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "storyblokResolveRelationsDeep",
      formats: ['es'],
      fileName: libName,
    }
  },
});