/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withAuth } from "@clerk/nextjs/api";
import { NextApiResponse } from 'next';
import { prisma } from "src/db"

export default withAuth(async (req: any, res: NextApiResponse) => {
  const { userId } = req.auth;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" })
  }

  // Check if the request is a POST request
  else if (req.method === 'POST') {
    // Check if the request body is not empty
    if (Object.keys(req.body).length !== 0) {
      const { id, title, code, language, deleteItem } = req.body;

      if (deleteItem) {
        await prisma.data.deleteMany({
          where: {
            id: id,
            owner: userId
          }
        })

        res.status(200).json({ message: "Code deleted" })

        return;
      }

      // Check if the id is not empty
      if (!id || !title || !code || !language) {
        res.status(400).json({ error: "Bad Request" })
      } else {
        // Update the code
        prisma.data.update({
          where: { id },
          data: {
            title,
            code,
            language,
          }
        }).then(() => {
          res.status(200).json({ completed: true })
        }).catch(() => {
          res.status(500).json({ error: "Internal Server Error" })
        })
      }

    }
  } else {
    res.status(405).json({
      error: 'Method not allowed'
    })
  }
})
