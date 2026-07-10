const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Connecting and creating notice...");
    const notice = await prisma.notice.create({
      data: {
        title: "Test Title",
        body: "Test Body",
        category: "GENERAL",
        priority: "NORMAL",
        publishDate: new Date(),
        image: null,
      },
    });
    console.log("Created notice successfully:", notice);

    console.log("Deleting test notice...");
    await prisma.notice.delete({
      where: { id: notice.id },
    });
    console.log("Deleted successfully.");
  } catch (error) {
    console.error("Failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
