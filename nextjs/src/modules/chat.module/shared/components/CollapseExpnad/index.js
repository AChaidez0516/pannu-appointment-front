import { useState, useEffect } from 'react'
import {
  CollapseExpandWrapper
} from './styled'
import { ArrowIcon_4 } from '../../../../../common/utils/Icons'

const CollapseExpand = ({ collapsed, onChanged }) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed)
  useEffect(() => {
    setIsCollapsed(collapsed)
  }, [collapsed])

  const collapseColumn = (status) => {
    if (isCollapsed === status)
      return

    setIsCollapsed(status)
    onChanged(status)
  }

  return (
    <CollapseExpandWrapper>
      <div onClick={() => collapseColumn(true)} className={`btn collapse ${!isCollapsed ? 'bg-blue wl justify-start' : 'bg-gray ws justify-center'}`}>
        <span className="icon">
          <ArrowIcon_4 color={`${!isCollapsed ? '#FFFFFF' : '#173FD4'}`} />
        </span>
      </div>
      <div onClick={() => collapseColumn(false)} className={`btn normal ${isCollapsed ? 'bg-blue wl justify-end' : 'bg-gray ws justify-center'}`}>
        <span className="icon reverse">
          <ArrowIcon_4 color={`${isCollapsed ? '#FFFFFF' : '#173FD4'}`} />
        </span>
      </div>
    </CollapseExpandWrapper>
  )
}
export default CollapseExpand