import React, { useState, useEffect } from "react"
import { Modal } from "react-bootstrap"
import { HiOutlineDocumentText } from "react-icons/hi"
import { formatDate, showToast } from "../helpers/utils"
import Button from "./Button"
import { Pagination } from "react-bootstrap"
import NoDataFound from "./NoDataFound"
import AppPagination from "./AppPagination"

interface TransactionsTableProps {
  getTransactions: any
}

const TransactionsTable = ({ getTransactions }: TransactionsTableProps) => {
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [currentTrans, setCurrentTrans] = useState<any>(null)
  const [active, setActive] = useState(1)
  const [count, setCount] = useState(null)
  const [transactions, setTransactions] = useState([])

  const numPages = count ? Number.parseInt((count / 10).toFixed(0)) : 0

  useEffect(() => {
    handleGetTransactions()
  }, [])

  const handleGetTransactions = async (page?: any) => {
    try {
      const data = await getTransactions(page)

      console.log(data)

      if (!data.success) return showToast(data.message, "error")

      setCount(data.count)
      setTransactions(data.data)
    } catch (error: any) {
      showToast(error.message, "error")
    }
  }

  const handlePagination = async (number: any) => {
    if (number === active || number < 1 || number > numPages) return

    await handleGetTransactions(number)

    setActive(number)
  }

  const handleClick = (transaction: any) => {
    setCurrentTrans(transaction)
    setShowDetails(true)
  }

  if (transactions.length === 0) return <NoDataFound />

  return (
    <>
      <Modal
        show={showDetails}
        onHide={() => {
          setShowDetails(false)
        }}
      >
        <Modal.Body className="transaction-details">
          <h4>Collection details</h4>
          <ul>
            <li>Name: {currentTrans?.name}</li>
            <li>Description: {currentTrans?.desc}</li>
            <li>Size: {currentTrans?.size}</li>
            <li>Network: {currentTrans?.network}</li>
          </ul>

          <h4>Payment details</h4>
          <ul>
            <li>Date: {formatDate(currentTrans?.dateCreated)}</li>
            <li>
              Amount:{" "}
              {currentTrans?.paidAmount === 0 ? (
                "Free"
              ) : (
                <>
                  {currentTrans?.paidAmount} {currentTrans?.paymentCurrency}
                </>
              )}
            </li>
            {currentTrans?.paymentMethod && (
              <li>Method: {currentTrans?.paymentMethod}</li>
            )}
          </ul>

          {currentTrans?.user && (
            <>
              <h4>User details</h4>
              <ul>
                <li>Id: {currentTrans?.user.id}</li>
                <li>Name: {currentTrans?.user.name}</li>
                <li>Email: {currentTrans?.user.email}</li>
              </ul>
            </>
          )}
        </Modal.Body>
      </Modal>

      {count && <p className="mb-4">{count} results found</p>}

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Amount</th>
              <th scope="col">Method</th>
              <th scope="col">Date</th>
              <th scope="col">Details</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: any) => (
              <tr>
                <td>{transaction.id}</td>
                <td>
                  {transaction.paidAmount} {transaction.paymentCurrency}
                </td>
                <td>
                  {transaction.paymentMethod
                    ? transaction.paymentMethod
                    : "____"}
                </td>
                <td>{formatDate(transaction.dateCreated)}</td>
                <td>
                  <Button
                    onClick={() => handleClick(transaction)}
                    className="btn-sm"
                  >
                    <HiOutlineDocumentText />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {count && (
        <AppPagination
          handlePagination={handlePagination}
          numPages={numPages}
        />
      )}
    </>
  )
}

export default TransactionsTable
