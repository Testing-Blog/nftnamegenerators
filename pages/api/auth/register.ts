import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs")

export default async (req: any, res: any) => {
  const { name, email, password } = req.body

  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    await prisma.account.create({
      data: {
        userId: user.id,
        type: "credentials",
      },
    })

    res.json({
      success: true,
      message: "Your account was created successfully",
    })
  } catch (error: any) {
    res.json({ success: false, message: error.message })
  }
}
