import Image from 'next/image'
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
const Wrapper1 = styled(Wrapper)`
  border: 2px solid #0065fb;
  box-sizing: border-box;
  border-radius: 6px;
`
const Wrapper2 = styled(Wrapper)`
  border: 2px solid #ff0000;
  box-sizing: border-box;
  border-radius: 6px;
`
const Wrapper3 = styled(Wrapper)`
  border: 2px solid #f69e2c;
  box-sizing: border-box;
  border-radius: 6px;
`
const Items = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`
const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Title = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
`
const Desc = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  margin-left: 5px;
`

export default function UserList({
  name,
  avatar,
  date,
  copay,
  deductible,
  coinsurance,
  selfpay,
  servicefee,
  total,
  status,
}) {
  return (
    <>
      {status === 0 && (
        <Wrapper>
          <Items>
            <Title>{name}</Title>
            <Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <img
                  src={avatar}
                  style={{ width: 42, height: 41, borderRadius: 5 }}
                />
                <Desc>{date}</Desc>
              </div>
              <Desc>{copay}</Desc>
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
              <Desc style={{ color: '#F66A29' }}>{copay}</Desc>
              <Desc style={{ color: '#0065FB' }}>{deductible}</Desc>
              <Desc style={{ color: '#08B527' }}>{coinsurance}</Desc>
              <Desc>{selfpay}</Desc>
            </Item>
            <Item>
              <Desc>{servicefee}</Desc>
            </Item>
            <Item>
              <Desc>{total}</Desc>
            </Item>
          </Items>

          {status === 1 && (
            <div style={{ position: 'absolute', left: '30%', marginTop: 28 }}>
              <Image src="/assets/images/canceled.png" width="37" height="29" />
            </div>
          )}
          {status === 2 && (
            <div style={{ position: 'absolute', left: '30%', marginTop: 28 }}>
              <Image src="/assets/images/rescheduled.png" width="54" height="37" />
            </div>
          )}
          {status === 3 && (
            <div style={{ position: 'absolute', right: 30, marginTop: -7 }}>
              <Image src="/assets/images/svg/dollor.svg" width="23" height="23" />
            </div>
          )}
        </Wrapper>
      )}
      {status === 1 && (
        <Wrapper1>
          <Items>
            <Title>{name}</Title>
            <Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <img
                  src={avatar}
                  style={{ width: 42, height: 41, borderRadius: 5 }}
                />
                <Desc>{date}</Desc>
              </div>
              <Desc>{copay}</Desc>
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
              <Desc style={{ color: '#F66A29' }}>{copay}</Desc>
              <Desc style={{ color: '#0065FB' }}>{deductible}</Desc>
              <Desc style={{ color: '#08B527' }}>{coinsurance}</Desc>
              <Desc>{selfpay}</Desc>
            </Item>
            <Item>
              <Desc>{servicefee}</Desc>
            </Item>
            <Item>
              <Desc>{total}</Desc>
            </Item>
          </Items>
          {status === 1 && (
            <div style={{ position: 'absolute', left: '30%', marginTop: 20 }}>
              <Image src="/assets/images/canceled.png" width="37" height="29" />
            </div>
          )}
          {status === 2 && (
            <div style={{ position: 'absolute', left: '30%', marginTop: 13 }}>
              <Image src="/assets/images/rescheduled.png" width="54" height="37" />
            </div>
          )}
          {status === 3 && (
            <div style={{ position: 'absolute', right: 30, marginTop: -7 }}>
              <Image src="/assets/images/svg/dollor.svg" width="23" height="23" />
            </div>
          )}
        </Wrapper1>
      )}
      {status === 2 && (
        <Wrapper2>
          <Items>
            <Title>{name}</Title>
            <Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <img
                  src={avatar}
                  style={{ width: 42, height: 41, borderRadius: 5 }}
                />
                <Desc>{date}</Desc>
              </div>
              <Desc>{copay}</Desc>
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
              <Desc style={{ color: '#F66A29' }}>{copay}</Desc>
              <Desc style={{ color: '#0065FB' }}>{deductible}</Desc>
              <Desc style={{ color: '#08B527' }}>{coinsurance}</Desc>
              <Desc>{selfpay}</Desc>
            </Item>
            <Item>
              <Desc>{servicefee}</Desc>
            </Item>
            <Item>
              <Desc>{total}</Desc>
            </Item>
          </Items>
          {status === 1 && (
            <div style={{ position: 'absolute', left: '30%', marginTop: 20 }}>
              <Image src="/assets/images/canceled.png" width="37" height="29" />
            </div>
          )}
          {status === 2 && (
            <div style={{ position: 'absolute', left: '30%', marginTop: 13 }}>
              <Image src="/assets/images/rescheduled.png" width="54" height="37" />
            </div>
          )}
          {status === 3 && (
            <div style={{ position: 'absolute', right: 30, marginTop: -7 }}>
              <Image src="/assets/images/svg/dollor.svg" width="23" height="23" />
            </div>
          )}
        </Wrapper2>
      )}
      {status === 3 && (
        <Wrapper3>
          <Items>
            <Title>{name}</Title>
            <Item>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <img
                  src={avatar}
                  style={{ width: 42, height: 41, borderRadius: 5 }}
                />
                <Desc>{date}</Desc>
              </div>
              <Desc>{copay}</Desc>
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
              <Desc style={{ color: '#F66A29' }}>{copay}</Desc>
              <Desc style={{ color: '#0065FB' }}>{deductible}</Desc>
              <Desc style={{ color: '#08B527' }}>{coinsurance}</Desc>
              <Desc>{selfpay}</Desc>
            </Item>
            <Item>
              <Desc>{servicefee}</Desc>
            </Item>
            <Item>
              <Desc>{total}</Desc>
            </Item>
          </Items>
          {status === 1 && (
            <div style={{ position: 'absolute', left: '30%', marginTop: 20 }}>
              <Image src="/assets/images/canceled.png" width="37" height="29" />
            </div>
          )}
          {status === 2 && (
            <div style={{ position: 'absolute', left: '30%', marginTop: 13 }}>
              <Image src="/assets/images/rescheduled.png" width="54" height="37" />
            </div>
          )}
          {status === 3 && (
            <div style={{ position: 'absolute', right: 30, marginTop: -7 }}>
              <Image src="/assets/images/svg/dollor.svg" width="23" height="23" />
            </div>
          )}
        </Wrapper3>
      )}
    </>
  )
}
