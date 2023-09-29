import styled from 'styled-components'

const BalanceItemDiv = styled.div`
  flex: 1;
  position: relative;
  border: 1px solid #f59b24;
  border-radius: 5px;
  margin-bottom: 10px;
  background: #ffffff;
`
const Cell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 0px 7px;
`
const Item = styled.div`
  flex: 1;
  display: flex;
  padding: 2px;
`
const Cell_Text = styled.label`
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 10px;
  color: #000000;
`
const Blue_Dot = styled.div`
  background: #173fd4;
  width: 15px;
  height: 15px;
  border-radius: 15px;
  position: absolute;
  top: -7px;
  left: -5px;
`
const Avatar = styled.img`
  width: 30px;
  height: 30px;
`
const PPO = styled(Avatar)`
  position: absolute;
`

export default function Calendar_User({ type, status }) {
  return (
    <BalanceItemDiv style={{ marginTop: status === 0 ? '-65px' : '0px' }}>
      <Item>
        <Avatar
          src={require('../../public/assets/images/avatar/avatar1.png')}
        />
        <Cell>
          <Cell_Text>8:30</Cell_Text>
          <Cell_Text>Alina A.</Cell_Text>
        </Cell>
      </Item>
      <Item style={{ justifyContent: 'space-between' }}>
        <Cell_Text>Floyd Miles</Cell_Text>
        <Cell_Text>MD</Cell_Text>
        <Cell_Text>BC</Cell_Text>
      </Item>
      <Item style={{ justifyContent: 'space-between' }}>
        <Cell_Text>Neurosurgeon</Cell_Text>
        <Avatar
          style={{ width: 13, height: 10 }}
          src={require('../../public/assets/images/svg/video.svg')}
        />
      </Item>
    </BalanceItemDiv>
  )
}
