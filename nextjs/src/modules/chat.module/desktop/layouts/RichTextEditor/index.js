import Image from 'next/image'
import FileUpload from '../../modals/FileUpload'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid';

import Editor from "@draft-js-plugins/editor";
import createMentionPlugin from "@draft-js-plugins/mention";
import { EditorState, RichUtils, convertToRaw,
  convertFromRaw, ContentState, KeyBindingUtil, getDefaultKeyBinding } from 'draft-js'
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/mention/lib/plugin.css";
import mentionStyles from './mention.styles.module.css'

import {
  useChatMetadata,
  useMessageEvent,
  useAggregation,
  useTopicList,
  useChatMessage,
  useSocketMessage
} from '../../../../../redux/hooks/useChatStore'
import { useChatUser, useLoadingStatus } from '../../../../../redux/hooks/useCommonStore'
import { editMessage, getMessages, sendMessage, searchUsers } from '../../../../../common/lib/chat'
import { getTreeIndexesFromId, getSpreadListFromTreeIndexes } from '../../../shared/handleTreeList';

import {
  ChatUserRole,
  styleMap,
  MessageType,
  MessageEventType,
  ChatMode, MenuCategory, ToastOptions, AggregationInit, AggregationType
} from '../../../shared/constants'

import {
  EditorBox,
  InputMessageWrapper,
  Divider,
  Button,
} from './styled'
import {
  AttachVideoIcon,
  AttachVoiceIcon, ExchangeIcon, ShareIcon, SpeechIcon,
  TextAttachImageIcon, TextAttachTextIcon,
  TextBoldIcon,
  TextBulletListIcon,
  TextCodeIcon,
  TextItalicIcon, TextNumberListIcon, TextSizeIcon,
  UrgentIcon_1,
} from '../../../../../common/utils/Icons'
import { toast } from 'react-toastify'

const SendKeyPress = {
  ENTER: 1,
  CTRL_ENTER: 2
}

const mentionPlugin = createMentionPlugin({
  //mentionPrefix: '@',
  supportWhitespace: true,
  theme: mentionStyles,
  mentionComponent(mentionProps) {
    return (
      <span
        className={mentionProps.className}
        // eslint-disable-next-line no-alert
        onClick={() => console.log('Clicked on the Mention!')}>
        {mentionProps.children}
      </span>
    );
  }
});
const plugins = [mentionPlugin];
const { MentionSuggestions } = mentionPlugin;


const RichTextEditor = () => {
  const router = useRouter()
  const audioRecordButton = useRef(null)
  const videoRecordButton = useRef(null)

  const { chatUser } = useChatUser()
  const { metaTopic, metaMode, metaCategory } = useChatMetadata()
  const { messageList, addMessageData, editMessageData, replyMessageData, deleteMessageData } = useChatMessage()
  const { sendSocketMessage } = useSocketMessage()
  const { messageEvent, commitMessageEvent } = useMessageEvent()
  const { topicList, selectedTopicList, clearSelectedTopicData, deleteUnSelectedTopicData } = useTopicList()
  const { commitLoadingStatus } = useLoadingStatus()

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [selectedPriority, setSelectedPriority] = useState(false)
  const [selectedUrgent, setSelectedUrgent] = useState(false)
  const [pressKeyMode, setPressKeyMode] = useState(SendKeyPress.ENTER)
  const [fileUploadPopupOptions, setFileUploadPopupOptions] = useState({ opened: false })
  const [topicPath, setTopicPath] = useState('')
  const [isMentionsOpen, setMentionsOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([]);

  const onSearchChange = useCallback(({ value }) => {
    setMentionsOpen(true);

    searchUsers({ name: value }).then(res => {
      if (!res || !res.success)
        return

      let list = []
      res.users.forEach(v => list.push({
        id: v.id,
        name: v.name,
        avatar: v.avatarUrl
      }))

      setSuggestions(list)
    })

    // setTimeout(() => {
    //   setSuggestions(defaultSuggestionsFilter(value, mentions));
    // }, 500);
  }, []);

  useEffect(() => {
    getTopicNameList()
  }, [metaTopic])

  useEffect(() => {

    if (!messageEvent)
      return

    let content = ''
    if (messageEvent.type == MessageEventType.EDIT) {
      content = messageEvent.data.content
      try {
        const contentState = convertFromRaw(JSON.parse(content))
        setEditorState(EditorState.createWithContent(contentState))
        return
      }
      catch (e) {
        console.log(e)
      }
    }

    //setEditorState(EditorState.createEmpty())
  }, [messageEvent])

  const handleKeyCommand = (command) => {

    if (command == "send_message") {
      onSendMessage().catch(e => console.log(e))
      return "handled"
    }

    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const handleKeyBindingFn = (event) => {

    if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 13) {
      return pressKeyMode == SendKeyPress.ENTER ? 'split-block' : 'send_message'
    }
    else if (event.keyCode === 13){
      return pressKeyMode == SendKeyPress.ENTER ? 'send_message' : 'split-block'
    }

    return getDefaultKeyBinding(event)
  }

  const onChange = (editorState) => {
    setEditorState(editorState)
  }

  const onHandleStyle = (type) => {
    switch (type) {
      case 'BOLD':
        onChange(RichUtils.toggleInlineStyle(editorState, type))
        break
      case 'ITALIC':
        onChange(RichUtils.toggleInlineStyle(editorState, type))
        break
      case 'code-block':
        onChange(RichUtils.toggleBlockType(editorState, type))
        break
      case 'unordered-list-item':
        onChange(RichUtils.toggleBlockType(editorState, type))
        break
      case 'ordered-list-item':
        onChange(RichUtils.toggleBlockType(editorState, type))
        break
      case 'FS1':
        onChange(RichUtils.toggleInlineStyle(editorState, type))
    }
  }

  const getTopicNameList = () => {
    if (!metaTopic || !metaTopic.id) {
      setTopicPath('')
      return
    }

    const indexes = getTreeIndexesFromId(topicList, 'id', metaTopic.id)
    const list = getSpreadListFromTreeIndexes(topicList, indexes, 0)
    const nameList = []
    list.forEach(v => nameList.push(v.name))

    setTopicPath(nameList.join(','))
  }

  const onShare = () => {

  }

  const onSendMessage = async () => {
    if (!metaTopic || !chatUser)
      return

    if (!metaTopic.id && chatUser.role_id != ChatUserRole.SCRIBE)
      return

    const contentState = editorState.getCurrentContent()
    if (!contentState.hasText())
      return

    const rawContent = convertToRaw(contentState)
    const rawContentStr = JSON.stringify(rawContent)

    //let content = rawContent.blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n')
    let parentId = null

    if (messageEvent && messageEvent.type == MessageEventType.REPLY)
    {
      parentId = messageEvent.data.id
    }

    let categoryIds = []

    if (selectedPriority) categoryIds.push(AggregationInit.priority.id)
    if (selectedUrgent) categoryIds.push(AggregationInit.urgent.id)

    commitLoadingStatus(true)

    let reqData = {
      content: rawContentStr,
      parentId: parentId,
      topicId: metaTopic.id,
      categoryIds: categoryIds,
      createdBy: chatUser.id,
      roleId: chatUser.role_id,
      type: 2 // stream message
    }

    let response
    if (messageEvent.type == MessageEventType.EDIT)
    {
      //response = await editMessage(chatUser.id, messageEvent.data.id, rawContentStr)
    }
    else
    {
      response = await sendMessage(reqData)
    }

    if (!response || !response.success) {
      commitLoadingStatus(false)
      commitMessageEvent(MessageEventType.NONE)
      return
    }

    // TODO: change with getMessages API
    let message = {
      id: response.id,
      topicId: response.topicId,
      parentId: response.parentId,
      content: response.content,
      type: response.type,
      category: response.categoryIds.join(','),
      userName: chatUser.name,
      createdBy: response.createdBy,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      readAt: null,
      followedAt: null,
      path: (messageEvent.type == MessageEventType.NONE) ? topicPath : messageEvent.data.path,
      avatarUrl: chatUser.avatarUrl,
    }

    adjustMessageList(message)
  }

  const adjustMessageList = (message) => {
    let messageType = MessageType.NORMAL
    let findId = message.parentId
    if (messageEvent.type == MessageEventType.EDIT) {
      messageType = MessageType.EDIT
      findId = message.id
    }

    if (messageEvent.type == MessageEventType.REPLY) {
      messageType = MessageType.REPLY
      findId = message.parentId
    }

    if (messageEvent.type == MessageEventType.DELETE) {
      messageType = MessageType.DELETE
      findId = message.id
    }

    let socketMessage = {
      type: messageType,
      message: message
    }

    sendSocketMessage(socketMessage)

    let indexes = getTreeIndexesFromId(messageList, 'id', findId)
    switch (messageType) {
      case MessageType.NORMAL:
        addMessageData(message)
        break;
      case MessageType.EDIT:
        editMessageData(indexes, message)
        break;
      case MessageType.REPLY:
        replyMessageData(indexes, message)
        break;
      case MessageType.DELETE:
        deleteMessageData(indexes)
        break;
    }

    setEditorState(EditorState.moveFocusToEnd(EditorState.createEmpty()))

    commitLoadingStatus(false)
    commitMessageEvent(MessageEventType.NONE)
  }

  const handlePaste = () => {
    let list = []
    selectedTopicList.forEach(v => list.push(v.id))
    console.log(list)

    // TODO: add copy / page API later

  }

  const handleForward = () => {
    let list = []
    selectedTopicList.forEach(v => list.push(v.id))
    console.log(list)

    // TODO: add forward API later

  }

  const handleMove = () => {
    // TODO: add move API later

  }

  const handleCancel = () => {
    clearSelectedTopicData()
    commitMessageEvent(MessageEventType.NONE)
  }

  const attachedFile = (res) => {
    // TODO: add upload API
  }

  return (
    <InputMessageWrapper>
      <div className="input-section">
        <EditorBox>
          <Editor
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={onChange}
            placeholder="Type your message.... "
            customStyleMap={styleMap}
            fontSize={14}
            keyBindingFn={handleKeyBindingFn}
            plugins={plugins}
          />
          <MentionSuggestions
            open={isMentionsOpen}
            onOpenChange={setMentionsOpen}
            onSearchChange={onSearchChange}
            suggestions={suggestions}
          />
        </EditorBox>
      </div>
      <div className="toolbar-section">
        <div className="tool-group">
          <button className="btn-tool speech-icon" style={{ backgroundColor: (selectedUrgent? 'gray' : 'transparent'), display: 'inline-flex' }}
                  onClick={() => {}}>
            <SpeechIcon />
          </button>
          <button className="btn-tool" style={{ backgroundColor: (selectedPriority? 'gray' : 'transparent')}}
                  onClick={() => {
                    if (selectedUrgent)
                      setSelectedUrgent(false)
                    setSelectedPriority(!selectedPriority)
                  }}>
            <Image width="18" height="18" layout="fixed" src="/assets/images/svg/priority.svg" />
          </button>
          <button className="btn-tool" style={{ backgroundColor: (selectedUrgent? 'gray' : 'transparent'), display: 'inline-flex', marginTop: 5 }}
                  onClick={() => {
                    if (selectedPriority)
                      setSelectedPriority(false)
                    setSelectedUrgent(!selectedUrgent)
                  }}>
            <UrgentIcon_1 />
          </button>
          { messageEvent.type != MessageEventType.AUDIO_RECORD&& (
            <>
              <button className="btn-tool" onClick={() => onHandleStyle('code-block')}>
                <TextCodeIcon />
              </button>
              <button className="btn-tool" onClick={() => onHandleStyle('BOLD')}>
                <TextBoldIcon />
              </button>
              <button className="btn-tool" onClick={() => onHandleStyle('ITALIC')}>
                <TextItalicIcon />
              </button>
              <button className="btn-tool" onClick={() => onHandleStyle('FS1')}>
                <TextSizeIcon />
              </button>
              <button className="btn-tool" onClick={() => onHandleStyle('unordered-list-item')}>
                <TextBulletListIcon />
              </button>
              <button className="btn-tool" onClick={() => onHandleStyle('ordered-list-item')}>
                <TextNumberListIcon />
              </button>
              <button className="btn-tool"
                      onClick={ () => setFileUploadPopupOptions({ opened: true, }) }>
                <TextAttachTextIcon />
              </button>
            </>
          ) }

        </div>
        <div className="other-group">
          <div className="desc">
            <div>
              { pressKeyMode == SendKeyPress.CTRL_ENTER&& <><span className="border">Ctrl</span>+<span className="border">Enter</span></> }
              { pressKeyMode == SendKeyPress.ENTER&& <span className="border">Enter</span> }
              to send
            </div>
            <div className="icon" onClick={ () => setPressKeyMode(pressKeyMode == SendKeyPress.ENTER ? SendKeyPress.CTRL_ENTER : SendKeyPress.ENTER) }><ExchangeIcon /></div>
            <div>
              { pressKeyMode == SendKeyPress.CTRL_ENTER&& <span className="border">Enter</span> }
              { pressKeyMode == SendKeyPress.ENTER&& <><span className="border">Ctrl</span>+<span className="border">Enter</span></> }
              to add a new line
            </div>
          </div>
          <div className="btn-group">
            <Button className="bg-red"
                    onClick={onSendMessage}>Done</Button>
          </div>
        </div>
      </div>

      <FileUpload opened={fileUploadPopupOptions.opened} onResult={attachedFile}
                  onCancel={ () => setFileUploadPopupOptions({ opened: false }) } />

    </InputMessageWrapper>
  )
}

export default RichTextEditor