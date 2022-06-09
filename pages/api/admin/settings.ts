import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (req: any, res: any) => {
  try {
    const settings: any = await prisma.settings.findFirst()

    if (!settings) {
      await prisma.settings.create({
        data: req.body,
      })
    } else {
      await prisma.settings.update({
        where: {
          id: settings.id,
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
