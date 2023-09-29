import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  height: ${ (props) => props.isReduceHeight ? 46 : 71 }px;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #c4c4c4;
  
  .arrow-icon {
    cursor: pointer;
    padding: 8px 0 8px 4.5%;
  }
  .arrow-icon.reserve {
    transform: rotateY(180deg)
  }
  .avatar {
    width: 35px;
    height: 35px;
    border-radius: 35px;
    margin-left: 5px;
  }
  .path {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    height: 60px;
  }
  .description {
    display: block;
    margin: 0 5px 0;
    font-family: SF Pro Text;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    color: #000000;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .gap-icon {
      padding: 0 5px;
    }
  }
  .description.link {
    cursor: pointer;

    width: ${props => props.collapsed ? '70%' : 'auto'};
  }
  .description.alarm {
    color: #E85D00;
    margin-top:15px;
  }

  .collapse-wrapper {
    position: absolute;
    bottom: 5px; right: 5px;
  }
`