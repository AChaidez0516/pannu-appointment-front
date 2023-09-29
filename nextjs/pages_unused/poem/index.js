import Layout from '../../components/Layout'
import withApollo from '../../lib/apollo'
import Link from 'next/link'
import styled from 'styled-components'

const ContinueButton = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
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
const LinkText = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 13px;

  color: #173fd4;
`

function Index({ user }) {
  return (
    <Layout title="POEM summary" href="/insurance">
      <AgreementContentDiv>
        <Title>Complete this screen to join POEM </Title>
      </AgreementContentDiv>
      <AgreementContentDiv>
        <Title>How it works:</Title>
        <Title>
          We collect in advance a portion of the deductible OR
          out-of-pocket-maximum you may have to pay based on your insurance
          plan.
        </Title>
        <Title>
          This prepayment allows participlating providers to defer collecting
          their estimate of patient obilgations before service is rendered,
          until the claim has been processed and aprroved by your insurance
          plan.
        </Title>
      </AgreementContentDiv>
      <AgreementContentDiv>
        <Title>We calculate how much you have to prepay based on the:</Title>
        <Title>- deductible, and</Title>
        <Title>- out-of pocket maximum</Title>
        <Title>
          expenses you have to pay before your insurance plan pays all your
          costs according to the terms of your plan.{' '}
        </Title>
      </AgreementContentDiv>
      <AgreementContentDiv>
        <Title>
          We offer a BUFFER to you (subject to terms and conditions) with the
          participation of your healthcare providers.
        </Title>
        <Title>
          The buffer helps providers with their cash flow until you have fully
          paid your share of the cost.
        </Title>
        <Title>
          The amount of the buffer is calculated based on your prepay and a
          credit check.
        </Title>
      </AgreementContentDiv>
      <AgreementContentDiv>
        <Title>
          We are not a lender and the buffer is not a loan to you or the
          healthcare provider.{' '}
        </Title>
      </AgreementContentDiv>
      <AgreementContentDiv>
        <Title>
          Any interests and fees that you may be charged are authorized by the
          participating healthcare providers.{' '}
        </Title>
      </AgreementContentDiv>
      <AgreementContentDiv>
        <Title>
          The only fee charged to you by Pannu Corp is the one-time set up fee.{' '}
        </Title>
      </AgreementContentDiv>
      <Link as={'/'} href="/poem/participants">
        <LinkText>
          Click here to select providers participating in POEM{' '}
        </LinkText>
      </Link>
      <AgreementContentDiv>
        <Title>Introductory no credit check promotion</Title>
        <Title>
          Buffer to assure payments to providers: 50% of prepay amount{' '}
        </Title>
      </AgreementContentDiv>
      <AgreementContentDiv>
        <Title>Buffer is only available after</Title>
      </AgreementContentDiv>
      <AgreementContentDiv
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            background: '#173FD4',
            marginRight: 8,
            borderRadius: 4,
          }}
        ></div>
        <Title>full payment of prepay </Title>
      </AgreementContentDiv>
      <AgreementContentDiv
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            background: '#173FD4',
            marginRight: 8,
            borderRadius: 4,
          }}
        ></div>
        <Title>on-time payments in full of all payments due </Title>
      </AgreementContentDiv>
      <AgreementContentDiv
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            background: '#173FD4',
            marginRight: 8,
            borderRadius: 4,
          }}
        ></div>
        <Title>
          purchase and payment in full of payment protection insurance (details
          follow){' '}
        </Title>
      </AgreementContentDiv>
      <AgreementContentDiv
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            background: '#173FD4',
            marginRight: 8,
            borderRadius: 4,
          }}
        ></div>
        <Title>
          full compliance with all the terms & conditions of this offer{' '}
        </Title>
      </AgreementContentDiv>
      <AgreementContentDiv>
        <Title>
          Payment protection insurance (PPI) protects your account from default
          when you are unable to make your payments due to death, disability or
          unemployment.{' '}
        </Title>
      </AgreementContentDiv>
      <AgreementContentDiv>
        <Title>PPI is provided by 3rd party partners.</Title>
      </AgreementContentDiv>
      <AgreementContentDiv>
        <Title>
          Make sure you understand the coverage, exclusions, any waiting
          periods, your obligations and how the plan works to ensure payouts and
          continuing coverage.
        </Title>
      </AgreementContentDiv>

      <LinkText>Choose PPI provider </LinkText>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <Link as={'/'} href="/security_questions/">
          <ContinueButton style={{ color: '#000000' }}>Skip</ContinueButton>
        </Link>
        <Link as={'/'} href="/security_questions/">
          <ContinueButton>Next</ContinueButton>
        </Link>
      </div>
    </Layout>
  )
}

export default Index
