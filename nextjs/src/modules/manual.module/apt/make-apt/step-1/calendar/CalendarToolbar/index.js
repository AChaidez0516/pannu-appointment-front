import { useState, useEffect } from 'react'
import Popover from '@mui/material/Popover'
import moment from 'moment'
import { CalendarPicker } from '../../../../../../../components/CalendarPicker'
import { ToolbarWrapper, PopoverWrapper } from './styled'

const CustomPopover = ({ children, open, onClose, anchorEl }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      style={{ marginTop: 10 }}
    >
      {children}
    </Popover>
  )
}

const CalendarToolbar = ({ startDate, endDate, handleChangeStartDate }) => {
  const [calendarPopupOptions, setCalendarPopupOptions] = useState({ opened: false, anchorEl: null })
  
  const navigate2days = (direction = 1) => {
    let date = moment(startDate).add(5 * direction, 'days');
    handleChangeStartDate(date);
  }

  return (
    <ToolbarWrapper>
      <div onClick={() => navigate2days(-1)}>
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.54" fillRule="evenodd" clipRule="evenodd" d="M7.4 1.4L6 0L0 6L6 12L7.4 10.6L2.8 6L7.4 1.4Z" fill="black"/>
        </svg>
      </div>
      <div className="current-week">{`${startDate.format('MMM')} ${startDate.format('DD')}, ${startDate.format('YYYY')} - ${endDate.format('MMM')} ${endDate.format('DD')}, ${endDate.format('YYYY')}`}</div>
      <div onClick={() => navigate2days(1)}>
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.54" fillRule="evenodd" clipRule="evenodd" d="M0 1.4L1.4 0L7.4 6L1.4 12L0 10.6L4.6 6L0 1.4Z" fill="black"/>
        </svg>
      </div>
      <div className="calendar-icon" onClick={(e) => setCalendarPopupOptions({ opened: true, anchorEl: e.currentTarget })}>
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.75 3H19.25V1.75C19.25 1.41848 19.1183 1.10054 18.8839 0.866116C18.6495 0.631696 18.3315 0.5 18 0.5C17.6685 0.5 17.3505 0.631696 17.1161 0.866116C16.8817 1.10054 16.75 1.41848 16.75 1.75V3H9.25V1.75C9.25 1.41848 9.1183 1.10054 8.88388 0.866116C8.64946 0.631696 8.33152 0.5 8 0.5C7.66848 0.5 7.35054 0.631696 7.11612 0.866116C6.8817 1.10054 6.75 1.41848 6.75 1.75V3H4.25C3.25544 3 2.30161 3.39509 1.59835 4.09835C0.895088 4.80161 0.5 5.75544 0.5 6.75V21.75C0.5 22.7446 0.895088 23.6984 1.59835 24.4017C2.30161 25.1049 3.25544 25.5 4.25 25.5H21.75C22.7446 25.5 23.6984 25.1049 24.4017 24.4017C25.1049 23.6984 25.5 22.7446 25.5 21.75V6.75C25.5 5.75544 25.1049 4.80161 24.4017 4.09835C23.6984 3.39509 22.7446 3 21.75 3ZM23 21.75C23 22.0815 22.8683 22.3995 22.6339 22.6339C22.3995 22.8683 22.0815 23 21.75 23H4.25C3.91848 23 3.60054 22.8683 3.36612 22.6339C3.1317 22.3995 3 22.0815 3 21.75V13H23V21.75ZM23 10.5H3V6.75C3 6.41848 3.1317 6.10054 3.36612 5.86612C3.60054 5.6317 3.91848 5.5 4.25 5.5H6.75V6.75C6.75 7.08152 6.8817 7.39946 7.11612 7.63388C7.35054 7.8683 7.66848 8 8 8C8.33152 8 8.64946 7.8683 8.88388 7.63388C9.1183 7.39946 9.25 7.08152 9.25 6.75V5.5H16.75V6.75C16.75 7.08152 16.8817 7.39946 17.1161 7.63388C17.3505 7.8683 17.6685 8 18 8C18.3315 8 18.6495 7.8683 18.8839 7.63388C19.1183 7.39946 19.25 7.08152 19.25 6.75V5.5H21.75C22.0815 5.5 22.3995 5.6317 22.6339 5.86612C22.8683 6.10054 23 6.41848 23 6.75V10.5Z" fill="#173FD4"/>
        </svg>
      </div>
      <CustomPopover
        open={calendarPopupOptions.opened}
        anchorEl={calendarPopupOptions.anchorEl}
        onClose={() => setCalendarPopupOptions({ opened: false, anchorEl: null })}
      >
        <PopoverWrapper padding="10px 17px 20px">
            <CalendarPicker
              key={Math.random}
              width={330}
              value={startDate}
              onCancel={() => setCalendarPopupOptions({ opened: false, anchorEl: null })}
              onSelected={(y, m, d) => handleChangeStartDate(moment(new Date(y + '/' + m + '/' + d)).subtract(2, 'days'))}
            />
        </PopoverWrapper>
      </CustomPopover>
    </ToolbarWrapper>
  );
}

export default CalendarToolbar;
