import styled from 'styled-components'

export const MessageBoxWrapper = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    .more-loading {
      color: #999;
      text-align: right;
      font-size: 12px;
    }
    .no-message {
      text-align: center;
      font-size: 12px;
      color: #999;
    }
  }
  .container.reverse {
    flex-direction: column-reverse;
  }
  
  .nav-bar {
    position: absolute;
    right: 10px;
    display: flex;
    column-gap: 5px;
    z-index: 1;
    .nav-icon {
      cursor: pointer;
    }
  }
  .nav-bar.top {
    top: 10px;
  }
  .nav-bar.bottom {
    bottom: 10px;
    .nav-icon {
      transform: rotateZ(180deg);
    }
  }
`
