import styled from "styled-components";

export const Notification = (props) => {
  return (
    <NotificationWrapper {...props}>
      <span>{props?.number}</span>
    </NotificationWrapper>
  )
}
export const NotificationWrapper = styled.div`
  position: absolute;
  top: -7px;
  right: -5px;
  background-color: white;
  border-radius: 50%;
  height: 18px;
  width: 18px;
  background: #FFFFFF;
  border: 2px solid #FF0000;
  ${({ top }) => top && css`
    top: ${top}px;
  `}
  ${({ left }) => left && css`
    left: ${left}px;
  `}
  ${({ right }) => right && css`
    right: ${right}px;
  `}
  ${({ bottom }) => bottom && css`
    bottom: ${bottom}px;
  `}
  ${({ radius }) => radius && css`
    width: ${radius}px;
    height: ${radius}px;
  `}
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 9px;
    line-height: 1px;
  }
`