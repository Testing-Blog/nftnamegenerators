import * as Yup from "yup"
import { errorMessages } from "./constants"

Yup.addMethod(
  Yup.array,
  "unique",
  function (message, mapper = (a: any) => a.name) {
    return this.test("unique", message, function (list: any) {
      return list.length === new Set(list.map(mapper)).size
    })
  }
)

const settingsSchema = Yup.object().shape({
  gif: Yup.boolean(),
  collectionName: Yup.string().required(errorMessages.requiredField),
  collectionDesc: Yup.string().required(errorMessages.requiredField),
  collectionSize: Yup.number()
    .min(1, errorMessages.collectionSizeMin)
    .required(errorMessages.requiredField),
  width: Yup.number()
    .min(50, errorMessages.width)
    .required(errorMessages.requiredField),
  height: Yup.number()
    .min(50, errorMessages.height)
    .required(errorMessages.requiredField),
  network: Yup.string(),
  symbol: Yup.string(),
  sellerFeeBasisPoints: Yup.number().min(0),
  externalUrl: Yup.string(),
  creators: Yup.array().when("network", {
    is: (field: any) => field === "sol",
    then: Yup.array().of(
      Yup.object().shape({
        feeShare: Yup.number().min(0).max(100).required(),
        address: Yup.string().required(),
      })
    ),
  }),
})

const l: any = Yup.array().of(
  Yup.object().shape({
    name: Yup.string().required(errorMessages.layerName),
    images: Yup.array().min(1, errorMessages.layerImages),
  })
)

const layersSchema = Yup.object().shape({
  layers: l.unique("Layer name must be unique").min(1, errorMessages.layers),
})

export { settingsSchema, layersSchema }
