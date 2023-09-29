import Image from 'next/image'
import * as moment from 'moment/moment'
import { Wrapper } from './styled'
import { IMGS } from '../../../../../../../common/utils/styleGuide'

const AptBar = (props) => {
  const {
    apt
  } = props

  return (
    <Wrapper>
      <div className="avatar">
        <Image src={IMGS.avatarDoctor1} layout="responsive" width="100%" height="100%" />
      </div>
      <div className="content">
        <div className="flex">
          <div className="name">{apt.provider.fullName}</div>
          <div className="specialty">{apt.provider.specialty}</div>
        </div>
        <div className="description">Begin preparation for endosopy</div>
        <div className="alert">
          <div className="date"><i>Start date</i>&nbsp;&nbsp;{moment(new Date(apt.aptDate + ' ' + apt.aptTime)).format("MM/DD/YY")}</div>
          <div className="time"><i>Start time</i>&nbsp;&nbsp;{moment(new Date(apt.aptDate + ' ' + apt.aptTime)).format("h:mm A")}</div>
        </div>
      </div>
    </Wrapper>
  )
}

export default AptBar;
