import dynamic from 'next/dynamic'
import MainScreen from './layouts/MainScreen'
import ServerSide from './layouts/ServerSide'
import SubRoomList from './layouts/SubRoomList'
import UsersSide from './layouts/UsersSide'

const MovePopup = dynamic(() => import('./modals/MovePopup'), { ssr: false })

import useWindowDimensions from '../../../common/hooks/useWindowDimensions'
import HeaderBar from './layouts/HeaderBar'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useMessageEvent, useUISetting } from '../../../redux/hooks/useChatStore'
import { useChatUser } from '../../../redux/hooks/useCommonStore'

import { useWebSocket } from '../shared/hooks/useWebSocket';

import {
  ChatWrapper,
  MessageAppWrapper
} from './styled'
import { wsConnect } from '../../../redux/reducers/chat/actions'
import {
  MessageEventType,
  ChatUserRole,
} from '../shared/constants'


function Desktop() {
  const dispatch = useDispatch()
  const { chatUser } = useChatUser()
  const { messageEvent, commitMessageEvent } = useMessageEvent()
  const { collapsedFlags } = useUISetting()
  const { openSocket } = useWebSocket()

  const { height, width } = useWindowDimensions()
  const calcHeight = height - (chatUser.role_id == ChatUserRole.PATIENT ? 70 : 0)

  const [isFullScreen, setIsFullScreen] = useState(false)

  useEffect(() => {
    try {
      const host = `wss://${process.env.NEXT_PUBLIC_CHAT_SOCKET_URL}/chat/${chatUser.id}`
      dispatch(wsConnect(host))
      //openSocket(host)
    }
    catch (e) {
      console.log(e)
    }
  }, [])

  return (
    <>
      { chatUser&&
        <MessageAppWrapper>
          { chatUser.role_id == ChatUserRole.PATIENT&& <HeaderBar /> }
          <ChatWrapper
            collapsedFlags={collapsedFlags}
            fullScreen={isFullScreen}
            scribe={chatUser.role_id == ChatUserRole.SCRIBE}
            style={{ height: calcHeight }}>
            { !isFullScreen&& <ServerSide /> }
            { ( chatUser && chatUser.role_id != ChatUserRole.SCRIBE && !isFullScreen )&& <SubRoomList /> }
            <MainScreen
              fullScreenMode={() => setIsFullScreen(!isFullScreen)}
            />
            { !isFullScreen&& <UsersSide /> }
          </ChatWrapper>
          { (messageEvent.type == MessageEventType.MOVE)&& (
            <MovePopup open={ messageEvent.type == MessageEventType.MOVE } handleClose={() => commitMessageEvent(MessageEventType.NONE)} />
          ) }

        </MessageAppWrapper>
      }
    </>
  )
}

export default Desktop