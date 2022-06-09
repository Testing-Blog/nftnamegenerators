import axios from "axios"

export const sendContact = async (
  contactName: string,
  contactEmail: string,
  contactMessage: string
) => {
  try {
    await axios.post("/api/contact", {
      contactName,
      contactEmail,
      contactMessage,
    })

    return "Your email was sent successfully"
  } catch (error) {
    throw error
  }
}
