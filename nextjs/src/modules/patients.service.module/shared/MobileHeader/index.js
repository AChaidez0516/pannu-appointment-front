import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'
import { ICONS, IMGS } from '../../../../common/utils/styleGuide'
import { 
  HeaderWrapper, 
  LoggedInGroup, 
  LeftPart, 
  RightPart, 
  WelcomeGuest, 
  BellWithNotification} from "./styled"

  
MobileHeader.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  backUrl: PropTypes.string.isRequired,
}

function MobileHeader (props) {
  const { 
    headerTitle, 
    isLoggedIn,
    isOpenFilter,
    isFilter,
    setIsOpenFilter,
    countOfNotifications,
    backUrl,
   } = props

  return (
    <>
      <HeaderWrapper>
        <LeftPart>
          <Link href={backUrl} passHref>
            <Image 
              src={ICONS.backArrow} 
              width={10}
              height={13}
              onClick={() => {}}
            />
          </Link>
          <h5>{headerTitle}</h5>
        </LeftPart>
        <RightPart>
          {isLoggedIn ?
          <LoggedInGroup>
            {setIsOpenFilter && 
            <Image 
              src={ICONS.settingIcon} 
              width={19} height={21} 
              onClick={() => setIsOpenFilter(!isOpenFilter)}
            />}
            <BellWithNotification>
              <div>{countOfNotifications || 0}</div>
              <Image src={ICONS.bell} width={21} height={24} />
            </BellWithNotification>
            <Image className='avatar' src={IMGS.avatarWoman} width={30} height={30} />
          </LoggedInGroup>
          : 
          <>
            <WelcomeGuest>
              <span >Welcome guest!</span>
              <Link href="/"><a>Sign in</a></Link>
            </WelcomeGuest>
            <Image src={ICONS.bell} width={21} height={24}/>
          </>
          }

        </RightPart>
      </HeaderWrapper>
    </>
  )
}

MobileHeader.defaultProps = {
  headerTitle: "Welcome Pannu Corp",
  isLoggedIn: false,
  isOpenFilter: false,
  isFilter: false,
  setIsOpenFilter: null,
  countOfNotifications: 0,
  backUrl: "/"
}

export default MobileHeader