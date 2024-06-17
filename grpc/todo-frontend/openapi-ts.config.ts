import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "../todo-backend/openapi.json",
  output: {
    format: "prettier",
    path: "./src/generated",
  },
  services: {
    asClass: true,
    name: "{{name}}Service",
  },
});
