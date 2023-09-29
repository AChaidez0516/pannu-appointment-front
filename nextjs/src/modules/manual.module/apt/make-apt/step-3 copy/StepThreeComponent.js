import styled from "styled-components"
import PropTypes from 'prop-types'
import StepWrapperComponent from "../shared/StepWrapperComponent"
import AmountDueComponent from "./AmountDueComponent"
import CardListComponent from "./CardListComponent"
import SwipeButtonComponent from "./SwipeButtonComponent"

export default function StepThreeComponent(props) {
  const {
    paymentCards,
    dispatchPaymentCards,
  } = props

  return (
    <StepWrapperComponent>
      <NoteWrapper>
        <div className='note'>Credit cards will be charged 2% convenience fee</div>
      </NoteWrapper>
      <AmountDueComponent />
      <CardListComponent
        paymentCards={paymentCards}
        dispatchPaymentCards={dispatchPaymentCards}
      />
      <NoteDescription 
        className='note-description'>If provider approves charging estimated copay, deductible, coinsurance and self pay to the <span className='poem-service'>POEM service</span>, the amount paid here will be refunded to the payment method used.</NoteDescription>
      <SwipeButtonComponent />
    </StepWrapperComponent>
  )
}

StepThreeComponent.propTypes = {
  paymentCards: PropTypes.array.isRequired,
  dispatchPaymentCards: PropTypes.func.isRequired,
}

export const NoteWrapper = styled.div`
  padding: 0 20px;
  .note {
    padding: 7px 0;
    background: rgba(23, 63, 212, 0.2);
    border-radius: 5px;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    color: #173FD4;
  }
  margin-bottom: 15px;
`
export const NoteDescription = styled.div`
  padding: 0 12px;
  font-size: 12px;
  line-height: 15px;
  font-weight: 400;
  .poem-service {
    font-size: 14px;
    line-height: 15px;
    font-weight: 700;
  }
  margin-bottom: 13px;
`