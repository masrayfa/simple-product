import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

type UserInput = {
  original_filename: string
  secure_url: string
  bytes: number
}
const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body: data } = req

  try {
    const resCategory = await prisma.category.findUnique({
      where: {
        id: data.category_id,
      },
      select: {
        id: data.category_id,
      },
    })
    // const result = await prisma?.asset.create({
    //   data: {
    //     name: data.original_filename,
    //     path: data.secure_url,
    //     size: data.bytes,
    //     category_id: data.category_id,
    //     Product_Asset: {
    //       connect: {
    //         product_id: data.product_id,
    //       },
    //       create: {
    //         product: {
    //           create: {
    //             product_name: data.product_name,
    //             price: data.price,
    //             description: data.description,
    //             product_slug: data.product_slug,
    //           },
    //         },
    //       },
    //     },
    //   },
    // })

    const result = await prisma?.product.create({
      data: {
        product_name: data.product_name,
        price: data.price,
        description: data.description,
        product_slug: data.product_slug,
        Product_Asset: {
          create: {
            asset: {
              create: {
                name: data.original_filename,
                path: data.secure_url,
                size: data.bytes,
                category_id: data.category_id,
              },
            },
          },
        },
      },
    })

    res.status(200).json({
      msg: 'Upload image success',
      body: result,
    })
  } catch (err) {
    res.status(500).json(err)
  }
}

export default uploadHandler
