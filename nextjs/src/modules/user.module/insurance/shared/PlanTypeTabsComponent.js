import styled from 'styled-components'

import { useEffect } from 'react'

import { INSURANCE_PLAN_TYPE } from '../index/data'
import { usePlanType } from '../../../../redux/hooks/useInsuranceStore'

export default function PlanTypeTabsComponent(props) {
  const {
    canChangePlanType,
  } = props

  const { planType, commitPlanType } = usePlanType()
  
  const dispatchPlanType = (planType) => {
    if (canChangePlanType) {
      return commitPlanType(planType)
    }
  }

  useEffect(() => {
    if (!planType) {
      dispatchPlanType(INSURANCE_PLAN_TYPE.MAIN)
    }
  }, [])

  return (
    <PlantypeWrapper>
      <div className={planType === INSURANCE_PLAN_TYPE.MAIN ? 'selected-type' : ''}>
        <button
          className='transparent-btn-jin'
          onClick={() => dispatchPlanType(INSURANCE_PLAN_TYPE.MAIN)}
        >Health Main</button>
      </div>
      <div className={planType === INSURANCE_PLAN_TYPE.OTHER ? 'selected-type' : ''}>
        <button
          className='transparent-btn-jin'
          onClick={() => dispatchPlanType(INSURANCE_PLAN_TYPE.OTHER)}
        >Health Other</button>
      </div>
      <div className={planType === INSURANCE_PLAN_TYPE.DENTAL ? 'selected-type' : ''}>
        <button
          className='transparent-btn-jin'
          onClick={() => dispatchPlanType(INSURANCE_PLAN_TYPE.DENTAL)}
        >Dental</button>
      </div>
      <div className={planType === INSURANCE_PLAN_TYPE.VISION ? 'selected-type' : ''}>
        <button
          className='transparent-btn-jin'
          onClick={() => dispatchPlanType(INSURANCE_PLAN_TYPE.VISION)}
        >Vision</button>
      </div>
    </PlantypeWrapper>
  )
}


export const PlantypeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: #FEFEFE;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 17px;
  > div {
    flex: 1;
    text-align: center;
    padding: 6px 0;
    button {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #000000;
    }
  }
  .selected-type {
    background: #173FD4;
    border-radius: 19px;
    button {
      font-weight: 900;
      font-size: 12px;
      line-height: 18px;
      color: #FFFFFF;
    }
  }
`