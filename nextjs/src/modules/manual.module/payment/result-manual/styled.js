import styled from "styled-components";

export const HeaderDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 37px;  
`

export const HeaderTitle = styled.p`
  color: #000;
  font-family: SF Pro Text;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 18px; /* 100% */
  text-align: center;
  margin: 0px;
`
export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`


export const Text = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  /* identical to box height, or 100% */
  padding: 10px;
  margin: 0;
`
export const Description = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  /* identical to box height, or 100% */
  padding: 12px;
  margin: 0;
  margin-bottom: ${props => props.marginBottom}px; 
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