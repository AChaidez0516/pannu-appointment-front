import styled from 'styled-components'

const AgreementContentDiv = styled.div`
  display: flex;
  margin: 60px 0;
  justify-content: center;
`
const Title = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  line-height: 12px;
  color: #000000;
`

function ScanQR({ text }) {
  return (
    <>
      <AgreementContentDiv>
        <Title>{text}</Title>
      </AgreementContentDiv>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div>
          <img src={require('../public/assets/images/scanqr.png')} />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 30,
        }}
      >
        <div>
          <img src={require('../public/assets/images/scanbar.png')} />
        </div>
      </div>
    </>
  )
}

export default ScanQR
