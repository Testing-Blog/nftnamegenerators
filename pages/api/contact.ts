import { PrismaClient } from "@prisma/client"
import Email from "email-templates"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { contactName, contactEmail, contactMessage } = req.body

    // get smtp configuration
    const prisma = new PrismaClient()
    const settings = await prisma.settings.findFirst()

    const user: any = settings?.smtpEmail || ""
    const pass: any = settings?.smtpPassword || ""
    const host: any = settings?.smtpHost || ""
    const port: any = settings?.smtpPort || ""

    const emailTemp = new Email({
      message: {
        from: user,
      },
      preview: false,
      send: true,
      transport: {
        host,
        port,
        auth: {
          user,
          pass,
        },
      },
    })

    await emailTemp.send({
      template: "contact",
      message: {
        to: user,
        subject: `Message from ${contactName}`,
      },
      locals: {
        contactName,
        contactEmail,
        contactMessage,
      },
    })

    res.status(200).json({ contactName, contactEmail, contactMessage })
  } catch (error) {
    res.status(500).json({})
  }
}
