import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (req: any, res: any) => {
  try {
    const contactpage: any = await prisma.contactPage.findFirst()

    if (!contactpage) {
      await prisma.contactPage.create({
        data: req.body,
      })
    } else {
      await prisma.contactPage.update({
        where: {
          id: contactpage.id,
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
