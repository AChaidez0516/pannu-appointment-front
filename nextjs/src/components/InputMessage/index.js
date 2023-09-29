import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'

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
  EditorBox,
  InputMessageWrapper,
  Divider,
  Button,
} from './styled'

const SendKeyPress = {
  ENTER: 1,
  CTRL_ENTER: 2
}

const mentionPlugin = createMentionPlugin({
  mentionPrefix: '@',
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
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [pressKeyMode, setPressKeyMode] = useState(SendKeyPress.ENTER)

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const handleKeyBindingFn = (event) => {

    if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 13) {
      return pressKeyMode === SendKeyPress.ENTER ? 'split-block' : 'send_message'
    }
    else if (event.keyCode === 13){
      return pressKeyMode === SendKeyPress.ENTER ? 'send_message' : 'split-block'
    }

    return getDefaultKeyBinding(event)
  }

  const onChange = (editorState) => {
    setEditorState(editorState)
  }

  return (
    <InputMessageWrapper>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
        placeholder="Type your message.... "
        fontSize={14}
        keyBindingFn={handleKeyBindingFn}
        plugins={plugins}
      />
    </InputMessageWrapper>
  )
  //     { false&& <div className="overlay"></div> }
  //     <div className="topic-path">
  //       {topicPath.split(',').join(' > ')}
  //     </div>
  //     { (messageEvent.type != MessageEventType.COPY) ? (
  //       <>
  //         <div className="input-section">
  //           { (messageEvent.type == MessageEventType.FORWARD)&& (
  //             <ForwardBox />
  //           )}
  //           { (messageEvent.type == MessageEventType.REPLY)&&
  //             <>
  //               <div className="reply-box">
  //                 <span className="label">Reply To: </span>
  //                 <div className="name">{messageEvent.data.userName}</div>
  //               </div>
  //               <Divider />
  //             </>
  //           }
  //           <div className="box">
  //             <span className="label">Ref: {/*metadata ? metadata.ref : ''*/}</span>
  //           </div>
  //           <Divider />
  //           <EditorBox>
  //             { messageEvent.type == MessageEventType.AUDIO_RECORD ? (
  //               <AudioRecorder
  //                 onResult={ audioRecordEnd }
  //                 onCancel={ () => { commitMessageEvent(MessageEventType.NONE) } } />
  //             ) : (
  //               <>
  //                 <Editor
  //                   editorState={editorState}
  //                   handleKeyCommand={handleKeyCommand}
  //                   onChange={onChange}
  //                   placeholder="Type your message.... "
  //                   customStyleMap={styleMap}
  //                   fontSize={14}
  //                   keyBindingFn={handleKeyBindingFn}
  //                   plugins={plugins}
  //                 />
  //                 <MentionSuggestions
  //                   open={isMentionsOpen}
  //                   onOpenChange={setMentionsOpen}
  //                   onSearchChange={onSearchChange}
  //                   suggestions={suggestions}
  //                 />
  //               </>
  //
  //             ) }
  //           </EditorBox>
  //         </div>
  //         <div className="toolbar-section">
  //           <div className="tool-group">
  //             <button className="btn-tool" style={{ backgroundColor: (selectedPriority? 'gray' : 'transparent')}}
  //                     onClick={() => {
  //                       if (selectedUrgent)
  //                         setSelectedUrgent(false)
  //                       setSelectedPriority(!selectedPriority)
  //                     }}>
  //               <Image width="18" height="18" layout="fixed" src="/assets/images/svg/priority.svg" />
  //             </button>
  //             <button className="btn-tool" style={{ backgroundColor: (selectedUrgent? 'gray' : 'transparent'), display: 'inline-flex', marginTop: 5 }}
  //                     onClick={() => {
  //                       if (selectedPriority)
  //                         setSelectedPriority(false)
  //                       setSelectedUrgent(!selectedUrgent)
  //                     }}>
  //               <UrgentIcon_1 />
  //             </button>
  //             { messageEvent.type != MessageEventType.AUDIO_RECORD&& (
  //               <>
  //                 <button className="btn-tool" onClick={() => onHandleStyle('code-block')}>
  //                   <TextCodeIcon />
  //                 </button>
  //                 <button className="btn-tool" onClick={() => onHandleStyle('BOLD')}>
  //                   <TextBoldIcon />
  //                 </button>
  //                 <button className="btn-tool" onClick={() => onHandleStyle('ITALIC')}>
  //                   <TextItalicIcon />
  //                 </button>
  //                 <button className="btn-tool" onClick={() => onHandleStyle('FS1')}>
  //                   <TextSizeIcon />
  //                 </button>
  //                 <button className="btn-tool" onClick={() => onHandleStyle('unordered-list-item')}>
  //                   <TextBulletListIcon />
  //                 </button>
  //                 <button className="btn-tool" onClick={() => onHandleStyle('ordered-list-item')}>
  //                   <TextNumberListIcon />
  //                 </button>
  //                 <button className="btn-tool"
  //                         onClick={ () => setFileUploadPopupOptions({ opened: true, }) }>
  //                   <TextAttachTextIcon />
  //                 </button>
  //                 <button className="btn-tool">
  //                   <TextAttachImageIcon />
  //                 </button>
  //                 <button className="btn-tool" ref={audioRecordButton}
  //                         onClick={audioRecordStart}>
  //                   <AttachVoiceIcon />
  //                 </button>
  //                 <button className="btn-tool" ref={videoRecordButton}
  //                         onClick={ () => setVideoRecordPopupOptions({ opened: true }) }>
  //                   <AttachVideoIcon />
  //                 </button>
  //                 {/*<button className="btn-tool" onClick={onShare}>*/}
  //                 {/*  <ShareIcon />*/}
  //                 {/*</button>*/}
  //               </>
  //             ) }
  //
  //           </div>
  //           <div className="other-group">
  //             <div className="desc">
  //               <div>
  //               { pressKeyMode == SendKeyPress.CTRL_ENTER&& <><span className="border">Ctrl</span>+<span className="border">Enter</span></> }
  //               { pressKeyMode == SendKeyPress.ENTER&& <span className="border">Enter</span> }
  //               to send
  //               </div>
  //               <div className="icon" onClick={ () => setPressKeyMode(pressKeyMode == SendKeyPress.ENTER ? SendKeyPress.CTRL_ENTER : SendKeyPress.ENTER) }><ExchangeIcon /></div>
  //               <div>
  //               { pressKeyMode == SendKeyPress.CTRL_ENTER&& <span className="border">Enter</span> }
  //               { pressKeyMode == SendKeyPress.ENTER&& <><span className="border">Ctrl</span>+<span className="border">Enter</span></> }
  //                to add a new line
  //               </div>
  //             </div>
  //             <div className="btn-group">
  //             { (messageEvent.type == MessageEventType.FORWARD)&& (
  //                 <>
  //                   <Button onClick={handleCancel} className="bg-trans cl-black">Cancel</Button>
  //                   <Button onClick={handleForward} className="bg-trans cl-blue">Send</Button>
  //                 </>
  //               )
  //             }
  //               { (messageEvent.type == MessageEventType.AUDIO_RECORD)&& (
  //                 <>
  //                   <Button onClick={handleCancel} className="bg-trans cl-black">Cancel</Button>
  //                   <Button onClick={handleAudioFile} className="bg-trans cl-blue">Send</Button>
  //                 </>
  //               )
  //               }
  //             { (messageEvent.type == MessageEventType.EDIT || messageEvent.type == MessageEventType.REPLY)&& (
  //                 <>
  //                   <Button onClick={handleCancel} className="bg-trans cl-black">Cancel</Button>
  //                   <Button onClick={onSendMessage} className="bg-trans cl-blue">Ok</Button>
  //                 </>
  //               )
  //             }
  //             { (messageEvent.type == MessageEventType.NONE)&& (
  //                 <Button className="bg-red"
  //                         onClick={onSendMessage}>Send</Button>
  //               )
  //             }
  //             </div>
  //           </div>
  //         </div>
  //       </>
  //     ) : (
  //       <div className="toolbar-section col-1">
  //         <div className="other-group justify-end" >
  //           <Button onClick={handleCancel} className="bg-trans cl-black">Cancel</Button>
  //           <Button onClick={handlePaste}
  //                   className="bg-trans cl-blue">Paste</Button>
  //         </div>
  //       </div>
  //     ) }
  //
  //     <FileUpload opened={fileUploadPopupOptions.opened} onResult={attachedFile}
  //                 onCancel={ () => setFileUploadPopupOptions({ opened: false }) } />
  //     <VideoRecorder
  //       opened={videoRecordPopupOptions.opened}
  //       anchorEl={videoRecordButton.current}
  //       onClose={ () => setVideoRecordPopupOptions({ opened: false }) }
  //     />
  //
  //   </InputMessageWrapper>
  // )
}

export default InputMessage