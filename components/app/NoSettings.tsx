import React from "react"
import { IoMdSettings } from "react-icons/io"
import { BsArrowLeft } from "react-icons/bs"
import Button from "../Button"
import { useSession } from "next-auth/react"
import Link from "next/link"

const NoSettings = () => {
  const { data: userData }: any = useSession()

  return (
    <div className="app-no-settings">
      <div>
        <div className="icon mb-3">
          <IoMdSettings size={100} />
        </div>
        <h4>No settings found</h4>
        <p className="paragraph">
          {!userData &&
            "If you are the admin, please login to configure the settings and plans."}

          {userData &&
            userData.user.role !== "user" &&
            "Please configure the settings and plans."}

          {userData && userData.user.role === "user" && (
            <>
              Please come back later, or{" "}
              <Link href="/contact">
                <a>contact us</a>
              </Link>
            </>
          )}
        </p>
        <div className="mt-3">
          <Button className="btn-sm btn-white me-2" to="/">
            <BsArrowLeft /> Go back
          </Button>
          {!userData && (
            <Button className="btn-sm" to="/login">
              Login
            </Button>
          )}

          {userData && userData.user.role !== "user" && (
            <Button className="btn-sm" to="/admin">
              Configure the settings
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default NoSettings
