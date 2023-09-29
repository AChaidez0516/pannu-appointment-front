import dynamic from 'next/dynamic'

import ChatUser from '../ChatUser'
import useWindowDimensions from '../../../../../common/hooks/useWindowDimensions'

import chat_styled from '../../../../../common/constant/chat.module.css'

const Search = dynamic(() => import('../Search'), { ssr: false })
const StreamTopicList = dynamic(() => import('../StreamTopicList'), { ssr: false })

import { useMessageEvent, useChatMetadata } from '../../../../../redux/hooks/useChatStore'
import { useChatUser } from '../../../../../redux/hooks/useCommonStore'

import { ChatUserRole, SubRooms } from '../../../shared/constants'
import {
  SubRoomListWrapper,
} from './styled'
import { MessageEventType } from '../../../shared/constants'

function SubRoomList() {

  const { chatUser } = useChatUser()
  const { messageEvent } = useMessageEvent()
  const { metaUser } = useChatMetadata()
  const { height, width } = useWindowDimensions()
  const calcHeight = height - (chatUser.role_id == ChatUserRole.PATIENT ? 70 : 0)

  const searchRoom = (keyword) => {

  }
  return (
    <>
      <SubRoomListWrapper style={{ height: calcHeight }} isReduceHeight={chatUser.role_id == ChatUserRole.PATIENT }>
        <ChatUser />
        <div className={chat_styled.scrollbar} style={{ padding: '10px 0' }}>
          { (messageEvent.type == MessageEventType.COPY || messageEvent.type == MessageEventType.FORWARD)&& <Search onSearch={searchRoom} placeHolder="Search rooms" showOptions={true} /> }
          { (chatUser && (chatUser.role_id != ChatUserRole.ASSISTANT
            && chatUser.role_id != ChatUserRole.PATIENT
            && metaUser))&& (
            <div className="wrapper">
              { SubRooms&& SubRooms.map(item => {
                if (messageEvent.type == MessageEventType.COPY || messageEvent.type == MessageEventType.FORWARD)
                  return (
                    <div className="check-wrapper" key={item.id}>
                      <input type="checkbox" />
                      <div className={ 'title ' + (item.type == 1? 'subject' : '') }>{item.name}</div>
                    </div>
                  )
                else
                  return (
                    <div className={ 'title ' + (item.type == 1? 'subject' : '') } key={item.id}>{item.name}</div>
                  )
              })}
            </div>
          )}
          <StreamTopicList />
        </div>
      </SubRoomListWrapper>
    </>
  )
}

export default SubRoomList