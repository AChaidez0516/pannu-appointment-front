import dynamic from 'next/dynamic'

import MessageHeader from '../MessageHeader'
import Search from '../Search'
import chat_styled from '../../../../../common/constant/chat.module.css'
import useWindowDimensions from '../../../../../common/hooks/useWindowDimensions'
import MessageBox from '../MessageBox'
import GroupedMessageBox from '../GroupedMessageBox'
import ClippedMessageBox from '../ClippedMessageBox'

const Message = dynamic(() => import('../Message'), { ssr: false })
const InputMessage = dynamic(() => import('../InputMessage'), { ssr: false })

import { useChatUser } from '../../../../../redux/hooks/useCommonStore'
import { useMessageEvent } from '../../../../../redux/hooks/useChatStore'
import {
  ALARM_MESSAGE_COPY_MESSAGE, ChatUserRole, MessageEventType
} from '../../../shared/constants'
import { MainScreenWrapper, SearchBox } from './styled'

export default function MainScreen({
                                     fullScreenMode,
                                   }) {
  const { messageEvent } = useMessageEvent()
  const { chatUser } = useChatUser()

  const { height, width } = useWindowDimensions()
  const calcHeight = height - (chatUser.role_id == ChatUserRole.PATIENT ? 70 : 0)

  const searchMessage = (keyword) => {

  }
  return (
    <>
      <MainScreenWrapper
        isReduceHeight={chatUser.role_id === ChatUserRole.PATIENT }
        className={chat_styled.scrollbar_main + (messageEvent.type == MessageEventType.COPY ? " paste" : "")}
        style={{ height: calcHeight }}>
        { (messageEvent.type == MessageEventType.COPY)&& (
          <>
            <Message message={messageEvent.data} />
            <SearchBox>
              <div className="caption">Paste to</div>
              <Search onSearch={searchMessage} placeHolder="Search message" />
              <div className="alarm">{ALARM_MESSAGE_COPY_MESSAGE}</div>
            </SearchBox>
            <GroupedMessageBox />
            <InputMessage />
          </>
        ) }
        { (messageEvent.type == MessageEventType.SHOW_CLIP)&& (
          <ClippedMessageBox />
        ) }
        { (messageEvent.type != MessageEventType.COPY
          && messageEvent.type != MessageEventType.SHOW_CLIP)&& (
          <>
            <MessageHeader fullScreenMode={fullScreenMode} />
            <MessageBox  />
            <InputMessage />
          </>
        ) }

      </MainScreenWrapper>
    </>
  )
}
