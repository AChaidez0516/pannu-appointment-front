import styled, { css } from "styled-components";
import { devices } from "../../../../../common/constant/global";


export const MakeAptWrapper = styled.div`
  * {
    font-family: 'SF Pro Text';
    font-style: normal;
    color: #000000;
    font-weight: 400;
  }
`
export const MainContentWrapper = styled.div`
  background: white;
  padding: 18px 8px;
  padding-bottom: 4px;
  .inner-content-wrapper {
    .section {
      max-width: 375px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      ${({ sectionHeight }) => sectionHeight && css`
        height: ${sectionHeight}px;
      `}
      .busy-times {
        margin-bottom: 15px;
      }
    }
  }
  ${({ paddingX_Mobile }) => paddingX_Mobile && css`
    padding: 18px ${paddingX_Mobile}px;
  `}

  @media ${devices.laptop} {
    background: #F7F5F9;
    overflow: auto;
    .inner-content-wrapper {
      display: flex;
      justify-content: center;
      column-gap: 20px;
      .section {
        min-width: 375px;
        margin: 0;
        background: #FFFFFF;
        border-radius: 14px;
      }
      ${({ sectionWidth }) => sectionWidth && css`
        .section {
          width: ${sectionWidth}px;
        }
      `}
    }
    ${({ paddingY, paddingX }) => paddingY && paddingX && css`
      padding: ${paddingY}px ${paddingX}px;
    `}
  }
`


