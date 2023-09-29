import styled from "styled-components"
import moment from 'moment';

export default function AptDatesComponent({aptDate, aptTime}) {

  return (
    <>
     
        <Wrapper>
          <div className='date-time'>
            <div className='day-date'>
              <div className='day'>{moment(aptDate).format("dddd")}</div>
              <div className='date'>{moment(aptDate).format("M/D")}</div>
            </div>
            <div className='time'>Start time {moment(aptTime, "HH:mm:ss").format("hh:mm A")}</div>
          </div>
        </Wrapper>
    </>
  )
}

export const Wrapper = styled.div`
  & div {
    font-weight: 500;
    font-size: 12px;
    line-height: 10px;
  }
  * {
    color: #F00;
    font-family: SF Pro Text;
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 10px;
  }
  display: flex;
  justify-content: space-between;
  .date-time {
    display: flex;
    align-items: center;
    column-gap: 26px;
    .day-date {
      display: flex;
      align-items: center;
      column-gap: 16px;
      width: 61px;
      margin: 13px 91px 14px 0;
    }
  }
 
`