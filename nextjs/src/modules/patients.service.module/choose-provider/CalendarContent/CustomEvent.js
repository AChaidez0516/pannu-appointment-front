import styled, { css } from "styled-components"
import Image from 'next/image'
import moment from "moment"
import { ICONS } from "../../../../common/utils/styleGuide"


const CardContentWrapper = styled.div`
  padding-top: 2px;
  position: relative;
  display: flex;
  flex-direction: column;
  row-gap: 3px;
  color: black;
  background: white;
  z-index: 1;
  .pvd-name {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 10.5px;
    line-height: 11px;
    color: #000000;
    max-width: 102px;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
` 
const FirstWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 300;
  font-size: 10px;
  line-height: 10px;
  color: #000000;
`
const EndWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    column-gap: 3px;
    label {
      margin: 0;
      padding: 0;
      width: 20px;
      height: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0.8px solid #000000;
      border-radius: 5px;
    }
  }
  span {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 10px;
    color: #000000;
  }
`
const PPOWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 29px;
  height: 14px;
  right: -7px;
  top: -12px;
  background: #29B05A;
  border-radius: 3px;
  label {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    line-height: 11px;
    color: #FFFFFF;
  }
  z-index: 2;
  ${({ isPPO }) => isPPO && css`
    background-color: #0085FE;
  `}
`
const POEMWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 10px;
  bottom: -14px;
  left: -2px;
  background: white;
  border-radius: 3px;
  label {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 11px;
    line-height: 11px;
    color: #FF0000;
    text-shadow: 0px 0px 10px #FF0000;
  }
`

function CustomEvent ({event, title}) {
  return(
    <CardContentWrapper>
      <FirstWrapper>
        <span>{moment(event.start).format("hh:mm")}</span>
        <div><Image src={ICONS.orangeStar} width={11} height={11} /> {`${'3'}/5`}</div>
        <span>{'4.3mi'}</span>
      </FirstWrapper>
      <div className="pvd-name">{event?.provider?.fullName || 'no name'}</div>
      <EndWrapper>
        <span>MD BC</span>
        <div>
          <label><Image src={ICONS.camera} width={15} height={8} layout="fixed" /></label>
          <label><Image src={ICONS.linePhone} width={13} height={13} layout="fixed" /></label>
          <label><Image src={ICONS.mobilePhone} width={9} height={12} layout="fixed" /></label>
        </div>
      </EndWrapper>
      <PPOWrapper isPPO={event?.provider?.isPPO}><label>{event?.provider?.isPPO ? 'PPO' : 'HMO'}</label></PPOWrapper>
      {event?.isPOEM && <POEMWrapper><label>POEM</label></POEMWrapper>}
    </CardContentWrapper>
  )
}
export default CustomEvent