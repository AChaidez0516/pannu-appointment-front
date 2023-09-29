import styled from "styled-components"
import PropTypes from 'prop-types'


export default function CancellationComponent(props) {
  const {
    children
  } = props

  return (
    <CancellationComponentWrapper>
      <div className="title">Provider's cancellation policy</div>
      <div className="content">
        <div className="item">No show fee $XX.XX</div>
        <div className="item">Notice less than 1 business day, fee $XX.XX</div>
        <div className="item">Notice 1-2 business days, fee $XX.XX</div>
        <div className="item">If rescheduled at time of notice, fee reduced by $XX.XX</div>
        <div className="itme">Emergency cancellation, no fee charged</div>
      </div>
    </CancellationComponentWrapper>
  )
}

CancellationComponent.propTypes = {

}


export const CancellationComponentWrapper = styled.div`
  padding: 9px 8px;
  border: 2px solid rgba(47,128,237,0.5);;
  border-radius: 5px;
  * {
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 10px;
    color: #000000;
  }
  .title {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 12px;
  }
  .content {
    display: flex;
    flex-direction: column;
    row-gap: 7px;
    .item {

    }
  }
  margin-bottom: 15px;
`
