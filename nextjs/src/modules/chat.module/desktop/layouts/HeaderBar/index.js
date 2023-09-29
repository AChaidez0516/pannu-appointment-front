import { useRouter } from 'next/router'
import { useChatUser } from '../../../../../redux/hooks/useCommonStore'

import { ArrowIcon_1, SettingIcon } from '../../../../../common/utils/Icons';
import { IMGS } from '../../../../../common/utils/styleGuide';
import { HeaderWrapper } from './styled';

const HeaderBar = () => {
  const router = useRouter()

  const { chatUser } = useChatUser()

  const logout = () => {
    router.push('/test_signin')
  }

  return (
    <HeaderWrapper>
      <div className="logo">
        <div className="icon"><ArrowIcon_1 /></div>
        <div className="icon reverse"><ArrowIcon_1 /></div>
        <div className="title">Pannu Corp</div>
      </div>
      <div className="alarm">
        Your message has been sent to the staff. Please allow some time for them to respond because they are busy.
        You can leave now and you will receive a notification when they send a response. Thank you.
      </div>
      <div className="profile">
        <div className="setting"><SettingIcon /></div>
        <div className="avatar">
          <img src={chatUser.avatar ? chatUser.avatar : IMGS.avatarThumb} />
        </div>
        <div className="info">
          <div className="name">{chatUser.name}</div>
          <div onClick={logout} className="logout">Logout</div>
        </div>
      </div>

    </HeaderWrapper>
  )
}

export default HeaderBar