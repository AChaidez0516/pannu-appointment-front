import Image from 'next/image'
import { useState, useEffect } from 'react'
import * as moment from 'moment/moment'
import Modal from '../../../../../../components/Modal'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css';
import SelectPopupModal from '../../../../../../components/modals/SelectPopupModal'
import ConfirmModal from '../../../../../../components/modals/ConfirmModal'
import MobilePicker from '../../../../../../components/MobilePicker'
import { AlertEditIcon, AlertCheckmarkIcon, RemoveIcon } from '../../../../../../common/utils/Icons'
import { ICONS } from '../../../../../../common/utils/styleGuide'
import { TimeslotList, SelectTime } from './styled'

const Option = {
  valueGroups: {
    title: 'Mr.',
    firstName: 'Micheal',
    secondName: 'Jordan'
  }, 
  optionGroups: {
    title: ['Mr.', 'Mrs.', 'Ms.', 'Dr.'],
    firstName: ['John', 'Micheal', 'Elizabeth'],
    secondName: ['Lennon', 'Jackson', 'Jordan', 'Legend', 'Taylor']
  }
};

const STATUS = {
  NORMAL: 'NORMAL',
  ADD: 'ADD',
  EDIT: 'EDIT'
}

export default function SetAlertModal(props) {
  const {
    alerts,
    setAlerts,
    isOpened,
    setIsOpened,
  } = props

  const [date, setDate] = useState({
    valueGroups: {
      month: 4,
      day: 4,
    }, 
    optionGroups: {
      month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    }
  });

  const [time, setTime] = useState({
    valueGroups: {
      hour: 4,
      minute: 4,
    }, 
    optionGroups: {
      hour: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      minute: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
    }
  });

  const [meridiem, setMeridiem] = useState({
    valueGroups: {
      meridiem: 'AM',
    }, 
    optionGroups: {
      meridiem: ['AM', 'PM']
    }
  });

  const [isSelectedRing, setIsSelectedRing] = useState(false);
  const [isSelectedVibration, setIsSelectedVibration] = useState(false);
  const [isSelectedNotification, setIsSelectedNotification] = useState(false);
  const [alertsInModal, setAlertsInModal] = useState([]);
  const [selectedAlertId, setSelectedAlertId] = useState(0);
  const [nextAlertId, setNextAlertId] = useState(1);
  const [confirmRemoveData, setConfirmRemoveData] = useState({
    open: false,
    alertId: 0
  })
  const [status, setStatus] = useState(STATUS.ADD)

  useEffect(() => {
    let nextId = 0;
    alerts.map(alert => {
      if (alert.id > nextId)
        nextId = alert.id;
    });
    setNextAlertId(nextId + 1);
    setAlertsInModal([...alerts]);
    handleReset();
  }, [isOpened]);

  const handleTimeslotChange = (field, name, value) => {
    switch (field) {
      case 'date':
        setDate(v => ({ ...v, valueGroups: { ...v.valueGroups, [name]: value }}));
        break;
      case 'time':
        setTime(v => ({ ...v, valueGroups: { ...v.valueGroups, [name]: value }}));
        break;
      case 'meridiem':
        setMeridiem(v => ({ ...v, valueGroups: { ...v.valueGroups, [name]: value }}));
        break;
    }
  };

  const handleAddAnother = () => {
    if (status == STATUS.NORMAL) {
      setStatus(STATUS.ADD);
    }
  }

  const handleDone = () => {
    if (status == STATUS.NORMAL) {
      setAlerts(alertsInModal);
      setIsOpened(false);
    }
  }

  const handleReset = () => {
    setDate({...date, valueGroups: { month: 4, day: 4 }});
    setTime({...time, valueGroups: { hour: 4, minute: 4 }});
    setMeridiem({...meridiem, valueGroups: { meridiem: "AM" }});
    setIsSelectedRing(false);
    setIsSelectedVibration(false);
    setIsSelectedNotification(false);
    setSelectedAlertId(0);
    //setStatus(STATUS.ADD);
  }

  const handleSave = () => {

    console.log(status)
    // if (status == STATUS.NORMAL)
    //   return;

    let newAlert = {};
    newAlert.datetime = moment(new Date(`${new Date().getFullYear()}-${date.valueGroups.month}-${date.valueGroups.day} ${time.valueGroups.hour}:${time.valueGroups.minute}:00 ${meridiem.valueGroups.meridiem}`)).format('YYYY-MM-DD HH:mm:ss');
    newAlert.isRing = isSelectedRing;
    newAlert.isVibration = isSelectedVibration;
    newAlert.isNotification = isSelectedNotification;
    if (selectedAlertId) {
      newAlert.id = selectedAlertId;
      setAlertsInModal(alertsInModal.map(alert => alert.id == selectedAlertId ? newAlert : alert));
    } else {
      newAlert.id = nextAlertId;
      setNextAlertId(nextAlertId + 1);
      setAlertsInModal([...alertsInModal, newAlert]);
    }
    handleReset();
    setStatus(STATUS.NORMAL)
  }

  const handleEdit = (alert) => {
    setStatus(STATUS.EDIT);
    var alertDatetime = moment(alert.datetime);
    setSelectedAlertId(alert.id);
    setDate({...date, valueGroups: { month: parseInt(alertDatetime.format("M")), day: parseInt(alertDatetime.format("D")) }});
    setTime({...time, valueGroups: { hour: parseInt(alertDatetime.format("h")), minute: parseInt(alertDatetime.format("m")) }});
    setMeridiem({...meridiem, valueGroups: { meridiem: alertDatetime.format("A") }});
    setIsSelectedRing(alert.isRing);
    setIsSelectedVibration(alert.isVibration);
    setIsSelectedNotification(alert.isNotification);
  }

  const handleDelete = (alertId) => {
    setAlertsInModal(alertsInModal.filter(alert => alert.id != alertId));
    setSelectedAlertId(0);
  }

  return (
    <SelectPopupModal
      onClose={() => setIsOpened(false)}
      show={isOpened}
      items={[]}
      isConformButton={false}
      handleCancel={() => setIsOpened(false)}
      maxWidth={375}
    >
      <SimpleBar style={{ maxHeight: 400 }}>
        <TimeslotList isEditing={selectedAlertId ? true : false}>
          {alertsInModal.length == 0 && <div className="no-alerts">No alerts.</div>}
          {alertsInModal.map(alert => {
            return (
              <div className={`item${selectedAlertId == alert.id ? ' selected' : ''}`} key={alert.id}>
                <div className="time">{moment(new Date(alert.datetime)).format("MM/DD hh:mm A")}</div>
                <div className="alert-type">
                  <div className="vibration">
                    <Image src={ICONS.alertVibration} width={15} height={15} />
                    {alert.isVibration && <AlertCheckmarkIcon width={8} height={8} color="#37B34A" />}
                  </div>
                  <div className="ring">
                    <Image src={ICONS.alertRing} width={12} height={15} />
                    {alert.isRing && <AlertCheckmarkIcon width={8} height={8} color="#37B34A" />}
                  </div>
                  <div className="notification">
                    <Image src={ICONS.alertNotification} width={15} height={14} />
                    {alert.isNotification && <AlertCheckmarkIcon width={8} height={8} color="#37B34A" />}
                  </div>
                </div>
                <div className="actions">
                  {selectedAlertId != alert.id && (
                    <>
                      <div className="btn-edit" onClick={() => handleEdit(alert)}>
                        <AlertEditIcon width={22} height={22} color="#173FD4" />
                      </div>
                      <div className="btn-delete" onClick={() => setConfirmRemoveData({ open: true, alertId: alert.id })}>
                        <RemoveIcon width={22} height={22} color="#FF0000" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </TimeslotList>
        <SelectTime>
          <div className="left">
            <div className="datetime-pick">
              <div className="date-pick">
                <div className="label">Date</div>
                <MobilePicker
                  optionGroups={date.optionGroups}
                  valueGroups={date.valueGroups} 
                  onChange={(n, v) => handleTimeslotChange('date', n, v)}
                  itemHeight={22}
                  height={66}
                  width={60}
                  padding={0}
                  separator="/"
                  //disabled={status == STATUS.NORMAL ? true : false}
                />
              </div>
              <div className="time-pick">
                <div className="label">Time</div>
                <MobilePicker
                  optionGroups={time.optionGroups}
                  valueGroups={time.valueGroups} 
                  onChange={(n, v) => handleTimeslotChange('time', n, v)}
                  itemHeight={22}
                  height={66}
                  width={60}
                  padding={0}
                  separator=":"
                  //disabled={status == STATUS.NORMAL ? true : false}
                />
              </div>
              <div className="meridiem-pick">
                <MobilePicker
                  optionGroups={meridiem.optionGroups}
                  valueGroups={meridiem.valueGroups} 
                  onChange={(n, v) => handleTimeslotChange('meridiem', n, v)}
                  itemHeight={22}
                  height={66}
                  width={44}
                  padding={10}
                  separator=""
                  //disabled={status == STATUS.NORMAL ? true : false}
                />
              </div>
            </div>
            <div className="buttons">
              {selectedAlertId ? (
                <>
                  <div className="btn-cancel" onClick={handleReset}>Cancel</div>
                  <div className="btn-done" onClick={handleSave}>Done</div>
                  <div className="btn-delete" onClick={() => handleDelete(selectedAlertId)}>
                    <RemoveIcon width={18} height={18} color="#FF0000" />
                  </div>
                </>
              ) : (
                <>
                  <div className={`btn-add${status == STATUS.ADD ? ' active' : ''}`} onClick={handleSave}>Add</div>
                  <div className={`btn-add-another${status == STATUS.NORMAL ? ' active' : ''}`} onClick={handleAddAnother}>Add another</div>
                  <div className={`btn-done${status == STATUS.NORMAL ? ' active' : ''}`} onClick={handleDone}>Done</div>
                </>
              )}
            </div>
          </div>
          <div className="right">
            <div className="ring">
              {isSelectedRing && (
                <div className="checkmark">
                  <AlertCheckmarkIcon width={18} height={17} color="#37B34A" />
                </div>
              )}
              <div className={`image${status != STATUS.NORMAL ? ' active' : ''}`} onClick={() => { if (status != STATUS.NORMAL) setIsSelectedRing(!isSelectedRing) }}>
                <Image src={ICONS.alertRing} width={19} height={22} />
              </div>
            </div>
            <div className="vibration">
              {isSelectedVibration && (
                <div className="checkmark">
                  <AlertCheckmarkIcon width={18} height={17} color="#37B34A" />
                </div>
              )}
              <div className={`image${status != STATUS.NORMAL ? ' active' : ''}`} onClick={() => { if (status != STATUS.NORMAL) setIsSelectedVibration(!isSelectedVibration) }}>
                <Image src={ICONS.alertVibration} width={22} height={22} />
              </div>
            </div>
            <div className="notification">
              {isSelectedNotification && (
                <div className="checkmark">
                  <AlertCheckmarkIcon width={18} height={17} color="#37B34A" />
                </div>
              )}
              <div className={`image${status != STATUS.NORMAL ? ' active' : ''}`} onClick={() => { if (status != STATUS.NORMAL) setIsSelectedNotification(!isSelectedNotification) }}>
                <Image src={ICONS.alertNotification} width={20} height={19} />
              </div>
            </div>
          </div>
        </SelectTime>
        <ConfirmModal
          open={confirmRemoveData.open}
          handleOk={() => { handleDelete(confirmRemoveData.alertId); setConfirmRemoveData({ open: false, alertId: 0 }); }}
          handleClose={() => setConfirmRemoveData({ open: false, alertId: 0 })}
          message="Are you sure you want to delete this alert?"
          zIndex={300}
        />
      </SimpleBar>
    </SelectPopupModal>
  )
}
