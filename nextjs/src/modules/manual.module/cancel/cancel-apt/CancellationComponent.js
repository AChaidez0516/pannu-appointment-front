import styled from "styled-components"
import PropTypes from 'prop-types'


export default function CancellationComponent(props) {
  const {
    children
  } = props

  return (
    <CancellationComponentWrapper>
      <div className="title">No-show, cancel and reschedule policy</div>
      <div className="content">
        <div className="item-container">
          <div className="title">Cancel</div>
          <ol>
            <li>
              Cancel Under 1 business day before appointment - $XX.XX
            </li>
            <li>
              1-2 business days before appointment - $XX.XX
            </li>
          </ol>
        </div>
         <div className="item-container">
          <div className="title">Reschedule</div>
          <ol>
            <li>
              Cancel Under 1 business day before appointment - $XX.XX
            </li>
            <li>
              1-2 business days before appointment - $XX.XX
            </li>
          </ol>
        </div>
        <div className="item">Cancel because of an emergency - reversal of fee charged by and at the sole discretion of the clinician.</div>
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
    line-height: 14px;
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
    .item-container{
      margin-bottom: 7px;
      .title{
        margin: 0;
        font-weight: 700
      }
      ol{
        padding-left: 14px;
        margin: 0;
      }
    }
  }
  margin-bottom: 15px;
`
