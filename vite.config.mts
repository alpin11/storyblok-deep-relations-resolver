import { defineConfig } from "vite";
import { name as libName } from './package.json';
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "storyblokResolveRelationsDeep",
      formats: ['es', 'cjs'],
      fileName: libName,
    }
  },
  plugins: [dts()],
});