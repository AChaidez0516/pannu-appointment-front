import Image from 'next/image'
//import ShowMoreText from 'react-show-more-text'
import MenuItems from '../MenuItems'

import { format, parseISO } from 'date-fns'
import { toast } from 'react-toastify'
import {
  OutIcon,
  EmailIcon,
  EmailOpenedIcon,
  UrgentIcon,
  TranscriptionIcon,
  StarIcon
} from '../../../../../common/utils/Icons'
import {
  MessageBody,
} from './styled'

import { MessageCategory, MessageEventType,
  ToastOptions, AggregationType } from '../../../shared/constants'
import { MESSAGES } from '../../../../../common/constant/global'
import { useMessageEvent, useChatMessage, useChatMetadata,
  useTopicList, useAggregation } from '../../../../../redux/hooks/useChatStore'
import { useChatUser, useLoadingStatus, } from '../../../../../redux/hooks/useCommonStore'
import { followMessage, readMessage, forwardToReceiver, forwardToOther } from '../../../../../common/lib/chat'
import { getTreeIndexesFromId } from '../../../shared/handleTreeList'
import { parseContentMessage } from '../../../shared/handleMessageList'
import { ICONS, IMGS } from '../../../../../common/utils/styleGuide';

export default function MessageUser({ message, depth }) {
  const { chatUser } = useChatUser()
  const { messageEvent, commitMessageEvent } = useMessageEvent()
  const { messageList, editMessageData, commitSearchedMessageList } = useChatMessage()
  const { topicList, commitSearchedTopicList } = useTopicList()
  const { increaseAggregationData, increaseAggregationOtherData } = useAggregation()
  const { commitLoadingStatus } = useLoadingStatus()

  const categoryList = message.category == '' ? [] : message.category.split(',')

  const follow = () => {
    commitLoadingStatus(true)

    followMessage(chatUser.id, message.id).then(res => {
      commitLoadingStatus(false)

      if (!res || !res.success) {
        toast.error(MESSAGES.server_error, ToastOptions)
        return
      }

      const data = JSON.parse(JSON.stringify(message))
      const indexes = getTreeIndexesFromId(messageList, 'id', message.id)
      data.followedAt = res.followedAt
      editMessageData(`${indexes}`, data)

      increaseAggregationData(AggregationType.FOLLOWED, 'notification')
    })
  }

  const markedReadStatus = () => {

    commitLoadingStatus(true)

    readMessage(chatUser.id, message.id).then(res => {
      commitLoadingStatus(false)

      if (!res || !res.success) {
        toast.error(MESSAGES.server_error, ToastOptions)
        return
      }

      const data = JSON.parse(JSON.stringify(message))
      const indexes = getTreeIndexesFromId(messageList, 'id', message.id)
      data.readAt = res.readAt
      editMessageData(`${indexes}`, data)
    })
  }

  const triggerMessageEvent = (type) => {
    commitMessageEvent(type, message)
  }

  const copy = () => {
    commitSearchedTopicList([])
    commitSearchedTopicList(topicList)
    commitSearchedMessageList([])
    triggerMessageEvent(MessageEventType.COPY)
  }

  const forward = () => {
    commitSearchedTopicList([])
    commitSearchedTopicList(topicList)
    triggerMessageEvent(MessageEventType.FORWARD)
  }

  const forward2Receiver = () => {
    commitLoadingStatus(true)

    forwardToReceiver({
      id: message.id, parentId: message.parentId,
      topicId: message.topicId, createdBy: chatUser.id,
      roleId: chatUser.role_id
    }).then(res => {
      commitLoadingStatus(false)

      if (!res || !res.success) {
        toast.error(MESSAGES.server_error, ToastOptions)
        return
      }
    })
  }

  // const forward2Assistant2 = () => {
  //   closeMenuPopup()
  //   commitLoadingStatus(true)
  //
  //   forwardToAssistant2({
  //     id: message.id, parentId: message.parentId,
  //     topicId: metaTopic.id, createdBy: message.createdBy,
  //     roleId: chatUser.role_id
  //   }).then(res => {
  //     commitLoadingStatus(false)
  //
  //     if (!res || !res.success) {
  //       toast.error(MESSAGES.server_error, ToastOptions)
  //       return
  //     }
  //   })
  // }

  const showMoreReply = (blockIdx) => {
    const blockList = getReplyBlockInfo()
    if (blockIdx > blockList.length - 1)
      return

    const block = blockList[blockIdx]
    const unreadMessages = []
    for (let i = 0; i < block.messages.length; i++) {
      let message = block.messages[i]
      if (unreadMessages.length > 0 && message.readAt)
        break

      if (!message.readAt)
        unreadMessages.push(message)
    }

    if (unreadMessages.length > 0) {
      unreadMessages.forEach(message => {
        const data = JSON.parse(JSON.stringify(message))
        const indexes = getTreeIndexesFromId(messageList, 'id', message.id)
        data.showed = true
        editMessageData(`${indexes}`, data)
      })
    }
    else {
      block.messages.forEach(message => {
        const data = JSON.parse(JSON.stringify(message))
        const indexes = getTreeIndexesFromId(messageList, 'id', message.id)
        data.showed = true
        editMessageData(`${indexes}`, data)
      })
    }
  }

  const getReplyBlockInfo = () => {
    let blockList = []
    if (message.children.length == 0)
      return blockList

    let blockIndex = 0
    blockList.push({ showed: true, messages: [message.children[0]] })
    let curBlock = blockList[blockIndex]
    for (let i = 1; i < message.children.length; i++) {
      const reply = message.children[i]
      if (reply.showed == curBlock.showed)
        curBlock.messages.push(reply)
      else {
        curBlock = { showed: reply.showed, messages: [] }
        curBlock.messages.push(reply)
        blockList.push(curBlock)
      }
    }
    return blockList
  }

  const showReplySection = () => {
    const blockList = getReplyBlockInfo()

    const lastBlock = blockList[blockList.length - 1]
    return (
      <div className={"ref " + (!lastBlock.showed ? 'more' : '')}>
        { blockList.map((block, idx) => (
          <>
            { (block.showed && block.messages.length > 0)&& block.messages.map(message => (
              <div key={message.id}>
                <MessageUser message={message} depth={depth + 1} />
              </div>
            ))
            }
            { (!block.showed && idx < blockList.length - 1)&&
              <div className="show-more" onClick={ () => showMoreReply(idx) }>More messages</div>
            }
            { (!block.showed && idx == blockList.length - 1)&&
              <div className="show-more" onClick={ () => showMoreReply(idx) }>View more messages</div>
            }
          </>
        )) }
      </div>
    )
  }

  const forward2Other = (selectedUserIds) => {

    if (selectedUserIds.length == 0)
      return

    const data = {
      id: message.id,
      parentId: message.parentId,
      topicId: message.topicId,
      createdBy: chatUser.id,
      roleId: chatUser.role_id,
      others: selectedUserIds
    }

    commitLoadingStatus(true)

    forwardToOther(data).then(res => {

      commitLoadingStatus(false)

      if (!res || !res) {
        toast.error(MESSAGES.server_error, ToastOptions)
        return
      }
    })
  }

  return (
    <MessageBody left={50*depth}>
      <div className={"wrapper" + ((message.createdBy != chatUser.id && !message.readAt)? ' mark' : '' )}>
        { depth > 0&& <div className="line"></div> }
        <div className="content">
          <div className="header">
            <div className="avatar"><img src={message.avatarUrl? message.avatarUrl : IMGS.avatarThumb} /></div>
            { (categoryList.length > 0 || message.followedAt)&&
              <div className="status">
                { message.followedAt&& <div><StarIcon width={12} height={12} /></div> }
                { categoryList.map((v, idx) => (
                  <div key={idx}>
                    { v == MessageCategory.URGENT&& <div className="urgent"><UrgentIcon width={12} height={12} /></div> }
                    { v == MessageCategory.PRIORITY&& <div><Image width="12" height="12" src="/assets/images/svg/priority.svg" layout="fixed" /></div> }
                  </div>
                )) }
              </div>
            }
          </div>
          <div className="body">
            <div className="summary-info">
              <div className="title">{message.userName}</div>
              <div className="info">
                <div className="status">
                  { message.audioFileUrl&& <span><TranscriptionIcon /></span> }
                  { message.createdBy != chatUser.id&& (
                    <>
                      { message.readAt &&
                        <div className="date blue">{format(parseISO(message.readAt), 'hh:mm:ss aaa MM/dd/yyyy')}</div>
                      }
                      <span><OutIcon /></span>
                      { message.readAt ? (
                        <span className="read-icon"><EmailOpenedIcon /></span>
                      ) : (
                        <span className="read-icon" onClick={markedReadStatus}><EmailIcon /></span>
                      )
                      }
                    </>
                  ) }

                  { message.createdAt &&
                    <div className="date">{format(parseISO(message.createdAt), 'hh:mm:ss aaa MM/dd/yyyy')}</div>
                  }
                </div>
                { (messageEvent.type != MessageEventType.COPY && messageEvent.type != MessageEventType.FORWARD) ?
                  (
                    <span className="menu-icon">
                      <MenuItems
                        message={message}
                        handleCopy={copy}
                        handleEdit={ () => { triggerMessageEvent(MessageEventType.EDIT) } }
                        handleReply = { () => { triggerMessageEvent(MessageEventType.REPLY) } }
                        handleForward={forward}
                        handleMove={ () => { triggerMessageEvent(MessageEventType.MOVE) } }
                        handleDelete={ () => { triggerMessageEvent(MessageEventType.DELETE) } }
                        handleFollow={follow}
                        handleReminder={ () => { triggerMessageEvent(MessageEventType.REMINDER) } }
                        handleLabels={ () => {  } }
                        handleReportAbuse={ () => {  } }
                        handleClip={ () => {  } }
                        handleForward2Receiver={forward2Receiver}
                        handleForward2Other={forward2Other}
                        handleSearchProvider={ () => {  } }
                      />
                    </span>
                  ) : (
                    <div>&nbsp;&nbsp;</div>
                  )
                }
              </div>
            </div>
            <div className="main-text">{parseContentMessage(message.content)}</div>
            <div className="extra-buttons">
              { false&& <button className="btn">Original text</button> }
              { message.audioFileUrl&& <button className="btn"><Image src={ICONS.mic} layout="fixed" width="12" height="12" />{message.audioFileName} {Math.ceil(message.audioFileSize / 100) / 10}Mb</button> }
              { false&& <button className="btn"><span><TranscriptionIcon width={12} height={9} /></span>11:50 pc 08/02/22.wav 1.2Mb</button> }
            </div>

            {/*<ShowMoreText*/}
            {/*  lines={3}*/}
            {/*  more="... More"*/}
            {/*  less="... Less"*/}
            {/*  className="content"*/}
            {/*  anchorClass="more-link"*/}
            {/*  expanded={false}*/}
            {/*  width={0}*/}
            {/*>*/}
            {/*  {message.content}*/}
            {/*</ShowMoreText>*/}
          </div>
        </div>
      </div>
      { (messageEvent.type != MessageEventType.COPY
          && message && message.children && message.children.length > 0)&&
        showReplySection()
      }
    </MessageBody>

  )
}