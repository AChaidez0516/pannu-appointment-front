import { useState, useEffect } from 'react'
import { Popover } from '@mui/material'
import { SelectWrapper, PopupWrapper } from './styled'

const defaultOption = {
  size: {
    width: 70,
    height: 50,
  },
  marginTop: 0,
  color: '#000000',
  borderWidth: 0,
  borderRadius: 0,
  borderColor: '#FFFFFF',
  fontSize: 12,
  labelFontSize: 12,
  itemFontSize: 14
}

const CustomSelect = (props) => {
  const { items, value, onChange, label } = props
  const [listPopupOption, setListPopupOption] = useState({ opened: false, anchorEl: null })
  const [selectedValue, setSelectedValue] = useState(value)
  const options = {
    ...defaultOption,
    ...props.options || {}
  }

  const getText = (v) => {
    return items.find(t => t.id == v)?.text
  }
  return (
    <SelectWrapper width={options.size.width} height={options.size.height} styles={options}>
      <div className="root"
        onClick={(e) => setListPopupOption({ opened: true, anchorEl: e.currentTarget })}>
        {
          label ? <div className="label">{label}</div>: <></>
        }
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
        <PopupWrapper width={options.size.width} styles={options} >
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

export default CustomSelect