import styled from 'styled-components'
import { APT_TYPE_TO_SEARCH } from '../view-apts/shared/data'


export default function AptButton({ btnText, aptType, isActive, onClick,missed }) {
  return (
      <AptButtonWrapper isActive={isActive} onClick={onClick}>
        {aptType === APT_TYPE_TO_SEARCH.PREFERRED && <Blue_Dot></Blue_Dot>}
        {aptType === APT_TYPE_TO_SEARCH.URGENT && <Red_Dot></Red_Dot>}
        {aptType === APT_TYPE_TO_SEARCH.WAIT_LIST && <Orient_Dot></Orient_Dot>}
        {aptType === APT_TYPE_TO_SEARCH.MISSED && <Mustard_Dot></Mustard_Dot>}
        <div className='btn'>
        {/* <Number_Badge>20</Number_Badge> */}
          <button 
            className='transparent-btn-jin'
            
          >
            {btnText}
            <br />
            {missed > 0 && aptType === APT_TYPE_TO_SEARCH.PREFERRED && <NumApts_Blue>{missed}</NumApts_Blue>}
            {missed > 0 && aptType === APT_TYPE_TO_SEARCH.URGENT && <NumApts_Red>{missed}</NumApts_Red>}
            {missed > 0 && aptType === APT_TYPE_TO_SEARCH.WAIT_LIST && <NumApts_Orient>{missed}</NumApts_Orient>}
            {missed > 0 && aptType === APT_TYPE_TO_SEARCH.MISSED && <NumApts_Mustard>{missed}</NumApts_Mustard>}
          </button>
        </div>
      </AptButtonWrapper>
  )
}
const AptButtonWrapper = styled.div`
  cursor:pointer;
  position: relative;
  display: inline-block;
  background: ${props => props.isActive ? '#CEFFD6' : '#FFFFFF'};
  border: 1px solid #8b93a6;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 5px 7px;
  .btn {
    button {
      font-weight: 500;
      font-size: 14px;
      line-height: 12px;      
    }
    button.transparent-btn-jin {
      font-size:10px;
    }

  }
`
const Blue_Dot = styled.div`
  background: #173fd4;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  position: absolute;
  top: -7px;
  left: -7px;
`
const Number_Badge = styled.div`
    font-size: 8px;
    background: white;
    border: 2px solid red;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    position: absolute;
    top: -7px;
    left: calc(100% - 8px);
`
const Red_Dot = styled(Blue_Dot)`
  background: #ff0000;
`
const Orient_Dot = styled(Blue_Dot)`
  background: #fac23c;
`
const Mustard_Dot = styled(Blue_Dot)`
  background: #FF9100;
`
const NumApts_Blue = styled.div`
  font-weight:bold;
  font-size:8px;
  background: #173fd4;
  border-radius: 50px;
  color:#ffffff !important; 
`

const NumApts_Red = styled(NumApts_Blue)`
  background: #ff0000;
`
const NumApts_Orient = styled(NumApts_Blue)`
  background: #fac23c;
`
const NumApts_Mustard = styled(NumApts_Blue)`
  background: #FF9100;
`
