import dynamic from 'next/dynamic'
import InfiniteScroll from '../../../shared/components/InfiniteScrollView'
import ConfirmDelete from '../../modals/ConfirmDelete'

import chat_styled from '../../../../../common/constant/chat.module.css'

const Message = dynamic(() => import('../Message'), { ssr: false })
const ReminderSetting = dynamic(() => import('../../modals/ReminderSetting'), { ssr: false })

import { useRef, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import {
  useMessageEvent, useChatMetadata,
  useChatMessage, useSocketMessage, useSubscriberList
} from '../../../../../redux/hooks/useChatStore'
import { useLoadingStatus, useChatUser } from '../../../../../redux/hooks/useCommonStore'
import { getTreeIndexesFromId } from '../../../shared/handleTreeList'

import { getMessageList, getOldUnreadMessage, getLastUnreadMessage } from '../../../shared/handleMessageList'
import { getSubscribersOfRoom } from '../../../../../common/lib/chat'

import {
  ChatUserRole,
  MenuCategory,
  MessageEventType,
  MessageType,
  ResultStatus,
  ToastOptions,
  PerPageCount,
} from '../../../shared/constants'

import { MESSAGES } from '../../../../../common/constant/global'
import { MessageBoxWrapper } from './styled'
import { CircleDoubleArrowIcon, CircleSingleArrowIcon } from '../../../../../common/utils/Icons'

function MessageBox() {
  const { chatUser } = useChatUser()
  const { metaTopic, metaRoom, metaCategory } = useChatMetadata()
  const { messageEvent, commitMessageEvent } = useMessageEvent()
  const { commitLoadingStatus } = useLoadingStatus()
  const { messageList, prependMessageList, appendMessageList, addMessageData,
    deleteMessageData, replyMessageData, editMessageData, commitMessageList } = useChatMessage()
  const { commitSubscriberList } = useSubscriberList()

  const scrollbar = useRef(null)

  const [hasMorePrepend, setHasMorePrepend] = useState(true)
  const [hasMoreAppend, setHasMoreAppend] = useState(true)
  const [forceRefresh, setForceRefresh] = useState(false)
  const [focusedMessageId, setFocusedMessageId] = useState(0)

  const [showPrevPageButton, setShowPrevPageButton] = useState(false)
  const [showNextPageButton, setShowNextPageButton] = useState(false)
  const [showFirstPageButton, setShowFirstPageButton] = useState(false)
  const [showLastPageButton, setShowLastPageButton] = useState(false)

  const { sendSocketMessage } = useSocketMessage({
    onMessage: (message) => {

      if (!metaTopic) {
        return
      }

      if (message.data.message.createdBy == chatUser.id) {
        return
      }

      // TODO: check whether each other is on same topic in future.
      //if (metaTopic.id == message.data.message.topicId) {

        if (message.data.type == MessageType.NORMAL
          || message.data.type == MessageType.REPLY
          || message.data.type == MessageType.DELETE
          || message.data.type == MessageType.EDIT) {

          getMessages()
          /*handleOneReceivedMessage(message, () => {
            //scrollToBottom()
          })*/
        }
      // }
      // else {
      //
      // }
    }
  })

  const handleOneReceivedMessage = (message, callback) => {
    // normal, reply, edit, delete
    const adjustMessageList = async (message, callback) => {

      let findId = message.data.message.parentId
      if (message.data.type == MessageType.EDIT) {
        findId = message.data.message.id
      }

      if (message.data.type == MessageType.REPLY) {
        findId = message.data.message.parentId
      }

      if (message.data.type == MessageType.DELETE) {
        findId = message.data.message.id
      }

      let indexes = getTreeIndexesFromId(messageList, 'id', findId)
      switch (message.data.type) {
        case MessageType.NORMAL:
          addMessageData(message.data.message)
          break;
        case MessageType.EDIT:
          editMessageData(indexes, message.data.message)
          break;
        case MessageType.REPLY:
          replyMessageData(indexes, message.data.message)
          break;
        case MessageType.DELETE:
          deleteMessageData(indexes)
          break;
      }

      callback()
    }

    adjustMessageList(message, callback).catch(e => console.log(e))
  }

  const getMessages = () => {
    setFocusedMessageId(0)

    let data = {
      userId: chatUser.id,
      userRoleId: chatUser.role_id,
      topicId: metaTopic?.id,
      roomId: metaRoom?.id,
      boundId: 0,
      direction: 1,
      count: PerPageCount.MESSAGE
    }

    getMessageList(data).then(res => {
      if (!res)
        return

      commitMessageList(res)

      if (res.length > 0) {
        setFocusedMessageId(res[res.length - 1].id)
      }
      setForceRefresh(!forceRefresh)
    })

    setHasMorePrepend(true)

  }

  const getSubscribers = () => {
    getSubscribersOfRoom(chatUser.id, chatUser.role_id, metaRoom.id).then(res => {
      if (!res || !res.success)
        return

      let list = []
      res.users.forEach(user => {
        list.push({
          id: user.id,
          name: user.name,
          email: user.email,
          avatarUrl: user.avatarUrl
        })
      })

      commitSubscriberList(list)
    })
  }

  useEffect(() => {
    if (metaCategory != MenuCategory.SHOW_MESSAGE_OF_ROOM)
      return

    if (!metaRoom || !metaRoom.id) {
      return
    }

    getMessages()

  }, [metaRoom])

  useEffect(() => {
    if (metaCategory == MenuCategory.SHOW_MESSAGE_OF_ROOM)
      return

    if (!metaTopic || !metaTopic.id) {
      return
    }

    getMessages()

    if (chatUser.role_id == ChatUserRole.ASSISTANT)
      getSubscribers()

  }, [metaTopic])

  useEffect(() => {
    if (messageList.length == 0)
      return

    console.log('updated scroll view', focusedMessageId)
    // calculateScrollTop()
    setTimeout(calculateScrollTop, 500)

  }, [focusedMessageId])

  useEffect(() => {

    const bl = messageList.length > 0
    setShowPrevPageButton(bl)
    setShowNextPageButton(bl)
    setShowFirstPageButton(bl)
    setShowLastPageButton(bl)

  }, [messageList])

  useEffect(() => {
    document.addEventListener('scrollToEnd', (event) => {
      console.log("scrolling to end", event.id);
    } , false)
  }, [])

  const calculateScrollTop = () => {
    const el = document.getElementById(`message-${focusedMessageId}`)
    if (!el) {
      setTimeout(calculateScrollTop, 500)
      return
    }

    let offsetTop = el.offsetTop
    let delta = messageList.length < 20 ? scrollbar.current.clientHeight : scrollbar.current.clientHeight / 2
    const scrollTop = offsetTop == 0 ? 0 : offsetTop - delta

    console.log("calc scroll top", scrollbar.current.scrollHeight, scrollbar.current.clientHeight, scrollTop, focusedMessageId)

    scrollbar.current.scrollTop = scrollTop
  }

  const handleDelete = async () => {
    let message = messageEvent.data

    if (message && message.createdBy != chatUser.id)
    {
      commitMessageEvent(MessageEventType.NONE)
      return
    }

    commitLoadingStatus(true)

    //let res = await deleteMessage(chatUser.id, message.id)
    let res = false

    if (res && res.result == ResultStatus.SUCCESS) {

      let data = {
        type: MessageType.DELETE,
        topicId: metaTopic.id,
        messageId: message.id
      }

      sendSocketMessage(data)

      commitMessageEvent(MessageEventType.NONE)

      toast.success(MESSAGES.remove_data_success, ToastOptions)
    }
    else {
      commitMessageEvent(MessageEventType.NONE)
      toast.error(MESSAGES.server_error, ToastOptions)
    }

    commitLoadingStatus(false)
  }

  const handleReminder = (res) => {

  }

  const fetchAppendMessages = () => {

    if (messageList.length == 0)
      return

    if (!metaTopic || !metaTopic.id)
      return

    console.log('fetch more append message')
    let data = {
      userId: chatUser.id,
      userRoleId: chatUser.role_id,
      topicId: metaTopic.id,
      roomId: metaRoom.id,
      boundId: messageList[messageList.length - 1].id,
      direction: 1,
      count: PerPageCount.MESSAGE
    }

    getMessageList(data).then(res => {
      if (!res || res.length == 0) {
        setForceRefresh(!forceRefresh)
        return
      }

      if (messageList.length >= PerPageCount.MESSAGE * 2) {
        let new_ = messageList.filter((v, idx) => idx > PerPageCount.MESSAGE)
        commitMessageList([...new_, ...res])
      }
      else {
        appendMessageList(res)
      }

      setFocusedMessageId(res[0].id)
      setForceRefresh(!forceRefresh)
    })
  }

  const fetchPrependMessages = () => {
    if (messageList.length == 0)
      return

    if (!metaTopic || !metaTopic.id)
      return

    console.log('fetch more prepend message')
    let data = {
      userId: chatUser.id,
      userRoleId: chatUser.role_id,
      topicId: metaTopic.id,
      roomId: metaRoom.id,
      boundId: messageList[0].id,
      direction: 0,
      count: PerPageCount.MESSAGE
    }

    getMessageList(data).then(res => {
      if (!res || res.length == 0) {
        setForceRefresh(!forceRefresh)
        return
      }

      if (messageList.length >= PerPageCount.MESSAGE * 2) {
        let new_ = messageList.filter((v, idx) => idx < PerPageCount.MESSAGE)
        commitMessageList([...res, ...new_])
      }
      else {
        prependMessageList(res)
      }

      let focusedId = res[res.length - 1].id
      setFocusedMessageId(focusedId)
      setForceRefresh(!forceRefresh)
    })
  }

  const goPrependPage = () => {
    fetchPrependMessages()
  }

  const goAppendPage = () => {
    fetchAppendMessages()
  }

  const goOldUnreadPage = () => {
    getOldUnreadMessage({
      userId: chatUser.id,
      userRoleId: chatUser.role_id,
      topicId: metaTopic?.id,
      roomId: metaRoom.id,
      categoryId: undefined,
      isFollowed: undefined,
      createdBy: undefined,
      count: PerPageCount.MESSAGE
    }).then(res => {
      if (!res || res.length == 0)
        return

      commitMessageList(res)
    })
  }

  const goLastUnreadPage = () => {
    getLastUnreadMessage({
      userId: chatUser.id,
      userRoleId: chatUser.role_id,
      topicId: metaTopic?.id,
      roomId: metaRoom.id,
      categoryId: undefined,
      isFollowed: undefined,
      createdBy: undefined,
      count: PerPageCount.MESSAGE
    }).then(res => {
      if (!res || res.length == 0)
        return

      commitMessageList(res)
    })
  }

  return (
    <MessageBoxWrapper>
      <div className="nav-bar top">
        { showNextPageButton&& <div className="nav-icon" onClick={goPrependPage}><CircleSingleArrowIcon /></div> }
        { showLastPageButton&& <div className="nav-icon" onClick={goOldUnreadPage}><CircleDoubleArrowIcon /></div> }
      </div>
      <div className="nav-bar bottom">
        { showPrevPageButton&& <div className="nav-icon" onClick={goAppendPage}><CircleSingleArrowIcon /></div> }
        { showFirstPageButton&& <div className="nav-icon" onClick={goLastUnreadPage}><CircleDoubleArrowIcon /></div> }
      </div>
      <div id="target" ref={scrollbar} className={"container " + chat_styled.scrollbar}>
        <InfiniteScroll
          hasMorePrepend={hasMorePrepend}
          hasMoreAppend={hasMoreAppend}
          dataLength={messageList.length}
          prepend={fetchPrependMessages}
          append={fetchAppendMessages}
          forceRefresh={forceRefresh}
          // loader={<></>}
          // endMessage={
          //   <div className="no-message">No anymore message.</div>
          // }
          scrollableTarget="target"
          scrollThreshold="100px"
        >
          { messageList.map(function (data, idx) {
            return (
              <Message key={idx} index={idx} message={data} />
            )
          }) }
        </InfiniteScroll>
      </div>
      {/*<div style={{ marginBottom: 120 }} ref={messagesEndRef} />*/}
      <ConfirmDelete
        open={messageEvent.type == MessageEventType.DELETE}
        handleClose={ () => commitMessageEvent(MessageEventType.NONE) }
        handleOk={ () => handleDelete() }
      />
      <ReminderSetting open={messageEvent.type == MessageEventType.REMINDER}
                       handleClose={ () => commitMessageEvent(MessageEventType.NONE) }
                       handleOk={handleReminder}
      />
    </MessageBoxWrapper>
  )
}

export default MessageBox
