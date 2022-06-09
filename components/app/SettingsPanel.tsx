import { useFormikContext } from "formik"
import React, { useContext, useState } from "react"
import { BsArrowLeft, BsFillCheckCircleFill } from "react-icons/bs"
import { FiLayers, FiSettings } from "react-icons/fi"
import PlanI from "../../types/admin/PlanI"
import Button from "../Button"
import LayerPanel from "./LayerPanel"
import LayersPanel from "./LayersPanel"
import ProjectPanel from "./ProjectPanel"
import AppContext from "../../context/AppContext"
import Link from "next/link"

interface SettingsPanelProps {
  startGenerating: any
  usedPlan: PlanI
  preview: any
  renderPay: any
  setShowPayment: any
  showPayment: boolean
}

const SettingsPanel = ({
  startGenerating,
  usedPlan,
  preview,
  renderPay,
  setShowPayment,
  showPayment,
}: SettingsPanelProps) => {
  const { settings } = useContext(AppContext)
  const settingsForm = useFormikContext()

  const [view, setView] = useState<"designer" | "settings">("designer")

  return (
    <div className="settings-panel">
      <div className="app-sidebar">
        <ul>
          {showPayment ? (
            <li>
              <button type="button" onClick={() => setShowPayment(false)}>
                <BsArrowLeft />
                <span className="text">Back to generator</span>
              </button>
            </li>
          ) : (
            <>
              <li>
                <button
                  type="button"
                  className={view === "designer" ? "active" : ""}
                  onClick={() => setView("designer")}
                >
                  <FiLayers />
                  <span className="text">Designer</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={view === "settings" ? "active" : ""}
                  onClick={() => setView("settings")}
                >
                  <FiSettings />
                  <span className="text">Settings</span>
                </button>
              </li>
              <li>
                <Link href="/" type="button" className="">
                  <a>
                    <BsArrowLeft />
                    <span className="text">Back</span>
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="settings-container">
        <div className="container-fluid">
          <div className="row">
            {/* Pay */}
            {showPayment ? (
              renderPay()
            ) : (
              <>
                {/* Generate & Preview */}
                <div className="text-center mt-3 mb-4">
                  <Button
                    onClick={startGenerating}
                    theme="white"
                    className="btn-sm mt-2 me-2"
                    disabled={!settingsForm.dirty || !settingsForm.isValid}
                  >
                    <BsFillCheckCircleFill size={18} />
                    {usedPlan?.price > 0 &&
                      ` Pay ${usedPlan?.price} ${settings?.currency} &`}{" "}
                    Generate Collection
                  </Button>

                  <Button
                    className="btn-sm mt-2"
                    onClick={preview}
                    disabled={!settingsForm.dirty || !settingsForm.isValid}
                  >
                    Preview
                  </Button>
                </div>

                {/* Layers settings */}
                {view === "designer" && (
                  <div>
                    <div className="pt-4 pb-4">
                      <div className="row">
                        <div className="col-lg-5">
                          <div className="sticky-panel">
                            <LayersPanel />
                          </div>
                        </div>

                        <div className="col-lg-7 middle-section">
                          <LayerPanel />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Project settings */}
                {view === "settings" && (
                  <div>
                    <div className="pt-4 pb-4">
                      <ProjectPanel />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
