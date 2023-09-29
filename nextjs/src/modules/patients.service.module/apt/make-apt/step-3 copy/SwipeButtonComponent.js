import styled from "styled-components"
import PropTypes from 'prop-types'
import Image from "next/image"
import { ICONS } from "../../../../../common/utils/styleGuide"



export default function SwipeButtonComponent(props) {
  const {

  } = props

  return (
    <ButtonWrapper>
      <div className="left">
        <Image
          src={ICONS.tripleArrow}
          width={24} height={14}
          layout={'fixed'}
          alt={'tripple arrow'}
          quality={100}
        />
      </div>
      <div className="right">Swipe to process payment</div>
    </ButtonWrapper>
  )
}

SwipeButtonComponent.propTypes = {

}

export const ButtonWrapper = styled.button`
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
  width: 100%;
  display: flex;
  align-items: stretch;
  .left {
    background: #F2C13C;
    border-radius: 8px 0px 0px 8px;
    width: 61px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .right {
    background: #F7E2A8;
    border-radius: 0px 8px 8px 0px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 14px;
  }
  cursor: pointer;
`