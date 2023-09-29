import Image from 'next/image'
import { useState } from 'react'
import { SelectWrapper, PopupWrapper } from './styled'
import { Popover } from '@mui/material'

const defaultOption = {
  size: {
    width: 70,
    height: 50,
  },
  marginTop: 0,
  color: '#000000'
}

const Select = (props) => {
  const { items, value, onChange, options = defaultOption } = props
  const [listPopupOption, setListPopupOption] = useState({ opened: false, anchorEl: null })
  const [selectedValue, setSelectedValue] = useState(value)

  const getText = (v) => {
    return items.find(t => t.id == v)?.text
  }
  return (
    <SelectWrapper width={options.size.width} height={options.size.height} color={options.color}>
      <div className="root"
        onClick={(e) => setListPopupOption({ opened: true, anchorEl: e.currentTarget })}>
        <div className="text">{getText(selectedValue)}</div>
        <div className={"select-icon " + (listPopupOption.opened ? "reverse" : "")}></div>
      </div>
      <Popover
        open={listPopupOption.opened}
        anchorEl={listPopupOption.anchorEl}
        onClose={() => setListPopupOption({ opened: false, anchorEl: null })}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <PopupWrapper width={options.size.width} color={options.color}>
          { items.map(data => <div key={data.id} className={"item " + (data.id == selectedValue ? "selected" : "")}
                                   onClick={() => {
                                     onChange(data.id)
                                     setSelectedValue(data.id)
                                     setListPopupOption({ opened: false, anchorEl: null })
                                   }}>{data.text}</div>) }

        </PopupWrapper>
      </Popover>
    </SelectWrapper>
  )
}

export default Select