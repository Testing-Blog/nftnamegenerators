import React from "react"
import * as Yup from "yup"
import { Form, Formik } from "formik"
import FormControl from "../../components/FormControl"
import Button from "../../components/Button"
import { showToast } from "../../helpers/utils"
import axios from "axios"
import { PrismaClient } from "@prisma/client"
import AdminPage from "."
import { Tab, Tabs } from "react-bootstrap"

interface pagesProps {
  contactPage: any
  privacyPage: any
  termsPage: any
  generatorPage: any
  page404: any
  metaTags: any
  settings: any
}

const ContactPageSchema = Yup.object().shape({
  subtitle: Yup.string().required(),
  title: Yup.string().required(),
  paragraph: Yup.string().required(),
  namePlaceholder: Yup.string().required(),
  emailPlaceholder: Yup.string().required(),
  messagePlaceholder: Yup.string().required(),
  buttonText: Yup.string().required(),
})

const PrivacyPageSchema = Yup.object().shape({
  title: Yup.string().required(),
  content: Yup.string().required(),
})

const TermsPageSchema = Yup.object().shape({
  title: Yup.string().required(),
  content: Yup.string().required(),
})

const GeneratorPageSchema = Yup.object().shape({
  downloadedFileName: Yup.string().required(),
})

const MetaTagsSchema = Yup.object().shape({
  ogType: Yup.string(),
  ogTitle: Yup.string(),
  ogDesc: Yup.string(),
  ogUrl: Yup.string(),
  twitterTitle: Yup.string(),
  twitterDesc: Yup.string(),
  twitterSite: Yup.string(),
  twitterCreator: Yup.string(),
  desc: Yup.string(),
  keywords: Yup.string(),
})

export async function getServerSideProps(context: any) {
  const prisma = new PrismaClient()

  const contactPage = await prisma.contactPage.findFirst()
  const privacyPage = await prisma.privacyPage.findFirst()
  const termsPage = await prisma.termsPage.findFirst()
  const generatorPage = await prisma.generatorPage.findFirst()
  const metaTags = await prisma.metaTags.findFirst()
  const settings = await prisma.settings.findFirst()

  return {
    props: {
      contactPage,
      privacyPage,
      termsPage,
      generatorPage,
      metaTags,
      settings,
    },
  }
}

const pages = ({
  contactPage,
  privacyPage,
  termsPage,
  generatorPage,
  metaTags,
  settings,
}: pagesProps) => {
  const save = async (values: any, route: string) => {
    try {
      const { data } = await axios.post(`/api/admin/pages/${route}`, {
        ...values,
      })

      if (!data.success) return showToast(data.message, "error")

      showToast(data.message, "success")
    } catch (error: any) {
      showToast(error.message, "error")
    }
  }

  return (
    <AdminPage settings={settings}>
      <Tabs defaultActiveKey="contact-page" id="admin-pages-tabs">
        <Tab eventKey="contact-page" title="Contact page">
          <Formik
            initialValues={{ ...contactPage }}
            validationSchema={ContactPageSchema}
            onSubmit={(values) => save(values, "contactpage")}
          >
            {(form) => (
              <Form>
                <div className="row">
                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="subtitle"
                      placeholder="Subtitle"
                    />
                  </div>
                  <div className="col-md-4">
                    <FormControl type="text" name="title" placeholder="Title" />
                  </div>
                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="paragraph"
                      placeholder="Paragraph"
                    />
                  </div>
                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="namePlaceholder"
                      placeholder="Name placeholder"
                    />
                  </div>
                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="emailPlaceholder"
                      placeholder="Email placeholder"
                    />
                  </div>
                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="messagePlaceholder"
                      placeholder="Message placeholder"
                    />
                  </div>
                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="buttonText"
                      placeholder="Button text"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <Button className="btn-white" type="submit">
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Tab>

        <Tab eventKey="privacy-page" title="Privacy page">
          <Formik
            initialValues={{ ...privacyPage }}
            validationSchema={PrivacyPageSchema}
            onSubmit={(values) => save(values, "privacypage")}
          >
            {(form) => (
              <Form>
                <div className="row">
                  <div>
                    <FormControl type="text" name="title" placeholder="Title" />
                  </div>
                  <div>
                    <FormControl
                      type="editor"
                      name="content"
                      placeholder="Content"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <Button className="btn-white" type="submit">
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Tab>

        <Tab eventKey="terms-page" title="Terms page">
          <Formik
            initialValues={{ ...termsPage }}
            validationSchema={TermsPageSchema}
            onSubmit={(values) => save(values, "termspage")}
          >
            {(form) => (
              <Form>
                <div className="row">
                  <div>
                    <FormControl type="text" name="title" placeholder="Title" />
                  </div>
                  <div>
                    <FormControl
                      type="editor"
                      name="content"
                      placeholder="Content"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <Button className="btn-white" type="submit">
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Tab>

        <Tab eventKey="generator-page" title="Generator page">
          <Formik
            initialValues={{ ...generatorPage }}
            validationSchema={GeneratorPageSchema}
            onSubmit={(values) => save(values, "generatorpage")}
          >
            {(form) => (
              <Form>
                <div className="row">
                  <div>
                    <FormControl
                      type="text"
                      name="downloadedFileName"
                      placeholder="Downloaded file name"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <Button className="btn-white" type="submit">
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Tab>

        <Tab eventKey="meta-tags" title="Meta tags">
          <Formik
            initialValues={{ ...metaTags }}
            validationSchema={MetaTagsSchema}
            onSubmit={(values) => save(values, "metaTags")}
          >
            {(form) => (
              <Form>
                <div className="row">
                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="ogType"
                      placeholder="Google type"
                    />
                  </div>
                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="ogTitle"
                      placeholder="Google title"
                    />
                  </div>
                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="ogDesc"
                      placeholder="Google description"
                    />
                  </div>
                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="ogUrl"
                      placeholder="Google url"
                    />
                  </div>

                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="twitterTitle"
                      placeholder="Twitter title"
                    />
                  </div>
                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="twitterDesc"
                      placeholder="Twitter description"
                    />
                  </div>
                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="twitterSite"
                      placeholder="Twitter site"
                    />
                  </div>
                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="twitterCreator"
                      placeholder="Twitter creator"
                    />
                  </div>

                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="desc"
                      placeholder="Description"
                    />
                  </div>
                  <div className="col-md-4">
                    <FormControl
                      type="text"
                      name="keywords"
                      placeholder="Keywords"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <Button className="btn-white" type="submit">
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Tab>
      </Tabs>
    </AdminPage>
  )
}

export default pages
