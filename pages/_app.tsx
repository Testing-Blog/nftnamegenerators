import { useEffect } from "react"
import { SessionProvider } from "next-auth/react"
import { WagmiProvider } from "wagmi"

import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/globals.scss"
import "../styles/app.scss"
import "../styles/elements.scss"
import "react-toastify/dist/ReactToastify.css"

function App({ Component, pageProps }: any) {
  const pageLayout = Component.layout || ((page: any) => page)

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap")
  }, [])

  return pageLayout(
    <WagmiProvider>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Component {...pageProps} />
      </SessionProvider>
    </WagmiProvider>
  )
}

export default App
