import Image from "next/image";
import { useRouter } from "next/router";
import styled, { css } from "styled-components"
import { devices } from "../../../../common/constant/global";
import useWindowDimensions from "../../../../common/hooks/useWindowDimensions";
import { ICONS } from "../../../../common/utils/styleGuide";
import { IconWrapper } from "../../../../components/IconWrapper";
import { HEADER_HEIGHT, MAIN_BODY_PADDING_Y } from "../../apt/make-apt/shared/constants";
import { SCREENS } from "./data";

export const Layout = (props) => {

  const {
    children,
    showSection,
    activity,
    goToHomeScreen,
    goToActivityScreen,
    goToSummaryScreen,
  } = props
  const route = useRouter()

  let title = 'Check in / Check out appointment'

  let screenName = null
  for (const key in showSection) {
    if (Object.hasOwnProperty.call(showSection, key)) {
      const element = showSection[key];
      if (element.current) {
        screenName = key
      }

    }
  }

  if (screenName === SCREENS.RATINGS) {
    title = 'Ratings'
  }

  const { height } = useWindowDimensions()
  const sectionHeight = height
    - HEADER_HEIGHT
    - 2 * MAIN_BODY_PADDING_Y

  const handleBack = () => {
    switch (screenName) {
      case SCREENS.HOME:
        route.push('/auth/login');
        break;
      case SCREENS.BEGIN_ACTIVITY:
        goToHomeScreen()
        break;
      case SCREENS.SUMMARY:
        goToActivityScreen(activity)
        break;
      case SCREENS.RATINGS:
        goToSummaryScreen()
        break;
      default:
        goToHomeScreen()
        break;
    }
  }

  return (
    <PageWrapper>
      <HeaderWrapper>
        <div className="arrow-back" onClick={handleBack}>
          <IconWrapper>
            <Image
              src={ICONS.arrowLeft}
              width={10} height={13}
              layout={'fixed'}
              quality={100}
              alt='back arrow'
            />
          </IconWrapper>
        </div>
        <div className="header">{title}</div>
      </HeaderWrapper>
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
    /* height: calc(100vh - 62px); */
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
export const HeaderWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  height: ${HEADER_HEIGHT}px;
  padding: 0 6px;
  * {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
  }
  .arrow-back {
    position: absolute;
    top: 8;
    left: 0;
    cursor: pointer;
  }
  /* .header {
    flex: 1;
    text-align: center;
    padding-right: 0px;
  } */
  @media ${devices.laptop} {
    justify-content: center;
    .arrow-back {
      display: none;
    }
  }
`