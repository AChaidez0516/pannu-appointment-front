import styled, { css } from 'styled-components'


export const PackageWrapper = styled.div`
  margin-top: 15px;
  padding-left: 20px;
  * {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
  }
`
export const PackageDiscountWrapper = styled.div`
  .title-note {
    margin-bottom: 10.73px;
  }
  ul {
    padding: 0 0 0 17px;
    margin: 0;
    li {
      padding: 7px 0;
    }
  }
  margin-bottom: 40px;
`
export const PackageServiceList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-bottom: 16px;
`
export const PackageOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 40px;
  .explain-text {
    min-width: 393px;
  }
  .option-group {
    display: flex;
    column-gap: 31px;
    .option-item {
      display: flex;
      align-items: center;
      column-gap: 21px;
      input {
        width: 20px;
        height: 20px;
        margin: 0;
      }
      label {
        margin: 0;
        max-width: 296px;
      }
      .short-label {
        min-width: 53px;
      }
    }
  }
  margin-bottom: 13px;
`
export const DiscountInstructionWrapper = styled.div`
  .title-note {
    margin-bottom: 7px;
  }
  ol {
    padding: 0 0 0 17px;
    margin: 0;
    li {
      padding: 7px 0;
    }
    margin-bottom: 11px;
  }
  .details {
    * {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      line-height: 10px;
      color: #000000;
    }
    display: flex;
    flex-direction: column;
    row-gap: 21px;
    .bottom-detail {
      display: flex;
      flex-direction: column;
      row-gap: 7px;
    }
  }

`
export const SubmitWrapper = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: flex-end;

`
export const ButtonWrapper = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 14px;
  color: #173FD4;
  cursor: pointer;
`
export const TextWrapper = styled.span`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  text-align: center;
  color: #000000;
  ${({ fontSize }) => fontSize && css`
    font-size: ${fontSize}px;
  `}
`