import prisma from "@/lib/prisma";
import { validateNotice } from "@/lib/validation";

export default async function handler(req, res) {
  if (req.method === "GET") {
    return handleGet(req, res);
  }

  if (req.method === "POST") {
    return handlePost(req, res);
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Method not allowed." });
}

async function handleGet(_req, res) {
  try {
    // MySQL / TiDB Cloud compatible explicit sorting by priority enum then publishDate
    const notices = await prisma.$queryRaw`
      SELECT * FROM \`Notice\`
      ORDER BY 
        CASE \`priority\`
          WHEN 'URGENT' THEN 1
          WHEN 'NORMAL' THEN 2
          ELSE 3
        END ASC,
        \`publishDate\` DESC
    `;

    return res.status(200).json(notices);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch notices." });
  }
}

async function handlePost(req, res) {
  try {
    const { valid, errors } = validateNotice(req.body);

    if (!valid) {
      return res.status(400).json({ error: errors.join(" ") });
    }

    const notice = await prisma.notice.create({
      data: {
        title: req.body.title.trim(),
        body: req.body.body.trim(),
        category: req.body.category,
        priority: req.body.priority,
        publishDate: new Date(req.body.publishDate),
        image: req.body.image?.trim() || null,
      },
    });

    return res.status(201).json(notice);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create notice." });
  }
}
