import React, { useEffect } from "react"
import * as Yup from "yup"
import { signIn, getSession, getProviders } from "next-auth/react"
import Page from "../components/Page"
import { Form, Formik } from "formik"
import FormControl from "../components/FormControl"
import Button from "../components/Button"
import { showToast } from "../helpers/utils"

import OtherLogin from "../components/OtherLogin"
import { PrismaClient } from "@prisma/client"

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
})

export async function getServerSideProps(context: any) {
  const { req, query } = context
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: { destination: query.callbackUrl ? query.callbackUrl : "/" },
    }
  }

  const prisma = new PrismaClient()
  const settings = await prisma.settings.findFirst()

  return {
    props: {
      providers: await getProviders(),
      settings: settings || {},
      error: query.error || null,
    },
  }
}

const login = ({ providers, settings, error }: any) => {
  useEffect(() => {
    if (error) showToast(error, "error")
  }, [])

  return (
    <Page title="Login" settings={settings}>
      <div className="login-page">
        <div className="container">
          <div className="inside-container">
            <h5>Sign in</h5>

            {/* Login with email and password */}
            <div>
              <Formik
                initialValues={{}}
                validationSchema={LoginSchema}
                onSubmit={(values) => signIn("email-password-login", values)}
              >
                {(form) => (
                  <Form>
                    <FormControl
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                    <FormControl
                      type="password"
                      name="password"
                      placeholder="Password"
                    />

                    <div className="text-center">
                      <Button className="btn-sm" type="submit">
                        Sign in
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>

            {/* OAuth */}
            <OtherLogin providers={providers} settings={settings} />
          </div>
        </div>
      </div>
    </Page>
  )
}

export default login
