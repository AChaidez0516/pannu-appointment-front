import moment from 'moment'
import Image from 'next/image'
import styled from 'styled-components';
import { ICONS } from "../../../../common/utils/styleGuide"


const CustomToolBarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 6px;
  h6.note {
    margin: 12px 0 20px 0;
    width: 100%;
    text-align: left;
  }
  margin-bottom: 34px;
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
  padding: 0 49px;
  display: flex;
  align-items: center;
  height: 38px;
  border-radius: 15px;
  -webkit-box-shadow: inset 0px 0px 12px 4px #C2BEBF; 
  box-shadow: inset 0px 0px 12px 4px #C2BEBF;
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
    toolbar.date.setDate(toolbar.date.getDate() - 7);
    toolbar.onNavigate('prev');
  }

  const goToNext = () => {
    toolbar.date.setDate(toolbar.date.getDate() + 7);
    toolbar.onNavigate('next');
  }

  const goToCurrent = () => {
    // const now = new Date();
    // toolbar.date.setDate(now.getDate())
    // toolbar.date.setMonth(now.getMonth())
    // toolbar.date.setYear(now.getFullYear())
    // toolbar.onNavigate('current')
  }

  const dateRangeTitle = () => {
    const today = moment(toolbar.date);
    const from_date = today.startOf('week');
    const _today = moment(toolbar.date)
    const to_date = _today.endOf('week');
    return (
      <DateRangeTitleWrapper>
        <div>
          <Image 
            src={ICONS.arrowLeft} 
            width={7.4} height={12}
            onClick={goToBack}
          />
          <div>
            {from_date.format('MMM')} {from_date.format('DD')}, {from_date.format('YYYY')}
              - {to_date.format('MMM')} {to_date.format('DD')}, {to_date.format('YYYY')}
          </div>
          <Image 
            src={ICONS.arrowRight} 
            width={7.4} height={12}
            onClick={goToNext}
          />
        </div>
        <Image src={ICONS.calendar} width={25} height={25} onClick={goToCurrent} />
      </DateRangeTitleWrapper>
    )
  }

  const datesToDisplay = () => {
    const today = moment(toolbar.date)
    const startDate = today.startOf('week');
    return (
      <div className='dates-to-display'>
        { [...Array(7).keys()].map((val, i) => {
          const d = moment(startDate).add(i, 'days')
          return <DateUnitWrapper key={i}>
            <div>{d.format('ddd')}</div>
            <div>{d.format('DD')}</div>
          </DateUnitWrapper>
        })}
      </div>
    )
  }

  return (
    <CustomToolBarWrapper >
      {dateRangeTitle()}
      <h6 className='note'>Click to view more information on the provider</h6>
      <ControlButtonWrapper >
        {datesToDisplay()}
      </ControlButtonWrapper>
    </CustomToolBarWrapper >
  );
}

export default CustomToolbar