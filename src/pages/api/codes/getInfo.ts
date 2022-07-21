/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getSession, Session, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiResponse } from 'next';
import { prisma } from 'src/db';

export default withApiAuthRequired(async (req: any, res: NextApiResponse) => {
  const { user } = getSession(req, res) as Session;

  const userId = user.sub;

  /**
   * Make sure it's a POST request
   */
  if (req.method === 'POST') {
    /**
     * Check all required fields are present
     */
    if (Object.keys(req.body).length !== 0) {
      const { id } = req.body;

      /**
       * If id is present
       */
      if (id) {
        const data = await prisma.data.findMany({
          where: {
            id,
            owner: userId,
          },
          /**
           * Only allow 1 record to be returned
           */
          take: 1,
        });

        res.status(200).json({ data });
      } else {
        res.status(400).json({ error: 'Bad Request' });
      }
    }
  } else {
    res.status(405).json({
      error: 'Method not allowed',
    });
  }
});
