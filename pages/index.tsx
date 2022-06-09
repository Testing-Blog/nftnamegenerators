import Button from "../components/Button"
import Heading from "../components/Heading"
import Section from "../components/Section"
import FeatureBlock from "../components/FeatureBlock"
import PlanBlock from "../components/PlanBlock"
import { BsFileEarmarkCodeFill, BsImage } from "react-icons/bs"
import { AiFillSave } from "react-icons/ai"
import { MdAccountCircle, MdLayers } from "react-icons/md"
import { IoMdDocument } from "react-icons/io"
import Image from "next/image"
import pic1 from "../assets/home/img1.png"
import pic2 from "../assets/home/img2.png"
import headerRight from "../assets/home/header-right.jpg"

import NavLink from "../components/NavLink"
import Page from "../components/Page"
import { PrismaClient } from "@prisma/client"
import PricingCalculator from "../components/PricingCalculator"
import { plansFeaturesDelimiter } from "../helpers/constants"

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
      settings,
      plans,
    },
  }
}

export default function IndexPage({ settings, plans }: any) {
  return (
    <Page title="Home" settings={settings}>
      {/* Header */}
      <header className="header-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 left">
              <h1>
                Create NFT Collections <br /> Easily With <span>No Code</span>
              </h1>
              <div className="mb-5">
                <p>
                  Turn image layers into thousands of uniquely code generated
                  atworks.
                </p>
                <p>Get ready to sell your own collections.</p>
              </div>

              <Button theme="white" to="/app">
                Get Started
              </Button>
            </div>

            <div className="col-5 right d-none d-lg-block">
              <div className="img">
                <Image src={headerRight} alt="header-right" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Section 1 */}
      <Section>
        <div className="row align-items-center">
          <div className="col-md-5">
            <div>
              <Image
                src={pic1}
                alt="The easiest way to create NFT collectibles on the blockchain"
              />
            </div>
          </div>
          <div className="col-md-6 offset-md-1">
            <Heading
              subTitle="Simple"
              title="The easiest way to create NFT collectibles on the blockchain"
              paragraph="Create up to 10,000 NFT collections, by uploading the layers. Without requiring code"
            />
          </div>
        </div>
      </Section>

      {/* Section 2 */}
      <Section>
        <div className="row align-items-center">
          <div className="col-md-7">
            <Heading
              subTitle="Compatible"
              title="Sell your NFTs on marketplaces like OpenSea"
              paragraph="Once minted, NFTs can be traded on opensea and other marketplaces."
            />
          </div>
          <div className="col-md-4 offset-md-1">
            <div>
              <Image
                src={pic2}
                alt="Sell your NFTs on marketplaces like OpenSea"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section id="features-section" className="features-section">
        <Heading
          subTitle="Fully Featured"
          title="Everything you need"
          paragraph="Built for artists and NFT creators"
        />

        <div className="row">
          <div className="col-md-4">
            <FeatureBlock
              Icon={BsFileEarmarkCodeFill}
              title="Super Simple (no code)"
              content="Create NFT collectibles with ease, using the all-in-one generator"
            />
          </div>
          <div className="col-md-4">
            <FeatureBlock
              Icon={BsImage}
              title="Export to images or gifs"
              content="You can import images and we will generate your collection in the format your decide."
            />
          </div>
          <div className="col-md-4">
            <FeatureBlock
              Icon={MdLayers}
              title="Attribute Rarity"
              content="You can configure certain attributes to be more rare than others. You will be able to easily tell what are the change for an attribute to be applied."
            />
          </div>
          <div className="col-md-4">
            <FeatureBlock
              Icon={IoMdDocument}
              title="Metadata"
              content="We automatically generate metadata compatible with Ethereum, Solana &amp; Polygon Blockchain."
            />
          </div>
          <div className="col-md-4">
            <FeatureBlock
              Icon={MdAccountCircle}
              title="No Account Needed"
              content="No account creation needed to start creating your collection."
            />
          </div>
          <div className="col-md-4">
            <FeatureBlock
              Icon={AiFillSave}
              title="Automatic Saving"
              content="We automatically save your project in the browser, so when you come back, your layers, configuration and files are still present."
            />
          </div>
        </div>
      </Section>

      {/* Pricing */}
      {plans.length > 0 && (
        <Section id="pricing-section" className="pricing-section">
          <Heading subTitle="Pricing" title="Use for FREE" />

          <div className="row justify-content-center">
            {plans?.map((plan: any) => (
              <div key={`plan-${plan.id}`} className="col-lg-3 col-md-6 mb-4">
                <PlanBlock plan={plan} currencyCode={settings?.currency} />
              </div>
            ))}
          </div>

          <div className="mt-4">
            <PricingCalculator plans={plans} currency={settings?.currency} />
          </div>
        </Section>
      )}

      {/* Ready? */}
      <Section className="ready-section text-center">
        <Heading
          paragraph="Start uploading and create the next big NFT collection"
          title="Ready to get started?"
          className="mb-4"
        />

        <Button to="/app">Generate Your Collection</Button>

        <div className="mt-4">
          <p>For any further questions</p>
          <p>
            Please <NavLink to="/contact">contact us</NavLink>
          </p>
        </div>
      </Section>
    </Page>
  )
}
