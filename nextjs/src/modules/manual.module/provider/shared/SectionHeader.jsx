import styled from "styled-components"
import { devices } from "../../../../common/constant/global"
import { ShevronLeft } from "../../../../common/utils/Icons"
import { IconWrapper } from "../../../../components/IconWrapper"

export const SectionHeader = ({ title, onArrowBack }) => {
  return (
    <HeaderWrapper>
      <div className="arrow-back" onClick={onArrowBack}>
        <IconWrapper length={30}>
          <ShevronLeft />
        </IconWrapper>
      </div>
      <div className='header'>{title}</div>
    </HeaderWrapper>
  )
}

const HEADER_HEIGHT = 54

export const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  height: ${HEADER_HEIGHT}px;
  padding: 0 0px;
  background: #ffffff;
  * {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
  }
  .arrow-back {
    cursor: pointer;
    z-index: 1;
  }
  .header {
    position: absolute;
    left: 0;
    width: 100%;
    text-align: center;
  }
  @media ${devices.laptop} {
    justify-content: center;
    .arrow-back {
      display: none;
    }
  }
`