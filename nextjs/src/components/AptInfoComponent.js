import styled from "styled-components";
import PropTypes from "prop-types";
import AptDatesComponent from "./AptDatesComponent";
import { checkAptType } from "../common/utils/checkAptType";
import { useFetchApt } from "../common/hooks/useFetchApt";
import { SpinnerWrapper } from "../common/styleds/common.styled";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";

export default function AptInfoComponent({
  aptId,
  showRescheduleAndCancelBtns,
  isNotCancel,
  showEditBtn,
}) {
  const { apt } = useFetchApt(aptId);

  const router = useRouter();

  const reschedule = () => {
    router.push("/manual/appointment/available-apts");
  };

  const cancelAppointment = () => {
    router.push("/manual/cancel");
  };

  return apt !== null ? (
    <AptInfoComponentWrapper>
      <div
        className={`main-slot ${isNotCancel ? "apt-data" : ""} ${
          showRescheduleAndCancelBtns ? "showBtns" : ""
        }`}
      >
        <div className="aptType-title">
          <div className="title">{checkAptType(apt.aptType)}</div>
          {showEditBtn && <button className="edit-btn">Edit</button>}
        </div>
        <div className="sel-slot-wrapper">
          <AptDatesComponent aptDate={apt.aptDate} aptTime={apt.aptTime} />
        </div>
        {showRescheduleAndCancelBtns && (
          <ButtonsRow>
            <LinkButton className="reschedule" onClick={() => reschedule()}>
              Reschedule
            </LinkButton>
            <LinkButton className="cancel" onClick={() => cancelAppointment()}>
              Cancel appointment
            </LinkButton>
          </ButtonsRow>
        )}
      </div>
    </AptInfoComponentWrapper>
  ) : (
    <SpinnerWrapper>
      <CircularProgress size={20} />
    </SpinnerWrapper>
  );
}

AptInfoComponent.propTypes = {
  aptId: PropTypes.object.isRequired,
};

export const AptInfoComponentWrapper = styled.div`
  .main-slot.apt-data {
    .aptType-title .title {
      color: #0065fb;
    }
    .sel-slot-wrapper {
      .date-time {
        .day {
          color: #0065fb;
        }
        .date {
          color: #0065fb;
        }
        .time {
          color: #0065fb;
        }
      }
    }
  }
  .main-slot.apt-data.showBtns {
    height: 101px;
  }
  .main-slot {
    padding: 9px 8px;
    border: 2px solid rgba(47, 128, 237, 0.5);
    border-radius: 5px;
    height: 56px;
    .aptType-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-weight: 600;
        font-size: 14px;
        line-height: 10px;
        color: #f00;
      }
      .edit-btn {
        font-weight: 500;
        font-size: 14px;
        line-height: 10px;
        color: #173fd4;
        background: none;
        outline: none;
        border: none;
      }
    }
    .sel-slot-wrapper {
      .date-time {
        * {
          font-weight: 600;
          font-size: 12px;
          line-height: 10px;
          color: #f00;
        }
        .day {
          color: #f00;
        }
        .date {
          color: #f00;
        }
        .time {
          color: #f00;
        }
      }
      .delete {
        display: none;
      }
      .wait-list {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
      }
    }
    margin-bottom: 15px;
  }
  margin-bottom: 15px;
`;
export const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-start;
`;
export const LinkButton = styled.button`
  font-family: SF Pro Text;
  font-style: normal;
  display: flex;
  // justify-content: center;
  align-items: center;
  color: #173fd4;
  border: 0;
  outline: 0;
  background: transparent;
  cursor: pointer;
  font-weight: 500;
  &.cl-black {
    color: black;
  }
  &.cl-gray {
    color: rgba(0, 0, 0, 0.36);
  }
  &.small {
    font-size: 14px;
    line-height: 14px;
  }
  &.smallest {
    font-size: 10px;
    line-height: 10px;
  }
  &.normal {
    font-size: 16px;
    line-height: 16px;
  }
  &.middle {
    font-size: 18px;
    line-height: 18px;
  }
  &.big {
    font-size: 22px;
    line-height: 12px;
  }
  &.strong {
    font-weight: 600;
  }
  &.reschedule {
    color: #173fd4;
    font-size: 22px;
    font-family: SF Pro Text;
    font-weight: 500;
    line-height: 12px;
    word-wrap: break-word;
  }
  &.cancel {
    color: #173fd4;
    font-size: 22px;
    font-family: SF Pro Text;
    font-weight: 500;
    line-height: 18px;
    word-wrap: break-word;
  }
`;
