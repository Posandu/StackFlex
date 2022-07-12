// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/db';

function decode(key: string) {
  return key.split(`.`).map(hex => {
    return String.fromCharCode(parseInt(hex, 16))
  }).join(``)
}

export default async function response(req: NextApiRequest, res: NextApiResponse) {
  const { key } = req.body;

  if (!key) {
    res.status(401).json({ error: "Unauthorized", key: key || "no key" })
  } else {
    const { id } = req.body;

    if (id) {
      const item = await prisma.data.findUnique({
        where: {
          id
        }
      })

      if (!item) {
        return res.status(401).json({ error: "Not found" })
      }

      return res.status(200).json({
        item
      })
    } else {
      const items = await prisma.data.findMany({
        where: {
          owner: decode(key)
        },
        select: {
          code: false,
          createdAt: false,
          owner: false,
          id: true,
          language: true,
          title: true,
        }
      })

      return res.status(200).json({
        items
      })
    }
  }
}