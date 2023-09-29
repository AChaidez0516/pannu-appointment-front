import styled, { css } from "styled-components"
import PropTypes from 'prop-types'
import Image from "next/image"

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";

import { ICONS } from '../../../../../common/utils/styleGuide'
import { PAYMENT_CARDS_REDUCER_ACTIONS } from "../index/data"
import { 
  CustomAdapter, 
  DateIcon, 
  LeftArrowButtonBlue, 
  renderWeekPickerDay, 
  RightArrowButtonBlue } 
from "../shared/utils";

export default function CardListComponent(props) {
  const {
    paymentCards,
    dispatchPaymentCards
  } = props

  return (
    <CardListWrapper hasBorderBottom={false}>
      <div className="card-inner">
        <div className='card-list-inner'>
          <div className="header">
            <div className="row">
              <div className="col-1">Account</div>
              <div className="col-2">Date to charge</div>
              <div className="col-3">Amount</div>
              <div className="col-4">Conv. fee</div>
              <div className="col-5">Total charge</div>
            </div>
          </div>
          <div className="body">
            {paymentCards.map((pCard, i) => (
              <div key={i} className="row">
                <div className="col-1">
                  <div>
                    <Image
                      src={ICONS.cardIcon}
                      alt={'card-icon'}
                      width={22} height={14} layout={'fixed'}
                      quality={100}
                    />
                  </div>
                  <div>{pCard.lastDigit}</div>
                </div>
                <div className="col-2">
                  <LocalizationProvider
                    dateAdapter={CustomAdapter}
                  >
                    <DesktopDatePicker
                      value={pCard.dateToCharge}
                      onChange={(newDate) => dispatchPaymentCards({
                        type: PAYMENT_CARDS_REDUCER_ACTIONS.UPDATE_DATE,
                        payload: {
                          paymentCardId: pCard.id,
                          dateToCharge: newDate
                        }
                      })}
                      renderInput={(params) => <TextField {...params} >Select Date</TextField>}
                      inputFormat="MM/DD/YYYY"
                      minDate={new Date()}
                      showDaysOutsideCurrentMonth
                      renderDay={renderWeekPickerDay}
                      components={{
                        OpenPickerIcon: DateIcon,
                        LeftArrowIcon: LeftArrowButtonBlue,
                        RightArrowIcon: RightArrowButtonBlue,
                        SwitchViewIcon: RightArrowButtonBlue,
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div className="col-3">
                  <input
                    type={'text'}
                    value={pCard.amount}
                    onChange={(e) => dispatchPaymentCards({
                      type: PAYMENT_CARDS_REDUCER_ACTIONS.UPDATE_AMOUNT,
                      payload: {
                        paymentCardId: pCard.id,
                        amount: e.target.value
                      }
                    })}
                  />
                </div>
                <div className="col-4">{pCard.convFee}</div>
                <div className="col-5">{pCard.totalCharge}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="btn-wrapper">
          <div className="edit-btn">
            <button
              className="transparent-btn-jin"
              onClick={() => dispatchPaymentCards({
                type: PAYMENT_CARDS_REDUCER_ACTIONS.ROW_ADD,
              })}
            >Add another card</button>
          </div>
        </div>
      </div>
      <div className="card-total">
        <div className="row">
          <div className="value"></div>
          <div className="label">Total payment</div>
        </div>
        <div className="row">
          <div className="value">
            <input
              className="balance"
              readOnly
              value={''}
              placeholder={'12,450.06'}
              onChange={(e) => { }}
            />
          </div>
          <div className="label">Balance to be paid</div>
        </div>
      </div>
    </CardListWrapper>
  )
}

CardListComponent.propTypes = {
  paymentCards: PropTypes.array.isRequired,
  dispatchPaymentCards: PropTypes.func.isRequired
}

export const CardListWrapper = styled.div`
  .card-inner {
    background: rgba(23, 63, 212, 0.17);
    border-radius: 10px;
    padding: 24px 5px 8px 5px;
    .card-list-inner {
      background-color: white;
      border-radius: 10px;
      .header {
        * {
          font-weight: 600;
          font-size: 10px;
          line-height: 10px;
        }
        .row {
          div {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
          }
        }
      }
      .body {
        * {
          font-weight: 400;
          font-size: 12px;
          line-height: 12px;
        }
        div {
          text-align: center;
        }
        .col-3 input {
          text-align: center;
        }
      }
      .row {
        display: flex;
        align-items: center;
        padding: 4px 7px;
        column-gap: 8px;
        .col-1 {
          width: 59px;
          display: flex;
          align-items: center;
          column-gap: 4px;
        }
        .col-2 {
          width: 106px;
          position: relative;
          input {
            padding: 13px 0px 9px 5px;
          }
        }
        .col-3 {
          width: 61px;
          input {
            width: 100%;
            padding: 13px 0;
            border: none;
            outline: none;
            text-indent: 5px;
            color: black;
            border: 1px solid #aeaeae;
            border-radius: 5px;
          }
        }
        .col-4 {
          width: 58px;
        }
        .col-5 {
          flex: 1;
        }
        border-bottom: 6px solid rgba(23, 63, 212, 0.17);
      }
      ${({ hasBorderBottom }) => !hasBorderBottom && css`
        .row {
          /* border-bottom: none;  will use later*/
        }
      `}
    }
    .btn-wrapper {
      margin-top: -8px;
      background-color: rgba(216, 223, 248);
      .edit-btn {
        padding-top: 15px;
        display: flex;
        justify-content: flex-end;
        button {
          font-weight: 600;
          font-size: 14px;
          line-height: 14px;
          color: #173FD4;
        }
      }
    }
    margin-bottom: 13px;
  }
  .card-total {
    display: flex;
    flex-direction: column;
    row-gap: 14px;
    .row {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      column-gap: 12px;
      .label {
        font-weight: 600;
        font-size: 12px;
        line-height: 12px;
      }
      .value {
        width: 90px;
        .balance {
          padding: 9px 6px ;
          width: 100%;
          border: 1px solid #dedede;
          border-radius: 5px;
          text-align: right;
          &:focus {
            outline: none;
          }
        }
      }
    }
    margin-bottom: 19px;
  }
`