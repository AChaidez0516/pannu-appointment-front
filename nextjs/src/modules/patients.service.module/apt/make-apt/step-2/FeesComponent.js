import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import PropTypes from 'prop-types'
import { ICONS } from "../../../../../common/utils/styleGuide";


export default function FeesComponent(props) {
  const {
    children,
    usePoem,
    setUsePoem,
    agreeTerms,
    setAgreeTerms,
    isSubmit,
    isReschedule,
    onOpenTermsAndConditions
  } = props

  return (
    <FeesWrapper>
      <div className="title">Fees</div>
      <div className="title-note">We will automatically apply any appointment tokens you have purchased toward Pannu Corp fees, and show the available balance.</div>
      <div className="list-fees">
        <ol>
          {isReschedule == false && (
            <>
              <li>
                <div className="fee-unit">
                  <div className="fee-label">Appointment reservation fee <br/>Refundable. See cancellation policy</div>
                  <div className="fee-price">${`XX.XX`}</div>
                </div>
              </li>
              <li>
                <div className="fee-unit">
                  <div className="fee-label">Copay</div>
                  <div className="fee-price">${`XX.XX`}</div>
                </div>
              </li>
              <li>
                <div className="fee-unit">
                  <div className="fee-label">Deductible + coinsurance + self pay</div>
                  <div className="fee-price">${`XX.XX`}</div>
                </div>
              </li>
            </>
          )}
          <li>
            {children}
          </li>
        </ol>
        <div className="total-charge-today">
          <div>Total charge today</div>
          <div>${`XX.XX`}</div>
        </div>
      </div>
      <div className="terms-wrapper">
        <div className="label-field">
          <div className="label">
            Use the <span>POEM service</span> to pay the estimated copay, deductible and coinsurance if the provider participates and approves
          </div>
          <Image
            src={usePoem ? ICONS.checkOn : ICONS.checkOff}
            width={18} height={18}
            layout={'fixed'}
            onClick={() => setUsePoem(!usePoem)}
          />
        </div>
        <div className="label-field">
          <div className="label">
            I agree to the <Link href={'#'} passHref>
              <button className="transparent-btn-jin" onClick={onOpenTermsAndConditions}>Terms and Conditions<span style={{color: "black"}}>*</span></button>
            </Link>
          </div>
          <Image
            src={agreeTerms ? ICONS.checkOn : ICONS.checkOff}
            width={18} height={18}
            layout={'fixed'}
            onClick={() => setAgreeTerms(!agreeTerms)}
          />
        </div>
      </div>
      {isSubmit && !agreeTerms &&
        <ErrorMsg>Agreement is required*</ErrorMsg>
      }
    </FeesWrapper>
  )
}

FeesComponent.propTypes = {
  agreeTerms: PropTypes.bool.isRequired,
  setAgreeTerms: PropTypes.func.isRequired,
  isSubmit: PropTypes.bool.isRequired,
}

export const ErrorMsg = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: red!important;;
`
export const FeesWrapper = styled.div`
  padding: 9px 8px;
  border: 2px solid rgba(255, 0, 0, 0.3);
  border-radius: 5px;
  * {
    font-family: 'SF Pro Text';
    font-style: normal;
    color: #000000;
  }
  .title {
    font-weight: 600;
    font-size: 14px;
    line-height: 12px;
    margin-bottom: 12px;
  }
  .title-note {
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    margin-bottom: 9px;
  }
  .list-fees {
    ol {
      font-weight: 500;
      font-size: 12px;
      line-height: 15px;
      padding: 0;
      margin: 0;
      padding-left: 15px;
      li {
        font-weight: 500;
        padding: 3px 0;
        .fee-unit {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          .fee-label {
            font-weight: 500;
          }
          .fee-price {
            font-weight: 500;
          }
        }
      }
      margin-bottom: 10px;
    }
    .total-charge-today {
      padding-left: 12px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      * {
        font-weight: 700;
        font-size: 12px;
        line-height: 13px;
      }
    }
    margin-bottom: 15px;
  }
  .terms-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 13px;
    .label-field {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      .label {
        font-weight: 600;
        font-size: 12px;
        line-height: 15px;
        width: 293px;
        span {
          font-size: 14px;
          font-weight: 600;
        }
        button {
          padding: 0px;
          color: #173FD4;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
  margin-bottom: 15px;
`