import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (req: any, res: any) => {
  try {
    const { page = 1 } = req.body
    const limit = 10

    const count = await prisma.transaction.count()

    const transactions = await prisma.transaction.findMany({
      include: {
        user: true,
      },
      orderBy: {
        dateCreated: "desc",
      },
      skip: limit * (page - 1),
      take: limit,
    })

    res.json({
      success: true,
      data: transactions,
      count,
    })
  } catch (error: any) {
    res.json({ success: false, message: error.message })
  }
}
