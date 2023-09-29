import Link from 'next/link'
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import Image from "next/image";

import { ICONS, IMGS } from "../../../common/utils/styleGuide";
import { devices } from "../../../common/constant/global";
// import { BellWrapper } from "../../shared/DesktopHeader/styled";
import { HEADER_HEIGHT } from './constants';


function Header(props) {
  const regUser = null; // useSelector((state) => state.reg.user)
  const {
    title,
    currentStepNumber,
    setCurrentStepNumber,
    isDoneSelectReasons,
    setIsDoneSelectReasons,
    calendarType
  } = props

  const handlePrevPage = () => {
    if (currentStepNumber == 0 && isDoneSelectReasons) {
      setIsDoneSelectReasons(false);
      return;
    }
    if (currentStepNumber > 0) {
      setCurrentStepNumber(currentStepNumber - 1);
    }
  }

  return (
    <HeaderWrapper headerHeight={HEADER_HEIGHT}>
      <div className="left">
        <div className="arrow-back">
            <Image
              src={ICONS.arrowLeft}
              width={10} height={13}
              layout={'fixed'}
              quality={100}
              alt='back arrow'
              onClick={handlePrevPage}
            />
        </div>
      </div>
      <div className="center">{currentStepNumber == 3 ? 'Check out' : (currentStepNumber == 1 ? calendarType.label : title)}</div>
    </HeaderWrapper>
  )
}


export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 13px;
  background: white;
  padding-top: 32px;
  ${({ headerHeight }) => headerHeight && css`
    height: ${headerHeight}px;
  `}
  // @media ${devices.laptop} {
  //   padding: 0 33px; 
  // }
  .left {
    .company-logo {
      display: none;
      cursor: pointer;
    }
  }
  .center {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    margin:0 auto;
    @media ${devices.laptop} {
      font-weight: 700;
      font-size: 22px;
      line-height: 22px;
    }
  }
`

export default Header

