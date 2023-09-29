import styled from 'styled-components'

export const ClippedMessageHeader = styled.div`
  font-family: SF Pro Text;
  display: flex;
  height: 71px;
  position: relative;
  justify-content: center;
  
  .search-box {
    display: flex;
    align-items: center;
    input {
      font-size: 7px;
      font-weight: 400;
      line-height: 10px;
      border: 1px solid #eee;
      border-radius: 5px;
      color: #979797;
      padding: 5px;
      outline: 0;
      min-width: 132px;
    }
  }
  .tool-box {
    position: absolute;
    right: 46px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    column-gap: 10px;
    
    .btn {
      cursor: pointer;
      border:0; outline: 0;
      background-color: transparent;
      padding: 0;
    }
  }
`
export const ClippedMessageWrapper = styled.div`
  padding: 0px;
  
  .message-box {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border: 0.5px solid rgba(0, 0, 0, 0.8);
    margin: 9px 0;

    .category-wrapper {
      display: flex;
      flext-direction: row;
      align-items: center;
      position: relative;
      .un-category {
        margin-left: 20px;
      }
      .check {
        position: absolute;
        right: 5px; top: 3px;
      }
      .category {
        display: flex;
        align-items: center;
        height: 26px;
        margin-left: 0px;
        position: relative;
        padding: 0 27px 0 5px;
      }
      .category.red {
        background-color: #e29a9a;
      }
      .category.red::before {
        content: '';
        position: absolute;
        border-top: 13px solid transparent;
        border-bottom: 13px solid transparent;
        height: 0px;
        width: 0px;
        right: -10px;
        top: 0px;
        border-left: 10px solid #e29a9a;
      }
      .category.blue {
        background-color: #173fd4;
      }
      .category.blue::before {
        content: '';
        position: absolute;
        border-top: 13px solid transparent;
        border-bottom: 13px solid transparent;
        height: 0px;
        width: 0px;
        right: -10px;
        top: 0px;
        border-left: 10px solid #173fd4;
      }
      .text {
        font-family: SF Pro Text;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        color: #000000;
      }
      .func {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 0; outline: 0;
          background-color: transparent;
          padding: 0;
        }
      }
    }
    .category-wrapper.light-red {
      background-color: #f1ebeb;
    }
    .category-wrapper.light-blue {
      background-color: #d8dff8;
    }
    .wrapper {
      display: flex;
      column-gap: 5px;

      padding-left: ${props => props.left}px;
      .line {
        border-left: 3px solid #e29a9a;
      }
      .content {
        display: flex;
        width: 100%;
        flex-direction: row;
        column-gap: 5px;
        padding-top: 5px;
        padding-bottom: 5px;

        .header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-left: 5px;
          margin-top: 10px;
          .avatar {
            img {
              width: 35px; height: 35px;
              border-radius: 35px;
            }
          }
          .status {
            display: flex;
            column-gap: 3px;
            align-items: center;
            .urgent {
              display: flex;
              align-items: center;
              margin-top: -1px;
            }
          }
        }
        .body {
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          width: 100%;

          .main-text {
            font-family: SF Pro Text;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            color: #000000;
            padding-right: 10px;
            line-height: 18px;
            word-break: break-all;

            ul, ol {
              margin: 5px 0;
              padding-left: 10px;
              line-height: 14px;
            }
            pre {
              border: 1px solid #999;
              border-radius: 3px;
              background-color: #eee;
              line-height: 14px;
              padding: 3px 5px;
              margin: 5px 0;
            }
          }

          .extra-buttons {
            display: flex;
            column-gap: 5px;
            margin-top: 12px;

            .btn {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border: 0; outline: 0;
              background-color: #EAC3C3;
              border-radius: 11px;
              height: 22px;
              min-width: 96px;
              padding: 10px;
              cursor: pointer;

              font-size: 10px;
              font-weight: 400;
              line-height: 10px;
              color: black;
            }
          }

          .more-link {
            color: #E29A9A;
            text-decoration: none;
          }

          .summary-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            .title {
              font-family: SF Pro Text;
              font-size: 12px;
              font-weight: 700;
              line-height: 14px;
            }

            .info {
              display: flex;
              align-items: center;

              .status {
                display: flex;
                column-gap: 10px;
                align-items: center;
                .date {
                  font-size: 10px;
                  font-weight: 500;
                  line-height: 12px;
                }

                .date.blue {
                  color: rgba(23, 63, 212, 0.5);
                }

                .read-icon {
                  cursor: pointer;
                }
              }
            }

            .menu-icon {
              cursor: pointer;
              padding: 0 10px 0 5px;
              margin-left: 10px;
            }
          }

        }
      }
    }
  }
`
export const ClippedButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: SF Pro Text;
  padding: 15px 50px;
  
  .btn {
    cursor: pointer;
    border: 0; outline: 0;
    background-color: transparent;
    
    font-size: 12px;
    font-weight: 800;
    line-height: 14px;
    color: #173FD4;
    
    &.cl-black {
      color: black;
    }
  }
  
`