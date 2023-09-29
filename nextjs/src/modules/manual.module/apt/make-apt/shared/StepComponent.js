import { useState, useEffect } from 'react'
import styled, { css } from "styled-components"
import PropTypes from 'prop-types'
import { MAX_STEP } from "../index/data"

export default function StepComponent(props) {
  const {
    stepNumber,
    currentStepNumber,
    setCurrentStepNumber,
    isValidate,
    setIsSubmit,
    selectedReasons = [],
    aptKind = null,
    isDoneSelectReasons = false,
    setIsDoneSelectReasons = null,
    startTimeEvent = null,
    agreeTerms = false
  } = props

  const [isNextDisabled, setIsNextDisabled] = useState(false)
  const btnTextColor = isValidate && currentStepNumber >= stepNumber ? '#173FD4' : '#c4c4c4'

  const handleClickSubmit = () => {
    if (!(isValidate && currentStepNumber >= stepNumber) || currentStepNumber !== stepNumber) {
      setIsSubmit(true)
      return
    }
    setIsSubmit(false)
    setCurrentStepNumber(prev => {
      if (prev === MAX_STEP) return MAX_STEP
      return prev + 1
    })
  }
  
  useEffect(() => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }, [stepNumber])

  useEffect(() => {
    if (stepNumber == 0 && !aptKind) {
      setIsNextDisabled(true)
      return;
    } 
    if (stepNumber == 1 && !startTimeEvent) {
      setIsNextDisabled(true);
      return;
    }
    if (stepNumber == 2 && !agreeTerms) {
      setIsNextDisabled(true);
      return;
    }
    setIsNextDisabled(false);
  }, [stepNumber, agreeTerms, aptKind, startTimeEvent])

  return (
    <StepWrapper btnTextColor={btnTextColor}>
      <div className="btn btn-cancel">
        {stepNumber == 0 && isDoneSelectReasons && 
          <button
            onClick={() => setIsDoneSelectReasons(false)}
          >Cancel</button>
        }
        {stepNumber !== 0 && stepNumber != 3 &&
          <button
            onClick={() => setCurrentStepNumber(prev => {
              if (prev === 0) return 0
              return prev - 1
            })}
          >Cancel</button>
        }
      </div>
      <div className="btn btn-next">
        {((stepNumber == 0 && isDoneSelectReasons) || (stepNumber != 0 && stepNumber !== MAX_STEP)) &&
          <button
            onClick={handleClickSubmit}
            disabled={isNextDisabled}
          >{stepNumber === MAX_STEP - 1 ? 'Check out' : 'Next'}</button>
        }
      </div>
    </StepWrapper>
  )
}

StepComponent.propTypes = {
  currentStepNumber: PropTypes.number.isRequired,
  setCurrentStepNumber: PropTypes.func.isRequired,
}

export const StepWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 19px 18px;
  button {
    border: none;
    background: transparent;
    outline: none;
    font-weight: 600;
    font-size: 18px;
    line-height: 20px;
    cursor: pointer;
  }
  .btn-next button{
    color: #173FD4;
    font-size: 22px;
    font-size: 24px;
    &:disabled {
      color: #A4A4A4;
    }
  }
  ${({ btnTextColor }) => btnTextColor && css`
    color: ${btnTextColor};
  `}
`