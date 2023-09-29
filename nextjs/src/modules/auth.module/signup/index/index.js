import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import MenuItem from '@mui/material/MenuItem'
const RadioBox = dynamic(() => import('../../../../components/RadioBox'), { ssr: false })
import PasswordHelper from '../../../../components/modals/PasswordHelper'

import { useState } from 'react'
import { useRouter } from 'next/router'

import { PREFIX, SUFFIX } from '../../../../common/constant/global'
import { ICONS, IMGS } from '../../../../common/utils/styleGuide'
import { useLocalStorage } from '../../../../common/hooks/useLocalStorage'
import { useRegUser, useLoadingStatus } from '../../../../redux/hooks/useCommonStore'

import {
  Wrapper,
  FormWrapper,
  FormContainer,
  FigureWrapper,
  CenteredRow,
  MobileViewer,
  DesktopViewer,
  InputFieldLabel,
  InputDiv,
  Input,
  LinkButton, Flex,
  ContentWrapper,
} from '../../../../common/styleds/common.styled'
import { MaskInput } from '../../../../common/styleds/imask.styled'
import { MUISelect } from '../../../../common/styleds/select.styled'
import {
  Title,
  EyeWrapper,
  IconInput,
  StrongText,
  OptionLabel,
  PwdStrengthMark,
  PwdStrengthSeg,
  PwdStrengthLabel,
  SuggestionNameWrapper
} from '../../shared/styled'


function SignUp() {

  const { commitRegUser } = useRegUser()
  const { commitLoadingStatus } = useLoadingStatus()
  
  const router = useRouter()

  const DateMask = '00/00/0000'
  const PhoneNumberMask = '000-000-0000'

  const [showName, setShowName] = useLocalStorage("showName", false) 
  const [showPwd, setShowPwd] = useLocalStorage("showPwd", false)
  const [openedPwdHelpPopup, setOpenedPwdHelpPopup] = useState(false)

  const [prefix, setPrefix] = useLocalStorage("prefix", '')
  //const [idenfier, setIdenfier] = useLocalStorage("idenfier", '')
  const [suffix, setSuffix] = useLocalStorage("suffix", '')
  const [phoneNumber, setPhoneNumber] = useLocalStorage("phoneNumber", '')

  const [fullName, setFullName] = useLocalStorage("fullName", '')
  const [userName, setUserName] = useLocalStorage("userName", '')
  const [email, setEmail] = useLocalStorage("email", '')

  const [password, setPassword] = useLocalStorage("password", '')
  const [inviteCode, setInviteCode] = useLocalStorage("inviteCode", '')
  const [referralCode, setReferralCode] = useLocalStorage("referralCode", '')
  const [dob, setDob] = useLocalStorage("dob", '')

  const [type, setType] = useLocalStorage("type", 1)
  const [codeType, setCodeType] = useLocalStorage("codeType", 1)

  const [invalidFullName, setInvalidFullName] = useState(false)
  const [invalidDob, setInvalidDob] = useState(false)
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false)
  const [invalidIdenfier, setInvalidIdenfier] = useState(false)
  const [invalidPassword, setInvalidPassword] = useState(false)

  const [errMsgIdentifier, setErrMsgIdentifier] = useState('')

  const [suggestionNames, setSuggestionNames] = useState()

  const requiredClass = 'required'

  const changeInputMode = (type) => {
    setType(type)
  }

  const [pwdStrengh, setPwdStrength] = useLocalStorage("pwdStrengh", 0)
  const [strengthColor1, setStrengthColor1] = useLocalStorage("strengthColor1", 'gray')
  const [strengthColor2, setStrengthColor2] = useLocalStorage("strengthColor2", 'gray')
  const [strengthColor3, setStrengthColor3] = useLocalStorage("strengthColor3", 'gray')
  const [strengthColor4, setStrengthColor4] = useLocalStorage("strengthColor4", 'gray')
  const [strengthColor5, setStrengthColor5] = useLocalStorage("strengthColor5", 'gray')
  const [strengthLabelColor, setStrengthLabelColor] = useLocalStorage("strengthLabelColor", 'gray')

  const getPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) {
      strength += 1

      if (password.match(/[a-z].*[a-z]/)) {
        strength += 1
      }
      if (password.match(/[A-Z].*[A-Z]/)) {
        strength += 1
      }
      if (password.match(/[0-9].*[0-9]/)) {
        strength += 1
      }
      if (password.match(/[&%$#@!^*()].*[&%$#@!^*()]/)) {
        strength += 1
      }
    }
    else {
      strength = 0
    }

    return strength
  }

  const checkPasswordStrength = (p) => {
    const strength = getPasswordStrength(p)
    setPwdStrength(strength)
    switch (strength) {
      case 1:
        setStrengthColor1('#FC5252')
        setStrengthColor2('gray')
        setStrengthColor3('gray')
        setStrengthColor4('gray')
        setStrengthColor5('gray')
        setStrengthLabelColor('#FC5252')
        break;
      case 2:
        setStrengthColor1('red')
        setStrengthColor2('red')
        setStrengthColor3('gray')
        setStrengthColor4('gray')
        setStrengthColor5('gray')
        setStrengthLabelColor('red')
        break
      case 3:
        setStrengthColor1('#FFF500')
        setStrengthColor2('#FFF500')
        setStrengthColor3('#FFF500')
        setStrengthColor4('gray')
        setStrengthColor5('gray')
        setStrengthLabelColor('#FFF500')
        break
      case 4:
        setStrengthColor1('#FAC23C')
        setStrengthColor2('#FAC23C')
        setStrengthColor3('#FAC23C')
        setStrengthColor4('#FAC23C')
        setStrengthColor5('gray')
        setStrengthLabelColor('#FAC23C')
        break
      case 5:
        setStrengthColor1('#29B05A')
        setStrengthColor2('#29B05A')
        setStrengthColor3('#29B05A')
        setStrengthColor4('#29B05A')
        setStrengthColor5('#29B05A')
        setStrengthLabelColor('#29B05A')
        break
    }

  }

  const verifyPhoneNumber = async () => {
    const data = {
      fullName: fullName,
      prefix: prefix,
      suffix: suffix,
      dob: dob,
      phoneNumber: phoneNumber,
      idenfier: type == 1 ? email : userName,
      password: password,
      inviteCode: codeType == 1 ? inviteCode : '',
      referralCode: codeType == 2 ? referralCode : '',
      addressList: [],
      gender: ''
    }

    if (fullName.length == 0) {
      setInvalidFullName(true)
      return
    }
    else {
      setInvalidFullName(false)
    }

    if (!dob.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[01])\/\d{4}$/)) {
      setInvalidDob(true)
      return
    }
    else {
      setInvalidDob(false)
    }

    if (!phoneNumber.match(/^\d{3}-\d{3}-\d{4}$/)) {
      setInvalidPhoneNumber(true)
      return
    }
    else {
      setInvalidPhoneNumber(false)
    }

    let idenfier = type == 1 ? userName : email
    if (idenfier == '') {
      setErrMsgIdentifier('')
      setInvalidIdenfier(true)
      return
    }
    else {
      setErrMsgIdentifier('')
      setInvalidIdenfier(false)
    }

    if (type == 2 && !email.toLocaleLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setErrMsgIdentifier('')
      setInvalidIdenfier(true)
      return
    }
    else {
      setErrMsgIdentifier('')
      setInvalidIdenfier(false)
    }

    commitLoadingStatus(true)

    const { getSuggestionNameList } = (await import('../../../../common/lib/user'))
    const res = await getSuggestionNameList(idenfier, type == 2)

    commitLoadingStatus(false)

    if (!res.includes(idenfier)) {
      setSuggestionNames([...res])
      setErrMsgIdentifier('User ID already taken. Try')
      setInvalidIdenfier(true)
      return
    }
    else {
      setSuggestionNames([])
      setErrMsgIdentifier('')
      setInvalidIdenfier(false)
    }

    if (password.length < 8) {
      setInvalidPassword(true)
      return
    }
    else {
      setInvalidPassword(false)
    }

    commitRegUser(data)

    router.push('/auth/signup/verify-phone')
    
  }

  return (
    <Wrapper>
      <FigureWrapper>
        <Title className="big">Welcome to Pannu Corp</Title>
        <CenteredRow marginTop={130}>
          <Image src={IMGS.signinBG} width="511" height="393" />
        </CenteredRow>
      </FigureWrapper>
      <FormWrapper>
        <FormContainer>
          <MobileViewer>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute' }}>
                <Image src={IMGS.topEllipseBG} width="138" height="79" />
              </div>
              <Image src={IMGS.leftEllipseBG} width="85" height="163" />
            </div>
            <Title className="big blue mt-0">Pannu Corp</Title>
            <CenteredRow marginTop={20}>
              <Image src={IMGS.signupBG} width="192" height="153" />
            </CenteredRow>
          </MobileViewer>
          <CenteredRow marginTop={20}>
            <Title className="middle mt-0">Sign up</Title>
          </CenteredRow>
          <ContentWrapper>
            <Flex className="col">
              <Flex marginTop={40}>
                <InputDiv style={{ width: '15%', marginRight: 5 }}>
                  <InputFieldLabel>Prefix</InputFieldLabel>
                  <MUISelect
                    name="prefix"
                    onChange={(e) => setPrefix(e.target.value)}
                    value={prefix}
                    style={{ width: '100%' }}
                  >
                    {PREFIX.map((v, i) => (<MenuItem key={i} value={v.toUpperCase()}>{v}
                  </MenuItem>))}
                  </MUISelect>
                </InputDiv>
                <InputDiv style={{ flex: "1 0 230px", marginRight: 5 }} className={(invalidFullName) && requiredClass}>
                  <InputFieldLabel>Full name on government issued ID*</InputFieldLabel>
                  <Input
                    value={fullName}
                    name="fullname"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </InputDiv>
                <InputDiv style={{ width: '15%' }}>
                  <InputFieldLabel>Suffix</InputFieldLabel>
                  <MUISelect
                    name="suffix"
                    onChange={(e) => setSuffix(e.target.value)}
                    value={suffix}
                    style={{ width: '100%' }}>
                    {SUFFIX.map((v, i) => (<MenuItem key={i} value={v.toUpperCase()}>{v}</MenuItem>))}
                  </MUISelect>
                </InputDiv>
              </Flex>
              <Flex>
                <InputDiv style={{ flex: "1 0 160px", marginRight: 15 }} className={(invalidDob) && requiredClass}>
                  <InputFieldLabel>Date of birth*</InputFieldLabel>
                  <MaskInput
                    mask={DateMask}
                    type="tel"
                    value={dob}
                    name="dob"
                    onAccept={(v, m) => setDob(v)}
                    placeholder="MM/DD/YYYY"
                  />
                </InputDiv>
                <InputDiv style={{ flex: '1 0 160px' }} className={(invalidPhoneNumber) && requiredClass}>
                  <InputFieldLabel>Mobile device number*</InputFieldLabel>
                  <MaskInput
                    mask={PhoneNumberMask}
                    type="tel"
                    value={phoneNumber}
                    name="phone_number"
                    onAccept={(v, m) => setPhoneNumber(v)}
                    placeholder="123-456-7890" />
                </InputDiv>
              </Flex>
              <Title className="small left mt-30">Sign up using</Title>
              <Flex>
                <InputDiv style={{ marginTop: 15, marginRight: 25, alignItems: 'center' }}>
                  <RadioBox status={type === 1} onClick={ () => changeInputMode(1) }>
                    <OptionLabel onClick={() => changeInputMode(1)}>Unique Username</OptionLabel>
                  </RadioBox>
                </InputDiv>
                <InputDiv style={{ marginTop: 15, alignItems: 'center' }}>
                  <RadioBox status={type === 2} onClick={ () => {
                    changeInputMode(2)
                    setShowName(true)
                  } }>
                    <OptionLabel onClick={() => {
                      changeInputMode(2)
                      setShowName(true)
                    }}>Email address</OptionLabel>
                  </RadioBox>
                </InputDiv>
              </Flex>
              <Flex marginTop={10}>
                <InputDiv className={"column " + (invalidIdenfier? requiredClass : '')}>
                  {(type == 1)&& <InputFieldLabel>Unique Username*</InputFieldLabel>}
                  {(type == 2)&& <InputFieldLabel>Email address*</InputFieldLabel>}
                  <Flex>
                    <IconInput
                      type={showName ? 'text' : 'password'}
                      name="idenfier"
                      value={type == 1 ? userName : email}
                      autocomplete="off"
                      onChange={(e) => {
                        if (type == 1)
                          setUserName(e.target.value)
                        else
                          setEmail(e.target.value)
                      }}
                      style={{ width: 240 }}
                    />
                    { (type == 1) &&
                      <EyeWrapper>
                        <Image
                          src={!showName ? ICONS.eyeOn : ICONS.eyeOff}
                          width="21"
                          height="17"
                          layout="fixed"
                          quality={100}
                          onClick={() => setShowName(!showName)}
                        />
                      </EyeWrapper>
                    }
                  </Flex>
                  <Flex className="err-msg">{errMsgIdentifier}</Flex>
                </InputDiv>
                { (suggestionNames && suggestionNames.length > 0)&& (
                    <SuggestionNameWrapper>
                      <div className="title">Available: </div>
                      <ul>
                        { (suggestionNames.map((name, i) => <li className="txt" key={i}>{name}</li>)) }
                      </ul>
                    </SuggestionNameWrapper>
                ) }
              </Flex>
              <Flex marginTop={10}>
                <InputDiv className={(invalidPassword) && requiredClass}>
                  <InputFieldLabel>Password*</InputFieldLabel>
                  <IconInput type={showPwd ? 'text' : 'password'} name="password" value={password}
                    autocomplete="off"
                    onChange={(e) => {
                      setPassword(e.target.value)
                      checkPasswordStrength(e.target.value)
                    }}
                    style={{ width: 240 }}/>
                  <EyeWrapper>
                    <Image
                      src={!showPwd ? ICONS.eyeOn : ICONS.eyeOff}
                      width="21"
                      height="17"
                      layout='fixed'
                      quality={100}
                      onClick={(e) => setShowPwd(true)}
                    />
                  </EyeWrapper>
                  {(pwdStrengh > 0) && (
                    <PwdStrengthMark>
                      <PwdStrengthSeg style={{ backgroundColor: strengthColor1 }}></PwdStrengthSeg>
                      <PwdStrengthSeg style={{ backgroundColor: strengthColor2 }}></PwdStrengthSeg>
                      <PwdStrengthSeg style={{ backgroundColor: strengthColor3 }}></PwdStrengthSeg>
                      <PwdStrengthSeg style={{ backgroundColor: strengthColor4 }}></PwdStrengthSeg>
                      <PwdStrengthSeg style={{ backgroundColor: strengthColor5 }}></PwdStrengthSeg>
                      <PwdStrengthLabel style={{ color: strengthLabelColor }}>{Math.floor((pwdStrengh / 5) * 100)}%</PwdStrengthLabel>
                    </PwdStrengthMark>
                  )}
                </InputDiv>
                <div style={{ margin: '0 0 8px 20px', alignSelf: 'end' }}>
                  <img
                      src="/assets/images/help_ico.png"
                      onClick={() => setOpenedPwdHelpPopup(true)}
                  />
                </div>
              </Flex>
              <Title className="small left mt-30">Enter invite code OR patient referral code here.</Title>
              <Flex className="justify-between">
                <InputDiv style={{ marginTop: 15, alignItems: 'center' }}>
                  <RadioBox status={codeType === 1} onClick={ () => setCodeType(1) }>
                    <OptionLabel onClick={() => setCodeType(1)}>Invite code</OptionLabel>
                  </RadioBox>
                </InputDiv>
                <InputDiv style={{ marginTop: 15, alignItems: 'center' }}>
                  <RadioBox status={codeType === 2} onClick={ () => setCodeType(2)}>
                    <OptionLabel onClick={() => setCodeType(2)}>Patient referral code</OptionLabel>
                  </RadioBox>
                </InputDiv>
              </Flex>
              <Flex className="justify-between">
                <InputDiv style={{ flex: '0 0 170px', marginRight: 15 }}>
                  <Input value={codeType == 1 ? inviteCode : referralCode} onChange={(e) => {
                    if (codeType == 1)
                      setInviteCode(e.target.value)
                    else
                      setReferralCode(e.target.value)
                  } } />
                </InputDiv>
              </Flex>
            </Flex>
            <DesktopViewer style={{ marginTop: 30 }}></DesktopViewer>
            <CenteredRow marginTop={27}>
              <LinkButton className="big strong" onClick={() => verifyPhoneNumber()}>Verify phone number</LinkButton>
            </CenteredRow>
            <CenteredRow marginTop={27}>
              <StrongText>Have account, </StrongText>
              <Link passHref href="/auth/login">
                <LinkButton className="strong normal"> &nbsp;Sign in</LinkButton>
              </Link>
            </CenteredRow>
            <PasswordHelper isOpened={openedPwdHelpPopup} onCancel={() => setOpenedPwdHelpPopup(false)} onOk={ () => setOpenedPwdHelpPopup(false) } />
          </ContentWrapper>
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  )
}

export default SignUp