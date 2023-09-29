import styled from "styled-components"

export default function FieldSetInputComponent (props) {
  const {
    children,
    labelName,
    isWrongTokenCode,
  } = props
  const cBorder = isWrongTokenCode ? '2px solid #red' : '2px solid #cecece';
  return (
    <FieldSetWrapper style={{border:cBorder , borderRadius: '5px'}}>
      <legend>{labelName}</legend>
      {children}
    </FieldSetWrapper>
  )
}


export const FieldSetWrapper = styled.fieldset`
  border-radius: 5px;
  width: 100%;
  height: 100%;
  * {
    font-family: 'SF Pro Text';
    font-style: normal;
    color: #000000;
  }
`