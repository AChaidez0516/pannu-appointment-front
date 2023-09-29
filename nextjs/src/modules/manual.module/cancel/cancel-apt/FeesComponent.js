import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import PropTypes from 'prop-types'
import { ICONS } from "../../../../common/utils/styleGuide";
import { useState } from "react";


export default function FeesComponent() {

  const [rollOverRefund, setRollOverRefund] = useState(true);

  return (
    <FeesWrapper>
      <div className="title">Fees</div>
      <div className="list-fees">
        <ol>
            <li>
              <div className="fee-unit">
                <div className="fee-label">Refund appointment reservation fee  <br/>See cancelation policy below</div>
                <div className="fee-price">${`XX.XX`}</div>
              </div>
            </li>
            <div className="rollOver-container">
              <div className="fee-label">Roll over refund for future use to pay appointment reservation fee for any provider on this network</div>
              <div className="">
                <Image
                  src={rollOverRefund ? ICONS.checkOn : ICONS.checkOff}
                  width={18} height={18}
                  layout={'fixed'}
                  onClick={() => setRollOverRefund(!rollOverRefund)}
                />
              </div>
            </div>
            <li>
              <div className="fee-unit">
                <div className="fee-label">Refund copay</div>
                <div className="fee-price">${`XX.XX`}</div>
              </div>
            </li>
            <li>
              <div className="fee-unit">
                <div className="fee-label">Refund deductible + coinsurance + self pay</div>
                <div className="fee-price">${`XX.XX`}</div>
              </div>
            </li>
          <li>
            <div className="fee-unit">
              <div className="fee-label">Refund Appointment on time fee <br />paid to Pannu Corp <span className="span-xToken"> X Token</span></div>
              <div className="fee-price">${`XX.XX`}</div>
            </div>
          </li>
          <li>
            <div className="fee-unit">
              <div className="fee-label">Refund Preferred/Wait listed appointment fee <br />paid to Pannu Corp</div>
              <div className="fee-price">${`XX.XX`}</div>
            </div>
          </li>
        </ol>
        <div className="total-charge-today">
          <div>Total refund today</div>
          <div>${`XX.XX`}</div>
        </div>
      </div>
      <div className="terms-wrapper">
        <div className="label-field">
          <div className="label-terms">
            <p>If you used the <span>POEM service</span> to pay the estimated copay, deductible and coinsurance, POEM will process the refund directly.</p>
            <p>Your refund will be sent to the payment method you used to make the payment. <br />Allow up to 2 weeks for refunds to show up in your bank or credit card account.</p>
          </div>
        </div>
      </div>
    </FeesWrapper>
  )
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
      .rollOver-container{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }
      li {
        font-weight: 500;
        padding: 3px 0;
        .fee-unit {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          .fee-label {
            font-weight: 500;
            .span-xToken{
              color: #FF9100;

            }
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
      .label-terms{
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        p {
          span {
            font-size: 14px;
            font-weight: 800;
          }
        }
      }
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