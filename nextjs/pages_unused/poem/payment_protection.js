import Layout from '../../components/Layout'
import withApollo from '../../lib/apollo'
import Link from 'next/link'
import styled from 'styled-components'

const ContinueButton = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 14px;
  color: #173fd4;

  display: flex;
  justify-content: center;
`
const AgreementContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`
const Title = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
`
const Insurance = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 9px;

  color: #000000;
`
const ViewMore = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  color: #173fd4;
  display: flex;
  justify-content: center;
  justify-content: center;
  padding: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.36);
`
const NameText = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 9px;
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
  margin: 20px 0px 0 0px;
  justify-content: space-between;
`
const Content = styled.div`
  border: 0.5px solid rgba(23, 63, 212, 0.15);
  box-sizing: border-box;
  border-radius: 6px;
  width: 100%;
  min-height: 31px;
  padding: 10px 10px 10px 10px;
`
const Input = styled.input`
  border: 0.5px solid rgba(23, 63, 212, 0.15);
  box-sizing: border-box;
  border-radius: 6px;
  width: 100%;
  padding: 15px 10px 10px 10px;
`
function Payment_Protection() {
  return (
    <Layout
      title="Choose Payment Protection Insurance provider"
      href="/poem/participants"
    >
      <AgreementContentDiv>
        <Title>
          The main features of each plan are listed in the table below for your
          convenience.{' '}
        </Title>
      </AgreementContentDiv>
      <AgreementContentDiv>
        <Title>
          Always read the full plan program from the links provided below as the
          terms and conditions in the full contract override the descriptions
          here.
        </Title>
      </AgreementContentDiv>

      <Insurance>Insurance companies </Insurance>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 15,
        }}
      >
        <Title>Name 1</Title>
        <Title style={{ color: '#173FD4' }}>Details</Title>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 15,
        }}
      >
        <Title>Name 1</Title>
        <Title style={{ color: '#173FD4' }}>Details</Title>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 15,
        }}
      >
        <Title>Name 1</Title>
        <Title style={{ color: '#173FD4' }}>Details</Title>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 15,
        }}
      >
        <Title>Name 1</Title>
        <Title style={{ color: '#173FD4' }}>Details</Title>
      </div>

      <ViewMore>View more</ViewMore>

      <>
        <NameText style={{ padding: 8 }}>Name 3 details</NameText>
        <InputDiv style={{ width: '100%', marginRight: 5 }}>
          <InputFieldLabel>Exclusions </InputFieldLabel>
          <Content>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </Content>
        </InputDiv>

        <InputDiv style={{ width: '100%', marginRight: 5 }}>
          <InputFieldLabel>Waiting periods </InputFieldLabel>
          <Content>
            Amet minim mollit non deserunt ullamco est sit aliqua
          </Content>
        </InputDiv>

        <InputDiv style={{ width: '100%', marginRight: 5 }}>
          <InputFieldLabel>Your obligations </InputFieldLabel>
          <Content>
            Amet minim mollit non deserunt ullamco est sit aliqua
          </Content>
        </InputDiv>

        <InputDiv style={{ width: '100%', marginRight: 5 }}>
          <InputFieldLabel>Summary </InputFieldLabel>
          <Content>
            Amet minim mollit non deserunt ullamco est sit aliqua
          </Content>
        </InputDiv>

        <InputDiv style={{ width: '100%', marginRight: 5 }}>
          <InputFieldLabel>Details </InputFieldLabel>
          <Content>
            Amet minim mollit non deserunt ullamco est sit aliqua
          </Content>
        </InputDiv>

        <InputDiv style={{ width: '100%', marginRight: 5 }}>
          <InputFieldLabel>Summary </InputFieldLabel>
          <Content>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </Content>
        </InputDiv>

        <InputDiv style={{ width: '100%', marginRight: 5 }}>
          <InputFieldLabel>Premium cost </InputFieldLabel>
          <Content></Content>
        </InputDiv>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
          }}
        >
          <div
            style={{
              height: 8,
              width: 8,
              borderRadius: 4,
              background: '#000000',
              margin: 15,
            }}
          ></div>
          <InputDiv style={{ width: '100%', marginRight: 5 }}>
            <InputFieldLabel>One payment </InputFieldLabel>
            <Input />
          </InputDiv>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'baseline',
          }}
        >
          <div
            style={{
              height: 8,
              width: 8,
              borderRadius: 4,
              background: '#000000',
              margin: 15,
            }}
          ></div>
          <InputDiv style={{ width: '100%', marginRight: 5 }}>
            <InputFieldLabel>Installments total </InputFieldLabel>
            <Input />
          </InputDiv>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            margin: '20px 15px 0px 15px',
          }}
        >
          <input type="checkbox" style={{ marginRight: 15 }} />
          <Title style={{ fontSize: 14 }}>
            I agree and accept the{' '}
            <Title style={{ fontSize: 14, color: '#173FD4' }}>
              Terms & Conditions
            </Title>{' '}
            of the Payment Protection Insurance Provider.
          </Title>
        </div>
      </>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <Link as={'/'} href="/security_questions/">
          <ContinueButton style={{ color: '#000000' }}>Cancel</ContinueButton>
        </Link>
        <Link as={'/'} href="/poem/payment_plan">
          <ContinueButton>Select plan</ContinueButton>
        </Link>
      </div>
    </Layout>
  )
}

export default Payment_Protection
