import SubAggregation from '../SubAggregation';

import { useUISetting } from '../../../../../redux/hooks/useChatStore'
import { SearchIcon, SortByTextIcon, SortByTimeIcon, PlusIcon } from '../../../../../common/utils/Icons'

import {
  RoomsWrapper,
  Divider,
} from './styled'

function Rooms({
  title,
  rooms,
  handleClick,
  handleSortText,
  handleSortTime,
  handleAdd,
  handleSearch,
  handleShowAllMessage,
  hasAggregate,
  marginTop })
{
  const { collapsedFlags } = useUISetting()

  return (
    <>
      <RoomsWrapper style={{ marginTop: marginTop }}>
        <div className="title">
          <div className="text">{title}</div>
          { !collapsedFlags[0]&& (
            <>
              <Divider />
              { handleSearch&& <span className="icon"><SearchIcon /></span> }
              { handleSortText&& <span className="icon"><SortByTextIcon /></span> }
              { handleSortTime&& <span className="icon"><SortByTimeIcon /></span> }
              { handleAdd&& <span className="icon"><PlusIcon /></span> }
            </>
          ) }

        </div>
        <div className="content">
          { rooms?.map((data, idx) => (
            <div key={idx} className="one" onClick={ () => {handleClick(data)} }>
              <div className="text">{data.name}</div>
              { (!collapsedFlags[0] && handleShowAllMessage)&& <div onClick={ (e) => {
                e.stopPropagation()
                handleShowAllMessage(data)
              }} className="show">Show</div> }
              { hasAggregate&&
                <SubAggregation
                  collapsed={collapsedFlags[0]}
                  notification={data.notification}
                  urgent={data.urgent}
                  priority={data.priority}
                  followed={data.followed}
                />
              }
            </div>
          )) }
        </div>
      </RoomsWrapper>
    </>
  )
}

export default Rooms