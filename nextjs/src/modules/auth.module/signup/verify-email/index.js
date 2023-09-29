import Image from 'next/image'

import Layout from '../../../../components/Layout'
import VerifyCode from './VerifyCode'

import { useRouter } from 'next/router'
import { useRegUser, useLoadingStatus } from '../../../../redux/hooks/useCommonStore'
import {
  Wrapper,
  FormWrapper,
  FormContainer,
  FigureWrapper,
  CenteredRow,
  MobileViewer,
  LinkButton,
  ContentWrapper
} from '../../../../common/styleds/common.styled'
import {
  Title,
} from '../../shared/styled'
import {
  Row
} from './styled'

function VerifyEmail() {
  const router = useRouter()
  const { regUser } = useRegUser()
  const { commitLoadingStatus } = useLoadingStatus()

  /*useEffect(() => {
    if (!regUser) return

    commitLoadingStatus(true)

    sendVerifyEmail(regUser.email)
    .then((res) => {

      commitLoadingStatus(false)

      if (res.status) {
        const message = res.message
      }
    })
  }, [])*/

  async function CheckVerify() {
    const ret = true
    /*commitLoadingStatus(true)

    const ret = await checkVerifyEmail(regUser.email)

    commitLoadingStatus(false)*/

    if (ret) {
      router.push('/auth/signup/security-questions')
    }
    else {
      console.log({check_email_verified: ret})
    }
  }

  return (
    <Wrapper>
      <FigureWrapper>
          <Title className="big">Enter verification code</Title>
          <CenteredRow marginTop={130}>
            <Image src="/assets/images/verifyemail_banner.png" width="511" height="393" />
          </CenteredRow>
      </FigureWrapper>
      <FormWrapper>
          <FormContainer>
            <Layout title="Email Verification">
              <ContentWrapper>
                <MobileViewer>
                  <CenteredRow marginTop={20}>
                    <Image src="/assets/images/verifyemail_banner.png" width="265" height="194" />
                  </CenteredRow>
                  <CenteredRow marginTop={40}>
                    <Title className="small-big mt-0">Enter verification code</Title>
                  </CenteredRow>
                </MobileViewer>
                <Row marginTop={24}>Enter verification code</Row>
                <Row marginTop={5}>sent to email {regUser&& regUser.email}</Row>
                <Row marginTop={57}>
                  <VerifyCode />
                </Row>
                <Row marginTop={40}>Didn't receive verification code?</Row>
                <Row marginTop={5}>Check your spam folder</Row>
                <CenteredRow marginTop={108}>
                  <LinkButton className="big strong" onClick={CheckVerify}>Verify</LinkButton>
                </CenteredRow>
              </ContentWrapper>
            </Layout>
          </FormContainer>
        </FormWrapper>
      </Wrapper>
  )
}

export default VerifyEmail
