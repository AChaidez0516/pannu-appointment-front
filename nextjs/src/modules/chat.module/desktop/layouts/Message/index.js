import MessageUser from '../MessageUser'

import { useState, useEffect, useRef } from 'react'

import {
  MessageWrapper,
  } from './styled'
import useWindowDimensions from '../../../../../common/hooks/useWindowDimensions'

function Message({
  index, message
}) {
  const { width } = useWindowDimensions()

  const isNewMessage = false
  const bl = true
  const categoryWrapperRef = useRef(null)
  const rootCategoryWrapperRef = useRef(null)
  const [subTopicText, setSubTopicText] = useState('')

  const getRootTopicText = () => {
    if (!message.path)
      return ''

    const list = message.path.split(",")
    return list[0]
  }

  const getTextWidth = (text) => {
    let font = "12px SF Pro Text";

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    context.font = font;
    let width = context.measureText(text).width;
    return Math.ceil(width)
  }

  const getSubTopicText = () => {
    if (!message.path)
      return ''

    const list = message.path.split(',')
    if (list.length == 1)
      return ''

    const new_ = list.filter((v, idx) => idx != 0)
    /*let new_ = []

    for (let i = 0;  i < 20; i++)
      new_.push(list[1])*/

    let availableWidth = categoryWrapperRef.current.clientWidth - rootCategoryWrapperRef.current.clientWidth - 10

    let txt = new_.join(' > ')
    if (availableWidth > txt)
      return new_.join(' > ')
    else {
      let s = 0
      let txt = ''
      availableWidth -= getTextWidth(new_[new_.length - 1])

      let new1_ = new_.filter((v, idx) => idx < new_.length - 1)
      for (let i = 0; i < new1_.length; i++) {
        let t = new1_[i] + ' > '
        let st = '... > '
        s += getTextWidth(t + st)
        if (s >= availableWidth)
        {
          txt += st
          break
        }
        else
          txt += t
      }

      txt += new_[new_.length - 1]
      return txt
    }
  }

  useEffect(() => {
    const text = getSubTopicText()
    setSubTopicText(text)
  }, [])

  useEffect(() => {
    const text = getSubTopicText()
    setSubTopicText(text)
  }, [width])

  return (
    <MessageWrapper id={`message-${message.id}`}>
      { isNewMessage&&
        <div className="divider-wrapper">
          <div className="divider" />
          {/* <Date>Feb 21,2021 to Mar 21,2021</Date> */}
          {/* <Divider /> */}
        </div>
      }

      <div className={"message-box" + (bl ? ' red' : ' blue') + (index == 0 ? ' first' : '')}>
        <div className={"category-wrapper " + (bl ? 'light-red' : 'light-blue') } ref={categoryWrapperRef}>
          <div className={"category " + (bl ? 'red' : 'blue')} ref={rootCategoryWrapperRef}>
            <div className="text">{getRootTopicText()}</div>
          </div>
          <div className="un-category">
            <div className="text">{subTopicText}</div>
          </div>
        </div>

        <MessageUser
          message={message}
          depth={0}
        />

      </div>
    </MessageWrapper>
  )
}

export default Message
