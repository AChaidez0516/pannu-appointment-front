import Image from 'next/image'

import { format, parseISO } from 'date-fns'

import {
  OutIcon,
  EmailIcon,
  EmailOpenedIcon,
  UrgentIcon,
  TranscriptionIcon,
  StarIcon
} from '../../../../../common/utils/Icons'
import {
  MessageBody,
} from './styled'

import { MessageCategory } from '../../../shared/constants'
import { useChatUser, } from '../../../../../redux/hooks/useCommonStore'
import { parseContentMessage } from '../../../shared/handleMessageList'
import { ICONS, IMGS } from '../../../../../common/utils/styleGuide'

export default function SimpleMessageUser({ message, depth }) {
  const { chatUser } = useChatUser()
  const categoryList = message.category == '' ? [] : message.category.split(',')

  return (
    <MessageBody left={50*depth}>
      <div className={"wrapper" + ((message.createdBy != chatUser.id && !message.readAt)? ' mark' : '' )}>
        { depth > 0&& <div className="line"></div> }
        <div className="content">
          <div className="header">
            <div className="avatar"><img src={message.avatarUrl? message.avatarUrl : IMGS.avatarThumb} /></div>
            { (categoryList.length > 0 || message.followedAt)&&
              <div className="status">
                { message.followedAt&& <div><StarIcon width={12} height={12} /></div> }
                { categoryList.map((v, idx) => (
                  <div key={idx}>
                    { v == MessageCategory.URGENT&& <div className="urgent"><UrgentIcon width={12} height={12} /></div> }
                    { v == MessageCategory.PRIORITY&& <div><Image width="12" height="12" src="/assets/images/svg/priority.svg" layout="fixed" /></div> }
                  </div>
                )) }
              </div>
            }
          </div>
          <div className="body">
            <div className="summary-info">
              <div className="title">{message.userName}</div>
              <div className="info">
                <div className="status" style={{ marginRight: 20 }}>
                  { message.audioFileUrl&& <span><TranscriptionIcon /></span> }
                  { message.createdBy != chatUser.id&& (
                    <>
                      { message.readAt &&
                        <div className="date blue">{format(parseISO(message.readAt), 'hh:mm:ss aaa MM/dd/yyyy')}</div>
                      }
                      <span><OutIcon /></span>
                      { message.readAt ? (
                        <span className="read-icon"><EmailOpenedIcon /></span>
                      ) : (
                        <span className="read-icon" ><EmailIcon /></span>
                      )
                      }
                    </>
                  ) }
                  { message.createdAt &&
                    <div className="date">{format(parseISO(message.createdAt), 'hh:mm:ss aaa MM/dd/yyyy')}</div>
                  }
                </div>
              </div>
            </div>
            <div className="main-text">{parseContentMessage(message.content)}</div>
            <div className="extra-buttons">
              { false&& <button className="btn">Original text</button> }
              { message.audioFileUrl&& <button className="btn"><Image src={ICONS.mic} layout="fixed" width="12" height="12" />{message.audioFileName} {Math.ceil(message.audioFileSize / 100) / 10}Mb</button> }
              { false&& <button className="btn"><span><TranscriptionIcon width={12} height={9} /></span>11:50 pc 08/02/22.wav 1.2Mb</button> }
            </div>

            {/*<ShowMoreText*/}
            {/*  lines={3}*/}
            {/*  more="... More"*/}
            {/*  less="... Less"*/}
            {/*  className="content"*/}
            {/*  anchorClass="more-link"*/}
            {/*  expanded={false}*/}
            {/*  width={0}*/}
            {/*>*/}
            {/*  {message.content}*/}
            {/*</ShowMoreText>*/}
          </div>
        </div>
      </div>
    </MessageBody>
  )
}