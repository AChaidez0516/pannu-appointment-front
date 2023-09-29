import Image from 'next/image'

import InputBox from '../../../../../components/InputBox'
import PasswordHelper from '../../../../../components/modals/PasswordHelper'

import { useState, useEffect } from 'react'

import { IMGS, ICONS } from '../../../../../common/utils/styleGuide'
import { useLocalStorage } from '../../../../../common/hooks/useLocalStorage'

import {
  Wrapper,
  LinkButton, 
  FlexRow,
} from '../../../../../common/styleds/common.styled'

import { 
  SignupWrapper 
} from './styled'
import { EyeWrapper } from '../../../shared/styled'
import { TopWrapper } from '../../styled'
import LoadingButton from '../../../../../components/Button/LoadingButton'


export default function ManualZuliSignUp() {

  const [values, setValues] = useState({});

  const [showPwd, setShowPwd] = useState(false);
  const [openedPwdHelpPopup, setOpenedPwdHelpPopup] = useState(false);

  const [pwdStrengh, setPwdStrength] = useState("pwdStrengh", 0);
  const [strengthColor1, setStrengthColor1] = useState();
  const [strengthColor2, setStrengthColor2] = useState();
  const [strengthColor3, setStrengthColor3] = useState();
  const [strengthColor4, setStrengthColor4] = useState();
  const [strengthColor5, setStrengthColor5] = useState();
  const [strengthLabelColor, setStrengthLabelColor] = useState();

    
  const changeInputValues = (id, value) => {
    setValues({ ...values, [id]: value })
  }

  const getMessageStr = (messages) => {
    if (!messages)
      return ''
      
    let tmp = messages.map(message => message.text)
    return tmp.join('<br />')
  }


  const checkConsecutiveCharacters = (password) => {
    for (let i = 0; i < password.length - 1; i++) {
        const currentChar = password[i];
        const nextChar = password[i + 1];
        
        if (nextChar.charCodeAt(0) === currentChar.charCodeAt(0) + 1 || /(\w)\1/.test(password) ) {
          return false;
        }
    }
    return true;
  }



  const getPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) {

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
      if(checkConsecutiveCharacters(password)){
        strength += 1;
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
    const handleClickIcon = (e) =>{
        setShowPwd(!showPwd)
    } 

  return (
    <SignupWrapper>
        <TopWrapper>
        <div className="login-corner">
          <Image 
            src={IMGS.loginCorner} 
            width={136} height={105} 
          />
        </div>
        <div className='header'>
          <div className='title'>Pannu Corp</div>
          <div className='bg-wrapper'>
            <div className='login-bg'>
              <Image 
                src={IMGS.signupBG} 
                width={188} height={145} 
                layout={'fixed'} 
                priority={false}
              />
            </div>
          </div>
        </div>
      </TopWrapper>
        <div className="content">
            <div className="sub-title">Sign up</div>
            <div className="bigger-desc">
            zulip.pannucorp.com
            </div>
            <div className="desc">
            Enter this URL in the field for Zulip server
            </div>
            <div className="bigger-desc">
            john.jonas.02.02
            </div>
            <div className="desc">Use this username created for you to log in to the Zulip server.</div>
            <div className="desc">Create a strong password with a minimum of 8 characters. Click the          icon for details.</div>
            <div className="password">
                <div className="group">
                <InputBox
                    caption="Password*"
                    style={{ width: 240 }}
                    type={showPwd ? "text" : "password"}
                    autocomplete="off"
                    iconSrc={showPwd ? ICONS.eyeOn : ICONS.eyeOff}
                    iconType='image'
                    showIcon={true}
                    onClickIcon={handleClickIcon}
                    icon={
                    <EyeWrapper>
                        <Image
                        src={showPwd ? ICONS.eyeOn : ICONS.eyeOff}
                        width="21"
                        height="17"
                        layout='fixed'
                        quality={100}
                        onClick={(e) => setShowPwd(!showPwd)}
                        />
                    </EyeWrapper>
                    }
                    message={getMessageStr()}
                    onChange={(v) => {
                    checkPasswordStrength(v)
                    changeInputValues()
                    }}
                />
                {pwdStrengh  > 0&& (
                    <div className="mark">
                    <div className="seg" style={{ backgroundColor: strengthColor1 }}></div>
                    <div className="seg" style={{ backgroundColor: strengthColor2 }}></div>
                    <div className="seg" style={{ backgroundColor: strengthColor3 }}></div>
                    <div className="seg" style={{ backgroundColor: strengthColor4 }}></div>
                    <div className="seg" style={{ backgroundColor: strengthColor5 }}></div>
                    <div className="label" style={{ color: strengthLabelColor }}>{Math.floor((pwdStrengh / 5) * 100)}%</div>
                    </div>
                )}
                </div>
                <div className="help">
                <img src={ICONS.pwdHelp} onClick={() => setOpenedPwdHelpPopup(true)} />
                </div>
            </div>

            </div>
            <FlexRow marginTop={27} style={{marginBottom: 190}} className="justify-center">
              <LoadingButton isLoading={false}>
                <LinkButton className="big strong">
                    Get appointment data
                </LinkButton>
              </LoadingButton>

            </FlexRow>

        <PasswordHelper isOpened={openedPwdHelpPopup} onCancel={() => setOpenedPwdHelpPopup(false)} onOk={ () => setOpenedPwdHelpPopup(false) } />
    </SignupWrapper>
  )
}