import Image from 'next/image'
import styled from 'styled-components'

const Desc = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
`
const InputFieldLabel = styled.div`
  position: absolute;
  top: -12px;
  left: 10px;
  background: white;
  padding: 5px;
  z-index: 10;
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  color: #000000;
`
const InputDiv = styled.div`
  display: flex;
  position: relative;
`
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2px 0 2px 0;
  border: 0.5px solid #5a585d;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  width: 100%;
  padding: 10px 10px 10px 10px;
`

export default function DateWithLabel({ label }) {
  return (
    <>
      <InputDiv>
        <InputFieldLabel style={{ left: 5 }}>{label}</InputFieldLabel>
        <Content>
          <Desc>MM/DD</Desc>
          <div style={{ marginLeft: 50 }}>
            <Image src="/assets/images/svg/calandar.svg" width={26} height={26} />
          </div>
        </Content>
      </InputDiv>
    </>
  )
}
