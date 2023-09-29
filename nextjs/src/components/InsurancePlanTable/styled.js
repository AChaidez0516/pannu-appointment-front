import styled from "styled-components";

export const TableDiv = styled.div`
  background: #c9d3e0;
  border-radius: 10px;
  padding: 5px;
  margin-top: 19px;
`;
export const TrHeader = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px 8px 0px 0px;
  display: flex;
  margin-bottom: 5px;
`;
export const TrFooter = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  margin-top: 7px;
  &:last-child {
    border-radius: 0px 0px 8px 8px;
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
  padding: 16px 8px;
`;
export const TdText = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 9px;
  line-height: 10px;
  color: #000000;
`;
