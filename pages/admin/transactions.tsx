import React from "react"
import { PrismaClient } from "@prisma/client"
import TransactionsTable from "../../components/TransactionsTable"
import AdminPage from "."
import axios from "axios"

interface usersProps {
  settings: any
}

export async function getServerSideProps(context: any) {
  const prisma = new PrismaClient()
  const settings = await prisma.settings.findFirst()

  return {
    props: {
      settings,
    },
  }
}

const transactions = ({ settings }: usersProps) => {
  const getTransactions = async (page?: any) => {
    try {
      const { data } = await axios.post("/api/admin/transactions/get", {
        page,
      })

      return data
    } catch (error: any) {
      throw error
    }
  }

  return (
    <AdminPage settings={settings}>
      <TransactionsTable getTransactions={getTransactions} />
    </AdminPage>
  )
}

export default transactions
