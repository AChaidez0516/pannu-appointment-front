import styled from "styled-components"
import PropTypes from 'prop-types'

export default function AmountDueComponent(props) {
  const {

  } = props

  return (
    <AmountDueWrapper>
      <div className='fee-unit'>
        <div>Amount due</div>
        <div>12,450.06</div>
      </div>
      <div className='fee-unit'>
        <div>Employer contribution</div>
        <div>2,450.06</div>
      </div>
      <div className='fee-unit'>
        <div>Net due</div>
        <div>1,450.06</div>
      </div>
    </AmountDueWrapper>
  )
}

AmountDueComponent.propTypes = {

}

export const AmountDueWrapper = styled.div`
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  .fee-unit {
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      font-size: 12px;
      line-height: 12px;
      color: #000000;
    }
  }
  margin-bottom: 15px;
`