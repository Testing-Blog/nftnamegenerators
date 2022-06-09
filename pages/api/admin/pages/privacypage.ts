import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (req: any, res: any) => {
  try {
    const privacyPage: any = await prisma.privacyPage.findFirst()

    if (!privacyPage) {
      await prisma.privacyPage.create({
        data: req.body,
      })
    } else {
      await prisma.privacyPage.update({
        where: {
          id: privacyPage.id,
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
