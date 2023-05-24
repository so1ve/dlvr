import { defineConfig } from "mini-cz";
import configDefault from "@mini-cz/config-default";

export default defineConfig({
  ...configDefault,
  scopes: ["github", "npm", "minify"],
});
