import React, { useContext, useEffect, useState } from "react"
import ResultsPanel from "../../components/app/ResultsPanel"
import SettingsPanel from "../../components/app/SettingsPanel"
import AppContext from "../../context/AppContext"
import { dataURLtoFile, generateNFT } from "../../services/generate"
import { layersSchema } from "../../helpers/schemas"
import CollectionI from "../../types/CollectionI"
import Loading from "../../components/app/Loading"
import Pay from "../../components/payments/Pay"
import {
  createDna,
  filterDNAOptions,
  isDnaUnique,
  layersSetup,
  showToast,
} from "../../helpers/utils"
import payMethodsType from "../../types/payMethods"
import axios from "axios"
import { useSession } from "next-auth/react"
import { Modal } from "react-bootstrap"
import Button from "../Button"
import { useFormikContext } from "formik"
import { IoIosSwap } from "react-icons/io"
import NoSettings from "./NoSettings"

const Application = ({ settings, generatorPage, plans }: any) => {
  const { data: session, status }: any = useSession()

  const {
    layers,
    setLayers,
    loading,
    setLoading,
    data,
    setData,
    showResults,
    setShowResults,
  } = useContext(AppContext)

  const [usedPlan, setUsedPlan] = useState<any>()

  // payment
  const [showPayment, setShowPayment] = useState<boolean>(false)

  // project settings
  const { values, setFieldValue }: any = useFormikContext()

  const {
    useGif,
    collectionName,
    collectionDesc,
    collectionSize,
    width,
    height,
    network,
    symbol,
    sellerFeeBasisPoints,
    externalUrl,
    creators,
  } = values

  const [paymentMethod, setPaymentMethod] = useState<payMethodsType>(undefined)

  const [error, setError] = useState<any>(null)

  const [showPreview, setShowPreview] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<any>(null)
  const [generationTime, setGenerationTime] = useState<string>("")

  // get from localstorage
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      status !== "loading" &&
      "indexedDB" in window
    ) {
      const collectionId = session?.user?.id || "app-collection"

      let request = window.indexedDB.open("collection", 1)

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result
        db.createObjectStore("collection", {
          keyPath: "collectionId",
        })
      }

      request.onsuccess = (event: any) => {
        const db = event.target.result
        var transaction = db.transaction(["collection"])
        var objectStore = transaction.objectStore("collection")
        var collectionReq = objectStore.get(collectionId)
        collectionReq.onsuccess = (e: any) => {
          const collection = collectionReq.result
          if (collection) {
            setFieldValue("collectionName", collection.name)
            setFieldValue("collectionDesc", collection.description)
            setFieldValue("collectionSize", collection.size)
            setFieldValue("width", collection.width || 0)
            setFieldValue("height", collection.height || 0)
            setFieldValue("useGif", collection.useGif || false)
            setFieldValue("network", collection.network)
            setFieldValue("symbol", collection.symbol)
            setFieldValue(
              "sellerFeeBasisPoints",
              collection.sellerFeeBasisPoints || 0
            )
            setFieldValue("externalUrl", collection.externalUrl)
            setFieldValue("creators", collection.creators || [])

            setLayers(collection.layers || [])
          }
        }
      }
    }
  }, [status])

  // paypal
  useEffect(() => {
    if (settings) {
      const script = document.createElement("script")
      script.src = `https://www.paypal.com/sdk/js?client-id=${settings.paypalClientId}`
      document.body.appendChild(script)
    }
  }, [])

  // update localstorage
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      status !== "loading" &&
      "indexedDB" in window
    ) {
      const collectionId = session?.user?.id || "app-collection"

      const currentCollection: CollectionI = {
        name: collectionName,
        description: collectionDesc,
        size: collectionSize,
        width: width,
        height: height,
        layers,
        useGif,
        collectionId,
        network,
        symbol,
        sellerFeeBasisPoints,
        externalUrl,
        creators,
      }

      let request = window.indexedDB.open("collection", 1)

      request.onsuccess = (event: any) => {
        const db = event.target.result
        var collectionObjectStore = db
          .transaction(["collection"], "readwrite")
          .objectStore("collection")
        var request = collectionObjectStore.get(collectionId)

        request.onsuccess = (event: any) => {
          collectionObjectStore.put(currentCollection)
        }
      }
    }
  }, [
    collectionName,
    collectionDesc,
    collectionSize,
    width,
    height,
    useGif,
    layers,
    network,
    symbol,
    sellerFeeBasisPoints,
    externalUrl,
    creators,
  ])

  // update amount
  useEffect(() => {
    getUsedPlan()
  }, [collectionSize])

  // generate collection
  const validation = async (layersClone: any) => {
    try {
      // layers validation
      await layersSchema.validate({
        layers,
      })

      // dna validation
      let layerConfigIndex = 0
      let failedCount = 0
      const uniqueDnaTorrance = 10000
      let editionCount = 1
      var dnaList = new Set()

      const layerConfigurations = [
        {
          growEditionSizeTo: collectionSize,
          layersOrder: layersClone,
        },
      ]

      while (layerConfigIndex < layerConfigurations.length) {
        const layers = layersSetup(layersClone)

        while (
          editionCount <=
          layerConfigurations[layerConfigIndex].growEditionSizeTo
        ) {
          let newDna = createDna(layers)
          if (isDnaUnique(dnaList, newDna)) {
            dnaList.add(filterDNAOptions(newDna))
            editionCount++
          } else {
            failedCount++
            if (failedCount >= uniqueDnaTorrance) {
              const e = new Error(
                `You need more layers or elements to grow your edition to ${layerConfigurations[layerConfigIndex].growEditionSizeTo} artworks!`
              )
              e.name = "ValidationError"
              throw e
            }
          }
        }

        layerConfigIndex++
      }
    } catch (error) {
      throw error
    }
  }

  const startGenerating = async () => {
    try {
      const layersClone: any = [...layers]

      await Promise.all(
        layersClone?.map(async (layer: any) => {
          await Promise.all(
            layer.images?.map(async (image: any) => {
              const extension = image.data_url.substring(
                "data:image/".length,
                image.data_url.indexOf(";base64")
              )

              const file = dataURLtoFile(
                image.data_url,
                `${Math.random().toString(16).slice(2)}.${extension}`
              )

              image.file = file
            })
          )
        })
      )

      // validation
      await validation(layersClone)

      // payment
      if (usedPlan.price > 0) return setShowPayment(true)

      // generating
      await generate()
    } catch (error: any) {
      console.log(error)
      if (error.name !== "ValidationError") setError(error)
      showToast(error.message, "error")
    }
  }

  const generate = async (ethAmount?: any) => {
    try {
      window.scrollTo(0, 0)

      setShowPayment(false)

      // new collection
      const newCollection: CollectionI = {
        name: collectionName,
        description: collectionDesc,
        size: collectionSize,
        width,
        height,
        layers,
        results: [],
        metadata: [],
        collectionId: Math.random().toString(16).slice(2),
        network,
        symbol,
        sellerFeeBasisPoints,
        externalUrl,
        creators,
      }

      setLoading(true)

      // call the api
      await generateNFT(
        newCollection,
        useGif,
        usedPlan.watermark,
        settings?.watermarkText,
        (data: any, genTime: string) => {
          // error while generating
          if (data.error) return showToast(data.error, "error")

          // generation time
          setGenerationTime(genTime)

          // create the collection
          newCollection.results = data.collections
          newCollection.metadata = data.metadata

          // nfts generated
          setData(data)
          setShowResults(true)
          setLoading(false)
        }
      )

      // save the transaction
      await axios.post("/api/transactions/add", {
        userId: session?.user?.id ? session?.user?.id : null,
        name: collectionName,
        desc: collectionDesc,
        size: Number.parseInt(collectionSize),
        network,
        paidAmount: paymentMethod === "metamask" ? ethAmount : usedPlan?.price,
        paymentMethod: paymentMethod ? paymentMethod : null,
        paymentCurrency:
          paymentMethod === "metamask" ? "ETH" : settings?.currency,
      })
    } catch (error: any) {
      setLoading(false)
      throw error
    }
  }

  const handleGenerate = async () => {
    try {
      // generating
      await generate()
    } catch (error: any) {
      console.log(error)
      if (error.name !== "ValidationError") setError(error)
      showToast(error.message, "error")
    }
  }

  const getUsedPlan = async () => {
    if (collectionSize <= plans[0]?.assetsNumber) return setUsedPlan(plans[0])

    for (let i = 0; i < plans.length; i++) {
      const p = plans[i]
      const nextP = plans[i + 1]

      if (!nextP) return setUsedPlan(p)

      if (
        nextP &&
        collectionSize > p.assetsNumber &&
        collectionSize <= nextP.assetsNumber
      ) {
        return setUsedPlan(nextP)
      }
    }
  }

  const preview = async () => {
    const newCollection: CollectionI = {
      name: collectionName,
      description: collectionDesc,
      size: 1,
      width,
      height,
      layers,
      results: [],
      metadata: [],
      collectionId: Math.random().toString(16).slice(2),
      network,
      symbol,
      sellerFeeBasisPoints,
      externalUrl,
      creators,
    }

    await generateNFT(newCollection, false, false, "", (data: any) => {
      setPreviewImage(data?.collections[0].image)
      setShowPreview(true)
    })
  }

  const render = () => {
    if (!settings || plans.length === 0) return <NoSettings />

    if (loading) return <Loading size={collectionSize} />

    if (error)
      return (
        <ResultsPanel
          data={data}
          setData={setData}
          setError={setError}
          generate={handleGenerate}
          generationTime={generationTime}
        />
      )

    if (!showResults)
      return (
        <SettingsPanel
          startGenerating={startGenerating}
          usedPlan={usedPlan}
          preview={preview}
          setShowPayment={setShowPayment}
          showPayment={showPayment}
          renderPay={() => (
            <Pay
              description={collectionName}
              amount={usedPlan?.price}
              generate={generate}
              setShowPayment={setShowPayment}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
          )}
        />
      )

    return (
      <ResultsPanel
        data={data}
        setData={setData}
        setError={setError}
        generate={handleGenerate}
        generationTime={generationTime}
      />
    )
  }

  return (
    <>
      <Modal
        show={showPreview}
        onHide={() => {
          setPreviewImage(null)
          setShowPreview(false)
        }}
      >
        <Modal.Body>
          <div className="text-center">
            <div className="mb-3">
              <img src={previewImage} className="img-fluid" width={200} />
            </div>

            <Button className="btn-white btn-sm" onClick={preview}>
              <IoIosSwap /> Randomize
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {render()}
    </>
  )
}

export default Application
