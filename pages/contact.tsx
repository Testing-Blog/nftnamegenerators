import React, { useState } from "react"
import * as Yup from "yup"
import Heading from "../components/Heading"
import Section from "../components/Section"
import Page from "../components/Page"
import Button from "../components/Button"
import FormControl from "../components/FormControl"
import AppForm from "../components/AppForm"
import { sendContact } from "../services/contact"
import { showToast } from "../helpers/utils"
import { PrismaClient } from "@prisma/client"

const ContactSchema = Yup.object().shape({
  contactName: Yup.string().required("This field is required"),
  contactEmail: Yup.string()
    .email("Please enter a valid email")
    .required("This field is required"),
  contactMessage: Yup.string().required("This field is required"),
})

export async function getServerSideProps(context: any) {
  const prisma = new PrismaClient()

  const contactPage = await prisma.contactPage.findFirst()
  const settings = await prisma.settings.findFirst()

  return {
    props: {
      data: contactPage,
      settings,
    },
  }
}

const ContactPage = ({ data, settings }: any) => {
  const [loading, setLoading] = useState(false)

  const sendMessage = async ({
    contactName,
    contactEmail,
    contactMessage,
  }: any) => {
    try {
      setLoading(true)

      const data = await sendContact(contactName, contactEmail, contactMessage)
      showToast(data, "success")
    } catch (error: any) {
      console.log(error)
      showToast(error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page title="Contact Us" settings={settings}>
      <Section>
        <div style={{ maxWidth: 700, margin: "auto" }}>
          <div className="text-center">
            <Heading
              title={data?.title ? data?.title : "How can we help you?"}
              subTitle={data?.subtitle ? data?.subtitle : "Contact us"}
              paragraph={
                data?.paragraph
                  ? data?.paragraph
                  : "Feel like getting in touch? Contact our customer support below."
              }
            />
          </div>

          <AppForm
            schema={ContactSchema}
            onSubmit={sendMessage}
            loading={loading}
          >
            <div className="row">
              <div className="col-md-6">
                <FormControl
                  type="text"
                  name="contactName"
                  placeholder={
                    data?.namePlaceholder ? data?.namePlaceholder : "Your name"
                  }
                />
              </div>
              <div className="col-md-6">
                <FormControl
                  type="email"
                  name="contactEmail"
                  placeholder={
                    data?.emailPlaceholder
                      ? data?.emailPlaceholder
                      : "Your email"
                  }
                />
              </div>
              <div className="col-md-12">
                <FormControl
                  type="textarea"
                  name="contactMessage"
                  placeholder={
                    data?.messagePlaceholder
                      ? data?.messagePlaceholder
                      : "Your message"
                  }
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <Button type="submit">
                {data?.buttonText ? data?.buttonText : "Send a Message"}
              </Button>
            </div>
          </AppForm>
        </div>
      </Section>
    </Page>
  )
}

export default ContactPage
