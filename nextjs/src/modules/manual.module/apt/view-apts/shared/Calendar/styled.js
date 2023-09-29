import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 360px;
  margin: 0 auto;
`;

export const CalendarBody = styled.div`
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  padding: 10px 1px 1px 9px;
  flex-shrink: 0;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 360px;
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px 10px;
  button {
    margin-top: 10px;
    font-family: "SF Pro Text";
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    color: #173fd4;
    background: none;
    border: none;
    outline: none;
    :hover {
      cursor: pointer;
    }
  }
`;

export const SelectedAppointment = styled.div`
  color: #000 !important;
  font-family: SF Pro Text;
  font-size: 14px;
  font-style: normal;
  font-weight: 600 !important;
  margin-top: 26px;
  margin-left: 8px;
  line-height: 10px; /* 71.429% */
`;

export const FirstSelectAppointment = styled.div`
  color: #f00 !important;
  font-family: SF Pro Text;
  font-size: 12px !important;
  font-style: normal;
  font-weight: 600 !important;
  margin-left: 8px;
  margin-top: 8px;
  line-height: 10px; /* 83.333% */
`;

export const ListViewButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 42px 4px;
`;

export const ListViewButton = styled.div`
  color: #000;
  font-family: SF Pro Text;
  font-size: 18px;
  font-style: normal;
  font-weight: 600 !important;
  line-height: 12px; /* 66.667% */
`;

export const SelectedAppointmentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 11px;
  margin-left: 8px;
  div {
    color: ${(props) => props.color || 'red'};
    font-family: SF Pro Text;
    font-size: 12px;
    font-style: normal;
    font-weight: 600 !important;
    line-height: 10px; /* 83.333% */
  }
`;
