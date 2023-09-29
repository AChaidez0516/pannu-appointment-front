import CollapseExpand from '../../../shared/components/CollapseExpnad'

import { useChatUser } from '../../../../../redux/hooks/useCommonStore'
import { useUISetting } from '../../../../../redux/hooks/useChatStore'

import { ChatUserRole } from '../../../shared/constants'
import { ArrowIcon_1 } from '../../../../../common/utils/Icons'
import {
  ChatHeaderWrapper,
} from './styled'


export default function ChatHeader() {
  const { chatUser } = useChatUser()
  const { collapsedFlags, updateCollapsedFlagData } = useUISetting()
  const changedCollapseStatus = (status) => {
    updateCollapsedFlagData(0, status)
  }
  return (
    <>
      <ChatHeaderWrapper
        hasDivider={ chatUser.role_id != ChatUserRole.ASSISTANT && chatUser.role_id != ChatUserRole.PATIENT }
        isReduceHeight={chatUser.role_id == ChatUserRole.PATIENT }>
        { chatUser.role_id != ChatUserRole.PATIENT&&
          <>
            <div className="nav">
              <div className="icon"><ArrowIcon_1 /></div>
              <div className="icon reverse"><ArrowIcon_1 /></div>
            </div>

            <div className="title">Pannu Corp</div>
          </>
        }
        <div className="collapse-wrapper">
          <CollapseExpand collapsed={collapsedFlags[0]} onChanged={changedCollapseStatus}/>
        </div>
      </ChatHeaderWrapper>
    </>
  )
}
