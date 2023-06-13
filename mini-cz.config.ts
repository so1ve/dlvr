import configDefault from "@mini-cz/config-default";
import { defineConfig } from "mini-cz";

export default defineConfig({
  ...configDefault,
  scopes: ["github", "npm", "minify"],
});
