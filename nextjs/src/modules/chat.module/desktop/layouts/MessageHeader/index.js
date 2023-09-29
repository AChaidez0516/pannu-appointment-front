import dynamic from 'next/dynamic'

import Checkbox from '../../../../../components/CheckBox'
import Select from '../../../shared/components/Select'

import { CalendarPicker } from '../../../../../components/CalendarPicker'

const CustomPopover = dynamic(() => import('./CustomPopover'), { ssr: false })

import { useState, useRef, useEffect } from 'react'
import { useChatUser } from '../../../../../redux/hooks/useCommonStore'
import { useMessageEvent } from '../../../../../redux/hooks/useChatStore'

import {
  ClearOutlined,
} from '@mui/icons-material'

import {
  Wrapper,
  AdvancedSearchBoxWrapper,
  SearchBoxWrapper,
  PatientWrapper,
  AppointmentWrapper,
  PopoverWrapper,
} from './styled'
import {
  ProfileIcon, ArrowIcon_3, SearchIcon, SearchOptionIcon, QrIcon,
  CalendarIcon, ZoomIcon, CopyIcon, EmailIcon_1, FullModeIcon, PrintIcon,
  VideoIcon_1, PhoneIcon_1, NormalModeIcon, NewPatientIcon, ClipIcon, ClockIcon
} from '../../../../../common/utils/Icons'
import Image from "next/image";
import { ChatUserRole, MessageEventType } from "../../../shared/constants";
import { ICONS } from "../../../../../common/utils/styleGuide";

const AdvancedSearchBox = ({ searchItems, configItems }) => {

  const [isOpenedPatient, setIsOpenedPatient] = useState(false)
  const [isOpenedAppointment, setIsOpenedAppointment] = useState(false)
  const [configPopupOptions, setConfigPopupOptions] = useState({ opened: false, anchorEl: null })
  const [searchKeyword, setSearchKeyword] = useState('')

  const inputRef = useRef(null)
  const patientRef = useRef(null)
  const appointmentRef = useRef(null)

  const handleClickOutside = event => {
    //if click is on trigger element, toggle modal
    if (inputRef.current &&
      inputRef.current.contains(event.target)) {
      if (inputRef.current.value.length > 0) {
        setIsOpenedPatient(true)
        setIsOpenedAppointment(false)
      }
      else {
        setIsOpenedAppointment(true)
        setIsOpenedPatient(false)
      }
      return
    }

    if (patientRef.current &&
      patientRef.current.contains(event.target)) {
      if (inputRef.current.value.length > 0) {
        setIsOpenedPatient(true)
        setIsOpenedAppointment(false)
      }
      else {
        setIsOpenedAppointment(true)
        setIsOpenedPatient(false)
      }
      return
    }

    if (appointmentRef.current &&
      appointmentRef.current.contains(event.target)) {
      if (inputRef.current.value.length > 0) {
        setIsOpenedPatient(true)
        setIsOpenedAppointment(false)
      }
      else {
        setIsOpenedAppointment(true)
        setIsOpenedPatient(false)
      }
      return
    }

    setIsOpenedPatient(false)
    setIsOpenedAppointment(false)
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isOpenedPatient])

  useEffect(() => {
    if (!isOpenedPatient && !isOpenedAppointment)
      return

    if (searchKeyword.length > 0) {
      setIsOpenedPatient(true)
      setIsOpenedAppointment(false)
    }
    else {
      setIsOpenedAppointment(true)
      setIsOpenedPatient(false)
    }
  }, [searchKeyword])

  const patients = [
    { id: 1, name: 'Bill Singh' },
    { id: 2, name: 'Huang Hai Long' },
    { id: 3, name: 'Siman' },
    { id: 4, name: 'Planker' },
    { id: 5, name: 'Bill Singh' },
    { id: 6, name: 'Huang Hai Long' },
    { id: 7, name: 'Siman' },
    { id: 8, name: 'Planker' },
  ]
  const appointments = [
    {
      'id': '1',
      'type': 'regular',
      'start_time': '8:00',
      'patient_name': 'Arlene McCoy',
      'dob': '9/4/2022',
      'provider_name': 'Alex Daniel',
      'reason': 'Amet minim mollit non deserunt',
      'duration': 30
    },
    {
      'id': '2',
      'type': 'current',
      'start_time': '8:45',
      'patient_name': 'Arlene McCoy',
      'dob': '9/4/2022',
      'provider_name': 'Alex Daniel',
      'reason': 'Amet minim mollit non deserunt',
      'duration': 30
    },
    {
      'id': '3',
      'type': 'preferred',
      'start_time': '10:00',
      'patient_name': 'Arlene McCoy',
      'dob': '9/4/2022',
      'provider_name': 'Alex Daniel',
      'reason': 'Amet minim mollit non deserunt',
      'duration': 30
    },
    {
      'id': '4',
      'type': 'urgent',
      'start_time': '11:30',
      'patient_name': 'Arlene McCoy',
      'dob': '9/4/2022',
      'provider_name': 'Alex Daniel',
      'reason': 'Amet minim mollit non deserunt',
      'duration': 30
    },
    {
      'id': '5',
      'type': 'preferred',
      'start_time': '13:00',
      'patient_name': 'Arlene McCoy',
      'dob': '9/4/2022',
      'provider_name': 'Alex Daniel',
      'reason': 'Amet minim mollit non deserunt',
      'duration': 50
    },
    {
      'id': '6',
      'type': 'preferred',
      'start_time': '16:00',
      'patient_name': 'Arlene McCoy',
      'dob': '9/4/2022',
      'provider_name': 'Alex Daniel',
      'reason': 'Amet minim mollit non deserunt',
      'duration': 30
    },
  ]
  return (
    <AdvancedSearchBoxWrapper>
      <div className="desc">
        <p>To find a patient not on your calender, enter </p>
        <p>Member PC ID OR date of birth, last name, first name, last 4 digits of the SSN</p>
      </div>
      <div className="toolbar">
        <div className="search-control">
          <div className="icon">
            <SearchIcon width="14" height="15" color="#000000" />
          </div>
          <div className="input-wrapper">
            <input type="text" ref={inputRef} onChange={e => setSearchKeyword(e.target.value)} />
          </div>
        </div>
        <div className="search-tools">
          <span className="icon"><Image src={ICONS.high_important} width={20} height={20} layout="fixed" /></span>
          <span className="icon"
                onClick={(e) => setConfigPopupOptions({ opened: true, anchorEl: e.currentTarget })}>
            <SearchOptionIcon width="18" height="20" />
          </span>
          <span className="icon"><label className="link">Advanced<br />Search</label></span>
          <span className="icon"><label className="link">Saved<br />Searches</label></span>
        </div>
      </div>

      <AppointmentWrapper className="scrollbar" ref={appointmentRef} isOpened={isOpenedAppointment} onClick={(e) => handleClickOutside(e)}>
        <div className="header">
          <span className="start-time"><ClockIcon color="#29B05A" /></span>
          <span className="field patient-name">Name</span>
          <span className="field dob">DOB</span>
          <span className="field provider_name">Provider</span>
          <span className="field reason">Reason</span>
          <Image className="duration" src="/assets/images/sand-clock.png" width="21" height="21" />
        </div>
        <div className="list">
          { appointments.map((apt, i) => (
                <div key={i} className={"one " + apt.type} onClick={() => {}}>
                  <div className="start-time">{apt.start_time}</div>
                  <div className="patient-name">{apt.patient_name}</div>
                  <div className="dob">{apt.dob}</div>
                  <div className="provider_name">{apt.provider_name}</div>
                  <div className="reason">{apt.reason}</div>
                  <div className="duration">{apt.duration}</div>
                </div>
              )
            )
          }
        </div>
      </AppointmentWrapper>
      <PatientWrapper top={60} className="scrollbar" ref={patientRef} isOpened={isOpenedPatient} onClick={(e) => handleClickOutside(e)}>
        <div className="bar">
          <div className="desc">
            <div className="icon"><Image src={ICONS.high_important} width={20} height={20} layout="fixed" /></div>
            <div className="txt">
              <p>Use this selector when you are not sure about the data.</p>
              <p>Can only be used with patients with whom you have an existing relationship.</p>
            </div>
          </div>
          <div className="options">
            { searchItems.map(item => (
              <div className="one" key={item.id}>
                <Checkbox options={{ size: { width: 16, height: 16 } }} onChange={() => {}} />
                <span className="title">{item.title}</span>
                { item.icon&& <div className="icon"><div className="arrow">{item.icon}</div></div> }
              </div>
            )) }
          </div>
        </div>
        <div className="list">
          { patients.map((patient, i) => (
            <div key={patient.id} className="one">
              <div className="name">{patient.name}</div>
              <div className="brace">Treatment braces 1 </div>
            </div>
          )) }
        </div>

      </PatientWrapper>

      <CustomPopover
        open={configPopupOptions.opened}
        anchorEl={configPopupOptions.anchorEl}
        onClose={() => setConfigPopupOptions({ opened: false, anchorEl: null })}>
        <PopoverWrapper width={210} padding="10px 17px 10px">
          <div className="header">
              <span className="mark">
                <SearchOptionIcon width="18" height="18" />
              </span>
            <div className="icon" style={{ marginTop: -5 }}>
              <ClearOutlined
                fontSize="10px"
                onClick={() => setConfigPopupOptions({ opened: false, anchorEl: null })}
              />
            </div>
          </div>
          <div className="item">
            { configItems.map(item => (
              <div className="one" key={item.id}>
                <Checkbox options={{ size: { width: 16, height: 16 } }} onChange={ () => { } }  />
                <span className="title">{item.title}</span>
                { item.icon&& <div className="icon"><div className="arrow"></div></div> }
              </div>
            )) }
          </div>
        </PopoverWrapper>
      </CustomPopover>
    </AdvancedSearchBoxWrapper>
  )
}

const SearchBox = ({ configItems }) => {

  const [configPopupOptions, setConfigPopupOptions] = useState({ opened: false, anchorEl: null })
  const [isOpenedPatient, setIsOpenedPatient] = useState(false)

  const inputRef = useRef(null)
  const patientRef = useRef(null)

  const handleClickOutside = event => {
    //if click is on trigger element, toggle modal
    if (inputRef.current &&
      inputRef.current.contains(event.target)) {
      setIsOpenedPatient(true)
      return
    }

    if (patientRef.current &&
      patientRef.current.contains(event.target)) {
      setIsOpenedPatient(true)
      return
    }

    setIsOpenedPatient(false)

  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };

  }, [isOpenedPatient])

  const patients = [
    { id: 1, name: 'Bill Singh' },
    { id: 2, name: 'Huang Hai Long' },
    { id: 3, name: 'Siman' },
    { id: 4, name: 'Planker' },
    { id: 5, name: 'Bill Singh' },
    { id: 6, name: 'Huang Hai Long' },
    { id: 7, name: 'Siman' },
    { id: 8, name: 'Planker' },
  ]

  return (
    <SearchBoxWrapper>
      <div className="search-control">
        <div className="icon">
          <SearchIcon width="18" height="18" color="#000000" />
        </div>
        <div className="input-wrapper">
          <input type="text" ref={inputRef} />
        </div>
        <PatientWrapper className="scrollbar" top={25} ref={patientRef} isOpened={isOpenedPatient} onClick={(e) => handleClickOutside(e)}>
          <div className="list">
            { patients.map((patient, i) => (
              <div key={patient.id} className="one">
                <div className="name">{patient.name}</div>
                <div className="brace">Treatment braces 1 </div>
              </div>
            )) }
          </div>
        </PatientWrapper>
      </div>
      <div className="search-tools">
        <span className="icon"
              onClick={(e) => setConfigPopupOptions({ opened: true, anchorEl: e.currentTarget })}>
          <SearchOptionIcon width="18" height="20" />
        </span>
        <span className="icon"><label className="link">Advanced<br />Search</label></span>
        {/*<span className="icon"><label className="link">Saved<br />Searches</label></span>*/}
      </div>

      <CustomPopover
        open={configPopupOptions.opened}
        anchorEl={configPopupOptions.anchorEl}
        onClose={() => setConfigPopupOptions({ opened: false, anchorEl: null })}>
        <PopoverWrapper width={210} padding="10px 17px 10px">
          <div className="header">
              <span className="mark">
                <SearchOptionIcon width="18" height="18" />
              </span>
            <div className="icon" style={{ marginTop: -5 }}>
              <ClearOutlined
                fontSize="10px"
                onClick={() => setConfigPopupOptions({ opened: false, anchorEl: null })}
              />
            </div>
          </div>
          <div className="item">
            { configItems.map(item => (
              <div className="one" key={item.id}>
                <Checkbox options={{ size: { width: 16, height: 16 } }} onChange={ () => { } }  />
                <span className="title">{item.title}</span>
                { item.icon&& <div className="icon"><div className="arrow"></div></div> }
              </div>
            )) }
          </div>
        </PopoverWrapper>
      </CustomPopover>
    </SearchBoxWrapper>
  )
}

export default function Header({ fullScreenMode }) {
  const { chatUser } = useChatUser()
  const { commitMessageEvent } = useMessageEvent()
  const [date, setDate] = useState(new Date())

  const [extraToolMenuPopupOptions, setExtraToolMenuPopupOptions] = useState({ opened: false, anchorEl: null })

  const [qrPopupOptions, setQrPopupOptions] = useState({ opened: false, anchorEl: null })
  const [zoomPopupOptions, setZoomPopupOptions] = useState({ opened: false, anchorEl: null })
  const [calendarPopupOptions, setCalendarPopupOptions] = useState({ opened: false, anchorEl: null })

  const configItems = [
    { id: 1, title: 'My messages', icon: false },
    { id: 2, title: 'Sent by', icon: true },
    { id: 3, title: 'Rooms', icon: true },
    { id: 4, title: 'Sent to', icon: true },
    { id: 5, title: 'Location', icon: true },
    { id: 6, title: 'Urgent', icon: false },
    { id: 7, title: 'Date', icon: true },
    { id: 8, title: 'Important', icon: false },
    { id: 9, title: 'Documents', icon: false },
    { id: 10, title: 'Followed', icon: false },
    { id: 11, title: 'Video files', icon: false },
    { id: 12, title: 'Links', icon: false },
    { id: 13, title: 'Audio files', icon: false },
  ]

  const searchItems = [
    { id: 1, title: 'Name', icon: false },
    { id: 2, title: 'Age range', icon: true },
    { id: 3, title: 'Range date of Birth', icon: true },
    { id: 4, title: 'Date range', icon: true },
  ]

  // const searchItems = [
  //   { id: 1, title: 'Name', icon: false },
  //   { id: 2, title: 'Topic', icon: true },
  //   { id: 3, title: 'Age', icon: true },
  //   { id: 4, title: 'Date', icon: true },
  //   { id: 5, title: 'Date of Birth', icon: true },
  // ]

  const locationItems = [
    {
      id: 1, text: 'Location A',
    },
    {
      id: 2, text: 'Location B',
    },
    {
      id: 3, text: 'Location C',
    },
  ]

  return (
    <>
      <Wrapper isReduceHeight={chatUser.role_id == ChatUserRole.PATIENT }>
        <div className="col mt-15">
          <div className="num">
            <ProfileIcon width={18} height={16} />
            <span className="text">2</span>
          </div>
          <div className="text">Invite</div>
        </div>
        <div className="col">
          { chatUser.role_id == ChatUserRole.PROVIDER&&
            <>
              <span className="mt-15">
                <Select
                  value={1}
                  onChange={ () => {} }
                  options={{ size: { width: 80, height: 30 } }}
                  items={locationItems}>
                </Select>
              </span>

              { (chatUser.role_id == ChatUserRole.PROVIDER) &&
                <span className="icon mt-15"
                      onClick={(e) => setCalendarPopupOptions({ opened: true, anchorEl: e.currentTarget })}>
                  <CalendarIcon width={18} height={18}/>
                </span>
              }

              { chatUser.role_id == ChatUserRole.PROVIDER&&
                <span className="icon mt-15"
                      onClick={(e) => setQrPopupOptions({ opened: true, anchorEl: e.currentTarget })}>
                  <QrIcon width="22" height="22" />
                </span>
              }

              <div className="nav mt-15">
                <span className="icon"><ArrowIcon_3 width="9" height="8" /></span>
                <span className="icon reverse"><ArrowIcon_3 width="9" height="8" /></span>
              </div>
            </>
          }
          {/*<Search*/}
          {/*  id="input-with-icon-textfield"*/}
          {/*  InputProps={{*/}
          {/*    startAdornment: (*/}
          {/*      <SearchBar position="start">*/}
          {/*        <div className="icon">*/}
          {/*          <SearchIcon width="18" height="18" color="#000000" />*/}
          {/*        </div>*/}
          {/*      </SearchBar>*/}
          {/*    ),*/}
          {/*  }}*/}
          {/*  variant="standard"*/}
          {/*/>*/}
          { (chatUser.role_id == ChatUserRole.PATIENT || chatUser.role_id == ChatUserRole.SCRIBE
              || chatUser.role_id == ChatUserRole.ASSISTANT) &&
            <SearchBox searchItems={searchItems} configItems={configItems} />
          }
          { (chatUser.role_id == ChatUserRole.PROVIDER || chatUser.role_id == ChatUserRole.STAFF)&&
            <AdvancedSearchBox searchItems={searchItems} configItems={configItems} />
          }
          { (chatUser.role_id == ChatUserRole.PROVIDER || chatUser.role_id == ChatUserRole.STAFF)&&
            <span className="icon mt-15"><NewPatientIcon/></span>
          }
        </div>

        <div className="col extra-tools">
          { (chatUser.role_id == ChatUserRole.PROVIDER || chatUser.role_id == ChatUserRole.STAFF)&&
            <span className="icon mt-15"
                  onClick={(e) => setZoomPopupOptions({opened: true, anchorEl: e.currentTarget})}>
              <ZoomIcon width={20} height={20}/>
            </span>
          }
          { (chatUser.role_id == ChatUserRole.PROVIDER || chatUser.role_id == ChatUserRole.STAFF)&&
            <span className="icon mt-15" onClick={() => commitMessageEvent(MessageEventType.SHOW_CLIP)}>
              <ClipIcon/>
            </span>
          }
          <span className="icon mt-15">
            <CopyIcon width={18} height={18} />
          </span>
          <span className="icon col">
            <p className="link">Show<br />Unread</p>
            <p className="link">Show<br />All</p>
          </span>
          { (chatUser.role_id == ChatUserRole.PATIENT)&&
            <span className="icon mt-15">
              <PrintIcon width={21} height={20}/>
            </span>
          }
          { chatUser.role_id == ChatUserRole.PROVIDER&&false &&
            <>
              <span className="icon mt-15">
                <VideoIcon_1 />
              </span>
              <span className="icon mt-15">
                <PhoneIcon_1 />
              </span>
            </>
          }

          <span className="icon mt-15" onClick={fullScreenMode}>
            <FullModeIcon />
            {/*<NormalModeIcon />*/}
          </span>
        </div>
        <div className="col extra-tools-menu mt-15"
             onClick={ (e) => setExtraToolMenuPopupOptions({ opened: true, anchorEl: e.currentTarget }) }>
          <Image width={5} height={14} layout="fixed" src="/assets/images/svg/menu.svg" />
        </div>
        <CustomPopover
          open={calendarPopupOptions.opened}
          anchorEl={calendarPopupOptions.anchorEl}
          onClose={() => setCalendarPopupOptions({ opened: false, anchorEl: null })}
        >
          <PopoverWrapper padding="10px 17px 20px">
              <CalendarPicker
                value={new Date('2021-11-23')}
                onCancel={() => setCalendarPopupOptions({ opened: false, anchorEl: null })}
                onSelected={(y, m, d) => console.log(y, m, d)}
              />
          </PopoverWrapper>

        </CustomPopover>

        <CustomPopover
          open={extraToolMenuPopupOptions.opened}
          anchorEl={extraToolMenuPopupOptions.anchorEl}
          onClose={() => setExtraToolMenuPopupOptions({ opened: false, anchorEl: null })}>
          <PopoverWrapper width={50} padding="0">
            <div className="extra-menu-item">
              { (chatUser.role_id == ChatUserRole.PROVIDER || chatUser.role_id == ChatUserRole.STAFF)&&
                <span className="icon"
                      onClick={(e) => setZoomPopupOptions({opened: true, anchorEl: e.currentTarget})}>
                  <ZoomIcon width={20} height={20}/>
                </span>
              }
              { (chatUser.role_id == ChatUserRole.PROVIDER || chatUser.role_id == ChatUserRole.STAFF)&&
                <span className="icon" onClick={() => commitMessageEvent(MessageEventType.SHOW_CLIP)}>
                  <ClipIcon/>
                </span>
              }
              <span className="icon">
                <CopyIcon width={18} height={18}  />
              </span>
              <div className="icon">
                <p className="link">Show<br />Unread</p>
              </div>
              <div className="icon">
                <p className="link">Show<br />All</p>
              </div>
              { (chatUser.role_id == ChatUserRole.PATIENT)&&
                <span className="icon">
                  <PrintIcon width={21} height={20}/>
                </span>
              }
              { chatUser.role_id == ChatUserRole.PROVIDER&&false &&
                <>
                  <span className="icon">
                    <VideoIcon_1 />
                  </span>
                      <span className="icon">
                    <PhoneIcon_1 />
                  </span>
                </>
              }
              <span className="icon" onClick={ () => {
                setExtraToolMenuPopupOptions({ opened: false, anchorEl: null })
                fullScreenMode()
              }}>
                <FullModeIcon />
              </span>
            </div>
          </PopoverWrapper>
        </CustomPopover>

      </Wrapper>
    </>
  )
}
