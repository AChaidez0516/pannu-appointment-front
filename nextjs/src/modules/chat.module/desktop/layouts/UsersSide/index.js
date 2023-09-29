import Image from 'next/image'
import dynamic from 'next/dynamic'
import chat_styled from '../../../../../common/constant/chat.module.css'
import useWindowDimensions from '../../../../../common/hooks/useWindowDimensions'

import { useChatUser } from '../../../../../redux/hooks/useCommonStore'
import { useUISetting } from '../../../../../redux/hooks/useChatStore'

const UserList = dynamic(() => import('../UserList'), { ssr: false })

import { useRouter } from 'next/router'
import { useMessageEvent } from '../../../../../redux/hooks/useChatStore'

import {
  UserSideWrapper,
} from './styled'
import {MessageEventType, users, ALARM_MESSAGE_COPY_USERS, ChatUserRole, dependents} from '../../../shared/constants'
import { IMGS } from '../../../../../common/utils/styleGuide'
import {StarIcon} from "../../../../../common/utils/Icons";
import SubAggregation from "../SubAggregation";
import CollapseExpand from "../../../shared/components/CollapseExpnad";

export default function UsersSide() {
  const { chatUser } = useChatUser()
  const { collapsedFlags, updateCollapsedFlagData } = useUISetting()

  const router = useRouter();
  const { messageEvent } = useMessageEvent()
  const { height, width } = useWindowDimensions()
  const calcHeight = height - (chatUser.role_id == ChatUserRole.PATIENT ? 70 : 0)

  const handleSignOut = () => {
    localStorage.clear();
    router.push("/test_signin");
  }

  const changedCollapseStatus = (status) => {
    updateCollapsedFlagData(2, status)
  }

  return (
    <UserSideWrapper style={{ height: calcHeight }} isReduceHeight={chatUser.role_id == ChatUserRole.PATIENT }>
      <div className="profile-wrapper">
        <div className="help-icon" style={ chatUser.role_id == ChatUserRole.PATIENT ? { marginRight: 25 } : { } }><Image layout="fixed" src="/assets/images/help.png" width={24} height={26} /></div>
        { chatUser.role_id != ChatUserRole.PATIENT&& <img className="avatar" src={chatUser.avatar ? chatUser.avatar : IMGS.avatarThumb} /> }
        <div className="collapse-wrapper">
          <CollapseExpand collapsed={collapsedFlags[2]} onChanged={changedCollapseStatus}/>
        </div>
      </div>

      <div className={"container " + chat_styled.scrollbar}>
        { (messageEvent.type == MessageEventType.COPY || messageEvent.type == MessageEventType.FORWARD)&& <div className="alarm">{ALARM_MESSAGE_COPY_USERS}</div> }
        <UserList title="My contacts" users={users} collapsed={collapsedFlags[2]} />

        { (chatUser.role_id == ChatUserRole.PROVIDER || chatUser.role_id == ChatUserRole.PATIENT)&&
          <UserList title="Facility directory" users={users} collapsed={collapsedFlags[2]} />
        }

        { chatUser.role_id != ChatUserRole.SCRIBE&& <div className="divider" /> }

        { (chatUser.role_id == ChatUserRole.PROVIDER)&&
          <>
            <div className="btn-wrapper">
              <button className="btn">Tables & Charts</button>
            </div>
            <div className="btn-wrapper">
              <button className="btn">Frequently used</button>
            </div>
            <div className="divider" />
          </>
        }

        { (chatUser.role_id == ChatUserRole.PATIENT)&&
          <div className="dependents">
            <div className="title">Dependents</div>
            <div className="list">
              { dependents.map((v, idx) => (
                <div key={idx} className="one">
                  <div className="name">{v.name}</div>
                  <SubAggregation
                    collapsed={collapsedFlags[2]}
                    urgent={v.urgent}
                    priority={v.priority}
                    followed={v.followed}
                    notification={v.notification}
                  />
                </div>
              )) }
            </div>
          </div>
        }

        { (chatUser.role_id == ChatUserRole.ASSISTANT)&&
          <>
            <div className="btn-wrapper">
              <button className="btn">Patient rooms</button>
            </div>
            <div className="btn-wrapper">
              <button className="btn">Staff rooms</button>
            </div>
            <div className="divider" />
          </>
        }

        {/*<div className="btn-wrapper">*/}
        {/*  <button className="btn">Private</button>*/}
        {/*</div>*/}
        {/*<div className="btn-wrapper">*/}
        {/*  <button className="btn">Public</button>*/}
        {/*</div>*/}

        {/*<div className="divider" />*/}
      </div>
    </UserSideWrapper>
  )
}
