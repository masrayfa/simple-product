// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body
  try {
    const result = await prisma?.asset.create({
      data: {
        name: data.original_filename,
        path: data.secure_url,
        size: data.bytes,
        category_id: data.category_id,
      },
    })
    res.status(200).json({ name: 'John bon', ikidata: result })
  } catch (err) {
    res.status(500).json(err)
  }
}
