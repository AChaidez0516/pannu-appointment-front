import Image from 'next/image'
import { AptCardWrapper } from './styled'
import { PhoneIcon_1, VideoIcon_1 } from '../../../../../../common/utils/Icons'
import { IMGS } from '../../../../../../common/utils/styleGuide'
import { APT_TYPE_TO_SEARCH, MEETING_TYPE } from '../data'
import moment from 'moment'

export default function AptCard({ apt, onClick }) {
  const { provider, testInfo, procedureInfo } = apt;
  
  const getAptColor = () => {
    if (apt.aptType === APT_TYPE_TO_SEARCH.PREFERRED)
      return "#173FD4";
    if (apt.aptType === APT_TYPE_TO_SEARCH.URGENT)
      return "#FF0000";
    if (apt.aptType === APT_TYPE_TO_SEARCH.WAIT_LIST)
      return "#FAC23C";
    if (moment(apt.aptDate).isBefore(moment(new Date()).format("YYYY-MM-DD")))
      return '#FF9100 !important';
  }

  return (
    <AptCardWrapper>
      {testInfo && <div className="test-info"></div>}
      {procedureInfo && <div className="procedure-info"></div>}
      <div className="content" style={{ borderColor: getAptColor() }} onClick={onClick}>
        <div className="provider-info">
          <div className='avatar'>
            <Image
              src={IMGS.avatarDoctor1}
              width={30} height={30}
              layout={'responsive'}
              alt='provider-avatar'
            />
          </div>
          <div className='right'>
            <div className="time">{moment(new Date(apt.aptDate + ' ' + apt.aptTime)).format("h:mm A")}</div>
            <div className="name">{provider.fullName}</div>
          </div>
        </div>
        {
          moment(apt.aptDate).isBefore(moment(new Date()).format("YYYY-MM-DD")) && 
          <div className="missedApt">
            <img  src={IMGS.missedAptIcon} />
          </div>          
        }        
        <div className="extra">
          <div className="left">
            <div className="patient-name">Floyd Miles</div>
            <div className="specialty">{provider.specialty}</div>
          </div>
          <div className="right">MD BC</div>
        </div>
        {apt.meetingType == MEETING_TYPE.PHONE && (
          <div className="meeting-type-icon">
            <PhoneIcon_1 width={13} height={10} color="#000000" />
          </div>
        )}
        {apt.meetingType == MEETING_TYPE.VIDEO && (
          <div className="meeting-type-icon">
            <VideoIcon_1 width={13} height={10} color="#000000" />
          </div>
        )}
        {apt.icon && (
          <div className="specialty-icon">
            <Image 
              src={aptInfo.icon}
              width={20} height={20}
              layout={'responsive'}
              alt='specialty-icon'
            />
          </div>
        )}
      </div>
    </AptCardWrapper>
  )
}
