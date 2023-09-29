import { useMessageEvent } from '../../../../../redux/hooks/useChatStore'
import { SearchIcon, MessageIcon, PhoneIcon, VideoIcon, ArrowIcon_2 } from '../../../../../common/utils/Icons'
import {
  Wrapper,
  Divider,
} from './styled'
import { MessageEventType } from '../../../shared/constants'

export default function UserList({ title, users, collapsed }) {
  const { messageEvent } = useMessageEvent()

  return (
      <>
        <Wrapper>
          <div className="row">
            <div className="title">{title}</div>
            { !collapsed&&
              <>
                <Divider />
                <div className="search-icon"><SearchIcon width={14} height={15} color="#000000" /></div>
              </>
            }
          </div>
          <div className="list">
            {users?.map(function (data, idx) {
              return (
                  <div className="one" key={idx}>
                    <div className="item" style={{ flex: '1 0 100px' }}>
                      {(messageEvent.type == MessageEventType.COPY || messageEvent.type == MessageEventType.FORWARD) ? (
                          <input type="checkbox" />
                      ) : data.isOnline ? (
                          <div className="online" />
                      ) : (
                          <div className="offline" />
                      )}
                      <div className="text">{data.name}</div>
                    </div>
                    { !collapsed&&
                      <div className="item">
                        <span className="icon">
                          <MessageIcon />
                        </span>
                          <span className="icon">
                          <PhoneIcon />
                        </span>
                          <span className="icon">
                          <VideoIcon />
                        </span>
                      </div>
                    }
                  </div>
              )
            })}
          </div>

          <div className="view-more">
            <div className="title">View more</div>
            <span className="icon">
              <ArrowIcon_2  />
            </span>
          </div>
        </Wrapper>
      </>
  )
}
