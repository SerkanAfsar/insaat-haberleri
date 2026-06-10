import { PrismaMssql } from "@prisma/adapter-mssql";
import { PrismaClient } from "./generated/prisma/client";

const config = {
  server: "104.247.162.242",
  port: 55548,
  database: "serkanaf_dbinsaathaber",
  user: "serkanaf_userinsaat",
  password: "1Q2w3E4r!insaat",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const adapter = new PrismaMssql(config);

export const prisma = new PrismaClient({
  adapter,
});
