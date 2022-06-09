import { useFormikContext } from "formik"
import JSZip from "jszip"
import React, { useContext, useState } from "react"
import { AiOutlineLoading, AiOutlineReload } from "react-icons/ai"
import { HiFolderDownload } from "react-icons/hi"
import { MdModeEditOutline } from "react-icons/md"
import AppContext from "../../context/AppContext"
import Button from "../Button"
import ResultsItem from "./ResultsItem"

interface ResultsPanelProps {
  data: any
  setData: any
  setError: any
  generate: any
  generationTime: string
}

const LIMIT = 54

const ResultsPanel = ({
  data,
  setData,
  setError,
  generate,
  generationTime,
}: ResultsPanelProps) => {
  const { values }: any = useFormikContext()

  const { setShowResults, downloadedFileName } = useContext(AppContext)
  const [downloading, setDownloading] = useState(false)
  const [results, setResults] = useState(data?.collections.slice(0, LIMIT))
  const [currentIndex, setCurrentIndex] = useState(LIMIT)

  const showMore = () => {
    setCurrentIndex(currentIndex + LIMIT)
    setResults([
      ...results,
      ...data?.collections.slice(currentIndex, currentIndex + LIMIT),
    ])
  }

  const downloadZip = async () => {
    setDownloading(true)

    var zip = new JSZip()
    var file: any = zip.folder(downloadedFileName)
    var images: any = file.folder("images")
    var gifs: any
    var meta: any = file.folder("meta")

    if (data?.collections[0].gif) gifs = file.folder("gifs")

    data?.collections.map((element: any, index: number) => {
      var idx = element.image.indexOf("base64,") + "base64,".length
      var content = element.image.substring(idx)
      images.file(`${index + 1}.png`, content, { base64: true })

      // add gifs
      if (element.gif)
        gifs.file(`${index + 1}.gif`, element.gif, { base64: true })

      // add meta
      meta.file(
        `${index + 1}.json`,
        Buffer.from(JSON.stringify(element.meta, null, 4))
      )
    })

    // add meta data
    meta.file(
      `metadata.json`,
      Buffer.from(JSON.stringify(data?.metadata, null, 4))
    )

    // download
    const content = await zip.generateAsync({ type: "blob" })

    setDownloading(false)

    var link = document.createElement("a")
    link.href = window.URL.createObjectURL(content)
    link.download = `${downloadedFileName}.zip`
    link.click()
  }

  const backToEdit = () => {
    window.scrollTo(0, 0)
    setShowResults(false)
    setError(null)
  }

  // Error
  if (!data)
    return (
      <div className="results-panel">
        <header className="text-center">
          <h3 className="mb-3">An Error Occured</h3>
          <h6>Please try again</h6>
        </header>

        {/* show collections */}
        <div className="collection-images">
          <div className="options-bar text-center mb-3">
            <div className="container">
              <Button onClick={backToEdit} className="me-3 btn-sm">
                <MdModeEditOutline /> Back To Edit
              </Button>
              <Button theme="white" onClick={generate} className="me-3 btn-sm">
                <AiOutlineReload /> Regenerate
              </Button>
            </div>
          </div>
        </div>
      </div>
    )

  // Show Data
  return (
    <div className="results-panel">
      <header className="text-center">
        <h3 className="mb-3">{values.collectionName} Collection</h3>
        <h6>
          {values.collectionSize} Item
          {values.collectionSize > 1 && "s"}
        </h6>

        <div className="mt-3">
          {generationTime && (
            <p style={{ opacity: 0.6 }}>Generation Time: {generationTime}</p>
          )}
        </div>
      </header>

      {/* show collections */}
      <div className="collection-images">
        <div className="options-bar text-center mb-3">
          <div className="container">
            <Button onClick={backToEdit} className="me-3 btn-sm">
              <MdModeEditOutline /> Back To Edit
            </Button>
            <Button theme="white" onClick={generate} className="me-3 btn-sm">
              <AiOutlineReload /> Regenerate
            </Button>
            <Button theme="white" onClick={downloadZip} className="btn-sm">
              {downloading ? (
                <AiOutlineLoading className="loading-icon" />
              ) : (
                <HiFolderDownload />
              )}{" "}
              Download
            </Button>
          </div>
        </div>

        <div className="container">
          <div className="collections-block">
            <div className="row">
              {results.map(({ image, gif }: any, index: number) => {
                return (
                  <div className="col-md-2 col-6" key={`result-item-${index}`}>
                    <ResultsItem
                      image={image}
                      gif={gif ? URL.createObjectURL(gif) : null}
                    />
                  </div>
                )
              })}

              {results.length < data.collections.length && (
                <div className="text-center mt-5">
                  <Button className="btn-sm" onClick={showMore}>
                    Show More
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsPanel
