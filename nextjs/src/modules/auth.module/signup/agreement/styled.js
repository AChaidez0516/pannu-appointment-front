import styled from "styled-components";

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;
`
export const AgreementWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .preview {
    color: #eee;
    font-weight: 600;
    font-size: 10px;
    margin-top: 15px;
    height: 24px;
    overflow: hidden;
    margin-left: 23px;
  }
`
export const Description = styled.div`
  background: rgba(250, 194, 60, 0.53);
  border-radius: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  .txt {
    font-family: SF Pro Text;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;
    color: #000000;
  }
  .txt:nth-child(2) {
    margin-top: 5px;
  }
`
export const AgreementContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  max-width: 650px;
  .title {
    font-family: SF Pro Text;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
  }
  .content {
    display: flex;
    flex-direction: row;
    column-gap:5px;
    .description {
      font-family: SF Pro Text;
      font-style: normal;
      font-weight: 600;
      font-size: 10px;
      line-height: 12px;
      color: #000000;
      p {
        margin: 0;
      }
    }
  }
`
export const ReadMoreWrapper = styled.div` 

`
export const StrongText = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  color: #000000;
  margin-top: 1px;
`
export const CheckBox = styled.input`
  width: 30px;
  height: 15px;
  background: #EEEEEE;
  margin-right: 3px;
`
export const ErrorWrapper = styled.div`
  font-family: SF Pro Text;
  font-size: 12px;
  font-weight: 600;
  line-height: 12px;
  color: red;
  margin-top: 10px;
  
  display:flex;
  flex-direction: column;
  row-gap: 5px;

`