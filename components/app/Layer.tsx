import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineModeEdit } from "react-icons/md";

interface LayerProps {
  id: string;
  name: string;
  activeLayerId: string | null | undefined;
  selectLayer: any;
  removeLayer: any;
}

function Layer({
  id,
  name,
  activeLayerId,
  selectLayer,
  removeLayer,
}: LayerProps) {
  return (
    <li
      className={`d-flex align-items-center app-layer ${
        id === activeLayerId ? "active" : ""
      }`}
      onClick={() => selectLayer(id)}
    >
      <div className="layer-name">{name}</div>
      <div>
        <button className="remove-btn" onClick={(e) => removeLayer(e, id)}>
          <AiOutlineCloseCircle />
        </button>
      </div>
    </li>
  );
}

export default Layer;
