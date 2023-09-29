import styled from 'styled-components'
import { devices } from '../../../../common/constant/global'

export const TimeText = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 13px;
  text-align: center;

  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
`
export const Row = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${props => props.marginTop}px;
  @media ${devices.laptopL} {
    margin-top: 180px;
  }
`