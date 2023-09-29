import moment from "moment"

export const mapActivities = (activities) => {
  if (!activities || !activities.length) return []
  return activities.map(origin => ({
    id: origin?.id,
    name: origin?.title,
    planned: [toHHmm(origin?.activityDate, origin?.plannedStartTime), toHHmm(origin?.activityDate, origin?.plannedEndTime)],
    actual: [origin?.actualStartTime, origin?.actualEndTime],
    duration: {
      planned: origin?.plannedDuration
    },
    featured: origin?.activityStatus,
    processList: [
      {
        id: 1,
        name: 'doctor',
        duration: '10 minutes'
      }, {
        id: 2,
        name: 'wating',
        duration: '10 minutes'
      },
    ],
    notes: origin?.notes,
    review: '', // json ratings
    appointmentId: origin?.appointmentId,
    patientUserId: origin?.patientUserId,
    providerUserId: origin?.providerUserId,
    rating: origin?.rating,

  }))
}

export const mapActivityToUpdate = (activity, processList, review) => {
  return {
    id: activity?.id,
    activityDate: activity?.activityDate,
    activityStatus: activity?.featured,
    actualDuration: activity?.duration?.actual,
    actualEndTime: activity?.actual[1],
    actualStartTime: activity?.actual[0],
    appointmentId: activity?.appointmentId,
    notes: activity?.notes,
    patientUserId: activity?.patientUserId,
    plannedDuration: activity?.duration?.planned,
    plannedEndTime: activity?.planned[1],
    plannedStartTime: activity?.planned[0],
    processList: JSON.stringify(processList),
    providerUserId: activity?.providerUserId,
    rating: activity?.rating,
    review: JSON.stringify(review),
    title: activity?.name
  }
}

const toHHmm = (dateStr, timeStr) => {
  if (!dateStr) return moment(`2022-01-01T${timeStr}`).format('HH:mm')
  return moment(`${dateStr}T${timeStr}`).format('HH:mm')
}