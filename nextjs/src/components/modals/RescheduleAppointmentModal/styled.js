import styled, { css } from "styled-components";

export const StyledModalBody = styled.div`
  padding-top: 10px;
`;

export const StyledModal = styled.div`
  width: 100%;
  height: auto;
  background: #efeeef;
  border-radius: 12px 12px 0 0;
  padding: ${(props) => props.padding};
  max-width: 375px;
  ${({ maxWidth }) =>
    maxWidth &&
    css`
      /* max-width: ${maxWidth}px; */
    `}
`;

export const StyledModalOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: end;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const StyledCloseModalBtnLink = styled.a`
  font-family: "SF Pro Text";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 12px;
  text-align: center;
  text-decoration: none;
  color: ${(props) => (props.disabled ? "#A4A4A4" : "#173FD4")};
`;

export const StyledCloseModalBtn = styled.div`
  background: #FFFFFF;
  border-radius: 12px;
  width: 100%;
  padding: 15px 0;
  text-align: center;
  cursor: pointer; 
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }  
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 13px;
`;

export const StyledEachItem = styled.p`
  background: #ffffff;
  border-radius: 0;
  padding: 15px 0;
  margin: 1px 0;
  color: #173fd4;
  font-family: "SF Pro Text";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 12px;
  text-align: center;
  cursor: pointer;
  &:first-child {
    border-radius: 12px 12px 0 0;
  }
`;

export const RescheduledAppointmentsWrapper = styled.div`
  padding: 16px 10px 10px 10px;
  .title {
    color: #1b1b1b;
    font-family: SF Pro Text;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 12.5px; /* 89.286% */
    text-align: center;
    border-bottom: 0.5px solid #bbbbbe;
    width: 90%;
    margin: auto;
    padding-bottom: 8px;
  }
  .content {
    border-radius: 9px;
    background: #fff;
    padding: 7px;
    .content-item {
      cursor: pointer;
      padding: 14px 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #000;
      font-family: SF Pro Text;
      font-size: 11px;
      font-style: normal;
      font-weight: 400;
      line-height: 10px; /* 90.909% */
      .start-time {
        flex: 12%;
      }
      .patient-name {
        flex: 18%;
        color: #173fd4;
      }
      .dob {
        flex: 15%;
      }
      .provider-name {
        flex: 25%;
      }
      .reason {
        flex: 25%;
      }
      .duration {
        flex: 5%;
        color: #173fd4;
      }
    }
    .history-item {
      display: flex;
      padding: 6px 12px;
      font-family: SF Pro Text;
      font-size: 13px;
      font-style: normal;
      font-weight: 500;
      line-height: 13px; /* 100% */
      .status {
        flex: 40%;
      }
      .provider-name {
        flex: 50%;
      }
      .date {
        flex: 10%;
      }
    }
  }
  .done {
    background: white;
    border-radius: 12px;
    background: #fff;
    color: #173fd4;
    font-family: SF Pro Text;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 12.5px; /* 69.444% */
    padding: 19px 0px;
    text-align: center;
    margin-top: 9px;
    cursor: pointer;
  }
`;
