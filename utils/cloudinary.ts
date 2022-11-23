import cloudinary from 'cloudinary-core'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
})

export function uploadImage(imageUploaded: any) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      imageUploaded,

      // @ts-ignore
      (err, res) => {
        if (err) reject(err)
        resolve(res)
      }
    )
  })
}
