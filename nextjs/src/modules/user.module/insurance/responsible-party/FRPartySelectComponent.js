import styled from "styled-components"
import { RESPONSIBLE_PARTY_KEYS } from "../index/data"

import { useResponsiblePartyType } from '../../../../redux/hooks/useInsuranceStore'

export function FRPartySelectComponent() {
  const { responsiblePartyType, commitResponsiblePartyType } = useResponsiblePartyType()

  return (
    <>
      <FRPartySelectWrapper>
        <label>Financially responsible party*</label>
        <div className="select-btn-group">
          <button
            className={responsiblePartyType === RESPONSIBLE_PARTY_KEYS.ME ? 'selected-RP' : ''}
            onClick={() => commitResponsiblePartyType(RESPONSIBLE_PARTY_KEYS.ME)}
          >Me</button>
          <button
            className={responsiblePartyType === RESPONSIBLE_PARTY_KEYS.OTHER ? 'selected-RP' : ''}
            onClick={() => commitResponsiblePartyType(RESPONSIBLE_PARTY_KEYS.OTHER)}
          >Other</button>
        </div>
      </FRPartySelectWrapper>
    </>
  )
}

export const FRPartySelectWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 19px;
  label {
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
  }
  .select-btn-group {
    display: flex;
    border-radius: 2px;
    border: 1px solid #173FD4;
    cursor: pointer;
  }
  button {
    padding: 0;
    border: none;
    outline: none;
    background: white;
    box-shadow: none;
    width: 80px;
    height: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 12px;
    line-height: 12px;
    color: #173FD4;
  }
  button:first-child {
    border-right: 1px solid #173FD4;
    border-radius: 2px 0 0 2px;
  }
  button:last-child {
    border-radius: 0 2px 2px 0;
  }
  button.selected-RP {
    background: #173FD4;
    color: #ffffff;
  }
`