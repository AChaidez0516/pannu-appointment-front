import Image from 'next/image'
import { useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment'
import 'moment/locale/en-gb';
import { Navigate as navigate } from "react-big-calendar";
import useWindowDimensions, { DEVICE_TYPE } from '../../../../../../common/hooks/useWindowDimensions';
import { ICONS } from "../../../../../../common/utils/styleGuide"
import { GUTTER_WIDTH } from '../../index/data';
import useJumpDate from "./context";
import { 
  CALENDAR_INNER_PADDING_X, 
  SECTION_INNER_PADDING_X_DESKTOP, 
  SECTION_INNER_PADDING_X_MOBILE 
} from '../../shared/constants';


const CustomToolbar = (props) => {
  const {
    date,
    onNavigate,
    selectedDateToFetchSlots,
    setSelectedDateToFetchSlots,
    sectionWidth,
  } = props

  const { width, device } = useWindowDimensions();
  const calcPageWidth = device === DEVICE_TYPE.DESKTOP ? sectionWidth : width
  const RIGHT_ICON_WIDTH = parseFloat((calcPageWidth 
    - 2 * (device === DEVICE_TYPE.DESKTOP ? 
      SECTION_INNER_PADDING_X_DESKTOP : SECTION_INNER_PADDING_X_MOBILE + CALENDAR_INNER_PADDING_X) 
    - GUTTER_WIDTH) / 7)

  const today = moment(date)
  const startDate = today.startOf('week');

  const { jumpDate, updateFirstDate } = useJumpDate();

  useEffect(() => {
    if (jumpDate) {
      onNavigate(navigate.DATE, moment(jumpDate).toDate());
    }
  }, [jumpDate, onNavigate]);


  return (
    <CustomToolBarWrapper >
      <div className='title'>Click to select the start time of the appointment you want</div>
      <div className='header-wrapper'>
        <div className='icon-unit left' style={{ width: GUTTER_WIDTH }}>
          <Image
            src={ICONS.arrowBackCircle}
            width={24} height={24}
            layout="fixed"
            onClick={() => {
              const m_prevWeekFirstDay = moment(date).startOf('week')
              const m_selctedDate = moment(new Date())
              if (m_prevWeekFirstDay.diff(m_selctedDate) < -7) {
                return
              }
              onNavigate(navigate.PREVIOUS)
              updateFirstDate(moment(date).startOf('week').add(-7, 'days').toDate())
              setSelectedDateToFetchSlots(moment(date).startOf('week').add(-7, 'days').toDate())
            }}
          />
        </div>
        <div className='week-group'>
          {
            [...Array(5).keys()].map((val, i) => {
              const d = moment(startDate).add(i, 'days')
              return (
                <div key={i} className='week-name'>
                  <div className='day'>{d.format('ddd')}</div>
                  <div className='date'>{d.format('DD')}</div>
                </div>
              )
            })
          }
        </div>
        <div className='icon-unit right' style={{ width: RIGHT_ICON_WIDTH }}>
          <Image
            src={ICONS.arrowNextCircle}
            width={24} height={24}
            layout="fixed"
            onClick={() => {
              onNavigate(navigate.NEXT)
              updateFirstDate(moment(date).startOf('week').add(7, 'days').toDate())
              setSelectedDateToFetchSlots(moment(date).startOf('week').add(7, 'days').toDate())
            }}
          />
        </div>
      </div>
    </CustomToolBarWrapper >
  );
}

export default CustomToolbar


const CustomToolBarWrapper = styled.div`
  * {
    font-family: 'SF Pro Text';
    font-style: normal;
    color: #000000;
  }
  .title {
    text-align: center;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    margin-bottom: 30px;
  }
  .header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .icon-unit {
      width: 45px;
      text-align: center;
      img {
        cursor: pointer;
      }
    }
    .week-group {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .week-name {
        display: flex;
        flex-direction: column;
        row-gap: 3px;
        flex: 1;
        & > div{
          font-weight: 600;
          font-size: 10px;
          line-height: 10px;
          text-align: center;
        }
        .day {
          text-align: center;
        }
        .date {
          text-align: center;
        }
        
      }
    }
  }
  margin-bottom: 14px;
` 
