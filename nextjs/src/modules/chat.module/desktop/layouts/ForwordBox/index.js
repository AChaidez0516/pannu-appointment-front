import { useEffect, useRef, useState } from 'react'

import { ForwardIcon, RemoveIcon } from '../../../../../common/utils/Icons'
import { parseContentMessage } from '../../../shared/handleMessageList'
import { useMessageEvent, useTopicList } from '../../../../../redux/hooks/useChatStore'
import { ForwardBoxWrapper } from './styled'
import useWindowDimensions from '../../../../../common/hooks/useWindowDimensions'
import {IMGS} from "../../../../../common/utils/styleGuide";
const ForwardBox = () => {
  const { width } = useWindowDimensions()

  const { messageEvent } = useMessageEvent()
  const { selectedTopicList, deleteUnSelectedTopicData } = useTopicList()

  const [showedTopicList, setShowedTopicList] = useState([])

  const tagContainerRef = useRef(null)
  const tagBoxRef = useRef(null)
  const tagBoxLabelRef = useRef(null)
  const showMoreRef = useRef(null)
  //const [containerRef, { width, height }] = useElementSize()

  const getTextWidth = (text) => {
    let font = "12px SF Pro Text";

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    context.font = font;
    let width = context.measureText(text).width;
    return Math.ceil(width)
  }

  const calculateTagWidth = (topic) => {
    const w = getTextWidth(topic.name);
    return w + 2 + 8 + 5 + 14 + 15;  // border, padding, gap, close button, extra
  }

  useEffect(() => {
    const leftSpace = tagBoxRef.current.clientWidth - (tagBoxLabelRef.current.clientWidth + tagContainerRef.current.clientWidth)

    if (showedTopicList.length < selectedTopicList.length) {
      const nextElWidth = calculateTagWidth(selectedTopicList[showedTopicList.length])
      if (leftSpace > nextElWidth)
        setShowedTopicList([...selectedTopicList])
    }
    else {
      setShowedTopicList([...selectedTopicList])
    }

  }, [selectedTopicList])

  useEffect(() => {
    let leftSpace = tagBoxRef.current.clientWidth - (tagBoxLabelRef.current.clientWidth + tagContainerRef.current.clientWidth)
    if (selectedTopicList.length > showedTopicList.length) {
      leftSpace -= showMoreRef.current.clientWidth
      const nextElWidth = calculateTagWidth(selectedTopicList[showedTopicList.length])
      if (leftSpace > nextElWidth) {
        setShowedTopicList([...showedTopicList, selectedTopicList[showedTopicList.length]])
        return
      }
    }

    if (leftSpace < 10)
    {
      showedTopicList.splice(showedTopicList.length - 1, 1)
      setShowedTopicList([...showedTopicList])
    }
  }, [width])

  const getForwardCount = () => {
    return selectedTopicList.length
  }

  const removeForwardItem = (id) => {
    // TODO: update later
    deleteUnSelectedTopicData(id)
  }

  return (
    <ForwardBoxWrapper>
      <div className="forwarded-message-box">
        <div className="mark">
          <span className="num">+{getForwardCount()}</span>
          <span className="icon"><ForwardIcon /></span>
        </div>
        <div className="avatar"><img src={ messageEvent.data.avatarUrl || IMGS.avatarThumb } /></div>
        <div className="message">
          <div className="name">{messageEvent.data.userName}</div>
          <div className="content">
            {parseContentMessage(messageEvent.data.content)}
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className="tag-box" ref={tagBoxRef}>
        <span className="label" ref={tagBoxLabelRef}>Forward To: </span>
        <div className="container" ref={tagContainerRef}>
          { showedTopicList.map(topic => <div className="tag">{topic.name}<span onClick={ () => removeForwardItem(topic.id) } className="icon"><RemoveIcon /></span></div>) }
          { selectedTopicList.length > showedTopicList.length&& <div className="more" ref={showMoreRef}>+{selectedTopicList.length - showedTopicList.length}</div> }
        </div>
      </div>
      <div className="divider" />
    </ForwardBoxWrapper>
  )
}

export default ForwardBox