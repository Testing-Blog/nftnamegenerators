import { FieldArray, useFormikContext } from "formik"
import React from "react"
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai"
import Button from "../Button"
import FormControl from "../FormControl"

const FieldArrayC: any = FieldArray

const ProjectPanel = () => {
  const { values }: any = useFormikContext()

  return (
    <div className="project-panel">
      <div className="row">
        <div className="mb-2">
          <FormControl
            placeholder="Generate GIF"
            name="useGif"
            type="checkbox"
          />
        </div>

        <div className="mb-2 col-md-4">
          <FormControl
            placeholder="Project Name"
            name="collectionName"
            type="text"
          />
        </div>

        <div className="mb-2 col-md-4">
          <FormControl
            placeholder="Project Description"
            type="text"
            name="collectionDesc"
          />
        </div>

        <div className="mb-2 col-md-4">
          <FormControl
            placeholder="Collection Size"
            type="number"
            name="collectionSize"
          />
        </div>

        <div className="mb-2 col-md-6">
          <FormControl placeholder="Item Width" type="number" name="width" />
        </div>

        <div className="mb-2 col-md-6">
          <FormControl placeholder="Item Height" type="number" name="height" />
        </div>

        <FormControl placeholder="Network" type="select" name="network">
          <option value="eth">Ethereum</option>
          <option value="pol">Polygon</option>
          <option value="sol">Solana</option>
        </FormControl>

        {values.network === "sol" && (
          <>
            <FormControl placeholder="Symbol" type="text" name="symbol" />

            <FormControl
              placeholder="Seller fee basis points"
              type="number"
              name="sellerFeeBasisPoints"
              hint="Define how much % you want from secondary market sales 1000 = 10%"
            />

            <FormControl
              placeholder="External url"
              type="text"
              name="externalUrl"
            />

            <div>
              <label>Creators</label>
              <FieldArrayC
                name="creators"
                render={(arrayHelpers: any) => (
                  <div>
                    {values.creators.map((creator: any, index: any) => (
                      <div key={index}>
                        <div className="row">
                          <div className="col-5">
                            <FormControl
                              placeholder="Fee Share"
                              type="number"
                              name={`creators[${index}].feeShare`}
                            />
                          </div>
                          <div className="col-5">
                            <FormControl
                              placeholder="Address"
                              type="text"
                              name={`creators[${index}].address`}
                            />
                          </div>
                          <div className="col-2">
                            <label className="invisible">Remove</label>
                            <Button
                              type="button"
                              className="btn-sm btn-white creators-btn"
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <AiFillMinusCircle />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      className="btn-sm btn-white creators-btn"
                      onClick={() =>
                        arrayHelpers.push({
                          feeShare: 0,
                          address: "",
                        })
                      }
                    >
                      <AiFillPlusCircle /> Add a creator
                    </Button>
                  </div>
                )}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProjectPanel
