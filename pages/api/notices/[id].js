import prisma from "@/lib/prisma";
import { validateNotice } from "@/lib/validation";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    return handleGet(id, res);
  }

  if (req.method === "PUT") {
    return handlePut(id, req, res);
  }

  if (req.method === "DELETE") {
    return handleDelete(id, res);
  }

  res.setHeader("Allow", "GET, PUT, DELETE");
  return res.status(405).json({ error: "Method not allowed." });
}

async function handleGet(id, res) {
  try {
    const notice = await prisma.notice.findUnique({
      where: { id },
    });

    if (!notice) {
      return res.status(404).json({ error: "Notice not found." });
    }

    return res.status(200).json(notice);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch notice." });
  }
}

async function handlePut(id, req, res) {
  try {
    const existing = await prisma.notice.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ error: "Notice not found." });
    }

    const { valid, errors } = validateNotice(req.body);

    if (!valid) {
      return res.status(400).json({ error: errors.join(" ") });
    }

    const notice = await prisma.notice.update({
      where: { id },
      data: {
        title: req.body.title.trim(),
        body: req.body.body.trim(),
        category: req.body.category,
        priority: req.body.priority,
        publishDate: new Date(req.body.publishDate),
        image: req.body.image?.trim() || null,
      },
    });

    return res.status(200).json(notice);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update notice." });
  }
}

async function handleDelete(id, res) {
  try {
    const existing = await prisma.notice.findUnique({ where: { id } });

    if (!existing) {
      return res.status(404).json({ error: "Notice not found." });
    }

    await prisma.notice.delete({ where: { id } });

    return res.status(200).json({ message: "Notice deleted." });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete notice." });
  }
}
