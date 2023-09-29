import storage from 'redux-persist/lib/storage'

import { createSlice } from '@reduxjs/toolkit'
import { AggregationInit, MenuCategory, MessageEventType } from "../../modules/chat.module/shared/constants";
import { ChatMode, ColorTheme, ViewMode } from '../../modules/chat.module/shared/constants'

const initData = {
  ui: {
    background_theme: ColorTheme.WHITE,
    view_mode: ViewMode.NORMAL,
    collapsed_flags: { 0: false, 1: false, 2: false }
  },
  metadata: {
    topic: null,
    ref: '',
    chat_mode: ChatMode.PUBLIC,
    category: MenuCategory.NONE,
    user: null,
    other_user: null,
    room: null
  },
  receive_message: null,
  message_event_data: { type: MessageEventType.NONE, data: null },
  messages: [],
  searched_messages: [],
  aggregation: null,
  aggregation_other: null,
  rooms: [],
  providers: [],
  patients: [],
  topics: [],
  selected_topics: [],
  otherUsers: [],
  subscribers: []
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initData,

  reducers: {
    triggerMessageEvent: (state, action) => {
      state.message_event_data = action.payload
    },
    setChatMetadata: (state, action) => {
      state.metadata = { ...state.metadata, ...action.payload }
    },
    setMetaCategory: (state, action) => {
      state.metadata.category = action.payload
    },
    setMetaChatMode: (state, action) => {
      state.metadata.chat_mode = action.payload
    },
    setMetaUser: (state, action) => {
      state.metadata.user = action.payload
    },
    setMetaOtherUser: (state, action) => {
      state.metadata.other_user = action.payload
    },
    setMetaRoom: (state, action) => {
      state.metadata.room = action.payload
    },
    setMetaTopic: (state, action) => {
      state.metadata.topic = action.payload
    },

    setReceiveSocketMessage: (state, action) => {
      state.receive_message = action.payload
    },

    setMessageList: (state, action) => {
      state.messages = [...action.payload]
    },
    setSearchedMessageList: (state, action) => {
      state.searched_messages = [...action.payload]
    },
    appendMessages: (state, action) => {
      state.messages = [...state.messages, ...action.payload]
    },
    prependMessages: (state, action) => {
      state.messages = [...action.payload, ...state.messages]
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload]
    },

    replyMessage: (state, action) => {
      let indexList = action.payload.indexes.split('-')
      let strVar = `state.messages[${indexList[0]}]`
      for (let i = 1; i < indexList.length; i++) {
        if (indexList[i] == "")
          continue

        strVar += `.children[${indexList[i]}]`
      }

      strVar += ".children.push(action.payload.message)"

      eval(strVar)
    },
    editMessage: (state, action) => {
      let indexList = action.payload.indexes.split('-')
      let strVar = `state.messages[${indexList[0]}]`
      for (let k = 1; k < indexList.length; k++) {
        if (indexList[k] == "")
          continue
        strVar += `.children[${indexList[k]}]`
      }

      strVar += `=action.payload.message`
      eval(strVar)
    },
    deleteMessage: (state, action) => {
      let delIdx = -1, flg = false
      let indexList = action.payload.split('-')
      let strVar = `state.messages[${indexList[0]}]`
      delIdx = indexList[0]

      for (let j = 1; j < indexList.length; j++) {
        if (indexList[j] == "")
          continue

        flg = true
        if (j < indexList.length - 1 && indexList[j + 1] != "") {
          strVar += `.children[${indexList[j]}]`
        }
        else {
          strVar += '.children'
          delIdx = indexList[j];
        }
      }

      if (!flg) {
        strVar = 'state.messages'
      }

      strVar += `.splice(${delIdx}, 1)`
      eval(strVar)
    },
    setAggregation: (state, action) => {
      state.aggregation = action.payload
    },
    setAggregationOther: (state, action) => {
      state.aggregation_other = action.payload
    },
    increaseAggregation: (state, action) => {
      state.aggregation[action.payload.type][action.payload.key]++
    },
    increaseAggregationOther: (state, action) => {
      state.aggregation_other[action.payload.type][action.payload.key]++
    },
    decreaseAggregation: (state, action) => {
      state.aggregation[action.payload.type][action.payload.key]--
    },
    decreaseAggregationOther: (state, action) => {
      state.aggregation_other[action.payload.type][action.payload.key]--
    },
    updateAggregation: (state, action) => {

    },
    updateAggregationOther: (state, action) => {

    },
    setRoomList: (state, action) => {
      state.rooms = action.payload
    },
    setProviderList: (state, action) => {
      state.providers = action.payload
    },
    setPatientList: (state, action) => {
      state.patients = action.payload
    },
    setTopicList: (state, action) => {
      state.topics = action.payload
    },
    setSearchedTopicList: (state, action) => {
      state.searched_topics = action.payload
    },
    updateTopic: (state, action) => {
      let indexList = action.payload.indexes.split('-')
      let strVar = `state.topics[${indexList[0]}]`
      for (let k = 1; k < indexList.length; k++) {
        if (indexList[k] == "")
          continue
        strVar += `.children[${indexList[k]}]`
      }

      strVar += `=action.payload.topic`
      eval(strVar)
    },
    addSelectedTopic: (state, action) => {
      state.selected_topics.push(action.payload)
    },
    deleteUnSelectedTopic: (state, action) => {
      const new_ = state.selected_topics.filter(topic => topic.id != action.payload)
      state.selected_topics = new_
    },
    clearSelectedTopic: (state, action) => {
      state.selected_topics = []
    },
    setOtherUserList: (state, action) => {
      state.otherUsers = action.payload
    },
    setSubscriberList: (state, action) => {
      state.subscribers = action.payload
    },
    setBackgroundTheme: (state, action) => {
      state.ui.background_theme = action.payload
    },
    setViewMode: (state, action) => {
      state.ui.view_mode = action.payload
    },
    setCollapsedFlags: (state, action) => {
      state.ui.collpased_flags = action.payload
    },
    updateCollapsedFlag: (state, action) => {
      state.ui.collapsed_flags[action.payload.key] = action.payload.flag
    }
  }
})

export const selectMessageEvent = state => state.chat.message_event_data
export const selectAggregation = state => {
  return state.chat.aggregation? state.chat.aggregation : AggregationInit
}
export const selectAggregationOther = state => {
  return state.chat.aggregation_other? state.chat.aggregation_other : AggregationInit
}

export const selectMetadata = state => state.chat.metadata
export const selectMetaTopic = state => state.chat.metadata.topic
export const selectMetaChatMode = state => state.chat.metadata.chat_mode
export const selectMetaCategory = state => state.chat.metadata.category
export const selectMetaUser = state => state.chat.metadata.user
export const selectMetaOtherUser = state => state.chat.metadata.other_user
export const selectMetaRoom = state => state.chat.metadata.room

export const selectReceiveMessage = state => state.chat.receive_message
export const selectMessageList = state => state.chat.messages
export const selectSearchedMessageList = state => state.chat.searched_messages
export const selectRoomList = state => state.chat.rooms
export const selectProviderList = state => state.chat.providers
export const selectPatientList = state => state.chat.patients
export const selectTopicList = state => state.chat.topics
export const selectSearchedTopicList = state => state.chat.searched_topics
export const selectSelectedTopicList = state => state.chat.selected_topics
export const selectOtherUserList = state => state.chat.otherUsers
export const selectSubscriberList = state => state.chat.subscribers

export const selectViewMode = state => state.chat.ui.view_mode
export const selectBackgroundTheme = state => state.chat.ui.background_theme
export const selectCollapsedFlags = state => state.chat.ui.collapsed_flags

export const { triggerMessageEvent,
  setMessageList, addMessage, deleteMessage, editMessage, replyMessage,
  appendMessages, prependMessages, setSearchedMessageList,
  setAggregation, setAggregationOther, increaseAggregation, increaseAggregationOther,
  decreaseAggregation, decreaseAggregationOther, updateAggregation, updateAggregationOther,

  setRoomList, setProviderList, setPatientList,
  setOtherUserList, setSubscriberList,
  setTopicList, updateTopic, addSelectedTopic, deleteUnSelectedTopic, clearSelectedTopic, setSearchedTopicList,
  setReceiveSocketMessage,

  setChatMetadata, setMetaCategory, setMetaChatMode, setMetaUser, setMetaOtherUser, setMetaRoom, setMetaTopic,

  setBackgroundTheme, setViewMode, setCollapsedFlags, updateCollapsedFlag
} = chatSlice.actions

export const chatReducerConfig = {
  key: 'chat',
  storage: storage,
  blacklist: ['somethingTemporary']
}

export default chatSlice.reducer