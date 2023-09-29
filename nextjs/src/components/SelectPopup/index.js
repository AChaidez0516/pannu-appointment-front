import { useState } from 'react'
import { Popover } from '@mui/material'
import { SelectWrapper, PopupWrapper } from './styled'
import SelectPopupModal from "../modals/SelectPopupModal";
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css';

const defaultOption = {
  size: {
    width: 70,
    height: 50,
  },
  maxHeight: 200,
  marginTop: 0,
  color: '#000000',
  borderWidth: 1,
  borderRadius: 5,
  borderColor: '#FFFFFF',
  fontSize: 14,
  labelFontSize: 12,
  itemFontSize: 16
}

const SelectPopup = (props) => {
  const {
    items,
    value,
    onChange,
    label,
    hideDropDownIcon,
    disabled,
    handleSelectDateOption,
    fixedLabel
  } = props
  const [listPopupOption, setListPopupOption] = useState({ opened: false, anchorEl: null })
  const [selectedValue, setSelectedValue] = useState(value)
  const options = {
    ...defaultOption,
    ...props?.options || {}
  }

  const getText = (v) => {
    if (items && items.length > 0 && items[0].text ){
      return items.find(t => t.id == v)?.text
    }
     if (items && items.length > 0 && items[0].title){
      return items.find(t => t.id == v)?.title
    }

  }

  const handleClickPopup = (e) => {
    if (disabled) {
      return
    }
    if (label === 'W/M/D') {
      handleSelectDateOption(false)
    }
    setListPopupOption({ opened: true, anchorEl: e.target })
  }

  return (
    <SelectWrapper isdisabled={disabled} width={options.size.width} height={options.size.height} styles={options}>
      <div className="root" name="datetime"
        onClick={(e) => handleClickPopup(e)}>
        {label ? <div className="label">{label}</div> : <></>}
        <div className="text">{fixedLabel || getText(value)}</div>
        {!hideDropDownIcon && <div className={"select-icon " + (listPopupOption.opened ? "reverse" : "")}></div>}
      </div>
      <SelectPopupModal
        onClose={() => setListPopupOption({ opened: false, anchorEl: null })}
        show={listPopupOption.opened}
        items={[]}
        isConformButton={true}
        isConfirmDisabled={!selectedValue}
        handleConfirm={() => onChange(selectedValue)}
        handleCancel={() => { }}
      >
        <SimpleBar style={{ maxHeight: options.maxHeight }}>
          <PopupWrapper width={options.size.width} styles={options} >
            {items && items.map(data =>
              <div
                key={data.id}
                className={"item " + (data.id == selectedValue ? "selected" : "")}
                onClick={() => setSelectedValue(data.id) }>
                {data.text ? data.text : data.title }
              </div>
            )}
          </PopupWrapper>
        </SimpleBar>

      </SelectPopupModal>
    </SelectWrapper>
  )
}

export default SelectPopup