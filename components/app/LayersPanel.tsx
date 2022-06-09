import React, { useContext, useState } from "react"
import { IoMdAddCircleOutline } from "react-icons/io"
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from "react-sortable-hoc"
import AppContext from "../../context/AppContext"
import { blendList } from "../../helpers/constants"
import { showToast } from "../../helpers/utils"
import LayerI from "../../types/LayerI"
import Layer from "./Layer"

function LayersPanel() {
  const { layers, setLayers, activeLayerId, setActiveLayerId } =
    useContext(AppContext)

  const [value, setValue] = useState("")

  const addLayer = (value: string) => {
    setLayers([
      ...layers,
      {
        id: Math.random().toString(16).slice(2),
        name: value,
        images: [],
        options: {
          bypassDNA: false,
          blend: blendList[0],
          opacity: 1,
        },
        totalPoints: 0,
      },
    ])
  }

  const removeLayer = (e: any, id: string) => {
    e.stopPropagation()
    setActiveLayerId(null)
    setLayers(layers.filter((layer) => layer.id !== id))
  }

  const selectLayer = (id: string) => {
    setActiveLayerId(id)
  }

  const SortableItem: any = SortableElement(({ name, id }: any) => (
    <Layer
      id={id}
      name={name}
      activeLayerId={activeLayerId}
      selectLayer={selectLayer}
      removeLayer={removeLayer}
    />
  ))

  const SortableList: any = SortableContainer(({ items }: any) => {
    return (
      <ul className="list-unstyled">
        {items.map(({ id, name }: LayerI, index: any) => (
          <SortableItem key={`item-${id}`} index={index} name={name} id={id} />
        ))}
      </ul>
    )
  })

  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    setLayers(arrayMove(layers, oldIndex, newIndex))
  }

  const onSubmit = () => {
    if (!value) return showToast("Please enter a layer name", "error")
    if (layers.map((layer) => layer.name).includes(value))
      return showToast("This name is already used", "error")

    addLayer(value)
    setValue("")
  }

  return (
    <div className="layers-panel">
      <SortableList
        items={layers}
        onSortEnd={onSortEnd}
        lockOffset={["0%", "10%"]}
        distance={1}
      />

      <div className="app-layer add-layer">
        <input
          type="text"
          placeholder="New Layer"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key !== "Enter") return
            e.preventDefault()
            onSubmit()
          }}
        />
        <button type="button" onClick={onSubmit}>
          <IoMdAddCircleOutline size={20} />
        </button>
      </div>
    </div>
  )
}

export default LayersPanel
