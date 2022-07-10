// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

export default async function hello(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    working: true,
    "has a life": "yes",
    date: Date(),
    "next.js": "is working",
    env: process.env.NODE_ENV,
  })
}
