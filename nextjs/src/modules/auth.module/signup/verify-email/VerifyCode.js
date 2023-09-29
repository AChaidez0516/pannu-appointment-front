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
  return (
      <div>
        <InputFields></InputFields>
      </div>
  )
}

function InputFields() {
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
            `input[name=field-${fieldIntIndex + 1}]`,
        )

        // If found, focus the next field
        if (nextfield !== null) {
          nextfield.focus()
        } else {
          console.log('input complete')
        }
      } else {
        console.log('input complete' + value)
      }
    }
  }

  return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <InputField name="field-1" length="1" handleChange={handleChange} />
        <InputField name="field-2" length="1" handleChange={handleChange} />
        <InputField name="field-3" length="1" handleChange={handleChange} />
        <InputField name="field-4" length="1" handleChange={handleChange} />
        <InputField name="field-5" length="1" handleChange={handleChange} />
        <InputField name="field-6" length="1" handleChange={handleChange} />
      </div>
  )
}

function InputField(props) {
  return (
      <Input
          type="phone"
          mask={Number}
          name={props.name}
          maxLength={props.length}
          onChange={props.handleChange}
      ></Input>
  )
}

export default VerifyCode
