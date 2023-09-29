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
`;

export const TotalFilterWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 31px;

  margin-top: -16px;
`;

export const FilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 22px;
  border: 1px solid #8B93A6;
  border-radius: 5px;  
  box-shadow:
    0px 4px 4px rgba(0, 0, 0, 0.3);
    
  padding: 0 6px 0 6px;
  .reverse {
    transform: rotateZ(180deg);
  }
  svg {
    cursor: pointer;
  }
`;

export const GoWrapper = styled.div`
  padding: 10px;
  div {
    cursor: pointer;
    color: #173fd4;
    font-family: SF Pro Text;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 10px; /* 62.5% */
  }
`;

export const ArrowWrapper = styled.div`
  display: flex;
  column-gap: 43px;
`;
export const FilteredDisplayWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  column-gap: 24px;
  padding: 0 19px;  
  padding-top: 7px;
  padding-right: 50px;
  * {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
  }
`;
export const SearchBoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 10px 22px 19px;
  img {
    cursor: pointer;
  }
`;

export const FieldWrapper = styled.div`
  background-color: #dee1eb;
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
`;

export const AptListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const RescheduleCancelBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  div {
    cursor: pointer;
    color: #173fd4;
    font-family: SF Pro Text;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 10px; /* 62.5% */
  }
`;
