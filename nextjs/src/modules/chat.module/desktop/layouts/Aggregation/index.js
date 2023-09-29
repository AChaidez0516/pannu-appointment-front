import Image from 'next/image'

import { useEffect } from 'react'
import { useChatUser } from '../../../../../redux/hooks/useCommonStore'
import { useAggregation, useChatMessage, useChatMetadata, useTopicList,
  useOtherUserList, useUISetting }
  from '../../../../../redux/hooks/useChatStore'
import { getRoomsWithMsgCnt, getAggregationMessagesCount } from '../../../../../common/lib/chat'
import { EditIcon_1, UrgentIcon, StarIcon, TranscriptionIcon } from '../../../../../common/utils/Icons'
import {
  AggregationInit,
  AggregationType,
  AggregationTypeListByRole,
  ChatUserRole,
  MenuCategory,
} from '../../../shared/constants'
import { ICONS } from '../../../../../common/utils/styleGuide'

import {
  AggregationWrapper
} from './styled'
import SubAggregation from '../SubAggregation'

export default function Aggregation({
  kind,
  title,
}) {

  const { chatUser } = useChatUser()
  const { commitMetaCategory, commitMetaUser, commitMetaTopic, commitMetaRoom, commitMetaOtherUser } = useChatMetadata()
  const { commitMessageList } = useChatMessage()
  const { aggregation, aggregationOther,
    commitAggregation, commitAggregationOther,} = useAggregation()
  const { commitOtherUserList } = useOtherUserList()
  const { commitTopicList } = useTopicList()
  const { collapsedFlags } = useUISetting()

  useEffect(() => {
    initData()
    getAggregationData()
  }, [])

  const initData = () => {
    // filter aggregation data by user role.
    let t = null
    for (let roleName in ChatUserRole) {
      if (ChatUserRole[roleName] == chatUser.role_id) {
        t = AggregationTypeListByRole[roleName.toLowerCase()]

        break;
      }
    }

    if (t) {
      let data = {}
      t.forEach(type => {
        data[type] = AggregationInit[type]
      })
      commitAggregationOther(data)
      commitAggregation(data)
    }
    else {
      console.log('no owned aggregate type list...')
      commitAggregationOther(AggregationInit)
      commitAggregation(AggregationInit)
    }
  }

  const getAggregationData = () => {
    if (!chatUser)
      return

    // filter aggregation type by role.
    let t = null
    for (let roleName in ChatUserRole) {
      if (ChatUserRole[roleName] == chatUser.role_id) {
        t = AggregationTypeListByRole[roleName.toLowerCase()]

        break;
      }
    }

    let data = {}
    if (t) {
      t.forEach(type => {
        data[type] = AggregationInit[type]
      })
    }
    else {
      data = AggregationInit
    }

    getAggregationMessagesCount(chatUser.id, chatUser.role_id, data).then(res => {
      if (!res)
        return

      Object.keys(res).forEach(key => {
        if (!res[key] || !res[key].success)
          return

        const notification = res[key].unreadMessagesCount
        const urgent = res[key].unreadUrgentMessagesCount
        const priority = res[key].unreadPriorityMessagesCount
        data[key] = { ...data[key], urgent, priority, notification }
      })

      if (kind == 0)
        commitAggregation(data)
      else
        commitAggregationOther(data)
    })
  }

  const selectedAggregate = (categoryId) => {
    let data = {
      userId: chatUser.id,
      roleId: chatUser.role_id,
      categoryId: chatUser.categoryId,
    }

    getRoomsWithMsgCnt(data).then(res => {
      if (!res || !res.success)
        return

      let list = []
      res.rooms.forEach(v => list.push({
        id: v.userId,
        name: v.userName + `(${v.roomType})`,
        roleId: ChatUserRole.PROVIDER,
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
      }))

      commitOtherUserList(list)
    })

    commitMessageList([])
    commitTopicList([])
    commitOtherUserList([])
    commitMetaUser(null)
    commitMetaOtherUser(null)
    commitMetaRoom(null)
    commitMetaCategory(MenuCategory.AGGREGATE_MESSAGE)
    commitMetaTopic(null)
  }

  const getDisplayedAggregation = () => {
    return kind == 0? aggregation : aggregationOther
  }

  const getAggregationValue = (type, key) => {
    const data = getDisplayedAggregation()
    return data[type][key]
  }

  return (
    <AggregationWrapper>
      { (chatUser.role_id == ChatUserRole.PROVIDER || chatUser.role_id == ChatUserRole.STAFF
          || chatUser.role_id == ChatUserRole.ASSISTANT ) &&
        <div className="title">
          <div className="text">{title}</div>
          { !collapsedFlags[0]&&<div className="divider"></div> }
        </div>
      }
      <div className="list">
        { Object.keys(getDisplayedAggregation()).map((type, idx) => (
          <div className="one" key={idx} onClick={() => selectedAggregate(getAggregationValue(type, 'id'))}>
            <div className="sub-wrapper">
              {!collapsedFlags[0]&&
                <div className="icon">
                  { getAggregationValue(type, 'hasIcon')&&
                    <>
                      { (type == AggregationType.DRAFT) && (
                        <EditIcon_1 />
                      ) }
                      { (type == AggregationType.URGENT) && (
                        <UrgentIcon />
                      ) }
                      { (type == AggregationType.PRIORITY) && (
                        <Image width="18" height="18" layout="fixed" src="/assets/images/svg/priority.svg" />
                      ) }
                      { (type == AggregationType.FOLLOWED) && (
                        <StarIcon />
                      ) }
                      { (type == AggregationType.MENTION) && (
                        <Image width={18} height={18} layout="fixed" src={ICONS.mention} />
                      ) }
                      { (type == AggregationType.DIRECT_MESSAGE) && (
                        <Image width={18} height={18} layout="fixed" src={ICONS.message} />
                      ) }
                      { (type == AggregationType.TRANSCRIPTION) && (
                        <Image width={17} height={14} layout="fixed" src={ICONS.transcription} />
                      ) }
                    </>
                  }
                </div>
              }
              <div className="text">{getAggregationValue(type, 'title')}</div>
            </div>
            <SubAggregation
              collapsed={collapsedFlags[0]}
              urgent={getAggregationValue(type, 'urgent')}
              priority={getAggregationValue(type, 'priority')}
              followed={getAggregationValue(type, 'followed')}
              notification={getAggregationValue(type, 'notification')}
            />
          </div>
        )) }
      </div>
    </AggregationWrapper>
  )
}
