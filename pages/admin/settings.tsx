import React from "react"
import * as Yup from "yup"
import { Form, Formik } from "formik"
import FormControl from "../../components/FormControl"
import Button from "../../components/Button"
import { currency_codes, showToast } from "../../helpers/utils"
import axios from "axios"
import { PrismaClient } from "@prisma/client"
import AdminPage from "."

interface settingsProps {
  data: any
}

const SettingsSchema = Yup.object().shape({
  businessName: Yup.string().required(),
  currency: Yup.string().required(),

  smtpEmail: Yup.string().email(),
  smtpPassword: Yup.string(),
  smtpHost: Yup.string(),
  smtpPort: Yup.number().min(0).nullable(),

  isGithub: Yup.boolean().required(),
  githubId: Yup.string()
    .nullable()
    .when("isGithub", {
      is: (field: any) => field === true,
      then: Yup.string().required(),
    }),
  githubSecret: Yup.string()
    .nullable()
    .when("isGithub", {
      is: (field: any) => field === true,
      then: Yup.string().required(),
    }),

  isGoogle: Yup.boolean().required(),
  googleId: Yup.string()
    .nullable()
    .when("isGoogle", {
      is: (field: any) => field === true,
      then: Yup.string().required(),
    }),
  googleSecret: Yup.string()
    .nullable()
    .when("isGoogle", {
      is: (field: any) => field === true,
      then: Yup.string().required(),
    }),

  isFacebook: Yup.boolean().required(),
  facebookId: Yup.string()
    .nullable()
    .when("isFacebook", {
      is: (field: any) => field === true,
      then: Yup.string().required(),
    }),
  facebookSecret: Yup.string()
    .nullable()
    .when("isFacebook", {
      is: (field: any) => field === true,
      then: Yup.string().required(),
    }),

  isMetamaskAuth: Yup.boolean().required(),

  isPaypal: Yup.boolean().required(),
  paypalClientId: Yup.string().when("isPaypal", {
    is: (field: any) => field === true,
    then: Yup.string().required(),
  }),

  isMetamask: Yup.boolean().required(),
  metamaskAddress: Yup.string().when("isMetamask", {
    is: (field: any) => field === true,
    then: Yup.string().required(),
  }),

  isStripe: Yup.boolean().required(),
  stripePublishableKey: Yup.string().when("isStripe", {
    is: (field: any) => field === true,
    then: Yup.string().required(),
  }),
  stripeSecretKey: Yup.string().when("isStripe", {
    is: (field: any) => field === true,
    then: Yup.string().required(),
  }),

  isRazorpay: Yup.boolean().required(),
  razorpayPublicKey: Yup.string().when("isRazorpay", {
    is: (field: any) => field === true,
    then: Yup.string().required(),
  }),

  watermarkText: Yup.string().max(20).nullable(),

  googleAnalyticsTrackingCode: Yup.string(),
})

export async function getServerSideProps(context: any) {
  const prisma = new PrismaClient()
  const settings = await prisma.settings.findFirst()

  return {
    props: {
      data: settings,
    },
  }
}

const settings = ({ data }: settingsProps) => {
  const save = async (values: any) => {
    try {
      const { data } = await axios.post("/api/admin/settings", {
        ...values,
      })

      if (!data.success) return showToast(data.message, "error")

      showToast(data.message, "success")
    } catch (error: any) {
      showToast(error.message, "error")
    }
  }

  return (
    <AdminPage settings={data}>
      <Formik
        initialValues={
          data
            ? {
                ...data,
              }
            : {
                businessName: "",
                currency: "",
                smtpEmail: "",
                smtpPassword: "",
                smtpHost: "",
                smtpPort: null,
                isGithub: false,
                githubId: "",
                githubSecret: "",

                isGoogle: false,
                googleId: "",
                googleSecret: "",

                isFacebook: false,
                facebookId: "",
                facebookSecret: "",

                isMetamaskAuth: false,

                isPaypal: false,
                paypalClientId: "",

                isMetamask: false,
                metamaskAddress: "",

                isStripe: false,
                stripePublishableKey: "",
                stripeSecretKey: "",

                isRazorpay: false,
                razorpayPublicKey: "",

                watermarkText: "",

                googleAnalyticsTrackingCode: "",
              }
        }
        validationSchema={SettingsSchema}
        onSubmit={save}
      >
        {({ values }) => (
          <Form>
            {/* App info */}
            <div className="mb-3">
              <h5>App info</h5>
              <div className="row">
                <div className="col-md-6">
                  <FormControl
                    type="text"
                    name="businessName"
                    placeholder="Business name"
                  />
                </div>
                <div className="col-md-6">
                  <FormControl
                    placeholder="Currency"
                    type="select"
                    name="currency"
                  >
                    {currency_codes.map((code) => (
                      <option value={code}>{code}</option>
                    ))}
                  </FormControl>
                </div>
              </div>
            </div>

            {/* SMTP */}
            <div className="mb-3">
              <h5>SMTP</h5>
              <div className="row">
                <div className="col-md-3">
                  <FormControl
                    type="text"
                    name="smtpEmail"
                    placeholder="Email"
                  />
                </div>
                <div className="col-md-3">
                  <FormControl
                    type="password"
                    name="smtpPassword"
                    placeholder="Password"
                  />
                </div>
                <div className="col-md-3">
                  <FormControl type="text" name="smtpHost" placeholder="Host" />
                </div>
                <div className="col-md-3">
                  <FormControl type="text" name="smtpPort" placeholder="Port" />
                </div>
              </div>
            </div>

            {/* Auth */}
            <div className="mb-3">
              <h5>Authentication</h5>
              <div className="row">
                <div>
                  <FormControl
                    type="checkbox"
                    name="isGithub"
                    placeholder="Github"
                  />

                  {values.isGithub && (
                    <>
                      <FormControl
                        type="text"
                        name="githubId"
                        placeholder="Github Id"
                      />
                      <FormControl
                        type="password"
                        name="githubSecret"
                        placeholder="Github Secret Key"
                      />
                    </>
                  )}
                </div>

                <div>
                  <FormControl
                    type="checkbox"
                    name="isGoogle"
                    placeholder="Google"
                  />

                  {values.isGoogle && (
                    <>
                      <FormControl
                        type="text"
                        name="googleId"
                        placeholder="Google Id"
                      />
                      <FormControl
                        type="password"
                        name="googleSecret"
                        placeholder="Google Secret Key"
                      />
                    </>
                  )}
                </div>

                <div>
                  <FormControl
                    type="checkbox"
                    name="isFacebook"
                    placeholder="Facebook"
                  />

                  {values.isFacebook && (
                    <>
                      <FormControl
                        type="text"
                        name="facebookId"
                        placeholder="Facebook Id"
                      />
                      <FormControl
                        type="password"
                        name="facebookSecret"
                        placeholder="Facebook Secret Key"
                      />
                    </>
                  )}
                </div>

                <div>
                  <FormControl
                    type="checkbox"
                    name="isMetamaskAuth"
                    placeholder="Metamask"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="mb-3">
              <h5>Payment</h5>
              <div className="row">
                <div className="">
                  <FormControl
                    type="checkbox"
                    name="isPaypal"
                    placeholder="Paypal"
                  />
                  {values.isPaypal && (
                    <FormControl
                      type="text"
                      name="paypalClientId"
                      placeholder="Paypal Client Id"
                    />
                  )}
                </div>
                <div className="">
                  <FormControl
                    type="checkbox"
                    name="isMetamask"
                    placeholder="Metamask"
                  />
                  {values.isMetamask && (
                    <FormControl
                      type="text"
                      name="metamaskAddress"
                      placeholder="Your Metamask Address"
                    />
                  )}
                </div>
                <div className="">
                  <FormControl
                    type="checkbox"
                    name="isStripe"
                    placeholder="Stripe"
                  />
                  {values.isStripe && (
                    <>
                      <FormControl
                        type="text"
                        name="stripePublishableKey"
                        placeholder="Stripe Publishable Key"
                      />
                      <FormControl
                        type="password"
                        name="stripeSecretKey"
                        placeholder="Stripe Secret Key"
                      />
                    </>
                  )}
                </div>
                <div className="">
                  <FormControl
                    type="checkbox"
                    name="isRazorpay"
                    placeholder="Razorpay"
                  />
                  {values.isRazorpay && (
                    <FormControl
                      type="text"
                      name="razorpayPublicKey"
                      placeholder="Razorpay Public Key"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="mb-3">
              <h5>Google Analytics</h5>
              <FormControl
                type="text"
                name="googleAnalyticsTrackingCode"
                placeholder="Google Analytics Tracking Code"
              />
            </div>

            {/* Other */}
            <div>
              <h5>Other</h5>
              <FormControl
                type="text"
                name="watermarkText"
                placeholder="Watermark Text"
              />

              <div className="text-center mt-4">
                <Button className="btn-white" type="submit">
                  Save
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </AdminPage>
  )
}

export default settings
