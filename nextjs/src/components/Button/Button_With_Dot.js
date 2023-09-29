import styled from 'styled-components'

const Desc = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 12px;
  color: #000000;
`
const Blue_Dot = styled.div`
  background: #173fd4;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  position: absolute;
  top: -7px;
  left: -7px;
`
const Red_Dot = styled(Blue_Dot)`
  background: #ff0000;
`
const Orient_Dot = styled(Blue_Dot)`
  background: #fac23c;
`
const InputDiv = styled.div`
  display: flex;
  position: relative;
  background: #ffffff;
  border: 1px solid #8b93a6;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px 0 2px 0;
  height: 30px;
  width: 85px;
`

export default function Button_With_Dot({ label, type }) {
  return (
    <>
      <InputDiv>
        {type === 'blue' && <Blue_Dot></Blue_Dot>}
        {type === 'red' && <Red_Dot></Red_Dot>}
        {type === 'orient' && <Orient_Dot></Orient_Dot>}
        <Content>
          <Desc>{label}</Desc>
        </Content>
      </InputDiv>
    </>
  )
}
