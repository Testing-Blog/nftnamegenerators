import React, { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { FaRegUser } from "react-icons/fa"
import { AiOutlineMenu } from "react-icons/ai"
import { VscChromeClose } from "react-icons/vsc"
import { MdLogout } from "react-icons/md"
import { RiCoupon3Line, RiSettings2Line } from "react-icons/ri"
import { signOut, useSession } from "next-auth/react"
import { IoDocumentOutline } from "react-icons/io5"
import { CgArrowsExchange } from "react-icons/cg"

const root = "/admin"

const ROUTES = [
  {
    name: "Users",
    url: `${root}/users`,
    Icon: FaRegUser,
  },
  {
    name: "Plans",
    url: `${root}/plans`,
    Icon: RiCoupon3Line,
  },
  {
    name: "Pages",
    url: `${root}/pages`,
    Icon: IoDocumentOutline,
  },
  {
    name: "Transactions",
    url: `${root}/transactions`,
    Icon: CgArrowsExchange,
  },
  {
    name: "Settings",
    url: `${root}/settings`,
    Icon: RiSettings2Line,
  },
]

const AdminSidebar = ({ businessName }: any) => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="admin-sidebar">
      <div>
        <h1 className="logo">
          <Link href="/">
            <a>{businessName ? businessName : "Nft generator"}</a>
          </Link>
        </h1>

        <ul className="menu mt-4">
          {ROUTES.map(({ name, url, Icon }) => (
            <li className={`${router.pathname === url ? "active" : ""}`}>
              <Link href={url}>
                <a>
                  <Icon /> <span>{name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button className="logout-btn" onClick={() => signOut()}>
        <p className="name">{session?.user?.name?.substring(0, 15) + "..."}</p>
        <p className="email">
          {session?.user?.email?.substring(0, 20) + "..."}
        </p>

        <span className="icon">
          <MdLogout />
        </span>
      </button>
    </div>
  )
}

export default AdminSidebar
