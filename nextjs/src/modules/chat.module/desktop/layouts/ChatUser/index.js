import CollapseExpand from '../../../shared/components/CollapseExpnad'

import { useState, useEffect } from 'react'

import { useMessageEvent, useChatMetadata, useOtherUserList,
  useTopicList, useChatMessage, usePatientList } from '../../../../../redux/hooks/useChatStore'
import { useChatUser } from '../../../../../redux/hooks/useCommonStore'
import { useUISetting } from '../../../../../redux/hooks/useChatStore'

import { getTopicList } from '../../../shared/handleTopicList'
import { getRoomsWithMsgCnt } from '../../../../../common/lib/chat'
import {
  ALARM_MESSAGE_COPY_ROOMS,
  ChatUserRole,
  MenuCategory,
  MessageEventType,
  RoomType
} from '../../../shared/constants'
import { ArrowIcon_2 } from '../../../../../common/utils/Icons'
import { IMGS } from '../../../../../common/utils/styleGuide'
import {
  Wrapper,
} from './styled'
import {getSpreadListFromTreeIndexes, getTreeIndexesFromId} from "../../../shared/handleTreeList";

export default function ChatUser({
}) {
  const { messageEvent } = useMessageEvent()
  const { metaCategory, metaUser, metaOtherUser, metaRoom, metaTopic,
    commitMetaOtherUser, commitMetaRoom } = useChatMetadata()
  const { commitOtherUserList } = useOtherUserList()
  const { commitMessageList } = useChatMessage()
  const { topicList, commitTopicList } = useTopicList()
  const { commitPatientList } = usePatientList()
  const { collapsedFlags, updateCollapsedFlagData } = useUISetting()

  const { chatUser } = useChatUser()
  const [ isCollapse, setIsCollapse ] = useState(false)

  const clickPath = (path) => {
    if (path.type == 1) {
      // user
      if (chatUser.role_id == ChatUserRole.ASSISTANT)
      {
        commitOtherUserList([])
        commitTopicList([])
        commitMessageList([])
        commitMetaOtherUser(null)
        commitMetaRoom(null)

        getRoomsWithMsgCnt({ userId: metaUser.id, roleId: metaUser.roleId }).then(res => {
          if (!res || !res.success)
            return

          let list = []
          res.rooms.forEach(v => {
            if (v.roomType == RoomType.PROVIDER_TO_PATIENT) {
              list.push({
                id: v.userId,
                name: v.userName,
                roleId: ChatUserRole.PATIENT,
                email: v.userEmail,
                //userId: '',
                avatarUrl: v.userAvatarUrl,
                roomId: v.roomId,
                roomDescription: v.roomDescription,
                roomType: v.roomType,
                draftMessagesCount: v.draftMessagesCount,
                unreadMessagesCount: v.unreadMessagesCount,
                unreadUrgentMessagesCount: v.unreadUrgentMessagesCount,
                unreadPriorityMessagesCount: v.unreadPriorityMessagesCount,
                unreadFollowedMessagesCount: v.unreadFollowedMessagesCount,
                unreadMentionMessagesCount: v.unreadMentionMessagesCount,
              })
            }
          })

          commitPatientList([...list])
        })
      }
      else {
        commitTopicList([])
        commitMessageList([])

        getTopicList({ roomId: metaRoom.id, userId: chatUser.id, roleId: chatUser.role_id }).then(res => {
          if (!res)
            return

          commitTopicList(res)
        })
      }
    }
    else if (path.type == 2) {
      // other user
      if (chatUser.role_id != ChatUserRole.ASSISTANT)
        return

      commitTopicList([])
      commitMessageList([])

      getTopicList({ roomId: metaRoom.id, userId: chatUser.id, roleId: chatUser.role_id }).then(res => {
        if (!res)
          return

        commitTopicList(res)
      })
    }
    else if (path.type == 3) {
      // topic
    }
  }

  const changedCollapseStatus = (status) => {
    updateCollapsedFlagData(1, status)
  }

  const [pathList, setPathList] = useState([])

  const makePath = () => {
    let list = []
    if (metaUser) {
      list.push({
        type: 1, id: metaUser.id, name: metaUser.name
      })
    }

    if (metaOtherUser) {
      list.push({
        type: 2, id: metaOtherUser.id, name: metaOtherUser.name
      })
    }

    if (metaTopic && topicList.length > 0) {
      console.log(metaTopic)
      const indexes = getTreeIndexesFromId(topicList, 'id', metaTopic.id)
      const list1 = getSpreadListFromTreeIndexes(topicList, indexes, 0)
      list1.forEach(v => {
        list.push({
          type: 3, id: v.id, name: v.name
        })
      })
    }

    setPathList(list)
  }

  useEffect(() => {
    makePath()
  }, [metaUser, metaOtherUser, metaTopic])

  return (
    <Wrapper isReduceHeight={chatUser.role_id == ChatUserRole.PATIENT} collapsed={collapsedFlags[1]}>
      { (messageEvent.type != MessageEventType.COPY && messageEvent.type != MessageEventType.FORWARD)&& (
      <>
        <div className={ 'arrow-icon '+ (isCollapse ? 'reserve' : '') } onClick={ () => setIsCollapse(!isCollapse) }>
          <ArrowIcon_2   />
        </div>
        { (metaUser && chatUser.role_id != ChatUserRole.ASSISTANT && chatUser.role_id != ChatUserRole.STAFF)&&
          <img src={metaUser.avatar ? metaUser.avatar : IMGS.avatarThumb} className="avatar" />
        }
        <div className="path">
        { pathList.map((path, idx) => (
          <>
            { idx != 0&& <span><ArrowIcon_2 /></span> }
            <div key={idx} className="description link"
                 onClick={ () => clickPath(path) }
                 >{path.name}</div>
          </>
        )) }
        </div>
       </>
      ) }
      { (messageEvent.type == MessageEventType.FORWARD)&& (
        <div className="description1 alarm">{ALARM_MESSAGE_COPY_ROOMS}1</div>
      ) }
      { (messageEvent.type == MessageEventType.COPY)&& (
        <div className="description1 alarm">{ALARM_MESSAGE_COPY_ROOMS}</div>
      ) }
      <div className="collapse-wrapper">
        <CollapseExpand collapsed={collapsedFlags[1]} onChanged={changedCollapseStatus}/>
      </div>
    </Wrapper>
  )
}
