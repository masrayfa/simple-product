// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body
  try {
    const result = await prisma?.product.create({
      data: {
        product_name: data.product_name,
        product_slug: data.product_slug,
        description: data.description,
        price: data.price,
      },
    })
    res.status(200).json({ name: 'John bon', ikidata: result })
  } catch (err) {
    res.status(500).json(err)
  }
}
