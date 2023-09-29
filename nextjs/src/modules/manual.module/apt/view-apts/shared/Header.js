import Link from "next/link";
import styled, { css } from "styled-components";
import Image from "next/image";

import { APTTYPE } from "../../make-apt/index/data";
import { DownloadIcon, PrintIcon } from "../../../../../common/utils/Icons";
import { ICONS, IMGS } from "../../../../../common/utils/styleGuide";
import { devices } from "../../../../../common/constant/global";
import { HEADER_HEIGHT } from "../../make-apt/shared/constants";
import { SCREENS } from "./data";
import useWindowDimensions, {
  DEVICE_TYPE,
} from "../../../../../common/hooks/useWindowDimensions";

function Header(props) {
  const regUser = null; // useSelector((state) => state.reg.user)
  const {
    title,
    backUrl,
    handleBack,
    countOfNotifications,
    page,
    calendarType,
  } = props;
  const { device } = useWindowDimensions();

  const getTitle = () => {
    switch (page) {
      case SCREENS.LIST_VIEW:
        return "Available appointments";
      case SCREENS.APPOINTMENT_DATA:
        return "Appointment Data";
      case SCREENS.PREPARATIONS:
        return "Preparations and instructions";
      case SCREENS.TRANSACTION_VIEW:
        return ["Appointments", <br />, "transaction history"];
      case SCREENS.RESCHEDULE:
        switch (calendarType.value) {
          case APTTYPE.URGENT:
            return ["Reschedule", <br />, "Urgent appointment"];
          case APTTYPE.PREFERRED:
            return ["Reschedule", <br />, "Preferred appointment"];
          case APTTYPE.REGULAR:
            return ["Reschedule", <br />, "First available appointment"];
          case APTTYPE.WAIT_LIST:
            return ["Reschedule", <br />, "Wait list"];
        }
        return "Reschedule";
      case SCREENS.CHECKOUT:
        return "Reschedule";
      default:
        return "Appointment";
    }
  };
  return (
    <HeaderWrapper headerHeight={HEADER_HEIGHT}>
      <div className="left">
        <div className="company-logo">
          <Link passHref href={backUrl}>
            <Image
              src={ICONS.fakeLogo}
              width={187}
              height={28}
              layout={"fixed"}
              quality={100}
              alt="company logo"
            />
          </Link>
        </div>
        <div className="arrow-back">
          <Image
            src={ICONS.arrowLeft}
            width={10}
            height={13}
            layout={"fixed"}
            quality={100}
            alt="back arrow"
            onClick={handleBack}
          />
        </div>
      </div>
      <div className="center desktop">Appointment</div>
      <div className="center mobile">{getTitle()}</div>
      <div className="right">
        <div className="icons-wrapper">
          {(device == DEVICE_TYPE.DESKTOP || page == SCREENS.LIST_VIEW) && (
            <div className="icon-unit icon-filter">
              <Image
                src={ICONS.settingIcon}
                width={23}
                height={21}
                layout={"fixed"}
                quality={100}
                alt="icon filter"
              />
            </div>
          )}
          {(device == DEVICE_TYPE.DESKTOP ||
            page == SCREENS.LIST_VIEW ||
            page == SCREENS.CHECKOUT) && (
            <BellWrapper>
              <Image
                src={ICONS.bell}
                width={20}
                height={24}
                layout="fixed"
                alt="bell icon"
              />
              <div className="notify-count">{countOfNotifications}</div>
            </BellWrapper>
          )}
          {page == SCREENS.TRANSACTION_VIEW && (
            <>
              <div className="icon-unit icon-download">
                <DownloadIcon width={20} height={18} color="black" />
              </div>
              <div className="icon-unit icon-print">
                <PrintIcon width={19} height={20} color="black" />
              </div>
            </>
          )}
        </div>
        {(device == DEVICE_TYPE.DESKTOP ||
          page == SCREENS.LIST_VIEW ||
          page == SCREENS.CHECKOUT) && (
          <div className="avatar-wrapper">
            <div className="user-name">{regUser?.fullName}</div>
            <div className="avatar-img">
              <Image
                src={IMGS.avatarMan}
                width={30}
                height={30}
                layout={"fixed"}
                quality={100}
                alt="avatar image"
              />
            </div>
          </div>
        )}
      </div>
    </HeaderWrapper>
  );
}

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 13px;
  background: white;
  ${({ headerHeight }) =>
    headerHeight &&
    css`
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
  .center.desktop {
    display: none;
  }
  .center.mobile {
    display: block;
  }
  @media ${devices.laptop} {
    .center.desktop {
      display: block;
    }
    .center.mobile {
      display: none;
    }
  }
  .center {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
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
        height: 30px;
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
      .icon-filter {
        height: 21px;
      }
    }
  }
`;

export const BellWrapper = styled.div`
  position: relative;
  height: 24px;
  .notify-count {
    position: absolute;
    left: -8px;
    top: -5px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #ff0000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "SF Pro Text";
    font-weight: 500;
    font-size: 9px;
    line-height: 0px;
    color: #000000;
  }
`;

export default Header;
