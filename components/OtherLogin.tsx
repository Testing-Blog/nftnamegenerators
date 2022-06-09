import React from "react"
import { signIn } from "next-auth/react"
import { showToast } from "../helpers/utils"

import facebookIcon from "../assets/icons/facebook.png"
import githubIcon from "../assets/icons/github.png"
import googleIcon from "../assets/icons/google.png"
import metamaskIcon from "../assets/icons/metamask.png"
import Image from "next/image"

const ICON_SIZE = 18

interface OtherLoginProps {
  providers: any
  settings: any
}

const OtherLogin = ({ providers, settings }: OtherLoginProps) => {
  const loginMetamask = async () => {
    try {
      if (!window.ethereum)
        return showToast("Please install metamask extension", "error")

      const res = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      const accountAddress = res[0]

      signIn("ethereum-login", {
        address: accountAddress,
      })
    } catch (error: any) {
      console.log(error.code)
    }
  }

  return (
    <div className="other-login text-center">
      {settings.isFacebook && (
        <div>
          <button onClick={() => signIn(providers.facebook.id)}>
            <span className="me-2">
              <Image src={facebookIcon} width={ICON_SIZE} height={ICON_SIZE} />
            </span>{" "}
            Continue with {providers.facebook.name}
          </button>
        </div>
      )}

      {settings.isGithub && (
        <div>
          <button onClick={() => signIn(providers.github.id)}>
            <span className="me-2">
              <Image src={githubIcon} width={ICON_SIZE} height={ICON_SIZE} />
            </span>
            Continue with {providers.github.name}
          </button>
        </div>
      )}

      {settings.isGoogle && (
        <div>
          <button onClick={() => signIn(providers.google.id)}>
            <span className="me-2">
              <Image src={googleIcon} width={ICON_SIZE} height={ICON_SIZE} />
            </span>{" "}
            Continue with {providers.google.name}
          </button>
        </div>
      )}

      {settings.isMetamaskAuth && (
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              loginMetamask()
            }}
          >
            <span className="me-2">
              <Image src={metamaskIcon} width={ICON_SIZE} height={ICON_SIZE} />
            </span>
            Continue with MetaMask
          </button>
        </div>
      )}
    </div>
  )
}

export default OtherLogin
