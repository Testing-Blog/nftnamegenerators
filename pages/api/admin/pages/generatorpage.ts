import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (req: any, res: any) => {
  try {
    const generatorPage: any = await prisma.generatorPage.findFirst()

    if (!generatorPage) {
      await prisma.generatorPage.create({
        data: req.body,
      })
    } else {
      await prisma.generatorPage.update({
        where: {
          id: generatorPage.id,
        },
        data: req.body,
      })
    }

    res.json({
      success: true,
      message: "Operation was done successfully",
    })
  } catch (error: any) {
    res.json({ success: false, message: error.message })
  }
}
