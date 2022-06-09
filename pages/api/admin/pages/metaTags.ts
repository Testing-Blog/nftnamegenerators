import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async (req: any, res: any) => {
  try {
    const metaTags: any = await prisma.metaTags.findFirst()

    if (!metaTags) {
      await prisma.metaTags.create({
        data: req.body,
      })
    } else {
      await prisma.metaTags.update({
        where: {
          id: metaTags.id,
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
