import styled from 'styled-components'

import { useEffect } from 'react'
import ReactDOM from 'react-dom'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; bottom: 0;
  left: 0; right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  * {
    font-family: SF PRO TEXT;
  }
`;

function Modal({ children, isOpened, zIndex = 201 }) {

  // useEffect(() => {
  //   if (isOpened) {
  //     const htmlTag = document.getElementsByTagName("html")[0]
  //     htmlTag.style.paddingRight="17px"
  //     htmlTag.style.overflow="hidden"
  //   }
  //   else {
  //     const htmlTag = document.getElementsByTagName("html")[0]
  //     htmlTag.style.paddingRight = "0px"
  //     htmlTag.style.overflow = "auto"
  //   }
  // }, [isOpened])

  const modalContent = isOpened ? (
    <ModalOverlay>
      {children}
    </ModalOverlay>
  ) : null;

  if (isOpened)
    document.getElementById("popup-modal-root").parentNode.style.zIndex = zIndex
  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("popup-modal-root")
  );
}

export default Modal
