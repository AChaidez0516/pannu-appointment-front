import styled from "styled-components";

export const SearchBox = styled.div`
  position: relative;
  input {
    width: 225px;
    height: 31px;
    border: 2px solid #000000;
    border-radius: 5px;
    outline: none;
    padding: 4px;
    padding-left: 28px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    &:focus {
      border-color: #173FD4;
    }
  }
  .magnifier {
    position: absolute;
    top: 8px;
    left: 8px;
  }

`