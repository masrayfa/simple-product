import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

// async function seed() {
//   await Promise.all(
//     getProducts().map((product: any) => {
//       return db.joke.create({ data: product })
//     })
//   )
// }
//
// seed()
//
// function getProducts() {
//   return {
//
//   }
// }
