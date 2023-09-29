import React from 'react'
import styled from 'styled-components'
import { IMaskInput } from 'react-imask'

const Input = styled(IMaskInput)`
  border: 0px solid #5a585d;
  border-bottom: 1px solid #5a585d;
  box-sizing: border-box;
  height: 43px;
  width: 10%;
  padding: 5px;
  outline: unset;
  text-align: center;
  
  &:focus {
    font-size: 24px;
  }
`

function VerifyCode() {
  const handleChange = (e) => {
    const { maxLength, value, name } = e.target
    const [fieldName, fieldIndex] = name.split('-')

    let fieldIntIndex = parseInt(fieldIndex, 10)

    // Check if no of char in field == maxlength
    if (value.length >= maxLength) {
      // It should not be last input field
      if (fieldIntIndex < 6) {
        // Get the next input field using it's name
        const nextfield = document.querySelector(
          `input[name=code-${fieldIntIndex + 1}]`,
        )

        // If found, focus the next field
        if (nextfield !== null) {
          nextfield.readOnly=false
          nextfield.focus()
        } else {
          console.log('input complete')
          e.target.blur()
        }
      } else {
        console.log('input complete' + value)
      }
    }
  }

  const checkEditable = (idx) => {
    if (idx == 0)
      return false
    return true
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      { Array.from(new Array(6), (v,idx) => `code-${idx}`).map((v, idx) => (
        <Input
          type="tel"
          mask={Number}
          maxLength={1}
          onChange={handleChange}
          name={v}
          readOnly={checkEditable(idx)}
        />
      )) }
    </div>
  )
}

export default VerifyCode
