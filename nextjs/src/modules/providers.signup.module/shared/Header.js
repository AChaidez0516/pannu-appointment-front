import styled from 'styled-components'
import { IMGS } from '../../../common/utils/styleGuide'
import { useAuthUser } from '../../../redux/hooks/useCommonStore'
const HeaderTop = styled.div`
  height: 65px;
  display: flex;
  justify-content: space-between;
  background-color:white;
`
const HeaderItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 10px;
`
const Name = styled.label`
  font-family: SF Pro Text;
  font-size: 16px;
  line-height: 22px;
  color: #000;
`
const Cols = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`
const Title = styled.div`
    font-family: SF Pro Text;
    font-weight: 700, Bold;
    font-size: 32px;
    line-height: 22px;
    color: #173FD4;
    margin-left: 124px;
`

function Header() {
  const { authUser } = useAuthUser()

  return (
    <HeaderTop>
      <HeaderItem>
          <Title>Pannu Corp</Title>
      </HeaderItem>
      <HeaderItem>
      </HeaderItem>
      <HeaderItem style={{marginRight: 124}}>            
        <Avatar src={IMGS.avatarWoman} />
        <Cols>
            <Name>{authUser.fullName}</Name>
        </Cols>
      </HeaderItem>
    </HeaderTop>
  )
}


export default Header