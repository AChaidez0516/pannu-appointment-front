import moment from "moment"

export const mapAptDetail = (apt) => {
  const scheduleTime = moment(`${apt?.aptDate}T${apt?.aptTime}`)
  return {
    id: apt?.id,
    type: apt?.aptType,
    start_time: scheduleTime.format('hh:mm A'),
    patient: {
      id: apt?.patient?.id,
      fullName: apt?.patient?.fullName,
      dob: apt?.patient?.dob
    },
    provider: {
      id: apt?.provider?.id,
      fullName: apt?.provider?.fullName,
      specialty: apt?.provider?.specialty,
      facilityName: apt?.provider?.facilityName,
    },
    aptDate: scheduleTime.format('dddd MM/DD'),
    aptTime: scheduleTime.format('hh:mm A'),
    duration: apt?.duration,
    estimatedEndTime: scheduleTime.add(apt?.duration || 0, 'minutes').format('hh:mm A'),
    reasons: apt?.reasons,
  }
}