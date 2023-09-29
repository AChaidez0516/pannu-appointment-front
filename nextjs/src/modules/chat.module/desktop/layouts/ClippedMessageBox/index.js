import SimpleMessage from '../Message/simple'

import { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useMessageEvent } from '../../../../../redux/hooks/useChatStore'

import { MessageEventType } from '../../../shared/constants'
import {
  ClippedMessageHeader,
  ClippedMessageWrapper,
  ClippedButtonWrapper
} from './styled'
import {
  DownloadIcon_1,
  PrintIcon_1,
} from '../../../../../common/utils/Icons'
import { getMessageList } from '../../../shared/handleMessageList'
import chat_styled from '../../../../../common/constant/chat.module.css'

const ClippedMessageBox = () => {
  const { commitMessageEvent } = useMessageEvent()

  const [clippedMessageList, setClippedMessageList] = useState([])

  useEffect(() => {
    getMessageList({ boundId: 0, count: 10 }).then(res => {
      if (!res)
        return

      setClippedMessageList([...res])
    })
  }, [])

  const onDragEnd = () => {

  }
  return (
    <>
      <ClippedMessageHeader>
        <div className="search-box">
          <input type="text" placeholder="Title of document" />
        </div>
        <div className="tool-box">
          <button className="btn"><PrintIcon_1 /></button>
          <button className="btn"><DownloadIcon_1 /></button>
        </div>
      </ClippedMessageHeader>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <ClippedMessageWrapper
              className={chat_styled.scrollbar}
              {...provided.droppableProps}
              ref={provided.innerRef} >
              { clippedMessageList.map((message, index) => (
                <Draggable key={message.id} draggableId={`${message.id}`} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>

                      <SimpleMessage key={index} message={message} />
                    </div>

                  )}
                </Draggable>
              )) }


              {/*{ clippedMessageList.map((message, index) => (*/}
              {/*  <SimpleMessage key={index} message={message} />*/}
              {/*)) }*/}
            </ClippedMessageWrapper>
          )}

        </Droppable>
      </DragDropContext>
      <ClippedButtonWrapper>
        <button onClick={() => commitMessageEvent(MessageEventType.NONE)} className="btn cl-black">Cancel</button>
        <button className="btn">Delete this clip</button>
        <button className="btn">Add more messages</button>
      </ClippedButtonWrapper>
    </>
  )
}

export default ClippedMessageBox