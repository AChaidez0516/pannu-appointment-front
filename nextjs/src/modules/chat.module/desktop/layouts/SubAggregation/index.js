import {
  SubAggregationWrapper
} from './styled'
import Image from "next/image";
import {GreenCheckIcon, OrangeClockIcon, StarIcon} from "../../../../../common/utils/Icons";

const SubAggregation = ({ collapsed,
  urgent, priority, followed, notification, transcription_completed, transcription_pending
                        }) => {
  return (
    <SubAggregationWrapper>
      { (!collapsed && urgent > 0) && (
        <>
          <div className="icon1" style={{ marginTop: 2 }}><Image src="/assets/icons/urgent-2.png" width={19} height={15} layout="fixed" /></div>
          <div className="num">{urgent}</div>
        </>
      ) }
      { (!collapsed && priority > 0) && (
        <>
          <div className="icon1"><Image width="11" height="11" layout="fixed" src="/assets/images/svg/priority.svg" /></div>
          <div className="num">{priority}</div>
        </>
      ) }
      { (!collapsed && followed > 0) && (
        <>
          <div className="icon1"><StarIcon width={12} height={12}/></div>
          <div className="num">{followed}</div>
        </>
      ) }
      { (!collapsed && transcription_completed > 0) && (
        <>
          <div className="icon1"><GreenCheckIcon width={12} height={12} /></div>
          <div className="num">{followed}</div>
        </>
      ) }
      { (!collapsed && transcription_pending > 0) && (
        <>
          <div className="icon1"><OrangeClockIcon width={12} height={12} /></div>
          <div className="num">{followed}</div>
        </>
      ) }
      { (notification > 0)&& (
        <div className="notification">{notification}</div>
      ) }
    </SubAggregationWrapper>
  )
}

export default SubAggregation