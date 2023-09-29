import Link from 'next/link'
import Image from 'next/image'

import { useState } from 'react';

import { ICONS, IMGS } from '../../../../../common/utils/styleGuide';

import { InputGroupWrpper } from '../../../shared/styled';

import {
  TopWrapper, 
  LoginWrapper, 
  PannuLoginWrapper,
  NoteWrapper,
  LeftWrapper,
} from "./styled";


import { useRouter } from 'next/router';
import { Fragment } from 'react';
import LoadingButton from '../../../../../components/Button/LoadingButton';
/** ONLY FOR TEST */

function ManualProviderSignIn () {

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)


  const changeInputValues = (e, id) => {
    e.preventDefault()

    setValues({ ...values, [id]: e.target.value })
  }


  /** ONLY FOR TEST */
  const [isUsername, setIsUsername] = useState(true)

  const [showPass, setShowPass] = useState(false)
  const [showUname, setShowUname] = useState(false)


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
          <div className='text'>Sign in using your username and password.</div>
        </NoteWrapper>
        <PannuLoginWrapper>
          <form className='form' >
            {/* <div className="" style={{ color: 'red' }}>
              {flow?.ui.messages?.map(message => 
              <div key={message.id}>{message.text}</div>
              )}
            </div> */}
            <div className='form-group'>
              <InputGroupWrpper>
                <span className='caption'>Username*</span>
                <input 
                  type={showUname ? 'text' : 'password'}
                  className='input-box'
                  // onChange={(e) => changeInputValues(e, nodes[ElementType.identifier]?.id)}
                />
                  <div className='eye-icon'>
                    <Image
                      src={showUname ? ICONS.eyeOn : ICONS.eyeOff} 
                      width={20} height={19}
                      layout={'fixed'}
                      quality={100}
                      onClick={() => setShowUname(!showUname)}
                    />
                  </div>
                {/* <div className='error-msg'>
                {nodes[ElementType.identifier]?.node.messages.map(message => (
                  <Fragment key={message.id}>{message.text}<br/></Fragment>
                ))}
                </div> */}
                
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
                  onChange={(e) => changeInputValues(e, nodes[ElementType.password]?.id)}
                />
                {/* <div className='error-msg'>
                {nodes[ElementType.password]?.node.messages.map(message => (
                  <Fragment key={message.id}>{message.text}</Fragment>
                ))}
                </div> */}
                <div className='eye-icon'>
                  <Image
                    src={showPass ? ICONS.eyeOn : ICONS.eyeOff}
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
            <div className='submit-btn'>
              <LoadingButton isLoading={isLoading}>
                <button type="button"
                  // onClick={e => changeButtonValues(e, [nodes[ElementType.submit]?.id], nodes[ElementType.submit]?.node.attributes.value)}
                >
                  Sign in
                </button>
              </LoadingButton>
            
            </div>
          </form>
        </PannuLoginWrapper>
      </LeftWrapper>
    </LoginWrapper>
  )
}

export default ManualProviderSignIn