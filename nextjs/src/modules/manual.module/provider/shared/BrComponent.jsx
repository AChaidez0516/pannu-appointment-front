import { Fragment } from "react"

export const BrComponent = ({ str }) => {
  if (!str) {
    return ''
  }
  return (
    <>
      {str.split("\n").map((line, index) => (
        <Fragment key={`line${index}`}>{index !== 0 && <br />}{line}</Fragment>))}
    </>
  )
}