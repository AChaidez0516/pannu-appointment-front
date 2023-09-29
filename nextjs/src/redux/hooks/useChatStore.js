import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  triggerMessageEvent,
  setAggregation, setAggregationOther, increaseAggregation, increaseAggregationOther,
  decreaseAggregation, decreaseAggregationOther, updateAggregation, updateAggregationOther,
  setRoomList, setProviderList, setPatientList, setOtherUserList, setSubscriberList,
  setTopicList, updateTopic, addSelectedTopic, deleteUnSelectedTopic, clearSelectedTopic, setSearchedTopicList,
  setBackgroundTheme, setViewMode, setCollapsedFlags, updateCollapsedFlag,

  setChatMetadata, setMetaCategory, setMetaChatMode, setMetaUser, setMetaOtherUser, setMetaRoom, setMetaTopic,
  setMessageList, addMessage, replyMessage, editMessage, deleteMessage, appendMessages, prependMessages,
  setSearchedMessageList,
  selectReceiveMessage, selectMessageList, selectSearchedMessageList,

  selectMessageEvent, selectRoomList, selectProviderList, selectPatientList, selectSubscriberList,
  selectOtherUserList, selectTopicList, selectSelectedTopicList, selectSearchedTopicList,
  selectAggregation, selectAggregationOther,
  selectMetadata, selectMetaTopic, selectMetaChatMode,
  selectMetaCategory, selectMetaUser, selectMetaOtherUser, selectMetaRoom,

  selectBackgroundTheme, selectViewMode, selectCollapsedFlags,

  setReceiveSocketMessage

} from '../reducers/chatSlice'

import * as actions from '../reducers/chat/actions'

export function useMessageEvent() {
  const dispatch = useDispatch()
  const messageEvent = useSelector(selectMessageEvent)

  const commitMessageEvent = (type, message = null) => {
    dispatch(triggerMessageEvent({ type: type, data: message }))
  }

  return { messageEvent, commitMessageEvent }
}

export function useSocketMessage(callback = null) {
  const dispatch = useDispatch()
  const receivedMessage =  useSelector(selectReceiveMessage)

  const sendSocketMessage = (data) => {
    dispatch(actions.wsSendMessage(data))
  }

  useEffect(() => {
    if (!callback || !callback.onMessage)
      return
    if (!receivedMessage)
      return

    if (receivedMessage.signin)
      return

    if (receivedMessage.signout)
      return

    if (receivedMessage.life_signal)
      return

    if (receivedMessage.data === undefined)
      return

    callback.onMessage(receivedMessage)

  }, [receivedMessage])

  return { sendSocketMessage }
}

export function useChatMetadata() {
  const dispatch = useDispatch()
  const metadata = useSelector(selectMetadata)
  const metaTopic = useSelector(selectMetaTopic)
  const metaMode = useSelector(selectMetaChatMode)
  const metaCategory = useSelector(selectMetaCategory)
  const metaUser = useSelector(selectMetaUser)
  const metaOtherUser = useSelector(selectMetaOtherUser)
  const metaRoom = useSelector(selectMetaRoom)

  const commitChatMetadata = (data) => {
    dispatch(setChatMetadata(data))
  }

  const commitMetaCategory = (category) => {
    dispatch(setMetaCategory(category))
  }

  const commitMetaChatMode = (chatMode) => {
    dispatch(setMetaChatMode(chatMode))
  }

  const commitMetaUser = (user) => {
    dispatch(setMetaUser(user))
  }

  const commitMetaOtherUser = (otherUser) => {
    dispatch(setMetaOtherUser(otherUser))
  }

  const commitMetaRoom = (room) => {
    dispatch(setMetaRoom(room))
  }

  const commitMetaTopic = (topic) => {
    dispatch(setMetaTopic(topic))
  }

  return { metadata, metaTopic, metaMode, metaCategory, metaUser, metaOtherUser, metaRoom,
    commitChatMetadata, commitMetaCategory, commitMetaChatMode, commitMetaUser,
    commitMetaOtherUser, commitMetaRoom, commitMetaTopic }
}

export const useChatMessage = () => {
  const dispatch = useDispatch()
  const messageList = useSelector(selectMessageList)
  const searchedMessageList = useSelector(selectSearchedMessageList)

  const commitMessageList = (messages) => {
    dispatch(setMessageList(messages))
  }

  const commitSearchedMessageList = (messages) => {
    dispatch(setSearchedMessageList(messages))
  }

  const appendMessageList = (messages) => {
    dispatch(appendMessages(messages))
  }

  const prependMessageList = (messages) => {
    dispatch(prependMessages(messages))
  }

  const addMessageData = (message) => {
    dispatch(addMessage(message))
  }

  const editMessageData = (indexes, message) => {
    dispatch(editMessage({ indexes, message }))
  }

  const replyMessageData = (indexes, message) => {
    dispatch(replyMessage({ indexes, message }))
  }

  const deleteMessageData = (indexes) => {
    dispatch(deleteMessage(indexes))
  }

  return { messageList, searchedMessageList, commitMessageList, addMessageData,
    editMessageData, replyMessageData, deleteMessageData, appendMessageList, prependMessageList,
    commitSearchedMessageList }
}

export const useAggregation = () => {
  const dispatch = useDispatch()

  const aggregation = useSelector(selectAggregation)
  const aggregationOther = useSelector(selectAggregationOther)

  const commitAggregation = (aggregationData) => {
    dispatch(setAggregation(aggregationData))
  }
  const commitAggregationOther = (aggregationData) => {
    dispatch(setAggregationOther(aggregationData))
  }

  const increaseAggregationData = (type, key) => {
    dispatch(increaseAggregation({ type, key }))
  }
  const increaseAggregationOtherData = (type, key) => {
    dispatch(increaseAggregationOther({ type, key }))
  }

  const decreaseAggregationData = (type, key) => {
    dispatch(decreaseAggregation({ type, key }))
  }
  const decreaseAggregationOtherData = (type, key) => {
    dispatch(decreaseAggregationOther({ type, key }))
  }

  const updateAggregationData = (type, data) => {
    dispatch(updateAggregation({ type, data }))
  }

  const updateAggregationOtherData = (type, data) => {
    dispatch(updateAggregationOther({ type, data }))
  }

  return { aggregation, aggregationOther,
    commitAggregation, commitAggregationOther,
    increaseAggregationData, increaseAggregationOtherData,
    decreaseAggregationData, decreaseAggregationOtherData,
    updateAggregationData, updateAggregationOtherData,
  }
}

export const useRoomList = () => {
  const dispatch = useDispatch()

  const roomList = useSelector(selectRoomList)
  const commitRoomList = (rooms) => {
    dispatch(setRoomList(rooms))
  }

  return { roomList, commitRoomList }
}

export const useProviderList = () => {
  const dispatch = useDispatch()

  const providerList = useSelector(selectProviderList)
  const commitProviderList = (providers) => {
    dispatch(setProviderList(providers))
  }

  return { providerList, commitProviderList }

}

export const usePatientList = () => {
  const dispatch = useDispatch()

  const patientList = useSelector(selectPatientList)
  const commitPatientList = (patients) => {
    dispatch(setPatientList(patients))
  }

  return { patientList, commitPatientList }
}

export const useOtherUserList = () => {
  const dispatch = useDispatch()

  const otherUserList = useSelector(selectOtherUserList)
  const commitOtherUserList = (streams) => {
    dispatch(setOtherUserList(streams))
  }

  return { otherUserList, commitOtherUserList }
}

export const useSubscriberList = () => {
  const dispatch = useDispatch()

  const subscriberList = useSelector(selectSubscriberList)
  const commitSubscriberList = (subscribers) => {
    dispatch(setSubscriberList(subscribers))
  }

  return { subscriberList, commitSubscriberList }
}

export const useTopicList = () => {
  const dispatch = useDispatch()

  const topicList = useSelector(selectTopicList)
  const selectedTopicList = useSelector(selectSelectedTopicList)
  const searchedTopicList = useSelector(selectSearchedTopicList)

  const commitTopicList = (topics) => {
    dispatch(setTopicList(topics))
  }
  const commitSearchedTopicList = (topics) => {
    dispatch(setSearchedTopicList(topics))
  }
  const updateTopicData = (indexes, topic) => {
    dispatch(updateTopic({ indexes, topic }))
  }
  const addSelectedTopicData = (topic) => {
    dispatch(addSelectedTopic(topic))
  }
  const deleteUnSelectedTopicData = (topicId) => {
    dispatch(deleteUnSelectedTopic(topicId))
  }
  const clearSelectedTopicData = () => {
    dispatch(clearSelectedTopic())
  }

  return { topicList, selectedTopicList, searchedTopicList, commitTopicList, updateTopicData,
    addSelectedTopicData, deleteUnSelectedTopicData, clearSelectedTopicData, commitSearchedTopicList }
}

export const useUISetting = () => {
  const dispatch = useDispatch()

  const backgroundTheme = useSelector(selectBackgroundTheme)
  const viewMode = useSelector(selectViewMode)
  const collapsedFlags = useSelector(selectCollapsedFlags)

  const commitBackgroundTheme = (theme) => {
    dispatch(setBackgroundTheme(theme))
  }

  const commitViewMode = (mode) => {
    dispatch(setViewMode(mode))
  }

  const commitCollapsedFlags = (flags) => {
    dispatch(setCollapsedFlags(flags))
  }

  const updateCollapsedFlagData = (key, flag) => {
    dispatch(updateCollapsedFlag({ key, flag }))
  }

  return { backgroundTheme, viewMode, collapsedFlags,
    commitBackgroundTheme, commitViewMode, commitCollapsedFlags, updateCollapsedFlagData }
}

export default useMessageEvent