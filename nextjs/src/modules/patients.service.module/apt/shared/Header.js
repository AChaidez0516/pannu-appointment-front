import Link from 'next/link'
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import Image from "next/image";

import { ICONS, IMGS } from "../../../../common/utils/styleGuide";
import { devices } from "../../../../common/constant/global";
import { BellWrapper } from "../../shared/DesktopHeader/styled";
import { HEADER_HEIGHT } from '../make-apt/shared/constants';


function Header(props) {
  const regUser = null; // useSelector((state) => state.reg.user)
  const {
    title,
    backUrl,
    countOfNotifications,
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
        <div className="company-logo">
          {(currentStepNumber == 0 && isDoneSelectReasons == false) ? (
            <Link passHref href={backUrl}>
              <Image
                src={ICONS.fakeLogo}
                width={187} height={28}
                layout={'fixed'}
                quality={100}
                alt='company logo'
              />
            </Link>
          ) : (
            <Image
              src={ICONS.fakeLogo}
              width={187} height={28}
              layout={'fixed'}
              quality={100}
              alt='company logo'
              onClick={handlePrevPage}
            />
          )}
        </div>
        <div className="arrow-back">
          {(currentStepNumber == 0 && isDoneSelectReasons == false) ? (
            <Link passHref href={backUrl}>
              <Image
                src={ICONS.arrowLeft}
                width={10} height={13}
                layout={'fixed'}
                quality={100}
                alt='back arrow'
                onClick={handlePrevPage}
              />
            </Link>
          ) : (
            <Image
              src={ICONS.arrowLeft}
              width={10} height={13}
              layout={'fixed'}
              quality={100}
              alt='back arrow'
              onClick={handlePrevPage}
            />
          )}
        </div>
      </div>
      <div className="center">{currentStepNumber == 3 ? 'Check out' : (currentStepNumber == 1 ? calendarType.label : title)}</div>
      <div className="right">
        <div className="icons-wrapper">
          <div className="icon-unit icon-filter">
            <Image
              src={ICONS.settingIcon}
              width={23} height={21}
              layout={'fixed'}
              quality={100}
              alt='icon filter'
            />
          </div>
          <BellWrapper>
            <Image
              src={ICONS.bell}
              width={20} height={24}
              layout="fixed"
              alt='bell icon'
            />
            <div className="notify-count">{countOfNotifications}</div>
          </BellWrapper>
        </div>
        <div className="avatar-wrapper">
          <div className="user-name">
            {regUser?.fullName}
          </div>
          <div className="avatar-img">
            <Image
              src={IMGS.avatarMan}
              width={30} height={30}
              layout={'fixed'}
              quality={100}
              alt='avatar image'
            />
          </div>
        </div>
      </div>
    </HeaderWrapper>
  )
}


export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 13px;
  background: white;
  ${({ headerHeight }) => headerHeight && css`
    height: ${headerHeight}px;
  `}
  @media ${devices.laptop} {
    padding: 0 33px; 
  }
  .left {
    .company-logo {
      display: none;
      cursor: pointer;
    }
    @media ${devices.laptop} {
      .company-logo {
        display: block;
      }
      .arrow-back {
        display: none;
      }
    }
  }
  .center {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    @media ${devices.laptop} {
      font-weight: 700;
      font-size: 22px;
      line-height: 22px;
    }
  }
  .right {
    display: flex;
    align-items: center;
    column-gap: 21px;
    @media ${devices.laptop} {
      column-gap: 50px; // d
    }
    .avatar-wrapper {
      display: flex;
      align-items: center;
      column-gap: 16px;
      .avatar-img {
        cursor: pointer;
        img {
          border-radius: 50%;
        }
      }
      .user-name {
        display: none;
        font-weight: 500;
        font-size: 14px;
      }
      @media ${devices.laptop} {
        .user-name {
          display: block;
        }
      }
    }
    .icons-wrapper {
      display: flex;
      align-items: center;
      column-gap: 20px;
      .icon-unit {

      }
      .icon-filter {
        display: none;
      }
      @media ${devices.laptop} {
        .icon-filter {
          display: block;
        }
      }
    }
  }
`


export default Header

