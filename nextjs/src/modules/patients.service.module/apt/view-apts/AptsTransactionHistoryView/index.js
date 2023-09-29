import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import * as moment from 'moment/moment'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css';
import {
  HEADER_HEIGHT,
  MAIN_BODY_PADDING_Y
} from "../../make-apt/shared/constants";
import useWindowDimensions, { DEVICE_TYPE } from '../../../../../common/hooks/useWindowDimensions'
import InputBox from "../../../../../components/InputBox";
import { CustomPopover, CalendarPicker} from "../../../../../components/CalendarPicker";
import { APT_TYPE_TO_SEARCH } from '../shared/data'
import { ICONS, IMGS } from '../../../../../common/utils/styleGuide'
import { CalendarIcon } from "../../../../../common/utils/Icons";
import { TransactionHistoryWrapper, DoneBtnWrapper, SummaryWrapper, FilterWrapper, ListWrapper, PopoverWrapper } from './styled'

const HistoryListComponent = ({ children }) => {
  const { height, device } = useWindowDimensions()
  const sectionHeight = height
    - HEADER_HEIGHT
    - 2 * MAIN_BODY_PADDING_Y
  const sectionPaddingY = 12;
  const headingHeight = 62;
  const summaryHeight = 130;
  const filterHeight = 100;
  const listHeightOnDesktop = sectionHeight - 2 * sectionPaddingY - headingHeight - summaryHeight - filterHeight - 50;

  if (device === DEVICE_TYPE.DESKTOP) {
    return (
      <SimpleBar style={{ maxHeight: listHeightOnDesktop }}>
          {children}
      </SimpleBar>
    )
  }
  return (
    <>
      {children}
    </>
  )
}

export default function AptsTransactionHistoryView({ selectedApt, histories ,onClose}) {
  const refDateFrom = useRef(null);
  const refDateTo = useRef(null);
  const refList = useRef(null);
  const [filteredHistories, setFilteredHistories] = useState([]);
  const [calendarPopupOptions, setCalendarPopupOptions] = useState({ opened: false, field: '' });
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  useEffect(() => {
    console.log('here')
    let extra_date_num = [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3,4,5];
    histories.map((one, index) => {
      //one.aptType == selectedApt.aptType
      one.providerName = selectedApt.provider.fullName
      //if (one.aptType == 'PREFERRED')
      //one.aptType = selectedApt.aptType
      one.date = moment(new Date(selectedApt.aptDate)).add(extra_date_num[index], 'day').format('MM/DD/YY')  + ' ' + selectedApt.aptTime
      console.log(one.date);
      one.providerAvatar = IMGS.avatarDoctor1
      return one;
    })

    setFilteredHistories(histories)
  })
  useEffect(() => {
    //setFilteredHistories(histories);
    if (refList && refList.current) {
      const selectedHistory = refList.current.querySelectorAll(`[data-aptid="${selectedApt.id}"]`)
      if (selectedHistory.length) {
        refList.current.parentNode.parentNode.scrollTop = selectedHistory[0].offsetTop // selectedHistory[0].offsetHeight
      }
    }
  }, [selectedApt, refList.current]);

  const getAptColor = (aptType) => {
    if (aptType === APT_TYPE_TO_SEARCH.PREFERRED)
      return "#173FD4";
    if (aptType === APT_TYPE_TO_SEARCH.URGENT)
      return "#FF0000";
    if (aptType === APT_TYPE_TO_SEARCH.WAIT_LIST)
      return "#FAC23C";
  }

  const formatNumber = (number) => {
    return number.toLocaleString('en-US', { minimumFractionDigits: 2 });
  }

  const formatDate = (date) => {
    if (!date)
      return 'MM/DD';
    return date.format("MM/DD");
  }

  const handleSelecteDate = (y, m, d) => {
    if (calendarPopupOptions.field == 'dateFrom')
      setDateFrom(moment(new Date(`${y}-${m}-${d} 00:00:00`)));
    else
      setDateTo(moment(new Date(`${y}-${m}-${d}`)));
    setCalendarPopupOptions({ opened: false, anchorEl: null, field: '' })
  }

  const handleFilter = () => {
    setFilteredHistories(histories.filter(v => moment(v.date).isSameOrAfter(dateFrom) && moment(v.date).isSameOrBefore(dateTo) ? true : false));
  }

  return (
    <div className="section">
      <TransactionHistoryWrapper>
        <div className="header-desktop">Appointments transaction history</div>
        <SummaryWrapper>
          <div className="headline">
            <div className="summary">Summary</div>
            <div className="total">
              <div className="label">Total:</div>
              <div className="amount">12,123.12</div>
            </div>
          </div>
          <div className="content">
            <div className="left">
              <div className="appointment-fees">
                <div className="label">Appointment fees</div>
                <div className="amount">51,000.00</div>
              </div>
              <div className="service-fees">
                <div className="label">Service fees</div>
                <div className="amount">51,000.00</div>
              </div>
              <div className="urgent-fees">
                <div className="label">Urgent</div>
                <div className="amount">1,234.56</div>
              </div>
              <div className="preferred-fees">
                <div className="label">Preferred</div>
                <div className="amount">1,234.56</div>
              </div>
              <div className="waitlist-fees">
                <div className="label">Wait list</div>
                <div className="amount">1,234.56</div>
              </div>
            </div>
            <div className="right">
              <div className="copay">
                <div className="label">Copay</div>
                <div className="amount">71,000.00</div>
              </div>
              <div className="deductible">
                <div className="label">Deductible</div>
                <div className="amount">71,000.00</div>
              </div>
              <div className="coinsurance">
                <div className="label">Coinsurance</div>
                <div className="amount">71,000.00</div>
              </div>
              <div className="selfpay">
                <div className="label">Selfpay</div>
                <div className="amount">71,000.00</div>
              </div>
            </div>
          </div>
        </SummaryWrapper>
        <FilterWrapper>
          <div className="headline">Select DOS to show appointment transactions</div>
          <div className="content">
            <div className="flex">
              <div className="date-from" ref={refDateFrom}>
                <InputBox
                  caption="Date from"
                  showIcon
                  iconType="svg"
                  iconSrc={<CalendarIcon color="#173FD4" />}
                  style={{width: 130}}
                  value={formatDate(dateFrom)}
                  onChange={() => {}}
                  onClickInput={() => setCalendarPopupOptions({ opened: true, field: 'dateFrom', anchorEl: refDateFrom.current })}
                  onClickIcon={() => setCalendarPopupOptions({ opened: true, field: 'dateFrom', anchorEl: refDateFrom.current })}
                />
              </div>
              <div className="date-to" ref={refDateTo}>
                <InputBox
                  caption="Date to"
                  showIcon
                  iconType="svg"
                  iconSrc={<CalendarIcon color="#173FD4" />}
                  style={{width: 130}}
                  value={formatDate(dateTo)}
                  onChange={() => {}}
                  onClickInput={() => setCalendarPopupOptions({ opened: true, field: 'dateTo', anchorEl: refDateTo.current })}
                  onClickIcon={() => setCalendarPopupOptions({ opened: true, field: 'dateTo', anchorEl: refDateTo.current })}
                />
              </div>
            </div>
            <div className="btn-show" onClick={handleFilter}>Show</div>
          </div>
        </FilterWrapper>
        <HistoryListComponent>
          <ListWrapper ref={refList}>
            <div className="headline">Click anywhere on a transaction to go to the appointment details.</div>
            <div className="header">
              <div className="provider-and-date">
                <div className="provider">Provider</div>
                <div className="date">Appointment date</div>
              </div>
              <div className="appt-fees">
                Appt<br/>fees  
              </div>
              <div className="categories">
                <div className="copay">Copay</div>
                <div className="deductible">Deductible</div>
                <div className="coinsurance">Coinsurance</div>
                <div className="selfpay">Self pay</div>
              </div>
              <div className="service-fees">
                Service<br/>fees
              </div>
              <div className="total">
                Total
              </div>
            </div>
            {filteredHistories.length == 0 && (
              <div className="no-history">No histories</div>
            )}
            {filteredHistories.map(history => {
              return (
                <div className="item" data-aptid={history.aptId} style={{ borderColor: getAptColor(history.aptType) }} key={history.id}>
                  <div className="provider-and-date">
                    <div className="providerName">{history.providerName}</div>
                    <div className="flex">
                      <div className="avatar">
                        <Image
                          src={history.providerAvatar}
                          width={40} height={40}
                          layout={'responsive'}
                          alt='provider-avatar'
                        />
                      </div>
                      <div className="date">{moment(new Date(history.date)).format("MM/DD/YY")}</div>
                    </div>
                    {history.isRescheduled && (
                      <div className="icon" style={{ width: "52px", height: "38px" }}>
                        <Image
                          src={ICONS.aptRescheduled}
                          width={52} height={38}
                          layout={'responsive'}
                          alt='provider-avatar'
                        />
                      </div>
                    )}
                    {history.isCancelled && (
                      <div className="icon" style={{ width: "37px", height: "30px" }}>
                        <Image
                          src={ICONS.aptCancelled}
                          width={37} height={30}
                          layout={'responsive'}
                          alt='provider-avatar'
                        />
                      </div>
                    )}
                  </div>
                  <div className="appt-fees">{formatNumber(history.apptFee)}</div>
                  <div className="categories">
                    <div className="copay">{formatNumber(history.copay)}</div>
                    <div className="deductible">{formatNumber(history.deductible)}</div>
                    <div className="coinsurance">{formatNumber(history.coinsurance)}</div>
                    <div className="selfpay">{formatNumber(history.selfpay)}</div>
                  </div>
                  <div className="service-fees">{formatNumber(history.serviceFee)}</div>
                  <div className="total">{formatNumber(history.total)}</div>
                </div>
              );
            })}
          </ListWrapper>
        </HistoryListComponent>    
        <DoneBtnWrapper className="btn-done" onClick={onClose}>Done</DoneBtnWrapper>        
      </TransactionHistoryWrapper>
      <CustomPopover
        open={calendarPopupOptions.opened}
        anchorEl={calendarPopupOptions.anchorEl}
        onClose={() => setCalendarPopupOptions({ opened: false, anchorEl: null, field: '' })}
      >
        <PopoverWrapper padding="10px 17px 20px">
            <CalendarPicker
              width={330}
              value={calendarPopupOptions.field == 'dateFrom' ? dateFrom : dateTo}
              onCancel={() => setCalendarPopupOptions({ opened: false, anchorEl: null, field: '' })}
              onSelected={handleSelecteDate}
            />
        </PopoverWrapper>
      </CustomPopover>
    </div>
  )
}
