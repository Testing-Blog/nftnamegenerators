import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (req: any, res: any) => {
  try {
    const termsPage: any = await prisma.termsPage.findFirst()

    if (!termsPage) {
      await prisma.termsPage.create({
        data: req.body,
      })
    } else {
      await prisma.termsPage.update({
        where: {
          id: termsPage.id,
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
