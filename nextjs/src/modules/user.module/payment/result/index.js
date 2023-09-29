import Link from 'next/link'
import Image from 'next/image'
import Success from './Success'

import {
  CenteredRow,
  Flex,
  LinkButton,
} from '../../../../common/styleds/common.styled'
import {
    HeaderDiv,
    HeaderTitle,
} from './styled'

function Result({ transactions, referrer }) {

    return (
      <div>
        <HeaderDiv style={{ marginTop: 10 }}>
          <HeaderTitle style={{ textAlign: 'center' }}>Result</HeaderTitle>
        </HeaderDiv>
        <Flex className="justify-center" style={{  margin: 20 }}>
          <Image src="/assets/images/payment_result.png" width="225" height="187" />
        </Flex>

        <Success state="success" transactions={transactions.succeed} msg="Transaction(s) successful" />
        <Success state="fail" transactions={transactions.failed} msg="Transaction(s) declined" />

        <CenteredRow marginTop={20}>
          <LinkButton className="big">Okay</LinkButton>
        </CenteredRow>
        <CenteredRow marginTop={20}>
          <Link href="/manual/payment/pending">
          <LinkButton className="normal cl-black">View pending payments</LinkButton>
          </Link>
        </CenteredRow>
      </div>
    )
}

export default Result
