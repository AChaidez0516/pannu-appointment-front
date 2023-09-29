import styled from "styled-components";

/*export const BiometricButton = styled.button`
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
export const SignUpButton = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 13px;
  color: #000000;
  justify-content: center;
  margin-top: 20px;
`*/
export const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;  
`

export const HeaderTitle = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 14px;
  color: #000000;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Text = styled.div`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  /* identical to box height, or 100% */
  margin-left: 5px;
  text-align: center;

  color: #333333;
`
export const BankImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
export const TableWrapper = styled.div``
export const Cell = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  /* identical to box height, or 100% */

  color: #000000;
`
export const TableRow = styled(BankImgWrapper)`
  justify-content: space-between;
  padding-top: 8px;
`