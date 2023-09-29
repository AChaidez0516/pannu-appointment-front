import Image from 'next/image'

import AudioRecorder from '../Recorder/Audio'
import VideoRecorder from '../Recorder/Video'
import FileUpload from '../../modals/FileUpload'
import ForwardBox from '../ForwordBox'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid';

import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
  MentionData
} from "@draft-js-plugins/mention";
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
import { handleMultiFileUpload } from '../../../../../common/utils/handleMultiFileUpload'
import { editMessage, sendMessage, searchUsers } from '../../../../../common/lib/chat'
import { getTreeIndexesFromId, getSpreadListFromTreeIndexes } from '../../../shared/handleTreeList';
import { checkAudioDeviceStatus, speechToTextProc } from '../../../shared/handleMediaData';

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


const InputMessage = () => {
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

  const [recordedAudioData, setRecordedAudioData] = useState(null)

  const [videoRecordPopupOptions, setVideoRecordPopupOptions] = useState({ opened: false, })
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

  const onAddMention = () => {

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
      parentId: response.parentId
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

    /*try {
      if (chatUser.role_id == ChatUserRole.PROVIDER || chatUser.role_id == ChatUserRole.PATIENT) {
        if (selectedPriority)
          increaseAggregationData(AggregationType.PRIORITY)
        if (selectedUrgent)
          increaseAggregationData(AggregationType.URGENT)
      }
      else if (chatUser.role_id == ChatUserRole.ASSISTANT) {
        if (metaCategory == MenuCategory.PROVIDER_FOR_ASSISTANT) {
          if (selectedPriority)
            increaseAggregationData(AggregationType.PRIORITY)
          if (selectedUrgent)
            increaseAggregationData(AggregationType.URGENT)
        }
        else {
          if (selectedPriority)
            increaseAggregationOtherData(AggregationType.PRIORITY)
          if (selectedUrgent)
            increaseAggregationOtherData(AggregationType.URGENT)
        }
      }
    }
    catch (e) {
      console.log(e)
    }*/

    setEditorState(EditorState.moveFocusToEnd(EditorState.createEmpty()))

    commitLoadingStatus(false)

    commitMessageEvent(MessageEventType.NONE)

    document.dispatchEvent(new Event('scrollToEnd', {id: findId}))
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

  const [speechOptions, setSpeechOptions] = useState(null)
  const speechStart = async () => {
    const result = await checkAudioDeviceStatus()

    if (!result.status) {
      toast.error(result.message, ToastOptions)
      return
    }
    commitMessageEvent(MessageEventType.SPEECH_TO_TEXT)

    // http://52.14.132.244 https://trans.pannucorp.com
    let { audioRecorder, microphone, socket } = await speechToTextProc('https://trans.pannucorp.com', (text, commands) => {
      try {
        setEditorState(EditorState.createWithText(text))
        return
      }
      catch (e) {
        console.log(e)
      }
    })

    setSpeechOptions({ audioRecorder, microphone, socket })
  }

  const cancelSpeech = () => {
    commitMessageEvent(MessageEventType.NONE)

    if (!speechOptions)
      return

    let { audioRecorder, microphone, socket } = speechOptions

    microphone.stop()
    audioRecorder.stopRecording()
    socket.disconnect()
  }

  const audioRecordStart = async () => {
    const result = await checkAudioDeviceStatus()

    if (!result.status) {
      toast.error(result.message, ToastOptions)
      return
    }
    commitMessageEvent(MessageEventType.AUDIO_RECORD)

  }

  const audioRecordEnd = (data) => {
    setRecordedAudioData(data)
  }

  const handleAudioFile = async () => {
    if (!metaTopic || !metaTopic.id)
     return

    const file = new File([recordedAudioData.blob], uuidv4() + '.wav')
    const uploadResult = await handleMultiFileUpload([file])
    if (!uploadResult || uploadResult.length == 0)
    {
      commitLoadingStatus(false)
      commitMessageEvent(MessageEventType.NONE)
      return
    }

    // const url = "https://media-store813.s3.us-west-1.amazonaws.com/audio.wav"
    // const sampleRateHertz = 8000
    // const duration = 70
    // const fileSize = 1024
    // const fileName = 'test'

    const url = uploadResult[0]
    const sampleRateHertz = recordedAudioData.sampleRate
    const duration = recordedAudioData.duration
    const fileSize = file.size
    const fileName = file.name

    // const encoding = "LINEAR16"
    // const languageCode = 'en-US'
    const model = 'medical_conversation' //medical_dictation
    const type = 'wav'

    let parentId = null, categoryIds = []
    if (messageEvent && messageEvent.type == MessageEventType.REPLY)
    {
      parentId = messageEvent.data.id
    }

    if (selectedPriority) categoryIds.push(AggregationInit.priority.id)
    if (selectedUrgent) categoryIds.push(AggregationInit.urgent.id)

    let messageData = {
      content: null,
      parentId: parentId,
      topicId: metaTopic.id,
      categoryIds: categoryIds,
      createdBy: chatUser.id,
      roleId: chatUser.role_id,
      type: 2, // stream message

      audioFileUrl: url,
      audioFileName: fileName,
      audioFileType: type,
      audioFileSize: fileSize,
      audioHertz: sampleRateHertz,
      duration: duration,
      model: model,
    }

    let messageRes = await sendMessage(messageData)
    if (!messageRes || !messageRes.success) {
      commitLoadingStatus(false)
      commitMessageEvent(MessageEventType.NONE)
      return
    }

    // TODO: change with getMessages API
    let message = {
      id: messageRes.id,
      topicId: messageRes.topicId,
      parentId: messageRes.parentId
    }

    adjustMessageList(message)
  }

  return (
    <InputMessageWrapper>
      { metaTopic&& <div className="overlay"></div> }
      <div className="topic-path">{topicPath.split(',').join(' > ')}
      </div>
      { (messageEvent.type != MessageEventType.COPY) ? (
        <>
          <div className="input-section">
            { (messageEvent.type == MessageEventType.FORWARD)&& (
              <ForwardBox />
            )}
            { (messageEvent.type == MessageEventType.REPLY)&&
              <>
                <div className="reply-box">
                  <span className="label">Reply To: </span>
                  <div className="name">{messageEvent.data.userName}</div>
                </div>
                <Divider />
              </>
            }
            <div className="box">
              <span className="label">Ref: {/*metadata ? metadata.ref : ''*/}</span>
            </div>
            <Divider />
            <EditorBox>
              { messageEvent.type == MessageEventType.AUDIO_RECORD ? (
                <AudioRecorder
                  onResult={ audioRecordEnd }
                  onCancel={ () => { commitMessageEvent(MessageEventType.NONE) } } />
              ) : (
                <>
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
                </>

              ) }
            </EditorBox>
          </div>
          <div className="toolbar-section">
            <div className="tool-group">
              { (messageEvent.type != MessageEventType.AUDIO_RECORD && messageEvent.type != MessageEventType.SPEECH_TO_TEXT) &&
                <button className="btn-tool speech-icon"
                        style={{backgroundColor: (selectedUrgent ? 'gray' : 'transparent'), display: 'inline-flex'}}
                        onClick={speechStart}>
                  <SpeechIcon/>
                </button>
              }
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
              { (messageEvent.type != MessageEventType.AUDIO_RECORD && messageEvent.type != MessageEventType.SPEECH_TO_TEXT)&& (
                <>
                  <button className="btn-tool attach-icon">
                    <TextAttachImageIcon />
                  </button>
                  <button className="btn-tool record-icon" ref={audioRecordButton}
                          onClick={audioRecordStart}>
                    <AttachVoiceIcon />
                  </button>
                  <button className="btn-tool video-icon" ref={videoRecordButton}
                          onClick={ () => setVideoRecordPopupOptions({ opened: true }) }>
                    <AttachVideoIcon />
                  </button>
                  {/*<button className="btn-tool" onClick={onShare}>*/}
                  {/*  <ShareIcon />*/}
                  {/*</button>*/}
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
              { (messageEvent.type == MessageEventType.FORWARD)&& (
                  <>
                    <Button onClick={handleCancel} className="bg-trans cl-black">Cancel</Button>
                    <Button onClick={handleForward} className="bg-trans cl-blue">Send</Button>
                  </>
                )
              }
              { (messageEvent.type == MessageEventType.AUDIO_RECORD)&& (
                <>
                  <Button onClick={handleCancel} className="bg-trans cl-black">Cancel</Button>
                  <Button onClick={handleAudioFile} className="bg-trans cl-blue">Send</Button>
                </>
              ) }
              { (messageEvent.type == MessageEventType.SPEECH_TO_TEXT)&& (
                <>
                  <Button onClick={cancelSpeech} className="bg-trans cl-black">Cancel</Button>
                  <Button onClick={onSendMessage} className="bg-trans cl-blue">Ok</Button>
                </>
              ) }
              { (messageEvent.type == MessageEventType.EDIT || messageEvent.type == MessageEventType.REPLY)&& (
                  <>
                    <Button onClick={handleCancel} className="bg-trans cl-black">Cancel</Button>
                    <Button onClick={onSendMessage} className="bg-trans cl-blue">Ok</Button>
                  </>
                )
              }
              { (messageEvent.type == MessageEventType.NONE)&& (
                  <Button className="bg-red"
                          onClick={onSendMessage}>Send</Button>
                )
              }
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="toolbar-section col-1">
          <div className="other-group justify-end" >
            <Button onClick={handleCancel} className="bg-trans cl-black">Cancel</Button>
            <Button onClick={handlePaste}
                    className="bg-trans cl-blue">Paste</Button>
          </div>
        </div>
      ) }

      <FileUpload opened={fileUploadPopupOptions.opened} onResult={attachedFile}
                  onCancel={ () => setFileUploadPopupOptions({ opened: false }) } />
      <VideoRecorder
        opened={videoRecordPopupOptions.opened}
        anchorEl={videoRecordButton.current}
        onClose={ () => setVideoRecordPopupOptions({ opened: false }) }
      />

    </InputMessageWrapper>
  )
}

export default InputMessage