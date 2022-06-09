import { Stripe, loadStripe } from "@stripe/stripe-js"
import moment from "moment"
import { toast } from "react-toastify"

export const formatDate = (date: any) => moment(date).format("MM/DD/YYYY")

export const showToast = (
  message: string,
  type: "info" | "success" | "warning" | "error" | "default"
) => {
  toast(message, {
    type,
    hideProgressBar: true,
  })
}

const DNA_DELIMITER = "-"
const rarityDelimiter = "#"

export const filterDNAOptions = (_dna: any) => {
  const dnaItems = _dna.split(DNA_DELIMITER)
  const filteredDNA = dnaItems.filter((element: any) => {
    const query = /(\?.*$)/
    const querystring = query.exec(element)
    if (!querystring) {
      return true
    }
    const options: any = querystring[1].split("&").reduce((r, setting) => {
      const keyPairs = setting.split("=")
      return { ...r, [keyPairs[0]]: keyPairs[1] }
    }, [])

    return options.bypassDNA
  })

  return filteredDNA.join(DNA_DELIMITER)
}

export const isDnaUnique = (_DnaList = new Set(), _dna = "") => {
  const _filteredDNA = filterDNAOptions(_dna)
  return !_DnaList.has(_filteredDNA)
}

export const createDna = (_layers: any) => {
  let randNum: any = []
  _layers.forEach((layer: any) => {
    var totalWeight = 0
    layer.elements.forEach((element: any) => {
      totalWeight += element.weight
    })
    // number between 0 - totalWeight
    let random = Math.floor(Math.random() * totalWeight)
    for (var i = 0; i < layer.elements.length; i++) {
      // subtract the current weight from the random weight until we reach a sub zero value.
      random -= layer.elements[i].weight
      if (random < 0) {
        return randNum.push(
          `${layer.elements[i].id}:${layer.elements[i].filename}${
            layer.bypassDNA ? "?bypassDNA=true" : ""
          }`
        )
      }
    }
  })
  return randNum.join(DNA_DELIMITER)
}

export const layersSetup = (layersOrder: any) => {
  const layers = layersOrder.map((layerObj: any, index: any) => {
    return {
      id: index,
      elements: getElements(layerObj.images),
      name:
        layerObj.options?.["displayName"] != undefined
          ? layerObj.options?.["displayName"]
          : layerObj.name,
      blend:
        layerObj.options?.["blend"] != undefined
          ? layerObj.options?.["blend"]
          : "source-over",
      opacity:
        layerObj.options?.["opacity"] != undefined
          ? layerObj.options?.["opacity"]
          : 1,
      bypassDNA:
        layerObj.options?.["bypassDNA"] !== undefined
          ? layerObj.options?.["bypassDNA"]
          : false,
    }
  })
  return layers
}

const getElements = (images: any) => {
  return images.map((image: any, index: any) => {
    const { file, rarity } = image
    return {
      id: index,
      name: cleanName(file.name),
      filename: file.name,
      weight: rarity,
    }
  })
}

const cleanName = (_str: any) => {
  let nameWithoutExtension = _str.slice(0, -4)
  var nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift()
  return nameWithoutWeight
}

export const convertToEth = async (amount: number, currency: string) => {
  const response = await fetch(
    `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=${currency}`
  )

  const data = await response.json()

  const convertAmount = data[Object.keys(data)[0]]
  return Number.parseFloat((amount / convertAmount).toFixed(3))
}

let stripePromise: Promise<Stripe | null>
export const getStripe = (publishableKey: string) => {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey)
  }
  return stripePromise
}

export function millisToMinutesAndSeconds(millis: any) {
  const minutes: any = Math.floor(millis / 60000)
  const seconds: any = ((millis % 60000) / 1000).toFixed(2)

  if (minutes == 0) return `${seconds} seconds`
  return `${minutes} minutes and ${seconds} seconds`
}

export const currency_codes = [
  "AFA",
  "ALL",
  "DZD",
  "AOA",
  "ARS",
  "AMD",
  "AWG",
  "AUD",
  "AZN",
  "BSD",
  "BHD",
  "BDT",
  "BBD",
  "BYR",
  "BEF",
  "BZD",
  "BMD",
  "BTN",
  "BTC",
  "BOB",
  "BAM",
  "BWP",
  "BRL",
  "GBP",
  "BND",
  "BGN",
  "BIF",
  "KHR",
  "CAD",
  "CVE",
  "KYD",
  "XOF",
  "XAF",
  "XPF",
  "CLP",
  "CNY",
  "COP",
  "KMF",
  "CDF",
  "CRC",
  "HRK",
  "CUC",
  "CZK",
  "DKK",
  "DJF",
  "DOP",
  "XCD",
  "EGP",
  "ERN",
  "EEK",
  "ETB",
  "EUR",
  "FKP",
  "FJD",
  "GMD",
  "GEL",
  "DEM",
  "GHS",
  "GIP",
  "GRD",
  "GTQ",
  "GNF",
  "GYD",
  "HTG",
  "HNL",
  "HKD",
  "HUF",
  "ISK",
  "INR",
  "IDR",
  "IRR",
  "IQD",
  "ILS",
  "ITL",
  "JMD",
  "JPY",
  "JOD",
  "KZT",
  "KES",
  "KWD",
  "KGS",
  "LAK",
  "LVL",
  "LBP",
  "LSL",
  "LRD",
  "LYD",
  "LTL",
  "MOP",
  "MKD",
  "MGA",
  "MWK",
  "MYR",
  "MVR",
  "MRO",
  "MUR",
  "MXN",
  "MDL",
  "MNT",
  "MAD",
  "MZM",
  "MMK",
  "NAD",
  "NPR",
  "ANG",
  "TWD",
  "NZD",
  "NIO",
  "NGN",
  "KPW",
  "NOK",
  "OMR",
  "PKR",
  "PAB",
  "PGK",
  "PYG",
  "PEN",
  "PHP",
  "PLN",
  "QAR",
  "RON",
  "RUB",
  "RWF",
  "SVC",
  "WST",
  "SAR",
  "RSD",
  "SCR",
  "SLL",
  "SGD",
  "SKK",
  "SBD",
  "SOS",
  "ZAR",
  "KRW",
  "XDR",
  "LKR",
  "SHP",
  "SDG",
  "SRD",
  "SZL",
  "SEK",
  "CHF",
  "SYP",
  "STD",
  "TJS",
  "TZS",
  "THB",
  "TOP",
  "TTD",
  "TND",
  "TRY",
  "TMT",
  "UGX",
  "UAH",
  "AED",
  "UYU",
  "USD",
  "UZS",
  "VUV",
  "VEF",
  "VND",
  "YER",
  "ZMK",
]
