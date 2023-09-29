import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import Layout from '../../../../components/Layout'
import VerifyCode from './VerifyCode'
import { useRegUser } from '../../../../redux/hooks/useCommonStore'
import { IMGS } from '../../../../common/utils/styleGuide'
import {
  Wrapper,
  FormWrapper,
  FormContainer,
  FigureWrapper,
  CenteredRow, 
  MobileViewer,
  DesktopViewer,
  LinkButton,
  ContentWrapper,
  Flex,
} from '../../../../common/styleds/common.styled'
import {
  Title,
} from '../../shared/styled'
import {
  TimeText,
  Row
} from './styled'

function VerifyPhonenumber() {
  const [showTime, setShowTime] = useState(false)
  const [[mins, secs], setTime] = useState([2, 0])
  const [showVerify, setShowVerify] = useState(false)
  const [maskPhoneNumber, setMaskPhoneNumber] = useState()
  const { regUser } = useRegUser()

  const tick = () => {
    if (mins === 0 && secs === 0) {
      setShowTime(false)
      reset()
    } else if (secs === 0) {
      setTime([mins - 1, 59])
    } else {
      setTime([mins, secs - 1])
    }
  }

  const reset = () => setTime([parseInt(2), parseInt(0)])

  useEffect(() => {
    const timerId = setInterval(() => tick(), 1000)
    return () => clearInterval(timerId)
  })

  useEffect(() => {
    if (!regUser)
      return

    let substr = regUser.phoneNumber.substring(regUser.phoneNumber.length - 2)
    setMaskPhoneNumber(`***-***-**${substr}`)
  }, [])

  return (
    <Wrapper>
      <FigureWrapper>
          <Title className="big">Enter verification code</Title>
          <CenteredRow marginTop={130}>
              <Image src={IMGS.verifyPhoneBG} width="511" height="393" />
          </CenteredRow>
      </FigureWrapper>
      <FormWrapper>
        <FormContainer>
          <Layout title="Enter verification code">
            <ContentWrapper>
              <DesktopViewer>
                <CenteredRow marginTop={40}>
                  <Title className="small-big">Verification code</Title>
                </CenteredRow>
              </DesktopViewer>
              {showTime ? (
                <TimeText style={{ color: '#000000' }}>{`${mins
                  .toString()
                  .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</TimeText>
              ) : (
                <TimeText
                  style={{ color: '#173FD4' }}
                  onClick={() => setShowTime(true)}
                >
                  Resend
                </TimeText>
              )}
              <MobileViewer>
                <Flex className="justify-center" marginTop={20}>
                  <Image src={IMGS.verifyPhoneBG} width="239" height="150" />
                </Flex>
                <CenteredRow marginTop={51}>
                  <Title className="small-big mt-0">Enter verification code</Title>
                </CenteredRow>
              </MobileViewer>
              <CenteredRow marginTop={26}>
                Verification code sent to the device with the<br />
                mobile number ending in {maskPhoneNumber}
              </CenteredRow>
              <Row marginTop={57}>
              <VerifyCode />
              </Row>
              <Row marginTop={23} style={{ visibility: 'hidden' }}>
                Didn't receive the code or failed?<br />
                Go back and recheck your number. Then try again.
              </Row>
              {!showVerify && (
                <Row marginTop={55}>
                  <Link passHref href="/auth/signup/agreement">
                    <LinkButton className="big strong">Verify</LinkButton>
                  </Link>
                </Row>
              )}
            </ContentWrapper>
          </Layout>
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  )
}

export default VerifyPhonenumber
