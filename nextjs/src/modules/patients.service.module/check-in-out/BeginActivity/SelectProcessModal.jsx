import styled from "styled-components";
import { CloseIcon_1 } from "../../../../common/utils/Icons";


export const SelectProcessModal = ({ children, closeModal }) => {
  return (
    <SelectProcessWrapper>
      <InnerWrapper>
        <CloseBtn onClick={() => closeModal(false)}>
          <CloseIcon_1 width={28} height={28} color="#173FD4" />
        </CloseBtn>
        <ProcessWrapper>
          {children}
        </ProcessWrapper>
      </InnerWrapper>
    </SelectProcessWrapper>
  )
}

export const SelectProcessWrapper = styled.div`
  padding: 0 12px;
  max-width: 400px;
  width: 100%;
`
export const InnerWrapper = styled.div`
  padding: 42px 20px;
  position: relative;
  width: 100%;
  background-color: white;
  background: #F3F5F5;
  border: 2px solid #000000;
  border-radius: 21px;
`
export const CloseBtn = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
`
export const ProcessWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  row-gap: 22px;
`
