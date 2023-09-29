import Image from "next/image";
import { useRouter } from "next/router";
import styled, { css } from "styled-components"
import useWindowDimensions, { DEVICE_TYPE } from "../../../common/hooks/useWindowDimensions";
import { ICONS } from "../../../common/utils/styleGuide";
import { IconWrapper } from "../../../components/IconWrapper";
import { devices } from "../../../common/constant/global";
import { HEADER_HEIGHT, MAIN_BODY_PADDING_Y } from "../../patients.service.module/apt/make-apt/shared/constants";
import { SCREENS } from "./data";
import { ArrowIcon, ArrowIcon_1, ShevronLeft } from "../../../common/utils/Icons";

export const Layout = (props) => {
  const {
    children,
    showSection,
    goToHomeScreen,
    goToDetails,
  } = props
  const route = useRouter()
  const { device } = useWindowDimensions()
  const targetScreen = showSection.find(s => s.current)

  const { height } = useWindowDimensions()
  const sectionHeight = height
    // - HEADER_HEIGHT
    - 2 * MAIN_BODY_PADDING_Y

  const handleBack = () => {
    switch (targetScreen.name) {
      case SCREENS.HOME:
        route.push('/auth/login');
        break;
      case SCREENS.DETAILS:
        goToHomeScreen()
        break;
      case SCREENS.FOLLOWUP:
        goToDetails()
        break;
      default:
        goToHomeScreen()
        break;
    }
  }

  return (
    <PageWrapper>
      {/* <HeaderWrapper>
        <div className="arrow-back" onClick={handleBack}>
          <IconWrapper length={32}>
            <ShevronLeft />
          </IconWrapper>
        </div>
        {device === DEVICE_TYPE.DESKTOP && (
          <div className="header">Provider Appointments</div>
        )}
        {device !== DEVICE_TYPE.DESKTOP && (
          <div className="header">{targetScreen.title}</div>
        )}
      </HeaderWrapper> */}
      <MainContentWrapper sectionHeight={sectionHeight}>
        <div className="inner-content-wrapper">
          {children}
        </div>
      </MainContentWrapper>
    </PageWrapper>
  )
}

export const PageWrapper = styled.div`
  * {
    font-family: 'SF Pro Text';
    font-style: normal;
  }
`
export const MainContentWrapper = styled.div`
  padding: 0;
  background: white;
  .inner-content-wrapper {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    justify-content: center;
    align-items: center;
    .section {
      margin: 0 auto;
      width: 100%;
      padding: 6px;
      ${({ sectionHeight }) => sectionHeight && css`
        height: ${sectionHeight}px;
      `}
    }
  }
  @media ${devices.laptop} {
    background: #F7F5F9;
    padding: ${MAIN_BODY_PADDING_Y}px;
    overflow: auto;
    .inner-content-wrapper {
      display: flex;
      flex-direction: row;
      column-gap: 24px;
      .section {
        margin: 0;
        width: 375px;
        background: #FFFFFF;
        border-radius: 14px;
      }
    }
  }

`
// export const HeaderWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   display: flex;
//   align-items: center;
//   column-gap: 10px;
//   height: ${HEADER_HEIGHT}px;
//   padding: 0 4px;
//   background: #ffffff;
//   * {
//     font-weight: 600;
//     font-size: 18px;
//     line-height: 22px;
//     text-align: center;
//   }
//   .arrow-back {
//     cursor: pointer;
//     z-index: 1;
//   }
//   .header {
//     position: absolute;
//     left: 0;
//     width: 100%;
//     text-align: center;
//   }
//   @media ${devices.laptop} {
//     justify-content: center;
//     .arrow-back {
//       display: none;
//     }
//   }
// `