import { PrismaClient } from "@prisma/client"
import { getSession } from "next-auth/react"

const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

export default async (req: any, res: any) => {
  const session: any = await getSession({ req })

  if (!session)
    return res.json({
      success: false,
      message: "Not authorized",
    })

  const { currentPassword, newPassword } = req.body

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: session.user.id,
      },
    })

    const currentPasswordValid = await bcrypt.compare(
      currentPassword,
      user?.password
    )

    if (!currentPasswordValid)
      return res.json({
        success: false,
        message: "Current password is not valid",
      })

    const salt = await bcrypt.genSalt(10)
    const newHashedPassword = await bcrypt.hash(newPassword, salt)

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        password: newHashedPassword,
      },
    })

    res.json({
      success: true,
      message: "Operation was done successfully",
      data: user,
    })
  } catch (error: any) {
    res.json({ success: false, message: error.message })
  }
}
