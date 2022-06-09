import React from "react"
import * as Yup from "yup"
import { getSession, getProviders } from "next-auth/react"
import Page from "../components/Page"
import { Form, Formik } from "formik"
import FormControl from "../components/FormControl"
import Button from "../components/Button"
import axios from "axios"
import { showToast } from "../helpers/utils"
import OtherLogin from "../components/OtherLogin"
import { PrismaClient } from "@prisma/client"

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

export async function getServerSideProps(context: any) {
  const { req } = context
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    }
  }

  const prisma = new PrismaClient()
  const settings = await prisma.settings.findFirst()

  return {
    props: {
      providers: await getProviders(),
      settings: settings || {},
    },
  }
}

const register = ({ providers, settings }: any) => {
  const handleRegister = async (values: any) => {
    try {
      const { data } = await axios.post("/api/auth/register", {
        ...values,
      })
      if (!data.success) return showToast(data.message, "error")
      showToast(data.message, "success")
    } catch (error: any) {
      showToast(error.message, "error")
    }
  }

  return (
    <Page title="Register" settings={settings}>
      <div className="login-page">
        <div className="container">
          <div className="inside-container">
            <h5>Sign up</h5>

            <div>
              <Formik
                initialValues={{}}
                validationSchema={RegisterSchema}
                onSubmit={handleRegister}
              >
                {(form) => (
                  <Form>
                    <FormControl
                      type="text"
                      name="name"
                      placeholder="Your Name"
                    />
                    <FormControl
                      type="email"
                      name="email"
                      placeholder="Your Email"
                    />
                    <FormControl
                      type="password"
                      name="password"
                      placeholder="Your Password"
                    />

                    <div className="text-center">
                      <Button className="btn-sm" type="submit">
                        Sign up
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            <OtherLogin providers={providers} settings={settings} />
          </div>
        </div>
      </div>
    </Page>
  )
}

export default register
