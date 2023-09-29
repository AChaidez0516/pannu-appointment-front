import styled from "styled-components";

export const IdentificationWrapper = styled.div`
  padding: 9px 8px;
  border: 1px solid #8ed16f;
  border-radius: 5px;
  .title {
    color: black;
    font-size: 14px;
    font-family: SF Pro Text;
    font-weight: 600;
    line-height: 12px;
    word-wrap: break-word;
  }
  .editWrapper {
    display: flex;
    margin-top: 31px;
    margin-bottom: 38px;
    justify-content: space-between;
    .message {
      color: black;
      font-size: 12px;
      font-family: SF Pro Text;
      font-weight: 500;
      line-height: 14px;
      word-wrap: break-word;
    }
    .editBtn {
      color: #173fd4;
      font-size: 14px;
      font-family: SF Pro Text;
      font-weight: 500;
      line-height: 14px;
      word-wrap: break-word;
    }
  }
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: row;
  &.row {
    flex-direction: row;
  }
  &.col {
    flex-direction: column;
  }
  &.justify-between {
    justify-content: space-between;
  }
  &.justify-center {
    justify-content: center;
  }
  &.align-center {
    align-items: center;
  }
  margin-top: ${(props) => props.marginTop}px;
`;

export const InputGroupWrpper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  column-gap: 12px;
  font-family: "SF Pro Text";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
  .input-box {
    flex: 1;
    height: 43px;
    font-weight: 700;
    border: 0.5px solid #5a585d;
    border-radius: 5px;
    text-indent: 10px;
    padding-right: 40px;
    &:focus {
      outline: none;
      border: 0.5px solid #173fd4;
    }
  }
  span.caption {
    position: absolute;
    top: -8px;
    left: 10px;
    background: white;
    padding: 0 3px;
  }
  div.edit-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  .error-msg {
    position: absolute;
    top: 46px;
    left: 0;
    color: red;
  }
`;
