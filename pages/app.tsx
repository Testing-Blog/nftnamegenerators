import React, { useState } from "react"
import Page from "../components/Page"
import AppContext from "../context/AppContext"
import { settingsSchema } from "../helpers/schemas"
import DataI from "../types/DataI"
import LayerI from "../types/LayerI"
import { PrismaClient } from "@prisma/client"
import { Form, Formik } from "formik"
import Application from "../components/app/Application"

export async function getServerSideProps(context: any) {
  const prisma = new PrismaClient()

  const settings = await prisma.settings.findFirst()
  const generatorPage = await prisma.generatorPage.findFirst()
  const plans = await prisma.plan.findMany({
    orderBy: {
      assetsNumber: "asc",
    },
  })

  return {
    props: {
      settings,
      generatorPage,
      plans,
    },
  }
}

const App = ({ settings, generatorPage, plans }: any) => {
  const [layers, setLayers] = useState<LayerI[]>([])
  const [activeLayerId, setActiveLayerId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<DataI | undefined>()
  const [showResults, setShowResults] = useState<boolean>(false)

  return (
    <Page title="NFT Generator" settings={settings} adminPage>
      <AppContext.Provider
        value={{
          layers,
          setLayers,
          activeLayerId,
          setActiveLayerId,
          loading,
          setLoading,
          setData,
          data,
          showResults,
          setShowResults,
          settings,
          downloadedFileName: generatorPage?.downloadedFileName,
        }}
      >
        <Formik
          initialValues={{
            useGif: false,
            collectionName: "",
            collectionDesc: "",
            collectionSize: 1,
            width: 500,
            height: 500,
            network: "eth",
            symbol: "",
            sellerFeeBasisPoints: "",
            externalUrl: "",
            creators: [],
          }}
          validationSchema={settingsSchema}
          onSubmit={() => {}}
        >
          {() => (
            <Form>
              <Application
                settings={settings}
                generatorPage={generatorPage}
                plans={plans}
              />
            </Form>
          )}
        </Formik>
      </AppContext.Provider>
    </Page>
  )
}

export default App
