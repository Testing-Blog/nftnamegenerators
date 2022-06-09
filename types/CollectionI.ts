import LayerI from "./LayerI"
import NetworkType from "./Network"

interface ResultI {
  image: any
  meta: any
  gif?: any
}

export default interface CollectionI {
  collectionId: string
  name: string
  description: string
  size: number
  width?: number
  height?: number
  layers?: LayerI[]
  useGif?: boolean
  results?: ResultI[]
  metadata?: any[]
  network: NetworkType
  symbol: string
  sellerFeeBasisPoints: string
  externalUrl: string
  creators: any[]
}
