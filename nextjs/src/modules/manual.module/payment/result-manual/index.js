import Link from 'next/link'
import Image from 'next/image'
import Success from './Success'
import { useState } from 'react'
import { useLocalStorage } from '../../../../common/hooks/useLocalStorage'

import {
  Wrapper,
  FormContainer,
  FormWrapper,
  CenteredRow,
  Flex,
  LinkButton,
  InputDiv,
  InputFieldLabel,
  Input,
} from '../../../../common/styleds/common.styled'
import { MaskInput } from '../../../../common/styleds/imask.styled'
import {
    HeaderDiv,
    HeaderTitle,
    Text,
    Description,
} from './styled'

import ZulipWrapper from '../../../../components/ZulipWrapper';


function Result({ transactions, referrer }) {
  const PhoneNumberMask = '000-000-0000'
  const [email, setEmail] = useLocalStorage("email", '')
  const [phoneNumber, setPhoneNumber] = useLocalStorage("phoneNumber", '')

  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false)

    return (
      <Wrapper className="center">
        <FormWrapper>
          <FormContainer>

            <div>
              <HeaderDiv>
                <HeaderTitle>Result</HeaderTitle>
              </HeaderDiv>
              <Flex className="justify-center" style={{  margin: 20 }}>
                <Image src="/assets/images/payment_result.png" width="225" height="187" />
              </Flex>

              <Success state="success" transactions={transactions?.succeed} msg="Transaction(s) successful" />
              <Success state="fail" transactions={transactions?.failed} msg="Transaction(s) declined" />        

              <Description>Install Zulip app to communicate with your provider(s) and Pannu Corp.</Description>
              <ZulipWrapper />
              
              <Description>Enter your email address to receive these links by email, or a US mobile phone number to receive a text message. </Description>
              
              
              <Flex style={{ padding: '0 12px' }}>          
                <InputDiv style={{ flex: '1 1 60%', marginRight: 5 }} className={(invalidEmail) && requiredClass}>
                  <InputFieldLabel>Email address*</InputFieldLabel>
                  <Input type="email" value={email}
                    placeholder="abcd123@domain.com"
                    onChange={(val) => setEmail(val.target.value)} />
                </InputDiv>

                <InputDiv style={{ flex: '1 0 120px' }} className={(invalidPhoneNumber) && requiredClass}>
                  <InputFieldLabel style={{ top: -30, width: 105}}>US mobile device number*</InputFieldLabel>
                  <MaskInput
                    mask={PhoneNumberMask}
                    type="tel"
                    value={phoneNumber}
                    name="phone_number"
                    onAccept={(v, m) => setPhoneNumber(v)}
                    placeholder="123-456-7890" />
                </InputDiv>
              </Flex>

              <div style={{marginTop: 25, padding: 12, display: 'flex', justifyContent: 'flex-end'}}>
                <LinkButton className="big">Send</LinkButton>
              </div>
              <div style={{marginTop: 25, marginBottom: 50, display: 'flex', justifyContent: 'center'}}>
                <Link href="/manual/payment/checked-in">
                  <LinkButton className="big">Checked In</LinkButton>
                </Link>
              </div>

            </div>

          </FormContainer>
        </FormWrapper>        
      </Wrapper>
    )
}

export default Result


