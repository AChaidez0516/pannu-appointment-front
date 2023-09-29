import styled from "styled-components";

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