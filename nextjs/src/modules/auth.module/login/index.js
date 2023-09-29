import Link from 'next/link'
import Image from 'next/image'
import Cookie from 'js-cookie'

import { useState } from 'react';

import { ICONS, IMGS } from '../../../common/utils/styleGuide'
import { loginUser } from '../../../common/lib/user'
import { useRegUser, useLoadingStatus } from '../../../redux/hooks/useCommonStore'
import { InputGroupWrpper } from '../shared/styled'
import {
  TopWrapper, 
  LoginWrapper, 
  SocialBtnWrapper,
  PannuLoginWrapper,
  BottomWrapper,
  NoteWrapper,
  LeftWrapper,
} from "./styled";
  
/** ONLY FOR TEST */
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetail } from '../../../common/lib/user'
import { useRouter } from 'next/router';
import { AppUrls } from '../../../common/constant/global'
/** ONLY FOR TEST */

function Login () {

  /** ONLY FOR TEST */
  const router = useRouter()
  const { commitRegUser } = useRegUser()
  const { commitLoadingStatus } = useLoadingStatus()

  const fakeProviderSignup = async (redirectToUrl) => {
    try {
      // fetch one user with given id = 26
      const fakeLoginUser = await getUserDetail(26)

      commitRegUser(fakeLoginUser)

      router.push(redirectToUrl)
    }
    catch (error) {
      console.log("fetch userdetail error: ", error);    
    }
  }

  /** ONLY FOR TEST */


  const [isUsername, setIsUsername] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showUname, setShowUname] = useState(false)
  const [validateErrors, setValidateErrors] = useState(null)

  const [loginFailed, setLoginFailed] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.keys(validateForm()).length !== 0) return
    // sending credential to get token
    console.log({
      isUsername,
      username,
      password
    })

    commitLoadingStatus(true)

    const res = await loginUser(username, password, !isUsername)

    commitLoadingStatus(false)

    const referrer =  document.referrer

    if (res != null) {
      let data = {
        id: res.id,
        fullName: res.fullName,
        dob: res.dob,
        memberID: res.memberID,
        internalEmail: res.internalEmail,
        basicData: {
          id: res.basicData.id,
          ssn: res.basicData.ssn,
          currentAddress: res.basicData.currentAddress,
          email: res.basicData.email
        }
      }

      commitRegUser(data)

      Cookie.set('user', JSON.stringify({
        id: data.id,
        fullName: data.fullName,
        internalEmail: data.internalEmail,
        token: ''
      }))

      if (referrer)
        location.href = referrer
      else
        location.href = process.env.NODE_ENV === 'production' ? AppUrls.MESSAGE : 'http://localhost:3000/test_signin'
    }
    else {
      setLoginFailed(true)
    }
  }

  const validateForm = () => {
    const errors = {};
    if(isUsername) {
      if (!username) {
        errors.username = 'Username is required';
      } 
    } else {
      if (!username) {
        errors.username = "Email is required"
      }
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    setValidateErrors(errors)
    return errors
  }

  return (
    <LoginWrapper>
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
                src={IMGS.loginBG} 
                width={188} height={145} 
                layout={'responsive'} 
                priority={false}
              />
            </div>
          </div>
        </div>
      </TopWrapper>
      <LeftWrapper>
        <NoteWrapper>
          <div className='title'>Sign in</div>
          <div className='detail'>Sign in using social sign-on's (SSO), or username/email address and password.</div>
        </NoteWrapper>
        <SocialBtnWrapper>
          <div className='social-btn'>
            <div>
              <Image 
                src={ICONS.iconGoogle} 
                width={24} height={24} layout={'fixed'} 
              />
            </div>
            <div className='btn-text'>Sign in with Google</div>
          </div>
          <div className='social-btn'>
            <div>
              <Image 
                src={ICONS.iconApple} 
                width={24} height={24} layout={'fixed'} 
              />
            </div>
            <div className='btn-text'>Sign in with Apple</div>
          </div>
          <div className='social-btn'>
            <div>
              <Image 
                src={ICONS.iconWindows} 
                width={24} height={24} layout={'fixed'} 
              />
            </div>
            <div className='btn-text'>Sign in with Microsoft Azure</div>
          </div>
          <div className='social-btn facebook-btn'>
            <div>
              <Image 
                src={ICONS.iconFacebook} 
                width={24} height={24} layout={'fixed'} 
              />
            </div>
            <div className='btn-text'>Sign in with Facebook</div>
          </div>
        </SocialBtnWrapper>
        <PannuLoginWrapper>
          <div className='login-option'>
            <div className='title'>Sign in using</div>
            <div className='option-group'>
              <div className='option-unit'>
                <Image 
                  id='username'
                  src={isUsername ? ICONS.radioOn : ICONS.radioOff}
                  width={24} height={24} layout={'fixed'}
                  onClick={() => setIsUsername(true)}
                />
                <label onClick={() => setIsUsername(true)}>Unique Username</label>
              </div>
              <div className='option-unit'>
                <Image 
                  id='email'
                  src={!isUsername ? ICONS.radioOn : ICONS.radioOff}
                  width={24} height={24} layout={'fixed'}
                  onClick={() => {
                    setIsUsername(false)
                    setShowUname(true)
                  }}
                />
                <label onClick={() => {
                    setIsUsername(false)
                    setShowUname(true)
                  }}>Email address</label>
              </div>
            </div>
          </div>
          <form className='form' onSubmit={(e) => handleSubmit(e)}>
            <div className='form-group'>
              <InputGroupWrpper>
                <span className='caption'>{isUsername ? `Username` : 'Email address'}*</span>
                <input 
                  type={showUname ? 'text' : 'password'}
                  className='input-box'
                  autoComplete={username.toString()}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {isUsername && 
                  <div className='eye-icon'>
                    <Image
                      src={!showUname ? ICONS.eyeOn : ICONS.eyeOff} 
                      width={20} height={19}
                      layout={'fixed'}
                      quality={100}
                      onClick={() => setShowUname(!showUname)}
                    />
                  </div>
                }
                <div className='error-msg'>{isUsername ? 
                  validateErrors?.username : validateErrors?.email}</div>
              </InputGroupWrpper>
              <div className='label'>
                <Link 
                  passHref 
                  href={'/auth/forgot-username'}
                >Forgot username</Link>
              </div>
            </div>
            <div className='form-group'>
              <InputGroupWrpper>
                <span className='caption'>Password*</span>
                <input 
                  type={showPass ? 'text' : 'password'}
                  className='input-box'
                  autoComplete={password.toString()}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className='error-msg'>{validateErrors?.password}</div>
                <div className='eye-icon'>
                  <Image
                    src={!showPass ? ICONS.eyeOn : ICONS.eyeOff}
                    width={20} height={19}
                    layout={'fixed'}
                    quality={100}
                    onClick={() => setShowPass(!showPass)}
                  />
                </div>
              </InputGroupWrpper>
              <div className='label'>
                <Link 
                  passHref 
                  href={'/auth/forgot-password'}
                >Forgot password</Link>
              </div>
            </div>
            { loginFailed&& (
              <div className="error">
                The username/email address and password combination do not match. Please try again or reset the password.
              </div>
            ) }
            <div className='submit-btn'>
              <button type='submit'>Sign in</button>
            </div>
          </form>
          <BottomWrapper>
            <div className='bio'>
              <Link 
                passHref 
                href={'#'}
              >Use Biometric</Link>
            </div>
            <div className='signup'>
              <div>No account,</div>
              <div className='link'>
                <Link 
                  passHref 
                  href={'/auth/signup'}
                >Sign up</Link>
              </div>
            </div>
            <div className='pvd-search'>
              <Link 
                passHref 
                href={'/patients/provider-search'}
              >Provider Search</Link>
              <div>
                <button 
                  className='transparent-btn-jin'
                  onClick={() => fakeProviderSignup('/providers/signup/general?menu=general')}
                  >Provider Signup</button>
              </div>
              <div>
                <button
                  className='transparent-btn-jin'
                  onClick={() => fakeProviderSignup('/patients/appointment/make-apt-with/23')}
                >Appointments</button>
              </div>
              <div>
                <button
                  className='transparent-btn-jin'
                  onClick={() => fakeProviderSignup('/patients/appointment/view-apts/')}
                >View All Appointments</button>
              </div>
              <div>
                <button
                  className='transparent-btn-jin'
                  onClick={() => fakeProviderSignup('/users/insurance/')}
                >User Insurance</button>
              </div>
            </div>
          </BottomWrapper>
        </PannuLoginWrapper>
      </LeftWrapper>
    </LoginWrapper>
  )
}

export default Login