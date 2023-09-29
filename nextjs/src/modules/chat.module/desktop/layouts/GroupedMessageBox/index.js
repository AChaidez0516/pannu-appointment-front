import dynamic from 'next/dynamic'
import chat_styled from '../../../../../common/constant/chat.module.css'

const Message = dynamic(() => import('../Message'), { ssr: false })

import { toast } from 'react-toastify'

import { useMessageEvent, useChatMetadata, useChatMessage} from '../../../../../redux/hooks/useChatStore'
import { useLoadingStatus, useChatUser } from '../../../../../redux/hooks/useCommonStore'
import { getTreeIndexesFromIds } from '../../../shared/handleTreeList'
import { MessageEventType, MessageType, ResultStatus, ToastOptions } from '../../../shared/constants'
import { checkUnreadMsgCnt, deleteMessage, getOneMessage } from '../../../../../common/lib/chat'
import { MESSAGES } from '../../../../../common/constant/global'
import { GroupedMessageBoxWrapper } from './styled'

function MessageBox() {
  const { chatUser } = useChatUser()
  const { metaTopic } = useChatMetadata()
  const { messageEvent, commitMessageEvent } = useMessageEvent()
  const { commitLoadingStatus } = useLoadingStatus()
  const { searchedMessageList } = useChatMessage()

  return (
    <GroupedMessageBoxWrapper className={chat_styled.scrollbar} >
      {
        searchedMessageList.map(function (data, idx) {
          return (
            <Message
              key={idx}
              message={data}
            />
          )
        })
      }
    </GroupedMessageBoxWrapper>
  )
}

export default MessageBox
