import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  // Standard migrations for postgres
  migrations: {
    path: "prisma/migrations",
  },
});
