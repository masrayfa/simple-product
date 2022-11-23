// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body
  try {
    const result = await prisma?.product.findUnique({
      where: {
        id: id,
      },
      include: {
        Product_Asset: {
          where: {
            id: id,
          },
          select: {
            asset: {
              select: {
                path: true,
              },
            },
            product: true,
          },
        },
      },
    })
    res.status(200).json({ result })
  } catch (err) {
    res.status(500).json(err)
  }
}
