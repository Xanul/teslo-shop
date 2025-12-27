import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries";
import { userAddresses } from "./seed-address";

async function main() {
  console.log("🌱 Iniciando seed de base de datos...");

  const { categories, products, users } = initialData;

  // 1. Limpiar base de datos (respetar orden de dependencias de llaves foráneas)
  console.log("\n📦 Limpiando base de datos...");

  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  await prisma.userAddress.deleteMany();
  await prisma.country.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log("✓ Base de datos limpiada");


  // 2. Insertar usuarios
  console.log("\n📁 Insertando usuarios...");

  await prisma.user.createMany({
    data: users,
  });

  // 3. Insertar categorías
  console.log("\n📁 Insertando categorías...");
  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  // Crear mapa de categorías para búsqueda rápida
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  console.log(`✓ ${categoriesDB.length} categorías insertadas`);

  // 4. Insertar productos con sus imágenes
  console.log("\n🛍️  Insertando productos...");

  for (const product of products) {
    const { type, images, ...rest } = product;

    // Crear producto
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    // Insertar imágenes del producto en batch
    if (images.length > 0) {
      const imagesData = images.map((image) => ({
        url: image,
        productId: dbProduct.id,
      }));

      await prisma.productImage.createMany({
        data: imagesData,
      });
    }
  }

  console.log(`✓ ${products.length} productos insertados con sus imágenes`);

  // 5. Insertar paises

  console.log("\n🌏 Insertando paises...");

  await prisma.country.createMany({
    data: countries
  })

  console.log(`✓ ${countries.length} países insertados`);

  // 6. Insertar direcciones de usuario
  console.log("\n📍 Insertando direcciones de usuario...");

  const usersInDB = await prisma.user.findMany();

  for (const [userIndex, user] of usersInDB.entries()) {
    for (let i = 0; i < 3 && i < userAddresses.length; i++) {
      const address = userAddresses[(userIndex * 3 + i) % userAddresses.length];

      await prisma.userAddress.create({
        data: {
          userId: user.id,
          alias: address.alias,
          firstName: address.firstName,
          lastName: address.lastName,
          address: address.address,
          address2: address.address2 ?? null,
          postalCode: address.postalCode,
          city: address.city,
          state: address.state,
          countryId: address.countryId,
          phone: address.phone,
          isDefault: i === 0,
        },
      });
    }
  }

  console.log(`✓ ${usersInDB.length * Math.min(3, userAddresses.length)} direcciones insertadas`);

}

// Ejecutar seed con manejo de errores
main()
  .then(() => {
    console.log("\n🎉 Proceso de seed finalizado");
  })
  .catch((error) => {
    console.error("\n❌ Error durante el seed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🔌 Desconectado de la base de datos");
  });
