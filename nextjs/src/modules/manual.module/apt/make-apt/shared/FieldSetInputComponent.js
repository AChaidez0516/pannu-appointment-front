import styled from "styled-components"

export default function FieldSetInputComponent (props) {
  const {
    children,
    labelName,
    isWrongTokenCode,
    invalidMessage,
  } = props
  const cBorder = isWrongTokenCode ? '1px solid red' : '1px solid #cecece';
  console.log(cBorder);
  return (
    <FieldSetWrapper border={cBorder}>
      <legend>{labelName}</legend>
      {children}
      {isWrongTokenCode && <div>{invalidMessage}</div>}
    </FieldSetWrapper>
  )
}

export const FieldSetWrapper = styled.fieldset`
  border: ${props => props.border};
  border-radius: 5px;
  width: 100%;
  height: 100%;
  * {
    font-family: 'SF Pro Text';
    font-style: normal;
    color: #000000;
  }
`