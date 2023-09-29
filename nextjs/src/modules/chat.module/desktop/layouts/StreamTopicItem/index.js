import Image from 'next/image'

import { useMessageEvent } from '../../../../../redux/hooks/useChatStore'
import { MessageEventType } from '../../../shared/constants'

import {
  Wrapper,
} from './styled'

import { StarIcon, UrgentIcon_2 } from '../../../../../common/utils/Icons'
import { useTopicList } from '../../../../../redux/hooks/useChatStore'
import SubAggregation from "../SubAggregation";

export default function StreamTopicItem({
  collapsed,
  itemData,
  onChecked,
  onClicked,

}) {
  const { selectedTopicList } = useTopicList()
  const { messageEvent } = useMessageEvent()
  const hasChild = itemData.children ? itemData.children.length > 0 : false

  return (
    <>
      <Wrapper>
        <div className="container">
          {(!hasChild && (messageEvent.type == MessageEventType.COPY || messageEvent.type == MessageEventType.FORWARD))&&
            <input type="checkbox" style={{ marginLeft: -17 }}
                   checked={ selectedTopicList.find(v => v.id == itemData.id) ? true : false }
                   onChange={ (e) => onChecked(itemData.id, e.target.checked) }  />}
          <span className="title" onClick={ () => {onClicked(itemData)} }>{itemData.name}</span>
        </div>
        { (messageEvent.type != MessageEventType.COPY && messageEvent.type != MessageEventType.FORWARD) && (
          <div className="container">
            <SubAggregation
              collapsed={collapsed}
              urgent={itemData.urgentCount}
              priority={itemData.priorityCount}
              followed={itemData.follwedCount}
              notification={itemData.unreadCount}
            />
          </div>
        ) }
      </Wrapper>
    </>
  )
}