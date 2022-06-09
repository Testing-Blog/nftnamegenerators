import React, { useState } from "react"
import PlanBlock from "../../components/PlanBlock"
import PlanI from "../../types/admin/PlanI"
import * as Yup from "yup"
import { FieldArray, Form, Formik } from "formik"
import FormControl from "../../components/FormControl"
import Button from "../../components/Button"
import { showToast } from "../../helpers/utils"
import axios from "axios"
import { PrismaClient } from "@prisma/client"
import { Modal, Tab, Tabs } from "react-bootstrap"
import AdminPage from "."
import NoDataFound from "../../components/NoDataFound"
import swal from "sweetalert2"
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai"
import { plansFeaturesDelimiter } from "../../helpers/constants"

const FieldArrayC: any = FieldArray

interface plansProps {
  data: PlanI[]
  settings: any
}

const PlanSchema = Yup.object().shape({
  id: Yup.string(),
  price: Yup.number().min(0).required(),
  assetsNumber: Yup.number().min(1).required(),
  features: Yup.array().of(Yup.string().required()),
  watermark: Yup.boolean().required(),
})

export async function getServerSideProps(context: any) {
  const prisma = new PrismaClient()

  const settings = await prisma.settings.findFirst()
  const plans = await prisma.plan.findMany({
    orderBy: {
      assetsNumber: "asc",
    },
  })

  return {
    props: {
      data: plans,
      settings,
    },
  }
}

const plans = ({ data, settings }: plansProps) => {
  const [listPlans, setListPlans] = useState(data)
  const [show, setShow] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<any>(null)

  const handleClose = () => {
    setCurrentPlan(null)
    setShow(false)
  }
  const handleShow = (plan: any) => {
    setCurrentPlan({
      ...plan,
      features: plan.features.split(plansFeaturesDelimiter),
    })
    setShow(true)
  }

  const addPlan = async (values: any) => {
    try {
      const { data } = await axios.post("/api/admin/plans/add", {
        ...values,
        features: values.features.join(plansFeaturesDelimiter),
      })

      if (!data.success) return showToast(data.message, "error")

      setListPlans(data.data)
      showToast(data.message, "success")
    } catch (error: any) {
      showToast(error.message, "error")
    }
  }

  const updatePlan = async (values: any) => {
    try {
      const { data } = await axios.post("/api/admin/plans/update", {
        ...values,
        features: values.features.join(plansFeaturesDelimiter),
      })

      if (!data.success) return showToast(data.message, "error")

      setListPlans(data.data)
      showToast(data.message, "success")
    } catch (error: any) {
      showToast(error.message, "error")
    }
  }

  const deletePlan = async (id: string) => {
    const willDelete = await swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this plan?",
      icon: "warning",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, Cancel",
      showCancelButton: true,
      showCloseButton: true,
    })

    if (!willDelete.isConfirmed) return

    try {
      const { data } = await axios.post("/api/admin/plans/delete", {
        id,
      })

      if (!data.success) return showToast(data.message, "error")

      const newListPlans = listPlans.filter((p) => p.id !== id)
      setListPlans([...newListPlans])
      showToast(data.message, "success")
    } catch (error: any) {
      showToast(error.message, "error")
    }
  }

  return (
    <AdminPage settings={settings}>
      {/* update */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Formik
            initialValues={currentPlan}
            validationSchema={PlanSchema}
            onSubmit={updatePlan}
          >
            {(form) => {
              return (
                <Form>
                  <div className="row">
                    <FormControl type="hidden" name="id" placeholder="Id" />

                    <div className="col">
                      <FormControl
                        type="number"
                        name="price"
                        placeholder="Price"
                      />
                    </div>

                    <div className="col">
                      <FormControl
                        type="number"
                        name="assetsNumber"
                        placeholder="Assets Number"
                      />
                    </div>

                    <div className="col">
                      <FormControl
                        type="checkbox"
                        name="watermark"
                        placeholder="Watermark"
                      />
                    </div>
                  </div>

                  <div>
                    <FieldArrayC
                      name="features"
                      render={(arrayHelpers: any) => (
                        <div>
                          {form.values.features.map(
                            (feature: any, index: any) => (
                              <div key={index} className="feature-input">
                                <FormControl
                                  placeholder={`Feature ${index + 1}`}
                                  type="text"
                                  name={`features[${index}]`}
                                />
                                <Button
                                  type="button"
                                  className="btn-sm btn-white creators-btn"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  <AiFillMinusCircle />
                                </Button>
                              </div>
                            )
                          )}

                          <Button
                            type="button"
                            className="btn-sm btn-white creators-btn"
                            onClick={() => arrayHelpers.push("")}
                          >
                            <AiFillPlusCircle /> Add a feature
                          </Button>
                        </div>
                      )}
                    />
                  </div>

                  <div className="text-center">
                    <Button className="btn-white" type="submit">
                      Update the plan
                    </Button>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </Modal.Body>
      </Modal>

      <Tabs defaultActiveKey="add" id="admin-plans-tabs">
        <Tab eventKey="add" title="Add new plan">
          <Formik
            initialValues={{
              price: 0,
              assetsNumber: 0,
              features: [],
              watermark: false,
            }}
            validationSchema={PlanSchema}
            onSubmit={addPlan}
          >
            {(form) => (
              <Form>
                <div className="row">
                  <div className="col-md-4">
                    <FormControl
                      type="number"
                      name="price"
                      placeholder="Price"
                    />
                  </div>

                  <div className="col-md-4">
                    <FormControl
                      type="number"
                      name="assetsNumber"
                      placeholder="Assets Number"
                    />
                  </div>

                  <div className="col-md-4">
                    <FormControl
                      type="checkbox"
                      name="watermark"
                      placeholder="Watermark"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <FieldArrayC
                    name="features"
                    render={(arrayHelpers: any) => (
                      <div>
                        {form.values.features.map(
                          (feature: any, index: any) => (
                            <div key={index} className="feature-input">
                              <FormControl
                                placeholder={`Feature ${index + 1}`}
                                type="text"
                                name={`features[${index}]`}
                              />
                              <Button
                                type="button"
                                className="btn-sm btn-white creators-btn"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <AiFillMinusCircle />
                              </Button>
                            </div>
                          )
                        )}

                        <Button
                          type="button"
                          className="btn-sm btn-white creators-btn"
                          onClick={() => arrayHelpers.push("")}
                        >
                          <AiFillPlusCircle /> Add a feature
                        </Button>
                      </div>
                    )}
                  />
                </div>

                <Button className="btn-white" type="submit">
                  Add the plan
                </Button>
              </Form>
            )}
          </Formik>
        </Tab>

        <Tab eventKey="list-plans" title="List of plans">
          <div className="row">
            {listPlans.length > 0 ? (
              listPlans?.map((plan) => (
                <div key={`plan-${plan.id}`} className="col-lg-4 col-md-6 mb-4">
                  <PlanBlock plan={plan} currencyCode={settings?.currency} />

                  <div className="text-center mt-3">
                    <Button
                      className="btn-sm btn-success me-2"
                      onClick={() => handleShow(plan)}
                    >
                      Update
                    </Button>
                    <Button
                      className="btn-sm btn-danger"
                      onClick={() => deletePlan(plan.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <NoDataFound />
            )}
          </div>
        </Tab>
      </Tabs>
    </AdminPage>
  )
}

export default plans
