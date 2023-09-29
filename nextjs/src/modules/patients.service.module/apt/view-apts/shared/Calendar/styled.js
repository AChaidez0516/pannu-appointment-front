import styled from 'styled-components';

export const CalendarWrapper = styled.div`
  width: 360px;
  margin: 0 auto;
`;

export const CalendarBody = styled.div`
  // padding: 15px 10px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 360px;
  background: #F9F9F9;
  border-radius: 12px;
  padding: 20px 10px;
  button {
    margin-top: 10px;
    font-family: 'SF Pro Text';
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    color: #173FD4;
    background: none;
    border: none;
    outline: none;
    :hover {
      cursor: pointer;
    }
  }
`;