import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from 'prop-types'
import FieldSetInputComponent from "../shared/FieldSetInputComponent";

export default function TokenInfoComponent(props) {
  const {
    calendarType
  } = props

  const regUser = useSelector((state) => state?.reg?.user)

  const [balanceToken, setBalanceToken] = useState(-1) // -1, 5, 
  const [useToken, setUseToken] = useState(false)
  const [tokenCode, setTokenCode] = useState('')
  const [isWrongTokenCode, setIsWrongTokenCode] = useState(false)
  const [invalidMessage, setInvalidMessage] = useState('')

  if (calendarType.value === 'REGULAR') {
    return <>Not needed to use token</>
  }

  /**
  useEffect(() => {
    // if (calendarType.value === 'REGULAR') {
    //   return 
    // }

    /** check if token exist given calendarType 
    const aptType = calendarType.value // URGENT, PREFERRED, REGULAR, WAIT_LIST
    //  checkTokenByAptType(regUser.id, aptType)
    /** the response 
     * balance token for given type appointment
     * balance > -1 ? 'the count of balance': 'no token to use'
     */
  /**
  }, [])
  */

  const handleCheckTokenCode = async () => {
    try {
      // request to use a token with token code 
      setIsWrongTokenCode(true)
      setInvalidMessage("Enter valid token number");
      console.log(123);
    } catch (error) {
      // exception handling
    }
  }

  console.log(isWrongTokenCode);
  return (
    <>
      <div className="fee-unit">
        <div className="fee-label">
          <TokenInfoWrapper>
            {balanceToken > -1 && <>
              <span>1 <span className="calendar-type-name">{calendarType.label}</span> token applied.</span>
              <div className="balance-token">Balance {balanceToken} tokens</div>
            </>
            }
            {balanceToken < 0 && <>
              <div>
                {calendarType.value == 'URGENT' && 'Urgent appointment fee'}
                {calendarType.value == 'PREFERRED' && 'Preferred appointment fee'}
                {calendarType.value == 'WAIT_LIST' && 'Wait listed appointments fee'}
              </div>
              <div className="use-token">Payable to Pannu Corp
                {!useToken && <button
                  className="transparent-btn-jin"
                  onClick={() => setUseToken(!useToken)}
                >Use a token</button>
                }
              </div>
              {useToken &&
                <>
                  <div className="token-wrapper">
                    <div className="token-box-wrapper">
                      <FieldSetInputComponent
                        isWrongTokenCode={isWrongTokenCode}
                        labelName={'Enter token no.'}>
                        <input
                          style={{ border: 'none', outline: 'none' }}
                          className="token-code-input"
                          spellCheck={false}
                          type={'text'}
                          // placeholder={'input token'}
                          maxLength={8}
                          value={tokenCode}
                          onChange={(e) => setTokenCode(e.target.value)}
                        />
                      </FieldSetInputComponent>
                    </div>
                    <div className="check-btn">
                      <button
                        disabled={tokenCode === '' || tokenCode.length < 8 ? true : false}
                        style={{ color: tokenCode === '' || tokenCode.length < 8 ? '#C4C4C4' : '#173FD4' }}
                        className="transparent-btn-jin"
                        onClick={handleCheckTokenCode}
                      >Verify</button>
                      <button
                        className="transparent-btn-jin"
                        onClick={() => {
                          setTokenCode('');
                          setIsWrongTokenCode(false);
                          setInvalidMessage('');
                          setUseToken(!useToken)
                        }}
                      >Cancel</button>
                    </div>
                  </div>
                  {isWrongTokenCode && <div className="token-invalid-msg">{invalidMessage}</div>}
                </>
              }
            </>
            }

          </TokenInfoWrapper>
        </div>
        <div className="fee-price">${`0.00`}</div>
      </div>
    </>
  )
}

TokenInfoComponent.propTypes = {
  calendarType: PropTypes.object.isRequired
}


export const TokenInfoWrapper = styled.div`
  * {
    font-family: 'SF Pro Text';
    font-style: normal;
    color: #000000;
    font-size: 12px;
    line-height: 15px;
    font-weight: 500;
  }
  .calendar-type-name {
    text-decoration: underline;
  }
  .balance-token {
    padding-top: 5px;
    color: rgb(255, 159, 32);
  }
  .use-token {
    margin-top: 5px;
    button {
      font-weight: 500;
      font-size: 16px;
      line-height: 18px;
      color: #173FD4;
    }
  }
  .token-wrapper {
    margin-top: 10px;
    display: flex;
    align-items: center;
    column-gap: 15px;
    .token-box-wrapper {
      width: 165px;
      height: 43px;
    }
    .check-btn {
      button {
        font-weight: 500;
        font-size: 14px;
        line-height: 10px;
        color: #173FD4;
      }
    }
    .token-code-input {
      border: none;
      outline: none;
      width: 100%;
      font-size: 12px;
      line-height: 14px;
    }
  }
  .token-invalid-msg {
    padding-left: 3px;
    padding-top: 2px;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;
    color: #F00000;
  }
`