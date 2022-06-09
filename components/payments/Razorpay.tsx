import React, { useCallback, useContext } from "react"
import useRazorpay, { RazorpayOptions } from "react-razorpay"
import AppContext from "../../context/AppContext"
import { getPaymentAmount } from "../../helpers/constants"
import Button from "../Button"

{
  /* rzp_test_1LSLW0Q9OVb9Tu */
}
{
  /* 7n7TEG8RZiVUH1jy8uqClxtd */
}

interface RazorpayProps {
  description: string
  amount: any
  generate: any
}

const Razorpay = ({ description, amount, generate }: RazorpayProps) => {
  const Razorpay = useRazorpay()
  const { settings } = useContext(AppContext)

  const handlePayment = useCallback(() => {
    const options: RazorpayOptions = {
      key: settings?.razorpayPublicKey,
      amount: getPaymentAmount(amount, settings?.currency) + "",
      currency: settings?.currency,
      name: description,
      description,
      order_id: "",
      handler: async (res) => {
        await generate()
      },
    }

    const rzpay = new Razorpay(options)
    rzpay.open()
  }, [Razorpay])

  return (
    <div className="text-center">
      <Button className="btn-sm" onClick={handlePayment}>
        Pay now
      </Button>
    </div>
  )
}

export default Razorpay
