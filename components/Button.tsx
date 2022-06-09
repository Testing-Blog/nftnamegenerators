import Link from "next/link"
import React from "react"
import { AiOutlineLoading } from "react-icons/ai"

interface ButtonProps {
  onClick?: any
  theme?: "primary" | "white"
  className?: string
  children?: any
  type?: "submit" | "button" | "reset"
  to?: string
  loading?: boolean
  disabled?: boolean
}

const Button = ({
  onClick,
  theme = "primary",
  className,
  children,
  type = "button",
  to,
  loading = false,
  disabled = false,
}: ButtonProps) => {
  if (to)
    return (
      <Link href={to}>
        <a className={`btn btn-${theme} ${className}`}>{children}</a>
      </Link>
    )

  return (
    <button
      type={type}
      className={`btn btn-${theme} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {loading && <AiOutlineLoading size={20} className="loading-icon" />}

      {children}
    </button>
  )
}

export default Button
