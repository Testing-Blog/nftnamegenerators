import React, { useContext, useEffect, useState } from "react"
import { ethers } from "ethers"
import { convertToEth, showToast } from "../../helpers/utils"
import Button from "../Button"
import AppContext from "../../context/AppContext"

interface MetamaskProps {
  amount: any
  generate: any
}

const Metamask = ({ amount, generate }: MetamaskProps) => {
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState("")
  const { settings } = useContext(AppContext)

  useEffect(() => {
    connectToWallet()
  })

  const connectToWallet = async () => {
    const win: any = window

    if (!win.ethereum)
      return showToast("Please install metamask extension", "error")

    const res = await win.ethereum.request({
      method: "eth_requestAccounts",
    })

    // Setting the address
    const accountAddress = res[0]
    setAddress(accountAddress)
  }

  const handlePayment = async () => {
    try {
      const win: any = window
      setLoading(true)

      const ether: any = win.ethereum
      const provider = new ethers.providers.Web3Provider(ether)
      const signer = provider.getSigner()

      ethers.utils.getAddress(settings?.metamaskAddress)

      // get amount
      const ethAmount = await convertToEth(amount, settings?.currency)

      await signer.sendTransaction({
        to: settings?.metamaskAddress,
        value: ethers.utils.parseEther(ethAmount + ""),
      })

      await generate(ethAmount)
    } catch (error: any) {
      console.log(error)

      if (error.code === "UNSUPPORTED_OPERATION") return setAddress("")

      if (error.code === "INSUFFICIENT_FUNDS")
        return showToast("Insufficient funds", "error")

      if (error.code === "INVALID_ARGUMENT")
        return showToast("Receiver address is invalid", "error")

      showToast(error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="metamask-payment text-center">
      {!address && (
        <Button className="btn-sm" onClick={connectToWallet}>
          Connect To Your wallet
        </Button>
      )}

      {address && (
        <>
          <div className="mb-4">
            <h5>You Are Connected As</h5>
            <p className="paragraph">{address}</p>
          </div>

          <Button className="btn-sm" onClick={handlePayment} loading={loading}>
            Pay now
          </Button>
        </>
      )}
    </div>
  )
}

export default Metamask
