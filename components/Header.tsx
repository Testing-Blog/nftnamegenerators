import NavLink from "./NavLink"
import { signIn, signOut, useSession } from "next-auth/react"
import Button from "./Button"
import { useEffect } from "react"
import { AiOutlineUser } from "react-icons/ai"
import { FiLogOut, FiSettings } from "react-icons/fi"
import Image from "next/image"

export default function Header({ businessName }: any) {
  const { data: session }: any = useSession()

  useEffect(() => {
    const win: any = window
    win.ethereum?.on("accountsChanged", async (e: any) => {
      signOut()
    })
  }, [])

  const handleSignout = async (e: any) => {
    e.preventDefault()

    signOut()
  }

  const myAccountBtn = () => (
    <ul className="navbar-nav">
      {session?.user && (
        <>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDarkDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="me-2 d-inline-block" style={{ height: 30 }}>
                <Image
                  className="user-avatar rounded-circle"
                  width={30}
                  height={30}
                  src={
                    session.user.image
                      ? session.user.image
                      : require("../assets/user-avatar.png")
                  }
                  alt="User Avatar"
                />
              </span>

              <span className="d-none d-md-inline-block">
                Hi,{" "}
                <span className="user-avatar-name">
                  {session.user.name ? session.user.name : "User"}
                </span>
              </span>
            </a>
            <ul
              className="dropdown-menu"
              aria-labelledby="navbarDarkDropdownMenuLink"
            >
              <li>
                <NavLink className="dropdown-item" to="/me">
                  <AiOutlineUser /> Your Account
                </NavLink>
              </li>

              {session?.user?.role !== "user" && (
                <li>
                  <NavLink className="dropdown-item" to="/admin">
                    <FiSettings /> Admin Panel
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink
                  className="dropdown-item logout"
                  to="/api/auth/signout"
                  onClick={handleSignout}
                >
                  <FiLogOut /> Logout
                </NavLink>
              </li>
            </ul>
          </li>
        </>
      )}
    </ul>
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          {businessName}
        </NavLink>

        <div className="d-flex">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="d-sm-block d-md-none">{myAccountBtn()}</div>
        </div>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <div className="mr-auto" />

          <ul className="navbar-nav my-2 my-lg-0">
            <li className="nav-item">
              <Button to="/app" className="btn-sm">
                Generate Collection
              </Button>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/#features-section">
                Features
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/#pricing-section">
                Pricing
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>

            {!session && (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link btn"
                    to="/login"
                    onClick={(e: any) => {
                      e.preventDefault()
                      signIn()
                    }}
                  >
                    Login
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link btn grey" to="/register">
                    Sign up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="d-none d-md-block">{myAccountBtn()}</div>
      </div>
    </nav>
  )
}
