import React from "react"
import { AiOutlineDatabase } from "react-icons/ai"

const NoDataFound = () => {
  return (
    <div className="no-data-found">
      <AiOutlineDatabase size={50} />
      <h6>No data found</h6>
    </div>
  )
}

export default NoDataFound
