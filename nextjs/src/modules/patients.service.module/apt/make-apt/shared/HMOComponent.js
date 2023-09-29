import styled, { css } from "styled-components"


export default function HMOComponent(props) {
  return (
    <HMOWrapper isPCP={props.children !== 'HMO'} isPOEM={props.children === 'POEM'}>
      {props.children}
    </HMOWrapper>
  )
}

export const HMOWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 29px;
  height: 14px;
  background-color: #29B05A;
  border-radius: 3px;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 11px;
  color: #FFFFFF;
  ${({ isPCP }) => isPCP && css`
    background-color: #0085FE;
  `}
  ${({ isPOEM }) => isPOEM && css`
    width: 36px;
    height: 10px;
    color: #FF0000;
    background-color: transparent;
    text-shadow: 0px 0px 10px #FF0000;
  `}
`