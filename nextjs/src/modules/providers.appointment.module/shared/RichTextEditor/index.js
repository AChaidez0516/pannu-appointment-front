import { useState, } from 'react'
import Image from 'next/image'
import Editor from "@draft-js-plugins/editor";
import {
  EditorState, RichUtils, convertToRaw,
} from 'draft-js'
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/mention/lib/plugin.css";
import FileUpload from '../modals/FileUpload'
import {
  EditorBox,
  InputMessageWrapper,
  Button,
} from './styled'
import {
  SpeechIcon,
  TextAttachTextIcon,
  TextBoldIcon,
  TextBulletListIcon,
  TextCodeIcon,
  TextItalicIcon, TextNumberListIcon, TextSizeIcon,
  ThreeRectIcon,
  UrgentIcon_1,
} from '../../../../common/utils/Icons'
import { ActionBtn } from '../../../../components/ActionBtnWrapper';



const RichTextEditor = ({ newTitle, storeTextOnEditor }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [selectedPriority, setSelectedPriority] = useState(false)
  const [selectedUrgent, setSelectedUrgent] = useState(false)
  const [fileUploadPopupOptions, setFileUploadPopupOptions] = useState({ opened: false })


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

  const attachedFile = (res) => {
    // TODO: add upload API
  }

  const handleDone = () => {
    const contentState = editorState.getCurrentContent()
    if (!contentState.hasText())
      return
    const planeText = editorState.getCurrentContent().getPlainText('\u0001')

    /** will use store json data */
    // const rawContent = convertToRaw(contentState)
    storeTextOnEditor(newTitle, planeText)
  }

  return (
    <InputMessageWrapper>
      <div className="input-section">
        <EditorBox>
          <Editor
            editorState={editorState}
            onChange={onChange}
            fontSize={14}
          />
        </EditorBox>
      </div>
      <div className="toolbar-section">
        <div className="tool-group">
          <button className="btn-tool speech-icon" style={{ backgroundColor: (selectedUrgent ? 'gray' : 'transparent'), display: 'inline-flex' }}
            onClick={() => { }}>
            <SpeechIcon />
          </button>
          <button className="btn-tool" style={{ backgroundColor: (selectedPriority ? 'gray' : 'transparent') }}
            onClick={() => {
              if (selectedUrgent)
                setSelectedUrgent(false)
              setSelectedPriority(!selectedPriority)
            }}>
            <Image width="18" height="18" layout="fixed" src="/assets/images/svg/priority.svg" />
          </button>
          <button className="btn-tool" style={{ backgroundColor: (selectedUrgent ? 'gray' : 'transparent'), display: 'inline-flex', marginTop: 5 }}
            onClick={() => {
              if (selectedPriority)
                setSelectedPriority(false)
              setSelectedUrgent(!selectedUrgent)
            }}>
            <UrgentIcon_1 />
          </button>
          <button className="btn-tool" onClick={() => onHandleStyle('code-block')}>
            <TextCodeIcon />
          </button>
          <button className="btn-tool">
            <ThreeRectIcon />
          </button>
          <button className="btn-tool" onClick={() => onHandleStyle('BOLD')}>
            <TextBoldIcon />
          </button>
          {/* <button className="btn-tool" onClick={() => onHandleStyle('ITALIC')}>
              <TextItalicIcon />
            </button> */}
          {/* <button className="btn-tool" onClick={() => onHandleStyle('FS1')}>
              <TextSizeIcon />
            </button> */}
          {/* <button className="btn-tool" onClick={() => onHandleStyle('unordered-list-item')}>
            <TextBulletListIcon />
          </button>
          <button className="btn-tool" onClick={() => onHandleStyle('ordered-list-item')}>
            <TextNumberListIcon />
          </button>
          <button className="btn-tool"
            onClick={() => setFileUploadPopupOptions({ opened: true, })}>
            <TextAttachTextIcon />
          </button> */}
        </div>
        <div className="other-group">
          <div className="btn-group">
            <ActionBtn
              disabled={!editorState.getCurrentContent().hasText()}
              fontS={22}
              onClick={() => handleDone()}>Done</ActionBtn>
          </div>
        </div>
      </div>
      <FileUpload
        opened={fileUploadPopupOptions.opened}
        onResult={attachedFile}
        onCancel={() => setFileUploadPopupOptions({ opened: false })}
      />

    </InputMessageWrapper>
  )
}

export default RichTextEditor