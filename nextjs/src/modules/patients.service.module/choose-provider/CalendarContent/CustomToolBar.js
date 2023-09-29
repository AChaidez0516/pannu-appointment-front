import moment from 'moment'
import styled from 'styled-components';
import Image from 'next/image'
import { ICONS } from "../../../../common/utils/styleGuide"


const CustomToolBarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
  padding: 0 6px;
  margin-bottom: 32px;
` 
const DateRangeTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 45px;
  div {
    display: flex;
    align-items: center;
    margin: 0 12px;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 10px;
    color: #000000;
  }
`
const ControlButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  column-gap: 31px;
  align-items: center;
  justify-content: space-between;
  button {
    border: none;
    padding: 0;
    background: transparent;
  }
  .dates-to-display {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
`
const DateUnitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  justify-content: center;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 10px;
    line-height: 13px;
    text-align: center;
    color: #000000;
  }
`

const CustomToolbar = (toolbar) => {

  const goToBack = () => {
    toolbar.date.setDate(toolbar.date.getDate() - 3);
    toolbar.onNavigate('prev');
  }

  const goToNext = () => {
    toolbar.date.setDate(toolbar.date.getDate() + 3);
    toolbar.onNavigate('next');
  }

  const goToCurrent = () => {
    const now = new Date();
    toolbar.date.setDate(now.getDate());
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setYear(now.getFullYear());
    toolbar.onNavigate('current');
  }

  const dateRangeTitle = () => {
    const date = moment(toolbar.date);
    const endDate = moment(date).add(2, 'days');
    return (
      <DateRangeTitleWrapper>
        <div>
          <Image src={ICONS.arrowLeft} width={8} height={12} layout="fixed" />
          <div>{date.format('MMM')} {date.format('DD')}, {date.format('YYYY')} - {endDate.format('MMM')} {endDate.format('DD')}, {endDate.format('YYYY')}</div>
          <Image src={ICONS.arrowRight} width={8} height={12} layout="fixed" />
        </div>
        <Image src={ICONS.calendar} width={25} height={25} onClick={goToCurrent} />
      </DateRangeTitleWrapper>
    )
  }

  const datesToDisplay = () => {
    const date = moment(toolbar.date)
    const middle = moment(date).add(1, 'days')
    const endDate = moment(date).add(2, 'days')
    return (
      <div className='dates-to-display'>
        <DateUnitWrapper>
          <div>{date.format('ddd')}</div>
          <div>{date.format('DD')}</div>
        </DateUnitWrapper>
        <DateUnitWrapper>
          <div>{middle.format('ddd')}</div>
          <div>{middle.format('DD')}</div>
        </DateUnitWrapper>
        <DateUnitWrapper>
          <div>{endDate.format('ddd')}</div>
          <div>{endDate.format('DD')}</div>
        </DateUnitWrapper>
      </div>
    )
  }

  return (
    <CustomToolBarWrapper >
      {dateRangeTitle()}
      <ControlButtonWrapper >
        <button onClick={goToBack}>
          <Image src={ICONS.arrowBackCircle} width={25} height={25} />
        </button>
        {datesToDisplay()}
        <button onClick={goToNext}>
          <Image src={ICONS.arrowNextCircle} width={25} height={25} />
        </button>
      </ControlButtonWrapper>
    </CustomToolBarWrapper >
  );
}

export default CustomToolbar