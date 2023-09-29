import styled from "styled-components"

export const TermsModalContent = styled.div`
  font-family: "SF Pro Text";
  width: 100%;
  max-width: 375px;
  background: #F9F9F9;
  border-radius: 12px;
  padding: 25px 15px;
  .title {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #000000;
    margin-bottom: 25px;
    .icon-back {
      display: none;
    }
  }
  .paragraph {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 13px;
    color: #000000;
    margin-bottom: 8px;
  }
  .last-paragraph {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 15px;
    color: #000000;
    margin-bottom: 40px;
  }
  .btn-done {
    cursor: pointer;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 24px;
    text-align: center;
    color: #173FD4;
  }
  @media screen and (max-width: 1023px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 0px;
    overflow-y: auto;
    padding: 60px 15px 25px 15px;
    background: white;
    .title {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      background: white;
      line-height: 50px;
      .icon-back {
        display: block;
        position: absolute;
        left: 15px;
        top: 0px;
      }
    }
  }
`;

export const PoliciesModalContent = styled.div`
  font-family: "SF Pro Text";
  width: 100%;
  max-width: 375px;
  background: #F9F9F9;
  border-radius: 12px;
  padding: 25px 15px;
  .title {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    color: #000000;
    margin-bottom: 25px;
    .icon-back {
      display: none;
    }
  }
  .paragraph {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 13px;
    color: #000000;
    margin-bottom: 40px;
  }
  .btn-done {
    cursor: pointer;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 24px;
    text-align: center;
    color: #173FD4;
  }
  @media screen and (max-width: 1023px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 0px;
    overflow-y: auto;
    padding: 60px 15px 25px 15px;
    background: white;
    .title {
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      background: white;
      line-height: 50px;
      .icon-back {
        display: block;
        position: absolute;
        left: 15px;
        top: 0px;
      }
    }
  }
`;

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
export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 129.2px;
  * {
    color: lightgray;
  }
`