import React from "react"
import DataI from "../types/DataI"
import LayerI from "../types/LayerI"

interface AppContextInterface {
  layers: LayerI[]
  setLayers: any
  activeLayerId: string | null
  setActiveLayerId: any
  loading: boolean
  setLoading: any
  setData: any
  data: DataI | undefined
  showResults: boolean
  setShowResults: any
  settings: any
  downloadedFileName: string
}

const AppContext = React.createContext<AppContextInterface>({
  layers: [],
  setLayers: null,
  activeLayerId: null,
  setActiveLayerId: null,
  loading: false,
  data: undefined,
  showResults: false,
  setShowResults: null,
  settings: null,
  downloadedFileName: "",
  setLoading: null,
  setData: null,
})

export default AppContext
