import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Page from "../components/Page"
import AccessDenied from "../components/AccessDenied"
import { PrismaClient } from "@prisma/client"

export async function getServerSideProps(context: any) {
  const prisma = new PrismaClient()

  const settings = await prisma.settings.findFirst()
  const generatorPage = await prisma.generatorPage.findFirst()

  return {
    props: {
      settings,
      generatorPage,
    },
  }
}

export default function ProtectedPage({ settings }: any) {
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const [content, setContent] = useState()

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected")
      const json = await res.json()
      if (json.content) {
        setContent(json.content)
      }
    }
    fetchData()
  }, [session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message
  if (!session) {
    return (
      <Page title="" settings={settings}>
        <AccessDenied />
      </Page>
    )
  }

  // If session exists, display content
  return (
    <Page title="" settings={settings}>
      <h1>Protected Page</h1>
      <p>
        <strong>{content ?? "\u00a0"}</strong>
      </p>
    </Page>
  )
}
