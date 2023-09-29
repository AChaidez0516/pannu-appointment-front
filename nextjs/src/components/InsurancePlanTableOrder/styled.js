import styled from "styled-components";

export const TableDiv = styled.div`
  background: rgba(23, 63, 212, 0.17);
  border-radius: 10px;
  padding: 5px;
  margin-top: 19px;
`;
export const TrHeader = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 10px 10px 0px 0px;
  display: flex;
  margin-bottom: 5px;
`;
export const TrHeader2 = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
  padding: 5px;
`;
export const TrFooter = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  margin-top: 7px;
  &:last-child {
    border-radius: 0px 0px 10px 10px;
  }
`;
export const Tr = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  display: flex;
  margin-bottom: 5px;
`;
export const Td = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6px;
  &.firstColumn {
    width: 84%;
  }
  &.secondColumn {
    width: 16%;
    text-align: center;
  }
  &.weight-600 {
    font-weight: 600!important;
  }
  &.dataColumn {
    background: rgba(0, 0, 0, 0.30);
    padding: 13px 6px;
  }
  &.borderRadiusZero {
    border-radius: 0;
  }
  &.borderRadiusLeft {
    border-radius: 0 0 0 10px;
  }
`;
export const TdText = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 13px;
  color: #000000;
`;

export const TdTextCaption  = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 13px;
  color: #000000;
`;
export const ChangeBtn = styled.button`
  color: rgba(0, 0, 0, 0.36);
  font-family: SF Pro Text;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 14px;
  cursor: pointer;
  border: 0;
  outline: 0;
  background: transparent;
  padding: 0px;
`;
