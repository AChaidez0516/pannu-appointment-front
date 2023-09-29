import styled from "styled-components"
import { CellTimeWrapper, TimePairWrapper } from "../Index/styled"
import { ActivityItemWrapper, ActivityNameWrapper, ActivityTimeWrapper } from "./ActivityItem"


export const ActivityList = ({ children }) => {
  return (
    <ActivityListWrapper>
      <ActivityItemWrapper>
        <ActivityNameWrapper>
          <CellTimeWrapper>&nbsp;&nbsp;&nbsp;</CellTimeWrapper>
          <CellTimeWrapper textA={'left'}>Activity</CellTimeWrapper>
        </ActivityNameWrapper>
        <ActivityTimeWrapper>
          <HeaderTopTitleWrapper>
            <TitleHeaderWrapper>Start</TitleHeaderWrapper>
            <TimePairWrapper>
              <CellTimeWrapper fontS={9} fontW={500}>Planned</CellTimeWrapper>
              <CellTimeWrapper fontS={9} fontW={500}>Actual</CellTimeWrapper>
            </TimePairWrapper>
          </HeaderTopTitleWrapper>
          <HeaderTopTitleWrapper>
            <TitleHeaderWrapper>End</TitleHeaderWrapper>
            <TimePairWrapper>
              <CellTimeWrapper fontS={9} fontW={500}>Planned</CellTimeWrapper>
              <CellTimeWrapper fontS={9} fontW={500}>Actual</CellTimeWrapper>
            </TimePairWrapper>
          </HeaderTopTitleWrapper>
          <HeaderTopTitleWrapper>
            <TitleHeaderWrapper>Duration</TitleHeaderWrapper>
            <TimePairWrapper>
              <CellTimeWrapper fontS={9} fontW={500}>Planned</CellTimeWrapper>
              <CellTimeWrapper fontS={9} fontW={500}>Actual</CellTimeWrapper>
            </TimePairWrapper>
          </HeaderTopTitleWrapper>
        </ActivityTimeWrapper>
      </ActivityItemWrapper>
      {children}
    </ActivityListWrapper>
  )
}

export const ActivityListWrapper = styled.div`
  & > div:nth-child(1) {
    cursor: default!important;
    &:hover {
      border-color: white!important;
    }
  }
`
export const HeaderTopTitleWrapper = styled.div`
  
`
export const TitleHeaderWrapper = styled.div`
  font-size: 9px;
  font-weight: 600;
  line-height: 10px;
  color: #000000;
  margin-bottom: 2px;
  text-align: center;
`
