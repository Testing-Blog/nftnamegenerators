import { PrismaClient } from "@prisma/client"
import { getSession } from "next-auth/react"
const prisma = new PrismaClient()

export default async (req: any, res: any) => {
  try {
    const { page = 1 } = req.body
    const limit = 10

    const count = await prisma.user.count()

    const users = await prisma.user.findMany({
      skip: limit * (page - 1),
      take: limit,
    })

    res.json({
      success: true,
      data: users,
      count,
    })
  } catch (error: any) {
    res.json({ success: false, message: error.message })
  }
}
