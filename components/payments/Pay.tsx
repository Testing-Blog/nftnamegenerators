import React, { useContext, useEffect, useState } from "react"
import { BiCheck } from "react-icons/bi"
import { convertToEth } from "../../helpers/utils"
import Button from "../Button"
import Heading from "../Heading"
import Metamask from "./Metamask"
import Paypal from "./Paypal"
import Image from "next/image"

import metamaskIcon from "../../assets/icons/metamask.png"
import paypalIcon from "../../assets/icons/paypal.png"
import stripeIcon from "../../assets/icons/stripe.png"
import razorpayIcon from "../../assets/icons/razorpay.svg"
import AppContext from "../../context/AppContext"
import payMethodsType from "../../types/payMethods"
import Stripe from "./Stripe"
import Razorpay from "./Razorpay"

interface PayProps {
  description: string
  amount: number
  generate: any
  setShowPayment: any
  paymentMethod: payMethodsType
  setPaymentMethod: any
}

const Pay = ({
  description,
  amount,
  generate,
  setShowPayment,
  paymentMethod,
  setPaymentMethod,
}: PayProps) => {
  const [payText, setPayText] = useState()
  const { settings } = useContext(AppContext)

  useEffect(() => {
    if (settings?.isPaypal) setPaymentMethod("paypal")
    else if (settings?.isMetamask) setPaymentMethod("metamask")
    else if (settings?.isStripe) setPaymentMethod("stripe")
    else if (settings?.isRazorpay) setPaymentMethod("razorpay")
  }, [])

  useEffect(() => {
    getAmount().then((a: any) => setPayText(a))
  }, [paymentMethod])

  const getAmount = async () => {
    if (paymentMethod === "metamask") {
      const ethAmount = await convertToEth(amount, settings?.currency)
      return ethAmount + "ETH"
    }

    return amount + settings?.currency
  }

  const paymentMehodItem = (method: payMethodsType, img: any) => (
    <li className={`${paymentMethod === method ? "active" : ""}`}>
      <button onClick={() => setPaymentMethod(method)}>
        {paymentMethod === method && (
          <span className="check-icon">
            <BiCheck />
          </span>
        )}
        <div>
          <Image src={img} />
        </div>
      </button>
    </li>
  )

  return (
    <div className="settings-panel pt-5">
      <div className="container">
        {paymentMethod === undefined ? (
          <>
            <p>No payment method is available</p>
          </>
        ) : (
          <>
            <Heading
              title="Purchase"
              subTitle="Pay safely"
              paragraph={`Pay ${payText} with ${paymentMethod.toUpperCase()}`}
              className="mb-2"
            />

            <div>
              {/* TOP */}
              <div>
                <ul className="select-payment-methods">
                  {settings?.isPaypal && paymentMehodItem("paypal", paypalIcon)}
                  {settings?.isMetamask &&
                    paymentMehodItem("metamask", metamaskIcon)}
                  {settings?.isStripe && paymentMehodItem("stripe", stripeIcon)}
                  {settings?.isRazorpay &&
                    paymentMehodItem("razorpay", razorpayIcon)}
                </ul>
              </div>

              {/* BOTTOM */}
              <div className="selected-payment-method">
                {paymentMethod === "paypal" && (
                  <Paypal
                    description={description}
                    amount={amount}
                    generate={generate}
                  />
                )}

                {paymentMethod === "metamask" && (
                  <Metamask amount={amount} generate={generate} />
                )}

                {paymentMethod === "stripe" && (
                  <Stripe
                    description={description}
                    amount={amount}
                    generate={generate}
                  />
                )}

                {paymentMethod === "razorpay" && (
                  <Razorpay
                    description={description}
                    amount={amount}
                    generate={generate}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Pay
