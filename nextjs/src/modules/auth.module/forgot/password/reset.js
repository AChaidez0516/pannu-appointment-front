import Image from 'next/image'
import Layout from '../../../../components/Layout'
import Link from 'next/link'

import PasswordHelper from '../../../../components/modals/PasswordHelper'
import useDetectClickOut from '../../../../common/hooks/useDetectClickOut'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useLoadingStatus } from '../../../../redux/hooks/useCommonStore'

import {
  FormWrapper,
  FigureWrapper,
  FormContainer,
  Wrapper,
  CenteredRow,
  InputFieldLabel,
  InputDiv,
  Input,
  LinkButton,
} from '../../../../common/styleds/common.styled'
import {
  EyeWrapper,
  Title,
  ResultTitle
} from '../shared/styled'
import { resetPassword } from '../../../../common/lib/user'
import { MESSAGES } from "../../../../common/constant/global";

function ResetPassword() {
  const router = useRouter()
  const { commitLoadingStatus } = useLoadingStatus()

  const { token } = { ...router.query }

  const { show, nodeRef, triggerRef, handleClickOutside } = useDetectClickOut(false)

  const [result, setResult] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [password, setPassword] = useState('')
  const [invalidPassword, setInvalidPassword] = useState(false)

  const reset = () => {
    if (password == '' || password.length < 8) {
      setInvalidPassword(true)
      return
    }
    else {
      setInvalidPassword(false)
    }

    commitLoadingStatus(true)

    resetPassword(password, token).then(res => {
      commitLoadingStatus(false)

      if (!res) {
        toast.error(MESSAGES.server_error)
        return
      }

      setResult(res.status)
    })
  }

  return (
    <Wrapper className="center">
      <FormWrapper>
        <FormContainer>
          <Layout title="Forgot password" hasDesktopTitle={true}>

            { (!result) ? (
              <>
                <CenteredRow>
                  <Image src="/assets/images/forgotpassword_banner.png" width="244" height="170" />
                </CenteredRow>
                <Title className="small left mt-40">Set up new password</Title>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <InputDiv style={{ width: '70%', marginRight: 30 }} className={invalidPassword ? 'required' : ''} >
                    <InputFieldLabel>Password*</InputFieldLabel>
                    <Input type={showPwd? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} />
                    <EyeWrapper>
                      <Image onClick={() => setShowPwd(!showPwd)} src="/assets/images/eye_ico.png" width="21" height="17" />
                    </EyeWrapper>
                  </InputDiv>
                  <img
                    src="/assets/images/help_ico.png"
                    ref={triggerRef}
                  />
                </div>

                <CenteredRow marginTop={42}>
                  <LinkButton onClick={reset} >Save password</LinkButton>
                </CenteredRow>
              </>
            ) : (
              <>
                <ResultTitle>Password updated</ResultTitle>
                <div style={{ display: 'flex', justifyContent: 'center', margin: 50 }}>
                  <Image src="/assets/images/recovered_banner.png" width="270" height="224" />
                </div>
                <CenteredRow>
                  <Link href="/auth/login">
                    <LinkButton className="big">Sign in</LinkButton>
                  </Link>
                </CenteredRow>
              </>
            ) }
          </Layout>
          { show&& <PasswordHelper nodeRef={nodeRef} /> }
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  )
}

export default ResetPassword
