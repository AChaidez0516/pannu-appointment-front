import Image from 'next/image'
import { useState, useEffect } from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css';
import SelectPopupModal from '../../../../../../components/modals/SelectPopupModal'
import ConfirmModal from '../../../../../../components/modals/ConfirmModal'
import AptBar from './AptBar'
import SetAlertModal from '../SetAlertModal'
import { DefaultWrapper, SnoozeWrapper } from './styled'

const STATUS = {
  NORMAL: 'NORMAL',
  SNOOZE: 'SNOOZE',
  SETTINGS: 'SETTINGS'
}

export default function AlertNotificationModal(props) {
  const {
    apt,
    isOpened,
    setIsOpened,
  } = props

  const [status, setStatus] = useState(STATUS.NORMAL)

  return (
    <>
      {status == STATUS.NORMAL && (
        <SelectPopupModal
          onClose={() => setIsOpened(false)}
          show={isOpened}
          items={[]}
          isConformButton={false}
          hideCancelButton={true}
          maxWidth={375}
          padding="23px 6px 8px 6px"
        >
          <SimpleBar style={{ maxHeight: 400 }}>
            <DefaultWrapper>
              <AptBar apt={apt} />
              <div className="action">
                <div className="stop">Stop</div>
                <div className="snooze" onClick={() => setStatus(STATUS.SNOOZE)}>Snooze</div>
              </div>
              <div className="settings" onClick={() => setStatus(STATUS.SETTINGS)}>Alert settings</div>
            </DefaultWrapper>
          </SimpleBar>
        </SelectPopupModal>
      )}
      {status == STATUS.SNOOZE && (
        <SelectPopupModal
          onClose={() => setIsOpened(false)}
          show={isOpened}
          items={[]}
          isConformButton={false}
          hideCancelButton={true}
          maxWidth={375}
          padding="23px 6px 8px 6px"
        >
          <SimpleBar style={{ maxHeight: 400 }}>
            <SnoozeWrapper>
              <AptBar apt={apt} />
              <div className="list">
                <div className="btn">5 minutes</div>
                <div className="btn">10 minutes</div>
                <div className="btn">15 minutes</div>
                <div className="btn">20 minutes</div>
                <div className="btn">25 minutes</div>
                <div className="btn">30 minutes</div>
              </div>
            </SnoozeWrapper>
          </SimpleBar>
        </SelectPopupModal>
      )}
      {status == STATUS.SETTINGS && (
        <SetAlertModal
          alerts={[]}
          setAlerts={() => { }}
          isOpened={isOpened}
          setIsOpened={() => setIsOpened}
        />
      )}
    </>
  )
}
