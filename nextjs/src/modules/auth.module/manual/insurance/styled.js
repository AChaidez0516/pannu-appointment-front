import styled, { css } from "styled-components";
import { IMaskInput } from 'react-imask'
import { devices } from "../../../../common/constant/global";

export const Title = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
`
export const Desc = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 14px;
  color: #000000;
`

export const FileUploadWrapper = styled.div`

`

export const EditInsuranceDataFormWrapper = styled.div`
  position: relative;
  .cover-veil {
    position: absolute;
    top: 0;
    left: 0;
    z-index: ${props => props.isUpdate ? '-1' : '1'};
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
`

export const ContentLB = styled.label`
    font-family: SF Pro Text;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
`

export const PlantypeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  background: #FEFEFE;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 17px;
  > div {
    flex: 1;
    text-align: center;
    padding: 6px 0;
    button {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #000000;
    }
  }
  .selected-type {
    background: #173FD4;
    border-radius: 19px;
    button {
      font-weight: 900;
      font-size: 12px;
      line-height: 18px;
      color: #FFFFFF;
    }
  }
`

export const MaskInput = styled(IMaskInput)`
  border: 0.5px solid #5a585d!important;
  outline: none;
  box-sizing: border-box;
  border-radius: 5px;
  height: 43px;
  width: 100%;
  padding: 10px 10px 10px 10px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 4px!important;

  &:focus {
    font-size: 21px;
    border-color: #173FD4;
    border-width: 1px;
  }
`

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 38px;
  button {
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;
  }
  .btn-cancel button {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 12px;
    color: #000000;
    padding: 0;
  }
  .btn-next button {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 12px;
    color: #173FD4;
    :disabled {
      color: #C4C4C4;
      cursor: not-allowed;
    }
  }
`

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 13px;
  background: white;
  padding-top: 32px;
  ${({ headerHeight }) => headerHeight && css`
    height: ${headerHeight}px;
  `}
  .left {
    .company-logo {
      display: none;
      cursor: pointer;
    }
  }
  .center {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    margin:0 auto;
    @media ${devices.laptop} {
      font-weight: 700;
      font-size: 22px;
      line-height: 22px;
    }
  }
`