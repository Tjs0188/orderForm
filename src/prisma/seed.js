import { PrismaClient } from "@prisma/client";
import fs from "fs";
import csv from "csv-parser";
import logger from "./config/logger.js";

const prisma = new PrismaClient();

async function seedItems() {
  const items = [];

  fs.createReadStream("prisma/csv/items.csv")
    .pipe(csv())
    .on("data", (row) => {
      items.push({
        id: Number(row.id),
        category: row.category,
        product_number: row.product_number,
        description: row.description,
      });
    })
    .on("end", async () => {
      logger.info("Seeding items...");
      for (const item of items) {
        try {
          await prisma.item.upsert({
            where: { id: item.id },
            update: item,
            create: item,
          });
        } catch (error) {
          if (error.code === "P2003") {
            logger.info(`Item has fk issue. Skipping...`);
          } else if (error.code === "P2002") {
            logger.info(`Item is a duplicate. Skipping...`);
          } else {
            throw error;
          }
        }
      }
      logger.info("Items seeded successfully.");
    });
}

async function seedPackages() {
  const packages = [];

  fs.createReadStream("prisma/csv/packages.csv")
    .pipe(csv())
    .on("data", (row) => {
      packages.push({
        id: Number(row.id),
        name: row.name,
        meta: row.meta,
        category: row.category,
      });
    })
    .on("end", async () => {
      logger.info("Seeding packages...");
      for (const pkg of packages) {
        await prisma.package.upsert({
          where: { id: pkg.id },
          update: pkg,
          create: pkg,
        });
      }
      logger.info("Packages seeded successfully.");
    });
}

async function seedPackageItems() {
  const packageItems = [];

  fs.createReadStream("prisma/csv/package_items.csv")
    .pipe(csv())
    .on("data", (row) => {
      packageItems.push({
        id: Number(row.id),
        package_id: Number(row.package_id),
        item_id: Number(row.item_id),
        priority: Number(row.priority),
      });
    })
    .on("end", async () => {
      logger.info("Seeding package items...");
      for (const packageItem of packageItems) {
        try {
          await prisma.packageItem.upsert({
            where: { id: packageItem.id },
            update: packageItem,
            create: packageItem,
          });
        } catch (e) {
          if (e.code === "P2003") {
            logger.info(`Package item has fk issue. Skipping...`);
          } else {
            throw e;
          }
        }
      }
      logger.info("Package items seeded successfully.");
      await prisma.$disconnect();
    });
}

async function main() {
  await seedItems();
  await seedPackages();
  await seedPackageItems();
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
