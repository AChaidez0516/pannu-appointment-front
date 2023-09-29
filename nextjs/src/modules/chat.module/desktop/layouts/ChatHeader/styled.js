import styled from "styled-components";

export const ChatHeaderWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  
  padding: 0 7.8%;
  height: ${props => props.isReduceHeight? 46 : 71}px;
  align-items: center;
  overflow: hidden;
  column-gap: 25px;
  border-bottom: ${props => props.hasDivider ? '1px solid #c4c4c4' : 'none'};
  
  .title {
    font-family: SF Pro Text;
    font-size: 32px;
    font-weight: 700;
    line-height: 30px;
    color: #173FD4;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .nav {
    display: flex;
    column-gap: 20px;
    .icon {
      cursor: pointer;
    }
    .icon.reverse {
      transform: rotateY(180deg);
    }
  }
  
  .collapse-wrapper {
    position: absolute;
    bottom: 5px; right: 5px;
  }
`