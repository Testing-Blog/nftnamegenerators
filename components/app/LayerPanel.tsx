import React, { useContext, useEffect, useState } from "react"
import { BsLayers } from "react-icons/bs"
import AppContext from "../../context/AppContext"
import { blendList } from "../../helpers/constants"
import ImagesUploader from "./ImagesUploader"
import FormControl from "./FormControl"
import CheckBox from "./CheckBox"
import SelectBox from "./SelectBox"
import RangeBox from "./RangeBox"
import { layersSchema } from "../../helpers/schemas"
import { showToast } from "../../helpers/utils"

function LayerPanel() {
  const { activeLayerId, layers, setLayers } = useContext(AppContext)
  const [updateTotalPoints, setUpdateTotalPoints] = useState(false)

  const activeLayer = layers.find((layer) => layer.id === activeLayerId)

  const changeName = async (value: string) => {
    try {
      const newLayers = [...layers]
      const index = newLayers.findIndex((layer) => layer.id === activeLayerId)
      newLayers[index].name = value

      await layersSchema.validate({
        layers: newLayers,
      })

      setLayers([...newLayers])
    } catch (error: any) {
      showToast(error.message, "error")
    }
  }

  const changeImages = async (
    newImageList: any,
    addUpdateIndex: any,
    rarity: number
  ) => {
    const list: any = []
    const newLayers = [...layers]
    const index = newLayers.findIndex((layer) => layer.id === activeLayerId)

    newImageList?.forEach((e: any, index: number) => {
      const item: any = {}
      const layer: any = layers.find((layer) => layer.id === activeLayerId)

      if (rarity) {
        if (addUpdateIndex === index) {
          item.rarity = parseFloat(rarity.toFixed(1)) ? rarity : 0
        } else {
          item.rarity = layer?.images[index].rarity
        }
      } else {
        if (!layer?.images[index]?.rarity) item.rarity = 50
        else item.rarity = layer?.images[index].rarity
      }

      item.data_url = e.data_url
      list.push(item)
    })

    newLayers[index].images = [...list]
    setLayers([...newLayers])

    setUpdateTotalPoints(true)
  }

  useEffect(() => {
    if (updateTotalPoints && layers.length > 0) {
      const newLayers = [...layers]
      const index = newLayers.findIndex((layer) => layer.id === activeLayerId)

      if (index >= 0) {
        let newTotalPoints = 0
        activeLayer?.images?.map((img) => {
          newTotalPoints += img.rarity
        })

        newLayers[index].totalPoints = Number.parseInt(
          newTotalPoints.toFixed(0)
        )
        setLayers([...newLayers])
      }

      setUpdateTotalPoints(false)
    }
  }, [updateTotalPoints])

  const toggleDNA = (e: any) => {
    const newLayers = [...layers]
    const index = newLayers.findIndex((layer) => layer.id === activeLayerId)
    newLayers[index].options.bypassDNA = e.target.checked
    setLayers([...newLayers])
  }

  const chooseBlend = (e: any) => {
    const newLayers = [...layers]
    const index = newLayers.findIndex((layer) => layer.id === activeLayerId)
    newLayers[index].options.blend = e.target.value
    setLayers([...newLayers])
  }

  const changeOpacity = (e: any) => {
    const newLayers = [...layers]
    const index = newLayers.findIndex((layer) => layer.id === activeLayerId)
    newLayers[index].options.opacity = parseFloat(e.target.value)
    setLayers([...newLayers])
  }

  const toggleIsAdvanced = (e: any) => {
    const newLayers = [...layers]
    const index = newLayers.findIndex((layer) => layer.id === activeLayerId)
    newLayers[index].isAdvanced = e.target.checked
    setLayers([...newLayers])
  }

  if (!activeLayerId || layers.length === 0)
    return (
      <div className="text-center">
        <BsLayers size={50} color="rgba(27, 22, 66, 0.6)" />
        <h5 className="mt-3">No layer selected</h5>
      </div>
    )

  return (
    <div>
      {/* Name */}
      <CheckBox
        checked={activeLayer?.isAdvanced}
        onCheck={toggleIsAdvanced}
        label="Show advanced"
      />

      <FormControl
        label="Layer name"
        type="text"
        value={activeLayer?.name || ""}
        onChange={changeName}
        className="mb-4"
      />

      {/* Images */}
      <label className="form-title mb-2">Images</label>
      <ImagesUploader onChange={changeImages} className="mb-4" />

      <div className="row">
        <div className="col-md-4">
          {/* blend */}
          <SelectBox
            label="Blend"
            value={activeLayer?.options.blend}
            onChange={chooseBlend}
            hint="You can play around with different blending modes"
          >
            {blendList.map((blend: any, index: number) => (
              <option key={`blend-${index}`} value={blend}>
                {blend}
              </option>
            ))}
          </SelectBox>
        </div>

        <div className="col-md-4">
          {/* opacity */}
          <RangeBox
            label="Opacity"
            value={activeLayer?.options.opacity}
            onChange={changeOpacity}
          />
        </div>

        <div className="col-md-4">
          {/* bypassDNA */}
          <CheckBox
            checked={activeLayer?.options.bypassDNA}
            onCheck={toggleDNA}
            label="By Pass DNA"
            hint="If you want this layer to be ignored in the DNA uniqueness check, you can check By Pass DNA"
          />
        </div>
      </div>
    </div>
  )
}

export default LayerPanel
