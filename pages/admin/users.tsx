import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import { Form, Formik } from "formik"
import FormControl from "../../components/FormControl"
import Button from "../../components/Button"
import { showToast } from "../../helpers/utils"
import axios from "axios"
import { PrismaClient } from "@prisma/client"
import { Modal, Pagination, Tab, Tabs } from "react-bootstrap"
import { useSession } from "next-auth/react"
import AdminPage from "."
import { MdDeleteOutline } from "react-icons/md"
import { FaRegEdit } from "react-icons/fa"
import NoDataFound from "../../components/NoDataFound"
import AppPagination from "../../components/AppPagination"
import swal from "sweetalert2"

interface usersProps {
  settings: any
}

const AddUserSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  role: Yup.string().required(),
})

const UpdateOauthUserSchema = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required(),
  role: Yup.string().required(),
})

const UpdateCredUserSchema = Yup.object().shape({
  id: Yup.string().required(),
  name: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string(),
  role: Yup.string().required(),
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

const users = ({ settings }: usersProps) => {
  const { data: session }: any = useSession()

  const [show, setShow] = useState(false)
  const [listUsers, setListUsers] = useState([])
  const [currentUser, setCurrentUser] = useState<any>(null)

  const [count, setCount] = useState(null)
  const [active, setActive] = useState(1)
  const numPages = count ? Number.parseInt((count / 10).toFixed(0)) : 0

  useEffect(() => {
    handleGetUsers()
  }, [])

  const handleGetUsers = async (page?: any) => {
    try {
      const { data } = await axios.post("/api/admin/users/get", {
        page,
      })

      if (!data.success) return showToast(data.message, "error")

      setCount(data.count)
      setListUsers(data.data)
    } catch (error: any) {
      showToast(error.message, "error")
    }
  }

  const handlePagination = async (number: any) => {
    if (number === active || number < 1 || number > numPages) return

    await handleGetUsers(number)

    setActive(number)
  }

  const handleClose = () => {
    setCurrentUser(null)
    setShow(false)
  }
  const handleShow = (user: any) => {
    setCurrentUser(user)
    setShow(true)
  }

  const addUser = async (values: any) => {
    try {
      const { data } = await axios.post("/api/admin/users/add", {
        ...values,
      })
      if (!data.success) return showToast(data.message, "error")
      setListUsers(data.data)
      showToast(data.message, "success")
    } catch (error: any) {
      showToast(error.message, "error")
    }
  }

  const updateUser = async (values: any) => {
    try {
      const { data } = await axios.post("/api/admin/users/update", {
        ...values,
      })
      if (!data.success) return showToast(data.message, "error")
      setListUsers(data.data)
      showToast(data.message, "success")
    } catch (error: any) {
      showToast(error.message, "error")
    }
  }

  const deleteUser = async (id: string) => {
    const willDelete = await swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, Cancel",
      showCancelButton: true,
      showCloseButton: true,
    })

    if (!willDelete.isConfirmed) return

    try {
      const { data } = await axios.post("/api/admin/users/delete", {
        id,
      })

      if (!data.success) return showToast(data.message, "error")

      const newListUsers = listUsers.filter((u: any) => u.id !== id)
      setListUsers([...newListUsers])
      showToast(data.message, "success")
    } catch (error: any) {
      showToast(error.message, "error")
    }
  }

  const returnDeleteBtn = (user: any) => {
    if (user.role === "superAdmin") return null
    if (user.id === session?.user?.id) return null
    return (
      <Button className="btn-sm btn-danger" onClick={() => deleteUser(user.id)}>
        <MdDeleteOutline />
      </Button>
    )
  }

  const returnUpdateBtn = (user: any) => {
    if (user.role == "superAdmin" && session?.user?.id !== user.id) return null
    return (
      <Button className="btn-sm btn-success" onClick={() => handleShow(user)}>
        <FaRegEdit />
      </Button>
    )
  }

  return (
    <AdminPage settings={settings}>
      {/* update */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Formik
            initialValues={{
              ...currentUser,
              password: "",
            }}
            validationSchema={
              currentUser?.password
                ? UpdateCredUserSchema
                : UpdateOauthUserSchema
            }
            onSubmit={updateUser}
          >
            {(form) => (
              <Form>
                <div className="row">
                  <FormControl type="hidden" name="id" placeholder="Id" />

                  <div>
                    <FormControl type="text" name="name" placeholder="Name" />
                  </div>

                  {currentUser?.password && (
                    <>
                      <div>
                        <FormControl
                          type="email"
                          name="email"
                          placeholder="Email"
                        />
                      </div>

                      <div>
                        <FormControl
                          type="password"
                          name="password"
                          placeholder="Password"
                        />
                      </div>
                    </>
                  )}

                  {currentUser?.role !== "superAdmin" &&
                    currentUser?.id !== session?.user?.id && (
                      <div>
                        <FormControl
                          placeholder="Role"
                          type="select"
                          name="role"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </FormControl>
                      </div>
                    )}
                </div>

                <div className="text-center">
                  <Button className="btn-sm btn-white" type="submit">
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>

      <Tabs defaultActiveKey="add" id="admin-users-tabs">
        <Tab eventKey="add" title="Add new user">
          <Formik
            initialValues={{
              role: "user",
            }}
            validationSchema={AddUserSchema}
            onSubmit={addUser}
          >
            {(form) => (
              <Form>
                <div className="row">
                  <div className="col-md-6">
                    <FormControl type="text" name="name" placeholder="Name" />
                  </div>

                  <div className="col-md-6">
                    <FormControl
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                  </div>

                  <div className="col-md-6">
                    <FormControl
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>

                  <div className="col-md-6">
                    <FormControl placeholder="Role" type="select" name="role">
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </FormControl>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <Button className="btn-white" type="submit">
                    Add a new user
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Tab>

        <Tab eventKey="list-users" title="List of users">
          {count && <p className="mb-4">{count} results found</p>}

          {listUsers.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listUsers.map((user: any) => (
                      <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td className="text-end">
                          {returnDeleteBtn(user)}
                          {returnUpdateBtn(user)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {count && (
                <AppPagination
                  handlePagination={handlePagination}
                  numPages={numPages}
                />
              )}
            </>
          ) : (
            <NoDataFound />
          )}
        </Tab>
      </Tabs>
    </AdminPage>
  )
}

export default users
