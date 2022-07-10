/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withAuth } from "@clerk/nextjs/api";
import { NextApiResponse } from 'next';
import { prisma } from "src/db"
import { required } from "src/utils"

prisma;
export default withAuth(async (req: any, res: NextApiResponse) => {
  const { userId } = req.auth;
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" })
  }

  // Check if the request is a POST request
  else if (req.method === 'POST') {
    // Check if the request body is not empty
    if (Object.keys(req.body).length !== 0) {
      // Check if the request body has all the required fields
      const requiredFields = required(req.body, ['title', 'code', 'language']);

      if (requiredFields.length > 0) {
        res.status(400).json({
          error: `The following fields are required: ${requiredFields.join(', ')}`
        })
      } else {
        const { title, code, language } = req.body;

        // Check if the code is not big than 50 kb 
        if (code.length > 50000) {
          res.status(400).json({
            error: "The code is too big. It must be less than 50kb"
          })
        } else {
          const result = await prisma.data.create({
            data: {
              code,
              owner: userId,
              title,
              language,
            }
          })

          res.status(200).json({
            created: true,
            data: result
          })
        }
      }
    }
  } else {
    res.status(405).json({
      error: 'Method not allowed'
    })
  }
})
