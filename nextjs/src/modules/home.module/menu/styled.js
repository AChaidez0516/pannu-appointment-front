import styled from 'styled-components'
import { devices } from '../../../common/constant/global'

export const MenuWrapper = styled.div`
  max-width: 768px;
  background-color: white;
  margin: 0 auto;
  height: 100vh;
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 10px;
    column-gap: 10px;
    padding: 10px 10px 0;
    
    .one {
      background-color: #F2F2F2;
      border-radius: 10px;
      width: 100%;
      height: 54px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        font-family: SF Pro Text;
        font-size: 14px;
        font-weight: 500;
        line-height: 13px;
        letter-spacing: 0px;
        text-align: left;
        width:100px;
        margin-left: 16px;
      }
      .icon {
        margin-right: 10px;
      }
    }
  }
  .bottom {
    padding: 20px 0 30px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    justify-content: center;
    align-items: center;
    .btn {
      font-family: SF Pro Text;
      font-size: 14px;
      font-weight: 500;
      line-height: 13px;
      letter-spacing: 0px;
      width: 171px; height: 54px;
      background-color: #F2F2F2;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border: none;
      outline: none;
      border-radius: 10px;
    }
    .link {font-family: SF Pro Text;
      font-size: 14px;
      font-weight: 500;
      line-height: 13px;
    }
  }
  
  @media ${devices.laptop} {
    
  }
`