import Image from 'next/image'
import Modal from '../../../../../components/Modal'
import RadioBox from '../../../../../components/RadioBox'
import CheckBox from '../../../../../components/CheckBox'
import Select from '../../../shared/components/Select'
import TextField from '@mui/material/TextField';

import { Popover } from '@mui/material'
import { useState } from 'react'
import { format, parse } from 'date-fns'

import { ReminderSettingWrapper, Input, PopupWrapper } from './styled'
import { ICONS } from '../../../../../common/utils/styleGuide'
import { CalendarPicker } from '../../../../../components/CalendarPicker'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker'


const CustomPopover = ({ children, opened, anchorEl, handleClose, handleOk }) => {

  return (
    <Popover
      open={opened}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      style={{ marginTop: 10 }}
    >
      {children}
    </Popover>
  )
}
const ReminderSetting = ({ open, handleOk, handleClose }) => {
  const requiredClass = 'required'
  const [durationType, setDurationType] = useState()

  const [checkedDateTime, setCheckedDateTime] = useState(true)
  const [checkedDuration, setCheckedDuration] = useState(false)
  const [checkedRemindMe, setCheckedRemindMe] = useState(false)
  const [checkedRemindSender, setCheckedRemindSender] = useState(false)

  const [remindDate, setRemindDate] = useState(format(new Date(), 'MM/dd/yyyy'))
  const [remindTime, setRemindTime] = useState(format(new Date(), 'KK:mm b'))
  const [duration, setDuration] = useState('')
  const [note, setNote] = useState('')

  const [datePickerOptions, setDatePickerOptions] = useState({ opened: false, anchorEl: null })
  const [timePickerOptions, setTimePickerOptions] = useState({ opened: false, anchorEl: null })

  const [invalidRemindDate, setInvalidRemindDate] = useState(false)
  const [invalidRemindTime, setInvalidRemindTime] = useState(false)
  const [invalidDurationType, setInvalidDurationType] = useState(false)
  const [invalidDuration, setInvalidDuration] = useState(false)

  const durationTypes = [
    { id: 1, text: 'Minutes' },
    { id: 2, text: 'Hours' },
    { id: 3, text: 'Days' },
  ]

  const validation = () => {
    if (checkedDateTime) {

      if (remindDate == '') {
        setInvalidRemindDate(true)
        return false
      }
      else {
        setInvalidRemindDate(false)
      }

      if (remindTime == '') {
        setInvalidRemindTime(true)
        return false
      }
      else {
        setInvalidRemindTime(false)
      }
    }

    if (checkedDuration) {
      if (!durationType) {
        setInvalidDurationType(true)
        return false
      }
      else {
        setInvalidDurationType(false)
      }

      if (duration == '') {
        setInvalidDuration(true)
        return false
      }
      else {
        setInvalidDuration(false)
      }
    }

    return true
  }

  const done = () => {
    if (!validation())
      return

    handleOk({
      checkedDateTime,
      remindDate,
      remindTime,
      checkedDuration,
      durationType,
      duration,
      checkedRemindMe,
      checkedRemindSender,
      note
    })
  }

  return (
    <Modal isOpened={open}>
      <ReminderSettingWrapper>
        <div className="row">
          <RadioBox status={checkedDateTime} onClick={ () => {
            setCheckedDateTime(true)
            setCheckedDuration(false)
          } } />
          <div className={"input-wrapper " + (invalidRemindDate ? "required" : "")}
               onClick={ (e) => setDatePickerOptions({ opened: true, anchorEl: e.currentTarget }) }>
            <label className="input-label">Date</label>
            <Input type="phone" className="text" width={60} style={{ cursor: 'default' }} value={remindDate} readOnly />
            <span className="icon">
              <Image src={ICONS.calendar} width={15} height={15} />
            </span>
          </div>
          <div className={"input-wrapper " + (invalidRemindTime ? "required" : "")}
               onClick={ (e) => setTimePickerOptions({ opened: true, anchorEl: e.currentTarget }) }>
            <label className="input-label">Time</label>
            <Input type="phone" className="text" width={75} style={{ cursor: 'default' }} value={remindTime} readOnly />
          </div>
        </div>
        <div className="row">
          <RadioBox status={checkedDuration} onClick={ () => {
            setCheckedDuration(true)
            setCheckedDateTime(false)
          } } />
          <div className={"input-wrapper " + (invalidDurationType ? "required" : "")}>
            <label className="input-label">Select</label>
            <Select items={durationTypes}
                    value={durationType}
                    options={{ size: { width: 75, height: 50 }, color: '#5A585D' }}
                    onChange={(value) => setDurationType(value)} />
          </div>
          <div className={"input-wrapper " + (invalidDuration ? "required" : "")}>
            <label className="input-label">Duration</label>
            <Input type="phone" className="text" width={75} value={duration}
                   onChange={ (e) => {
                     if (isNaN(e.target.value)) {
                       setDuration('')
                       return
                     }

                     setDuration(e.target.value)
                   } } />
          </div>
        </div>
        <div className="row justify-end">
          <div className="check-label">Remind me</div>
          <CheckBox status={checkedRemindMe} onChange={ (checked) => { setCheckedRemindMe(checked) } }/>
        </div>
        <div className="row justify-end">
          <div className="check-label">Remind sender</div>
          <CheckBox status={checkedRemindSender} onChange={ (checked) => { setCheckedRemindSender(checked) } }/>
        </div>
        <div className="row">
          <div className="input-wrapper">
            <div className="input-label">Add note</div>
            <Input type="text" className="text" placeholder="" width={195}
              value={note} onChange={ (e) => setNote(e.target.value) }/>
          </div>
        </div>
        <div className="row btn-group justify-end">
          <button className="btn" onClick={handleClose}>Cancel</button>
          <button className="btn blue" onClick={done}>Done</button>
        </div>
      </ReminderSettingWrapper>
      <CustomPopover
        opened={datePickerOptions.opened}
        anchorEl={datePickerOptions.anchorEl}
        handleClose={ () => setDatePickerOptions({ opened: false, anchorEl: null }) }
      >
        <PopupWrapper>
          <CalendarPicker value={parse(remindDate, 'MM/dd/yyyy', new Date())}
          onSelected={(y, m, d) => setRemindDate(`${m.toString().padStart(2, '0')}/${d.toString().padStart(2, '0')}/${y}`)}
          onCancel={() => setDatePickerOptions({ opened: false, anchorEl: null })}></CalendarPicker>
        </PopupWrapper>
      </CustomPopover>
      <CustomPopover
        opened={timePickerOptions.opened}
        anchorEl={timePickerOptions.anchorEl}
        handleClose={ () => setTimePickerOptions({ opened: false, anchorEl: null }) }
      >
        <PopupWrapper>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticTimePicker
              displayStaticWrapperAs="desktop"
              value={parse(remindTime, 'KK:mm b', new Date())}
              onClose={ () => setTimePickerOptions({ opened: false, anchorEl: null }) }
              onChange={ (newTime) => console.log(newTime) }
              onAccept={ (newTime) => setRemindTime(format(newTime, 'KK:mm b')) }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

        </PopupWrapper>
      </CustomPopover>
    </Modal>
  )
}

export default ReminderSetting