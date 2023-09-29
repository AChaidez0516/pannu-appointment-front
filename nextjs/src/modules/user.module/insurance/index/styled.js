import styled from "styled-components";

export const AgreementContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`
export const Title = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
`
export const AnserTitle = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 13px;
  color: #000000;
  margin: 30px 0 0 0;
`
export const BiometricButton = styled.button`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 22px;
  display: flex;
  align-items: flex-end;
  color: #173fd4;
  justify-content: center;
  margin-top: 20px;
  border: 0;
  background: transparent;
  cursor: pointer;
`
export const CreateNewQuestion = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  text-decoration-line: underline;

  color: #000000;
`
export const QuestionDesc = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #000000;
`
export const LabelDesc = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
  color: #000000;
`
export const Select = styled.select`
  background: #ffffff;
  border: 0.5px solid #5a585d;
  outline: none;
  box-sizing: border-box;
  border-radius: 5px;
  height: 43px;

  padding: 10px 20px 10px 4px;
`

const blue = {
    50: '#FFFFFF',
    400: '#173FD4',
}

export const Tab = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-size: 12px;
  color: #000000;
  cursor: pointer;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #fff;
  }

  &.focus {
    color: #fff;
    outline: none;
    background-color: #fff;
  }

  &.selected {
    height: 30px;
    border-radius: 19px;
    background-color: ${blue[400]};
    color: ${blue[50]};
  }

  &.disabled {
    color: #fff;
    outline: none;
    background-color: #fff;
  }
`
export const TabPanel = styled.div`
  width: 100%;  
`
export const TabsList = styled.div`
  min-width: 320px;
  height: 30px;
  background: #fefefe;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 17px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`
export const TableDiv = styled.div`
    background: #c9d3e0;
    border-radius: 10px;
    padding: 5px;
    margin-top: 19px;
`
export const TrHeader = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 8px 8px 0px 0px;
  display: flex;
  margin-bottom: 5px;
`
export const TrFooter = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  margin-top: 6px;
  &:last-child {
    border-radius: 0px 0px 8px 8px
  }
`
export const Tr = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  display: flex;
  margin-bottom: 5px;
`
export const Td = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 8px;
  &.row {
    flex-direction: row;
  }
  &.justify-center {
    justify-content: center;
  }
  &.justify-between {
    justify-content: space-between;
  }
`
export const TdText = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 9px;
  line-height: 10px;
  color: #000000;
  &.center {
    text-align: center;
  }
`