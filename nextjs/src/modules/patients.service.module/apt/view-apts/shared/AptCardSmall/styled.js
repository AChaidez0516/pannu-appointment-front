import styled from "styled-components";

export const AptCardWrapper = styled.div`
  position: relative;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 11px;
  color: #000000;
  :hover {
    cursor: pointer;
  }
  .test-info {
    position: absolute;
    top: -6px;
    height: 12px;
    width: 100%;
    background: #FFB8B8;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .procedure-info {
    position: absolute;
    top: -6px;
    height: 12px;
    width: 100%;
    background: #BFD6FB;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .content {
    position: relative;
    border-width: 2px;
    border-style: solid;
    border-radius: 5px;
    width: 120px;
    padding: 2px;
    background: white;
    .missedApt {
      position: absolute;
      left: 40%;
      top: 10%;
    }
    .provider-info {
      display: flex;
      column-gap: 5px;
      .avatar {
        width: 30px;
        border-radius: 4px;
      }
      .right {
        width: 73px;
        .time {
          margin-bottom: 2px;
        }
        .name {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      margin-bottom: 1px;
    }
    .extra {
      display: flex;
      column-gap: 5px;
      .left {
        width: 73px;
        .patient-name, .specialty {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
    }
    .meeting-type-icon {
      position: absolute;
      right: 2px;
      bottom: 0px;
    }
    .specialty-icon {
      position: absolute;
      top: -10px;
      left: 60%;
      width: 20px;
      height: 20px;
    }
  }
`