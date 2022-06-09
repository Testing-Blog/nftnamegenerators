import React from "react"
import Head from "next/head"
import Footer from "./Footer"
import { ToastContainer, Zoom } from "react-toastify"
import Header from "./Header"
import Script from "next/script"

interface PageProps {
  title: string
  children?: any
  settings: any
  adminPage?: boolean
}

const Page = ({ title, children, settings, adminPage = false }: PageProps) => {
  const businessName = settings?.businessName
    ? settings?.businessName
    : "Nft generator"

  return (
    <div>
      <div className="all-page">
        <Head>
          <title>
            {businessName + " - "}
            {title}
          </title>

          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content={`NFT Collection Generator - ${businessName}`}
          />
          <meta
            name="twitter:title"
            content="Create a 10,000 NFT collection with Rarity settings from your assets with SOL and ETH metadata."
          />

          <meta
            name="description"
            content="Create a 10,000 NFT collection with Rarity settings from your assets with SOL and ETH metadata. Ready to mint at blockchain or marketplaces."
          />
          <meta
            name="keywords"
            content="NFT, NFT Art Generator, Art Generator, Layered Art Generator, Collectibles, NFT Generator, NFT Collections, NFT Random"
          />

          <meta name="robots" content="index, follow" />

          <link rel="icon" href="/images/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          ></link>
        </Head>

        {/* Toast */}
        <ToastContainer
          draggable={false}
          position="top-right"
          transition={Zoom}
          icon={false}
        />

        {!adminPage && <Header businessName={businessName} />}

        <main>{children}</main>

        {!adminPage && <Footer businessName={businessName} />}

        {/* Google Analytics */}
        <Script
          id="google-anaylics1"
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${settings?.googleAnalyticsTrackingCode}`}
        ></Script>

        <Script id="google-anaylics2" strategy="lazyOnload">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${settings?.googleAnalyticsTrackingCode}');
        `}
        </Script>
      </div>
    </div>
  )
}

export default Page
