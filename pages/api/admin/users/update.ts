import { PrismaClient } from "@prisma/client"
const bcrypt = require("bcryptjs")
const prisma = new PrismaClient()

export default async (req: any, res: any) => {
  const { id, name, email, password, role } = req.body

  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        password: hashedPassword,
        role,
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
