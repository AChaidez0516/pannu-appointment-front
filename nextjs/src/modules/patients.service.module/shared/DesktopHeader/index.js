import Image from "next/image"
import { ICONS, IMGS } from "../../../../common/utils/styleGuide"
import { 
  BellWrapper,
  DesktopHeaderWrapper, 
  IconsWrapper, 
  LeftWrapper, 
  RightWrapper, 
  UserWrapper,
  WarningWrapper, 
} from "./styled"


const countOfNotifications = 3
const warningCount = 20

function DesktopHeader (props) {
  const {user, title, marginBottom} = props
  
  return (
    <DesktopHeaderWrapper marginBottom={marginBottom}>
      <LeftWrapper>
        <div className="header-title">{title}</div>
      </LeftWrapper>
      <RightWrapper>
        <UserWrapper>
          <Image src={IMGS.avatarWoman} width={43} height={43} layout="fixed"/>
          <div className="user-info">
            <div className="user-name">{user?.fullName || 'Cameron Alon'}</div>
            <button onClick={() => {}}>settings</button>
          </div>
        </UserWrapper>
        <IconsWrapper>
          <BellWrapper>
            <Image src={ICONS.bell} width={20} height={24} layout="fixed" />
            <div className="notify-count">{countOfNotifications}</div>
          </BellWrapper>
        </IconsWrapper>
      </RightWrapper>
    </DesktopHeaderWrapper>
  )
}

DesktopHeader.defaultProps = {
  marginBottom: 44
}

export default DesktopHeader