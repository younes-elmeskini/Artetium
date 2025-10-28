/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

function pickCategory(index: number): string {
  const cats = ["Category_1", "Category_2", "Category_3", "Category_4"];
  return cats[index % cats.length];
}

async function main() {
  // Clean optional (comment out if you don't want to delete existing)
  // await prisma.products.deleteMany({});
  // await prisma.user.deleteMany({});

  // Seed 1 user
  const email = "admin@example.com";
  const passwordHash = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: passwordHash,
    },
  });

  // Seed 20 products
  const products = Array.from({ length: 20 }).map((_: unknown, i: number) => ({
    name: `Sample Product ${i + 1}`,
    category: pickCategory(i),
    cover: "/images/sofa.png",
    description: `This is a sample description for product ${i + 1}.`,
    price: String(999 + i * 50),
    solde: i % 3 === 0,
    BestSeller: i % 4 === 0,
  }));

  for (const data of products) {
    await prisma.products.create({ data });
  }

  console.log("✅ Seed completed: 1 user, 20 products");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


