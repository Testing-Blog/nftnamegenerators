import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const bcrypt = require("bcryptjs")

const prisma = new PrismaClient()

export default async (req: any, res: any) => {
  const settings = await prisma.settings.findFirst()

  const providers = [
    // metamask
    CredentialsProvider({
      id: "ethereum-login",
      name: "Ethereum",
      credentials: {
        address: {
          label: "Address",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const address = credentials?.address

          if (!address) return null

          // check if user exists
          const user = await prisma.user.findFirst({
            where: {
              metamaskAddress: address,
            },
          })

          if (!user) {
            const newUser = await prisma.user.create({
              data: {
                metamaskAddress: address,
              },
            })

            await prisma.account.create({
              data: {
                userId: newUser.id,
                type: "metamask",
              },
            })

            return newUser
          }

          return user
        } catch (e) {
          console.log("hello here")
          return null
        }
      },
    }),
    // email and password
    CredentialsProvider({
      id: "email-password-login",
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize({ email, password }: any, req) {
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        })

        if (!user) return null

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return null

        return user
      },
    }),
    // github
    GithubProvider({
      clientId: settings?.githubId || "",
      clientSecret: settings?.githubSecret || "",
    }),
    // google
    GoogleProvider({
      clientId: settings?.googleId || "",
      clientSecret: settings?.googleSecret || "",
    }),
    // facebook
    FacebookProvider({
      clientId: settings?.facebookId || "",
      clientSecret: settings?.facebookId || "",
    }),
  ]

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth.includes("signin")

  if (isDefaultSigninPage) {
    providers.pop()
  }

  return NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    providers,
    pages: {
      signIn: "/login",
    },
    session: {
      strategy: "jwt",
    },
    theme: {
      colorScheme: "light",
    },
    callbacks: {
      async jwt({ token }: any) {
        const { role }: any = await prisma.user.findUnique({
          where: { id: token.sub },
        })

        token.userRole = role === "user" ? undefined : "admin"
        return token
      },
      async session({ session, token, user }: any) {
        const u: any = await prisma.user.findUnique({
          where: { id: token.sub },
        })

        return {
          user: u,
          expires: session.expires,
        }
      },
    },
  })
}
