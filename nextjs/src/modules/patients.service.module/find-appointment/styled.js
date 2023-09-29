import styled from "styled-components";

export const FindAppointmentWrapper = styled.div`
  height: 813px;
  overflow: auto;
  margin: 0 auto;
`
export const MainWrapper = styled.div`
  margin-top: 15px;
  padding: 0 18px;
`
export const UrgentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text-note {
    margin: 0;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    color: #000000;
  }
  .checkbox {
    width: 18px;
    height: 18px;
  }
  margin-bottom: 22px;
`
export const SearchBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .input-box {
    position: relative;
    .auto-complete {
      position: relative;
      outline: none;
      box-shadow: none;
      width: 232px;
      height: 32px;
      border: 1px solid #000000;
      border-radius: 20px;
      text-indent: 32px;
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 18px;
      color: #424242;
      padding-right: 31px;
      box-sizing: border-box;
      &:focus {
        border-color: #173FD4;
      }
    }
    .map-marker {
      position: absolute;
      top: 8px;
      left: 12px;
    }
    .magnifier {
      position: absolute;
      top: 8px;
      right: 9px;
    }
  }
  .search-location {
    border: none;
    outline: none;
    box-shadow: none;
    padding: 0;
    background: transparent;
    display: inline;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    color: #173FD4;
  }
  margin-bottom: 27px;
` 
export const AddressMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 27px;
  .stored-list {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    .label-title-wrapper {
      display: flex;
      column-gap: 40px;
      row-gap: 14px;
      flex-wrap: wrap;
      .label-title {
        font-family: 'SF Pro Text';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 12px;
        color: #000000;
        white-space: nowrap;
        cursor: pointer;
      }
      .label-title.active {
        color: #173FD4;
      }
    }
    .select-address {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 12px;
      letter-spacing: 0.357px;
      color: #000000;
      max-width: 227px;
    }
  }
  .save-address {
    .text-note {
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 14px;
      color: #000000;
      margin-bottom: 13px;
    }
    .button-group {
      display: flex;
      column-gap: 43px;
      align-items: center;
      & > button, input {
        background: transparent;
        margin: 0;
        padding: 0;
        outline: none;
        box-shadow: none;
      }
      .label-input {
        width: 82px;
        height: 40px;
        border: 1px solid #000000;
        border-radius: 5px;;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'SF Pro Text';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        text-indent: 14px;
        color: rgba(0, 0, 0, 0.36);
      }
      button.skip-btn {
        border: none;
        font-family: 'SF Pro Text';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 14px;
        color: #173FD4;
      }
      button.save-btn {
        border: none;
        font-family: 'SF Pro Text';
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 14px;
        color: rgba(0, 0, 0, 0.36);
      }
    }
  }

  margin-bottom: 27px;
`
export const DistanceWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  .text-note {
    flex: 1;
    font-family: 'SF Pro Text';
    font-style: normal;
      font-weight: 700;
      font-size: 12px;
      line-height: 14px;
      color: #000000;
  }
`
export const SearchWrapper = styled.div`
  margin-bottom: 35px;
`
export const SearchProviderOption = styled.div`
  .text-note {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
    margin-bottom: 14px;
  }
  .option-group {
    display: flex;
    column-gap: 25px;
    .option-item {
      display: flex;
      align-items: center;
      column-gap: 5px;
      .option-tag {
        margin: 0;
        min-height: 16px;
        min-width: 16px;
        width: 16px;
        height: 16px;
      }
      .option-label {
        margin:0;
        font-family: 'SF Pro Text';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 11px;
        letter-spacing: -0.165px;
        color: #000000;
      }
    }
    margin-bottom: 30px;
  }
  .search-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-provider-btn {
      border: none;
      outline: none;
      box-shadow: none;
      padding: 0;
      background: transparent;
      display: inline;
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 12px;
      color: #173FD4;
    }
  }
  margin-bottom: 27px;
`
export const ProviderSearchBox = styled.div`
  position: relative;
  .input-box {
    outline: none;
    width: 232px;
    height: 32px;
    background: #FDFDFD;
    border: 1px solid #000000;
    border-radius: 20px;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #424242;
    text-indent: 14px;
    &:focus {
      border-color: #173FD4;
    }
  }
  .magnifier {
    position: absolute;
    top: 10px;
    right: 16px;
  }
`
export const SpecialtyOptions = styled.div`
  // dropdown to select specialties
` 
export const SearchResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 27px;
  .result-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .info {
      flex: 1;
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 600;
      font-size: 11px;
      line-height: 10px;
      color: #000000;
    }
    .delete-btn {
      min-width: 20px;
    }
  }
`
export const SubmitWrapper = styled.div`
  display: flex;
  justify-content: center;
  .submit-btn {
    border: none;
    outline: none;
    background: transparent;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 10px;
    color: #173FD4;
  }
`
