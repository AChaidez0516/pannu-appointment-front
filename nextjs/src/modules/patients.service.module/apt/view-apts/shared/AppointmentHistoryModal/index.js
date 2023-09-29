import * as moment from 'moment/moment'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css';
import SelectPopupModal from '../../../../../../components/modals/SelectPopupModal'
import { Wrapper } from './styled'

const HISTORY = [
  {
    id: 1,
    activity: 'Start',
    providerName: 'Leslie Alexander',
    date: '2022-05-21 09:00 AM'
  },
  {
    id: 2,
    activity: 'Rescheduled',
    providerName: 'Leslie Alexander',
    date: '2022-05-21 09:00 AM'
  },
  {
    id: 3,
    activity: 'Cancelled',
    providerName: 'Leslie Alexander',
    date: '2022-05-21 09:00 AM'
  },
  {
    id: 4,
    activity: 'Repeat',
    providerName: 'Leslie Alexander',
    date: '2022-05-21 09:00 AM'
  }
]

export default function AppointmentHistoryModal(props) {
  const {
    isOpened,
    setIsOpened,
    // history,
  } = props

  return (
    <SelectPopupModal
      onClose={() => setIsOpened(false)}
      show={isOpened}
      items={[]}
      hideCancelButton={true}
      isConformButton={true}
      buttonLabel="Done"
      handleConfirm={() => setIsOpened(false)}
      maxWidth={375}
    >
      <SimpleBar style={{ maxHeight: 400 }}>
        <Wrapper>
          <div className="header">
            <div className="activity">Activity</div>
            <div className="provider-name">Provider name</div>
            <div className="appointment">Appointment</div>
          </div>
          <div className="list">
            {HISTORY.map(v => {
              return (
                <div className="item" key={v.id}>
                  <div className="activity">{v.activity}</div>
                  <div className="provider-name">{v.providerName}</div>
                  <div className="appointment">{moment(new Date(v.date)).format("MM/DD H.mm A")}</div>
                </div>
              );
            })}
          </div>
        </Wrapper>
      </SimpleBar>
    </SelectPopupModal>
  )
}
