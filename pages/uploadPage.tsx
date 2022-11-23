import React, { useEffect } from 'react'
import Head from 'next/head'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { prisma } from '../lib/prisma'

type AssetProps = {
  asset_name: string
  secure_url: string
  bytes: number
}

type ProductProps = {
  product_name: string
  product_slug: string
  description: string
  price: number
}

type CategoryProps = {
  name: string
  slug: string
}

export default function UploadPage() {
  const [imageSrc, setImageSrc] = useState<
    string | ArrayBuffer | null | undefined
  >()
  const [upload, setUpload] = useState()
  const [changeImage, setChangeImage] = useState()
  const [assetState, setAssetState] = useState<AssetProps>()
  const [productState, setProductState] = useState<ProductProps>()
  const [prodName, setProdName] = useState<{ product_name: string }>()
  const [prodSlug, setProdSlug] = useState<{ product_slug: string }>()
  const [prodDesc, setProdDesc] = useState<{ description: string }>()
  const [prodPrice, setProdPrice] = useState<{ price: number }>()

  const [categoryState, setCategoryState] = useState<CategoryProps>()

  const handleOnChange = (changeEvent: any) => {
    const reader = new FileReader()

    reader.onload = (onLoadEvent) => {
      setImageSrc(onLoadEvent.target?.result)
      setUpload(undefined)
    }

    reader.readAsDataURL(changeEvent.target.files[0])
  }
  const handleInputChange = (e: any) => {
    const name = e.target.name
    const value = e.target.value
    console.log(name)
    console.log(value)
    setProductState((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const handleSubmit = async (event: any) => {
    event?.preventDefault()
    try {
      const form = event?.currentTarget
      const fileInput: any = Array.from(form.elements).find(
        ({ name }: any) => name === 'file'
      )

      const imageFormData = new FormData()

      for (const file of fileInput.files) {
        imageFormData.append('file', file)
      }
      console.log(imageFormData)

      imageFormData.append('upload_preset', 'just-upload')

      const upDataImage = await fetch(
        'https://api.cloudinary.com/v1_1/dbvozzs8x/image/upload',
        {
          method: 'POST',
          body: imageFormData,
        }
      ).then((res) => res.json())

      const assetData = await fetch('/api/asset', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original_filename: upDataImage.original_filename,
          secure_url: upDataImage.secure_url,
          bytes: upDataImage.bytes,
          category_id: 12,

          // original_filename: 'gambar next',
          // secure_url: 'disitu',
          // bytes: 2048,
          // category_id: 4,
        }),
      })

      const productData = await fetch('/api/product', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_name: prodName?.product_name,
          product_slug: prodSlug?.product_slug,
          description: prodDesc?.description,
          price: prodPrice?.price,
          // product_name: 'nintendow',
          // product_slug: 'disitu',
          // description: 'untuk bermain',
          // price: 7000,
        }),
      })

      console.log('dis data', assetData)
      console.log('dis product', productData)
    } catch (e) {
      console.error(e)
    }
  }

  const handleInputImageChange = (e: any) => {
    setChangeImage(e.target.files[0])
    console.log('change', e.target.files[0])
  }

  useEffect(() => {
    console.log(productState)
  }, [productState])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Dis upload page</h1>
        <h1 className={styles.title}>Add your product!</h1>
        <form action="post" onSubmit={handleSubmit}>
          <p>
            <input
              type="text"
              name="product_name"
              value={prodName?.product_name}
              placeholder="input product name"
              onChange={(e) => {
                setProdName({ product_name: e.target.value })
              }}
            ></input>
          </p>
          <p>
            <input
              type="text"
              name="product_slug"
              value={prodSlug?.product_slug}
              placeholder="input product slug"
              onChange={(e) => {
                setProdSlug({ product_slug: e.target.value })
              }}
            ></input>
          </p>

          <p>
            <input
              type="text"
              name="price"
              value={prodPrice?.price}
              placeholder="input product price"
              onChange={(e) => {
                setProdPrice({ price: parseInt(e.target.value) })
                console.log(prodPrice)
              }}
            ></input>
          </p>
          <p>
            <input
              type="text"
              name="description"
              value={prodDesc?.description}
              placeholder="input product description"
              onChange={(e) => {
                setProdDesc({ description: e.target.value })
              }}
            ></input>
          </p>
          {/* <p> */}
          {/*   <input */}
          {/*     type="text" */}
          {/*     name="category_name" */}
          {/*     value={categoryState?.name} */}
          {/*     placeholder="input category name" */}
          {/*     onChange={handleInputChange} */}
          {/*   ></input> */}
          {/* </p> */}

          <p>
            <input
              type="file"
              name="file"
              onChange={handleInputImageChange}
            ></input>
          </p>

          <p>
            <button>Upload Files</button>
          </p>
        </form>
      </main>

      <footer className={styles.footer}>
        <p>Created by Mas Rayfa</p>
      </footer>
    </div>
  )
}
