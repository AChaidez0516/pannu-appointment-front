import styled from "styled-components";

export const HeaderWrapper = styled.div`
  position: relative;
  padding: 0px 25px 0px 35px;
  height: 38px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  .prev-2days-icon,
  .next-2days-icon {
    cursor: pointer;
    position: absolute;
    top: 5px;
    border: 2px solid #173fd4;
    border-radius: 100%;
    width: 28px;
    height: 28px;
  }
  .prev-2days-icon {
    left: 2px;
  }
  .next-2days-icon {
    right: 2px;
  }
`;

export const HeaderDateItem = styled.div`
  flex: 1;
  font-family: "SF Pro Text";
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 13px;
  text-align: center;
  color: ${(props) => (props.active ? "#D70000" : "#000000")};
`;
