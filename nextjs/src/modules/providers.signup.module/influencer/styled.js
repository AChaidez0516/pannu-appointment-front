import styled from "styled-components"


export const InfluencersWrapper = styled.div`
  * {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    color: #000000;
  }
`
export const ExplanationWrapper = styled.div`
  .title-note {
    margin-bottom: 14px;
  }
  ul {
    padding: 0 0 0 24px;
    margin: 0;
    li {
      padding: 6px;
    }
  }
  margin-bottom: 25px;
`
export const AudienceTableWrapper = styled.div`
  padding: 0 30px;
  max-width: 950px;
  .table-header {
    border-bottom: 1px solid #ECECEC;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    padding-bottom: 10px;
  }
  .header-row {
    display: flex;
    .col-span {
      width: ${4*100}px;
      text-align: center;
    }
  } 
  .table-body {
  }
  .table-row {
    display: flex;
    align-items: center;
    padding: 13px 0px 17px 0px;
    border-bottom: 1px solid #ECECEC;
  }
  .col-title {
    position: relative;
    flex: 1;
    .top-label {
      position: absolute;
      display: inline-block;
      background-color: white;
      top: -9px;
      left: 13px;
      z-index: 0;
      font-family: 'SF Pro Text';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      color: #5A585D;
    }
  }
  .col {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .col-action {
    width: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    .button-group {
      display: flex;
      column-gap: 19px;
      align-items: center;
      img {
        cursor: pointer;
      }
    }
  }
  .col-add {
    width: 160px;
    text-align: center;
  }
  .custom-checkbox {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  margin-bottom: 42px;
`
export const MediumTypeDetailWrapper = styled.div`
  .title-note {
    margin-bottom: 20px;
  }

`
export const MediumTypeTableWrapper = styled.div`
  max-width: 978px;
  .row {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ECECEC;
  }
  .col-title {
    display: flex;
    align-items: center;
    justify-content: start;
    padding-left: 20px;
    flex: 1;
  }
  .col {
    width: 170px;
    display: flex;
    align-items: center;
    justify-content: center;
    input.count-follow-input {
      max-width: 100px;
      border: none;
      outline: none;
      text-align: right;
    }
  }
  .col-action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    .button-group {
      display: flex;
      column-gap: 19px;
      align-items: center;
      img {
        cursor: pointer;
      }
    }
  }
  .table-header {
    .row {
      padding-bottom: 29px;
    }
  }
  .table-body {
    .row {
      padding: 21px 0;
    }
  }
  margin-bottom: 26px;
`
export const AddButtonWrapper = styled.div`
  margin-top: 24px;
  .add-one {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
  .save-all-wrapper {
    display: flex;
    justify-content: flex-end;
    .button-group {
      display: flex;
      column-gap: 60px;
      button {
        background: transparent;
        border: none;
        outline: none;
        box-shadow: none;
        cursor: pointer;
      }
      .save {
        font-weight: 600;
        font-size: 14px;
        color: #c4c4c4;
      }
      .cancel {
        
      }
    }
  }
  .active {
    color: #173FD4!important;
  }
`
export const DetailWrapper = styled.div`
  .title-note {
    margin-bottom: 7px;
  }
  ol {
    padding: 0 24px;
    margin: 0;
    li {
      padding: 7px 0px;
    }
  }
`