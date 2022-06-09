import { PrismaClient } from "@prisma/client"
import { getSession } from "next-auth/react"
const prisma = new PrismaClient()

export default async (req: any, res: any) => {
  const session: any = await getSession({ req })

  if (!session)
    return res.json({
      success: false,
      message: "Not authorized",
    })

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    })

    if (user?.role === "superAdmin")
      return res.json({
        success: false,
        message: "Super Admin account cannot be deleted",
      })

    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    })

    res.json({
      success: true,
      message: "Operation was done successfully",
    })
  } catch (error: any) {
    res.json({ success: false, message: error.message })
  }
}
