import styled, { css } from "styled-components";

export const SectionWrapper = styled.div`
  .search-desc {
    font-weight: 600;
    font-size: 12px;
    line-height: 17.3px;
    width: 325px;
    margin: 18px;
    margin-top: 2px;
  }
  .search-desc1 {
    margin-top: 5px;
  }
`

export const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -16px;
  padding: 0 45px 0 8px;
  .reverse {
    transform: rotateZ(180deg);
  }
  svg {
    cursor: pointer;
  }
`
export const FilteredDisplayWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 24px;
  padding: 0 19px;
  * {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
  }
  .selected-location {
    width: 100px;
  }
  .selected-date {
    flex: 1;
  }

`
export const SearchBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 10px 22px 19px;
  img {
    cursor: pointer;
  }
`

export const FieldWrapper = styled.div`
  background-color: #DEE1EB;
  padding: 2px 8px;
  border-radius: 8px;
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1%;
  .field {
    font-size: 9px;
    line-height: 10px;
    text-align: center;
  }
  .start-time {
    margin-top: 3px;
    width: 5%;
  }
  .patient-name {
    width: 16%;
  }
  .dob {
    width: 18%;
  }
  .provider-name {
    width: 16%;
  }
  .reason {
    width: 30%;
  }
  .duration {
    width: 5%;
  }
`

export const AptListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`