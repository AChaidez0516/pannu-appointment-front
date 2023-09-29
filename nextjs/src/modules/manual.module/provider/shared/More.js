import styled from "styled-components";
import { Fragment, useEffect, useState } from "react";
import { BrComponent } from "./BrComponent";

const DescriptionWrapper = styled.div`
  > * {
    font-family: 'SF Pro Display';
  }
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #000000;
  .btn {
    color: #173FD4;
    :hover {
      cursor: pointer;
    }
  }
`;

export const DescriptionComponent = ({ description, onClickMore, maxLength = 200, className = '' }) => {
  const [isNeedShrink, setIsNeedShrink] = useState(false);

  useEffect(() => {
    if (description?.length > maxLength) {
      setIsNeedShrink(true);
    } else {
      setIsNeedShrink(false);
    }
  }, [description]);

  return (
    <DescriptionWrapper>
      {isNeedShrink && (
        <>
          <span className={className}>
            <BrComponent str={description?.substr(0, maxLength)} />
          </span>
          <span className="btn" onClick={onClickMore}>...More</span>
        </>
      )}
      {!isNeedShrink && (
        <div>
          <BrComponent str={description} />
        </div>
      )}
    </DescriptionWrapper>
  )
}
