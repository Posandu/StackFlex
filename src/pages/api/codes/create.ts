/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSession, Session, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiResponse } from 'next';
import { prisma } from 'src/db';
import { required } from 'src/utils';

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
      /**
       * Validate all required fields that are present
       */
      const requiredFields = required(req.body, ['title', 'code', 'language']);

      if (requiredFields.length > 0) {
        res.status(400).json({
          error: `The following fields are required: ${requiredFields.join(
            ', '
          )}`,
        });
      } else {
        /**
         * Get data from request
         */
        const { title, code, language } = req.body;

        /**
         * Only allow 5kb of code
         */
        if (code.length > 5000) {
          res.status(400).json({
            error: 'The code is too big. It must be less than 50kb',
          });
        } else {
          /**
           * Add code to database
           */
          const result = await prisma.data.create({
            data: {
              code,
              owner: userId,
              title,
              language,
            },
          });

          res.status(200).json({
            created: true,
            data: result,
          });
        }
      }
    }
  } else {
    /**
     * Return error if not a POST request
     */
    res.status(405).json({
      error: 'Method not allowed',
    });
  }
});
