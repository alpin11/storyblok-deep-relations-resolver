import path from "path";
import { defineConfig } from "vite";
import { name as libName } from './package.json';


export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "storyblokResolveRelationsDeep",
        fileName: (format) =>
          format === "es" ? `${libName}.mjs` : `${libName}.js`,
      },
      rollupOptions: {
        external: ["react"],
        output: {
          globals: { react: "React" },
        },
      },
    },
  };
});