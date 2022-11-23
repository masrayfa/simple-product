import { NextApiRequest, NextApiResponse } from 'next'
import { uploadImage } from '../../utils/cloudinary'
import { getDataImage } from '../../utils/formidable'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const imageUpload = await getDataImage(req)
  const imageData = await uploadImage(imageUpload.path)

  const result = await prisma?.asset.create({
    data: {
      // @ts-ignore
      name: imageData.original_filename,
      // @ts-ignore
      size: imageData.bytes,
      // @ts-ignore
      path: imageData.secure_url,
    },
  })

  res.json(result)
}
