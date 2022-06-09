import { useSession, signOut } from "next-auth/react"
import Page from "../../components/Page"
import * as Yup from "yup"
import { Form, Formik } from "formik"
import FormControl from "../../components/FormControl"
import Button from "../../components/Button"
import axios from "axios"
import { showToast } from "../../helpers/utils"
import { useEffect, useState } from "react"
import TransactionsTable from "../../components/TransactionsTable"
import { PrismaClient } from "@prisma/client"
import { Tab, Tabs } from "react-bootstrap"
import swal from "sweetalert2"

const UserCredSchema = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required(),
  email: Yup.string().email().required(),
})

const UserSchema = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required(),
})

const UserPassSchema = Yup.object().shape({
  id: Yup.string().required(),
  currentPassword: Yup.string().required(),
  newPassword: Yup.string().required(),
})

export async function getServerSideProps(context: any) {
  const prisma = new PrismaClient()

  const settings = await prisma.settings.findFirst()

  return {
    props: {
      settings,
    },
  }
}

export default function MePage({ settings }: any) {
  const { data: userData }: any = useSession()

  const getTransactions = async (page?: any) => {
    try {
      const { data } = await axios.post("/api/me/transactions", {
        page,
      })

      return data
    } catch (error: any) {
      throw error
    }
  }

  const updateMe = async (values: any) => {
    try {
      const { data } = await axios.post("/api/me/update", {
        ...values,
      })
      if (!data.success) return showToast(data.message, "error")
      showToast(data.message, "success")
    } catch (error: any) {
      showToast(error.message, "error")
    }
  }

  const updatePass = async (values: any) => {
    try {
      const { data } = await axios.post("/api/me/update-pass", {
        ...values,
      })
      if (!data.success) return showToast(data.message, "error")
      showToast(data.message, "success")
    } catch (error: any) {
      showToast(error.message, "error")
    }
  }

  const deleteAccount = async () => {
    const willDelete = await swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete your account?",
      icon: "warning",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, Cancel",
      showCancelButton: true,
      showCloseButton: true,
    })

    if (!willDelete.isConfirmed) return

    try {
      const { data } = await axios.post("/api/me/delete", {
        id: userData?.user.id,
      })
      if (!data.success) return showToast(data.message, "error")

      // logout
      signOut()
    } catch (error: any) {
      showToast(error.message, "error")
    }
  }

  if (!userData) return null

  return (
    <Page title="My account" settings={settings}>
      <div className="pt-5 pb-5 container">
        <Tabs defaultActiveKey="update-profile" id="account-tabs">
          <Tab eventKey="update-profile" title="Update profile">
            <Formik
              initialValues={{
                id: userData.user.id,
                name: userData.user.name,
                email: userData.user.email,
              }}
              validationSchema={
                userData.user?.password ? UserCredSchema : UserSchema
              }
              onSubmit={updateMe}
            >
              {(form) => (
                <Form>
                  <div className="row">
                    <FormControl type="hidden" name="id" placeholder="Id" />

                    <div>
                      <FormControl type="text" name="name" placeholder="Name" />
                    </div>

                    {userData.user?.password && (
                      <div>
                        <FormControl
                          type="email"
                          name="email"
                          placeholder="Email"
                        />
                      </div>
                    )}
                  </div>

                  <Button className="btn-sm me-2" type="submit">
                    Update
                  </Button>

                  {userData.user?.role !== "superAdmin" && (
                    <Button
                      type="button"
                      className="btn-sm btn-danger"
                      onClick={deleteAccount}
                    >
                      Delete my account
                    </Button>
                  )}
                </Form>
              )}
            </Formik>
          </Tab>

          {userData.user?.password && (
            <Tab eventKey="update-pass" title="Update password">
              <Formik
                initialValues={{
                  id: userData.user.id,
                  currentPassword: "",
                  newPassword: "",
                }}
                validationSchema={UserPassSchema}
                onSubmit={updatePass}
              >
                {(form) => (
                  <Form>
                    <div className="row">
                      <FormControl type="hidden" name="id" placeholder="Id" />

                      <div>
                        <FormControl
                          type="password"
                          name="currentPassword"
                          placeholder="Current Password"
                        />
                      </div>

                      <div>
                        <FormControl
                          type="password"
                          name="newPassword"
                          placeholder="New Password"
                        />
                      </div>
                    </div>

                    <Button className="btn-sm" type="submit">
                      Update password
                    </Button>
                  </Form>
                )}
              </Formik>
            </Tab>
          )}

          <Tab eventKey="trans" title="My transactions">
            <TransactionsTable getTransactions={getTransactions} />
          </Tab>
        </Tabs>
      </div>
    </Page>
  )
}
