import styled from 'styled-components'

export const CollapseExpandWrapper = styled.div`
  display: flex;
  .btn {
    cursor: pointer;
    height: 13px;
    display: inline-flex;
    align-items: center;
    
    .icon {
      height: 13px;
      display: inline-flex;
      align-items: center;
      &.reverse {
        transform: rotateZ(180deg);
      }
    }
    &.collapse {
      border-radius: 3px 0 0 3px;
      &.wl {
        padding-left: 5px;
      }
    }
    &.normal {
      border-radius: 0 3px 3px 0;
      &.wl {
        padding-right: 5px;
      }
    }
    &.bg-blue {
      background-color: #173FD4;
    }
    &.bg-gray {
      background-color: #C4C4C4;
    }
    &.wl {
      width: 20px;
    }
    &.ws {
      width: 13px;
    }
    &.justify-start {
      justify-content: start;
    }
    &.justify-center {
      justify-content: center;
    }
    &.justify-end {
      justify-content: end;
    }
  }
`