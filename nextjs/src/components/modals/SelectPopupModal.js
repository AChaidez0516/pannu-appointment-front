import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'

const SelectPopupModal = (
  { show,
    onClose,
    onSelect,
    children,
    title,
    items,
    hideCancelButton = false,
    isConformButton,
    isConfirmDisabled = false,
    buttonLabel = 'Confirm',
    handleConfirm,
    handleCancel,
    maxWidth = 450,
    padding = "13px 18px 8px 18px",
    zIndex = 200
  }
) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  useEffect(() => {
    if (show) {
      const htmlTag = document.getElementsByTagName('html')[0]
      htmlTag.style.overflowY = 'hidden'
    }
    else {
      const htmlTag = document.getElementsByTagName('html')[0]
      htmlTag.style.overflowY = 'auto'
    }
  }, [show])

  const handleCloseClick = (e, clickedConfirmButton) => {
    e.preventDefault()

    /** will only run in case isConfirmButton present, jin */
    if (isConformButton) {
      if (clickedConfirmButton) {
        if (isConfirmDisabled)
          return;
        handleConfirm()
      } else {
        handleCancel()
      }
    }

    onClose()
  }

  const handleSelectItem = (e, id) => {
    e.preventDefault()

    onClose()
    onSelect(id)
  }

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal maxWidth={maxWidth} padding={padding}>
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        <StyledModalBody>
          <div>{children}</div>
          <div style={{ padding: '0px 10px 5px 10px' }}>
            {items.map((eachItem, index) => (
              <StyledEachItem key={index} onClick={(e) => handleSelectItem(e, eachItem.toUpperCase())}>{eachItem}</StyledEachItem>
            ))}
          </div>
          <ButtonsWrapper>
            {!hideCancelButton &&
              <StyledCloseModalBtn onClick={(e) => handleCloseClick(e, false)}>
                <StyledCloseModalBtnLink>Cancel</StyledCloseModalBtnLink>
              </StyledCloseModalBtn>
            }
            {isConformButton &&
              <StyledCloseModalBtn disabled={isConfirmDisabled} onClick={(e) => handleCloseClick(e, true)}>
                <StyledCloseModalBtnLink disabled={isConfirmDisabled}>{buttonLabel}</StyledCloseModalBtnLink>
              </StyledCloseModalBtn>
            }
          </ButtonsWrapper>
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    if (show)
      document.getElementById("modal-root").parentNode.style.zIndex = zIndex
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 10px;
`

const StyledModal = styled.div`
  width: 100%;
  height: auto;
  background: #EFEEEF;
  border-radius: 12px 12px 0 0;
  padding: ${props => props.padding};
  max-width: 375px;
  ${({ maxWidth }) => maxWidth && css`
    /* max-width: ${maxWidth}px; */
  `}
`
const StyledModalOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: end;
  background-color: rgba(0, 0, 0, 0.5);
`

const StyledCloseModalBtnLink = styled.a`
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 12px;
  text-align: center;
  text-decoration: none;
  color: ${props => props.disabled ? "#A4A4A4" : "#173FD4"};
`

const StyledCloseModalBtn = styled.div`
  background: #FFFFFF;
  border-radius: 12px;
  width: 100%;
  padding: 15px 0;
  text-align: center;
  cursor: pointer; 
  cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
  }  
`
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  column-gap: 13px;
`

const StyledEachItem = styled.p`
  background: #FFFFFF;
  border-radius: 0;
  padding: 15px 0;
  margin: 1px 0;
  color: #173FD4;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 12px;
  text-align: center;
  cursor: pointer;  
  &:first-child {
  	border-radius: 12px 12px 0 0;
  }
`

export default SelectPopupModal;