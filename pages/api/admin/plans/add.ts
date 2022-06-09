import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (req: any, res: any) => {
  try {
    const samePlan = await prisma.plan.findFirst({
      where: {
        OR: [
          {
            price: req.body.price,
          },
          {
            assetsNumber: req.body.assetsNumber,
          },
        ],
      },
    })

    if (samePlan)
      return res.json({
        success: false,
        message: "Price and Assets number must be unique",
      })

    await prisma.plan.create({
      data: req.body,
    })

    const plans = await prisma.plan.findMany({
      orderBy: {
        assetsNumber: "asc",
      },
    })

    res.json({
      success: true,
      message: "Operation was done successfully",
      data: plans,
    })
  } catch (error: any) {
    res.json({ success: false, message: error.message })
  }
}
