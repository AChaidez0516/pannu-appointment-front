import Link from 'next/link'
import Image from 'next/image'
import Success from './Success'
import {
  Wrapper,
  FormContainer,
  FormWrapper,
  CenteredRow,
  Flex,
  LinkButton,
} from '../../common/styleds/common.styled'
import {
    HeaderDiv,
    HeaderTitle,
} from './styled'

function CheckedInComponent({ transactions, referrer, state, msg, successMsg }) {

    return (
      <Wrapper className="center">
        <FormWrapper>
          <FormContainer>

            <div>
              <HeaderDiv>
                <HeaderTitle>Result</HeaderTitle>
              </HeaderDiv>
              <Flex className="justify-center" style={{  margin: 20 }}>
                <Image src="/assets/images/payment_result.png" width="225" height="187" alt="Payment result" />
              </Flex>

              <Success state={state} successMsg={successMsg} msg={msg} />

              <CenteredRow marginTop={18}>
                <LinkButton className="big">Done</LinkButton>
              </CenteredRow>
            </div>

          </FormContainer>
        </FormWrapper>
      </Wrapper>
    )
}

export default CheckedInComponent
