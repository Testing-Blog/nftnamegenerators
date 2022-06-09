import React from "react"
import { AiOutlineLoading } from "react-icons/ai"
import { millisToMinutesAndSeconds } from "../../helpers/utils"

interface LoadingProps {}

// 1 items => 0.1 seconds
//

const Loading = ({ size }: any) => {
  return (
    <div className="loading">
      <div className="title">Generating Collection...</div>
      <div className="subtitle mt-2 mb-5">
        It may take up to {millisToMinutesAndSeconds(size * 60)}
      </div>
      <AiOutlineLoading size={70} className="icon" />
    </div>
  )
}

export default Loading
