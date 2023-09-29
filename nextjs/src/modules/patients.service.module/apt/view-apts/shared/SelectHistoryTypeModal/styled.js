import styled from "styled-components";

export const Wrapper = styled.div`
  font-family: 'SF Pro Text';
  margin: 0px 8px 5px 8px;
  background: white;
  border-radius: 9px 9px 0px 0px;
  > div {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    color: #173FD4;
    padding: 15px 0px;
    text-align: center;
    :hover {
      cursor: pointer;
    }
    :first-child {
      border-bottom: 1px solid #BBBBBE;
    }
  }
`;
