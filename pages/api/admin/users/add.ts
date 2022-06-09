import { PrismaClient } from "@prisma/client"

const bcrypt = require("bcryptjs")
const prisma = new PrismaClient()

export default async (req: any, res: any) => {
  const { name, email, password, role } = req.body

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    })

    await prisma.account.create({
      data: {
        userId: user.id,
        type: "credentials",
      },
    })

    const users = await prisma.user.findMany()

    res.json({
      success: true,
      message: "Operation was done successfully",
      data: users,
    })
  } catch (error: any) {
    res.json({ success: false, message: error.message })
  }
}
