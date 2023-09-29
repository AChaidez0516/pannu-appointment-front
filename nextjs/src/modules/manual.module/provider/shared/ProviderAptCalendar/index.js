import moment from "moment/moment"
import Image from "next/image"
import { useEffect } from "react"
import { Fragment } from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import { ThreeDotsIcon } from "../../../../../common/utils/Icons"
import { mergeReasons } from "../../../../../common/utils/stringHandle"
import { ICONS } from "../../../../../common/utils/styleGuide"
import { IconWrapper } from "../../../../../components/IconWrapper"
import SelectPopupModal from "../../../../../components/modals/ManualSelectPopupModal"
import { BrComponent } from "../BrComponent"
import { MORE_ACTIONS } from "../data"
import { APT_LIST } from "./mock"
import { AptItem, AptItemWrapper, LabelWrapper, PopupWrapper, StartTimeWrapper, TimeItem, Wrapper } from "./styled"

export const TIME_INTERVAL = 5 // min, space of time block
const TIME_LABEL_INTERVAL = 30 // min

export const ProviderAptCalendar = ({
  startTime,
  endTime,
  aptList = APT_LIST,
  setAptList,
  handleSelectApt,
  selectedApt,
  goToFolowUp
}) => {
  endTime.setMinutes(aptList[aptList.length - 1]?.duration < TIME_LABEL_INTERVAL * 2 ? 61 : (aptList[aptList.length - 1]?.duration + 1))
  const m = startTime.getMinutes()
  if (m % TIME_LABEL_INTERVAL !== 0) {
    startTime.setMinutes(m > TIME_LABEL_INTERVAL ? TIME_LABEL_INTERVAL : 0)
  }
  const timeLength = Math.floor((endTime.getTime() - startTime.getTime()) / 60 / 1000) // min
  // const OFFSET_TIMES = (new Date().getTimezoneOffset()) * 60 * 1000
  const OFFSET_TIMES = 0


  const [apts, setApts] = useState([])
  const [timeBlocks, setTimeBlocks] = useState([])
  const [showMoreActions, setShowMoreActions] = useState(false)
  const [selectedAptForAction, setSelectedAptForAction] = useState(null)
  const [selectedAction, setSelectedAction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const _apts = aptList.map(apt => {
      const aptTime = new Date(apt?.aptDate + "T" + apt?.aptTime)
      return {
        ...apt,
        aptTime: aptTime,
        mils: [aptTime.getTime(), aptTime.getTime() + apt?.duration * 60 * 1000]
      }
    })
    setTimeBlocks(makeTimeBlocks(_apts))
    setApts(_apts)
  }, [aptList, startTime, endTime])

  const makeTimeBlocks = (_apts) => {
    let timeBlocks = []
    for (let index = 0; index < timeLength / TIME_INTERVAL; index++) {
      const start = startTime.getTime() + index * TIME_INTERVAL * 60 * 1000
      const end = start + TIME_INTERVAL * 60 * 1000
      const apt = belongsToApts([start, end], _apts)
      const hasLabel = (index * TIME_INTERVAL) % TIME_LABEL_INTERVAL === 0
      if (index !== 0) {
        const last = [...timeBlocks].pop()
        if (last?.apt && apt && last?.apt?.id === apt?.id && !hasLabel) {
          continue
        }
      }
      timeBlocks.push({
        name: "block-" + (index + 1),
        mils: [start, end],
        times: [new Date(start + OFFSET_TIMES), new Date(end + OFFSET_TIMES)],
        hasLabel: hasLabel,
        apt,
      })
    }
    return timeBlocks
  }

  const shouldShowLabel = (index) => {
    if (index === 0) {
      return true
    }
    const last = timeBlocks[index - 1]
    const curr = timeBlocks[index]
    if (last?.apt) {
      return false
    }
    return true
  }

  const submitAction = () => new Promise((res, rej) => {
    setTimeout(() => {
      res()
    }, 1400)
  })

  const handleSubmitAction = async () => {
    if (isLoading) return
    if (!selectedAptForAction?.id) toast.error("Appointment was not selected")
    try {
      setIsLoading(true)
      const res = await submitAction({
        aptId: selectedAptForAction?.id,
        action: selectedAction,
      })
      if (res?.result || true) {
        goToFolowUp(aptList[0].id);
        // toast.success('Action was stored for given Appointment')
        // setAptList(aptList.map(a => a.id === selectedAptForAction.id ? ({ ...a, aptState: selectedAction.value }) : a))
        
      }
    } catch (error) {
      toast.error(error?.data?.message || error || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelection = (action) => {
    setSelectedAction(action);
    if (action.id === 1) {
      handleSubmitAction();
      setShowMoreActions(false);
    }

  }

  return (
    <Wrapper>
      <LabelWrapper>
        {timeBlocks.map((tb, i) => (
          <Fragment key={i}>
            {(!tb?.apt || tb?.hasLabel) && (
              <TimeItem
                key={i}
                name={tb?.name}
                hasLabel={tb?.hasLabel}
                shouldShowLabel={shouldShowLabel(i)}
                adjustSpaceHeight={tb?.hasLabel && tb?.apt}
              >
                <div className="time">{moment(tb.times[0]).format('hh:mm A')}</div>
              </TimeItem>
            )}
            {tb?.apt && (
              <AptItemWrapper name={tb?.name} duration={tb?.apt?.duration}>
                <AptItem
                  id={tb?.name}
                  className={`${tb?.apt?.aptType?.toLowerCase()} ${tb?.apt?.id === selectedApt?.id ? 'current' : ''}`}
                  onClick={() => handleSelectApt(tb, i, timeBlocks)}
                >
                  <StartTimeWrapper isExpired={tb?.apt?.aptState !== 'ADMIT' && tb?.apt?.aptTime.getTime() < new Date().getTime()}>
                    <div>{moment(tb?.apt.aptTime).format('hh:mm A')}</div>
                    {tb?.apt?.feature && <div className='feature-icon'><Image src={ICONS.camera} width={14} height={8} layout='fixed' /></div>}
                  </StartTimeWrapper>
                  <div className="patient-name">{tb?.apt.patient?.fullName}</div>
                  <div className="dob">{moment(tb?.apt.patient?.dob).format('M/D/YYYY')}</div>
                  <div className="provider_name">{tb?.apt.provider?.fullName}</div>
                  <div className="reason ellipse">
                    <BrComponent str={mergeReasons(tb?.apt?.reasons)} />
                  </div>
                  <div className="duration">
                    <div
                      className="three-dots"
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowMoreActions(true)
                        setSelectedAptForAction(tb?.apt)
                      }}
                    >
                      <IconWrapper length={28}>
                        <ThreeDotsIcon />
                      </IconWrapper>
                    </div>
                    <div>{tb?.apt.duration}</div>
                  </div>
                </AptItem>
              </AptItemWrapper>
            )}
          </Fragment>
        ))}
      </LabelWrapper>
      <SelectPopupModal
        onClose={() => setShowMoreActions(false)}
        show={showMoreActions}
        items={[]}
        isConformButton
        handleConfirm={handleSubmitAction}
        handleCancel={() => setShowMoreActions(false)}
      >
        <PopupWrapper>
          {MORE_ACTIONS.map((action, i) =>
            <div
              key={i}
              className={"item " + (action.id == selectedAction?.id ? "selected" : "")}
              onClick={() => handleSelection(action)}
            >
              <div>{action.label}</div>
              {action?.icon && action?.icon}
            </div>
          )}
        </PopupWrapper>
      </SelectPopupModal>
    </Wrapper>
  )
}

const belongsToApts = (needle, apts) => {
  for (let index = 0; index < apts.length; index++) {
    const apt = apts[index];
    if (belongsToTimes(needle, apt.mils)) {
      return apt
    }
  }
  return null
}

const belongsToTimes = (needle, heep) => {
  if (needle[0] + 1 > heep[0] && needle[1] - 1 < heep[1]) {
    return true
  }
  return false
}

