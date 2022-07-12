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
      const { id } = req.body;

      // Check if the id is not empty
      if (id) {
        const data = await prisma.data.findUnique({
          where: {
            id,
          }
        })

        res.status(200).json({ data })
      }
      else {
        res.status(400).json({ error: "Bad Request" })
      }

    }
  } else {
    res.status(405).json({
      error: 'Method not allowed'
    })
  }
})
