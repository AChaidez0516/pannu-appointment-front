import styled from 'styled-components'

export const HeaderWrapper = styled.div`
  display: flex;
  background-color: white;
  border-bottom: 1px solid #C4C4C4;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  font-family: SF Pro Text;

  .logo {
    display: flex;
    column-gap: 20px;
    align-items: center;
    margin-left: 27px;

    .title {
      font-family: SF Pro Text;
      font-size: 32px;
      font-weight: 700;
      line-height: 30px;
      letter-spacing: 0px;
      text-align: left;
      color: #173FD4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .icon {
      cursor: pointer;
    }
    .icon.reverse {
      transform: rotateY(180deg);
    }
  }

  .alarm {
    display: inline-flex;
    align-items: center;
    height: 50px;
    width: 685px;
    padding: 0 28px;


    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    color: black;
    background-color: #E85D002A;
    border-radius: 6px;

  }
  .profile {
    display: flex;
    column-gap: 20px;
    margin-right: 25px;
    .setting {
      cursor: pointer;
    }
    .info {
      .name {
        font-size: 18px;
        font-weight: 600;
        line-height: 21px;
        color: #3E3D3E;
      }
      .logout {
        font-family: SF Pro Text;
        font-size: 16px;
        font-weight: 600;
        line-height: 19px;
        color: #173FD4;
        cursor: pointer;
      }
    }
    .avatar {
      img {
        width: 35px; height: 35px;
        border-radius: 35px;
      }
    }
  }
`