import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (req: any, res: any) => {
  try {
    await prisma.transaction.create({
      data: req.body,
    })

    const transactions = await prisma.transaction.findMany({
      orderBy: {
        dateCreated: "asc",
      },
    })

    res.json({
      success: true,
      message: "Operation was done successfully",
      data: transactions,
    })
  } catch (error: any) {
    res.json({ success: false, message: error.message })
  }
}
