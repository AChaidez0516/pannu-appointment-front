import dynamic from "next/dynamic";
import styled, { css } from "styled-components";
import { ActionBtn } from "../../../../components/ActionBtnWrapper";
import { Box } from "../../../../components/buzz";
import InputBox from "../../../../components/InputBox";
import { EDITOR_TYPE } from "../shared/data";
import { SectionHeader } from "../shared/SectionHeader";
const TextEditor = dynamic(() => import('../shared/RichTextEditor'), { ssr: false })

export const RichTextEditor = ({
  editBox,
  setEditBox,
  newTitle,
  setNewTitle,
  title,
  onArrowBack,
  handleAddPreparation,
  handleAddInstruction,
}) => {

  const MINUS_HIEHT = (editBox.type === EDITOR_TYPE.PREPARATION || editBox.type === EDITOR_TYPE.INSTRUCTION) ? 290 : 230

  return (
    <div className="section">
      <SectionHeader
        title={title}
        onArrowBack={onArrowBack}
      />
      <RichTextWrapper minusHeight={MINUS_HIEHT}>
        <div className="header">
          <div className="editbox-title">{editBox.type.toLocaleLowerCase()}</div>
          <ActionBtn className="editbox-cancel" onClick={() => setEditBox({ type: '', show: false })}>Cancel</ActionBtn>
        </div>
        {(editBox.type === EDITOR_TYPE.PREPARATION || editBox.type === EDITOR_TYPE.INSTRUCTION) && (
          <Box my={12}>
            <InputBox
              caption="Title"
              style={{ width: '100%' }}
              value={newTitle}
              onChange={(v) => setNewTitle(v)}
            />
          </Box>
        )}
        <TextEditor
          newTitle={newTitle}
          storeTextOnEditor={() => { }}
        />
      </RichTextWrapper>
    </div>
  )
}

export const RichTextWrapper = styled.div`
  .editbox-header {
    margin: 10px;
    .editbox-cancel {
      cursor: pointer;
    }
  }
  .editbox-title {
    text-transform: capitalize;
  }
  .input-section {
    ${({ minusHeight }) => minusHeight && css`
      height: calc(100vh - ${minusHeight}px) !important;
    `}
  }
  .topic-path {
    height: 0 !important;
  }
  .speech-icon, .record-icon, .video-icon {
    display: none !important;
  }
  .header {
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
  }
 
`