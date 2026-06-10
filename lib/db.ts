import { PrismaMssql } from "@prisma/adapter-mssql";
import { PrismaClient } from "@prisma/client";

const config = {
  server: "localhost",
  port: 1433,
  database: "db_InsaatHaberleri",
  user: "sa",
  password: "1Q2w3E4r!",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const adapter = new PrismaMssql(config);

export const prisma = new PrismaClient({
  adapter,
});
