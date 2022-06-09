import { startCreating } from "../helpers/generator"

export function blobToFile(theBlob: Blob, fileName: string): File {
  var b: any = theBlob
  b.lastModifiedDate = new Date()
  b.name = fileName

  return <File>theBlob
}

export function dataURItoBlob(dataURI: any) {
  var byteString = atob(dataURI.split(",")[1])
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]
  var ab = new ArrayBuffer(byteString.length)
  var ia = new Uint8Array(ab)

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  var blob = new Blob([ab], { type: mimeString })
  return blob
}

export function dataURLtoFile(dataurl: string, filename: string) {
  var arr: any = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  return new File([u8arr], filename, { type: mime })
}

export const generateNFT = async (
  {
    layers,
    size,
    name,
    description,
    width,
    height,
    network,
    symbol,
    sellerFeeBasisPoints,
    externalUrl,
    creators,
  }: any,
  useGif: boolean,
  watermark: boolean,
  watermarkText: string,
  callback: any
) => {
  try {
    const metadata = {
      symbol,
      seller_fee_basis_points: sellerFeeBasisPoints,
      external_url: externalUrl,
      creators,
    }

    const layerConfigurations = [
      {
        growEditionSizeTo: size,
        layersOrder: layers.slice().reverse(),
      },
    ]

    const data = await startCreating({
      layerConfigurations,
      name,
      description,
      width,
      height,
      network,
      watermark,
      watermarkText,
      useGif,
      callback,
      metadata,
    })

    return data
  } catch (error) {
    throw error
  }
}
