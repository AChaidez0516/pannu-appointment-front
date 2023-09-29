import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  opacity: 0.99;
  border-radius: 6px;
  flex: 1;
  padding: 10px;
  margin: 10px 0;
`
const Items = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
`
const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Desc = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
`

export default function UserListHeader() {
  return (
    <>
      <Wrapper>
        <Items
          style={{
            width: '45%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Item>
            <Desc>Provider Appointment date</Desc>

            <Desc style={{ textAlign: 'end' }}>Appt fees</Desc>
          </Item>
        </Items>
        <Items
          style={{
            width: '50%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Item style={{ flexDirection: 'column' }}>
            <Desc style={{ color: '#F66A29' }}>Copay</Desc>
            <Desc style={{ color: '#0065FB' }}>Deductible</Desc>
            <Desc style={{ color: '#08B527' }}>Coinsurance</Desc>
            <Desc>Self pay</Desc>
          </Item>
          <Item style={{ flexDirection: 'column' }}>
            <Desc>Service</Desc>
            <Desc>fees</Desc>
          </Item>
          <Item style={{ width: '30%', justifyContent: 'center' }}>
            <Desc>Total</Desc>
          </Item>
        </Items>
      </Wrapper>
    </>
  )
}
