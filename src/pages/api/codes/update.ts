/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"
import { NextApiResponse } from 'next';
import { prisma } from "src/db"

export default withApiAuthRequired(async (req: any, res: NextApiResponse) => {
  const session = getSession(req, res);

  const userId = session?.idToken ?? "";

  /**
   * Make sure it's a POST request
   */
  if (req.method === 'POST') {

    /**
     * Check all required fields are present
     */
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

      /**
       * Update code
       */
      if (!id || !title || !code || !language) {
        res.status(400).json({ error: "Bad Request" })
      } else {
        /**
         * 
         */
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
