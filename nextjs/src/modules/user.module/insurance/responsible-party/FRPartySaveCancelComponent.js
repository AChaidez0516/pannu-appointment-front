import styled from "styled-components"
import PropTypes from 'prop-types'
import { RESPONSIBLE_PARTY_KEYS } from "../index/data"

export default function FRPartySaveCancelComponent(props) {
  const {
    responsiblePartyType,
    submitResponsiblePartyDetail,
    cancelResponsibleParty,
  } = props

  return (
    <FRPartySaveCancelWrapper>
      <button
        className="transparent-btn-jin"
        onClick={() => cancelResponsibleParty()}
      >Cancel</button>
      <button
        className="transparent-btn-jin"
        onClick={submitResponsiblePartyDetail}
      >{responsiblePartyType === RESPONSIBLE_PARTY_KEYS.ME ? 'Save' : 'Submit'}</button>
    </FRPartySaveCancelWrapper>
  )
}

FRPartySaveCancelComponent.propTypes = {
  responsiblePartyType: PropTypes.string.isRequired,
  submitResponsiblePartyDetail: PropTypes.func
}

export const FRPartySaveCancelWrapper = styled.div`
  margin-top: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
  }
  button:first-child {
    color: #000000;
  }
  button:last-child {
    color: #173FD4;
  }
`