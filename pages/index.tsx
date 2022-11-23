import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>This is your simple product API</h1>
        <Link href={'./uploadPage'}>
          Navigate to this page to upload your products
        </Link>
      </main>

      <footer className={styles.footer}>
        <p>Created by Mas Rayfa</p>
      </footer>
    </div>
  )
}
