import { useState, useEffect } from 'react'
import useWindowDimensions, { DEVICE_TYPE } from '../../../../common/hooks/useWindowDimensions'
import { AptDetail, Activities_In_CheckInCheckOut, ProcessList, ACTIVITY_PROCESS } from "./mockup";
import { Home } from '../Home';
import { SCREENS, SHOW_SECTIONS } from '../shared/data';
import { Layout } from '../shared/Layout';
import { BeginActivity } from '../BeginActivity';
import { Summary } from '../Summary';
import { Ratings } from '../Ratings';
import { getActivitiesByAptId, getAppointmentDetail, updateActivity } from '../../../../common/lib/appointment';
import { mapActivities, mapActivityToUpdate } from '../shared/mapActivities';
import { mapAptDetail } from '../shared/mapAptDetail';
import { toast } from 'react-toastify';


export default function CheckInOutView({ aptId = 1 }) {
  const { width, height, device } = useWindowDimensions()

  const [showSection, setShowSection] = useState(SHOW_SECTIONS)
  const [activity, setActivity] = useState(null)
  const [inProcess, setInProcess] = useState(false)
  const [aptDetail, setAptDetail] = useState(null)
  const [processList, setProcessList] = useState()
  const [activityProcess, setActivityProcess] = useState(ACTIVITY_PROCESS)
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [ratings, setRatings] = useState([])
  const [notes, setNotes] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activities, aptDetail] = await Promise.all([
          getActivitiesByAptId(aptId),
          getAppointmentDetail(aptId)
        ])
        setActivities(mapActivities(activities));
        setAptDetail(mapAptDetail(aptDetail))
      } catch (error) {

      }
    }
    fetchData()
    // setActivities(Activities_In_CheckInCheckOut);
    // setAptDetail(AptDetail)
    setProcessList(ProcessList)
  }, []);

  const changeCurrentScreen = (screenName) => {
    const _showSection = { ...showSection }
    for (const key in _showSection) {
      if (Object.hasOwnProperty.call(_showSection, key)) {
        const element = showSection[key];
        element.show = element.id <= _showSection[screenName].id ? true : false
        element.current = false;
      }
    }
    _showSection[screenName].current = true
    setShowSection(_showSection)
  }

  const goToHomeScreen = () => {
    changeCurrentScreen(SCREENS.HOME)
  }

  const goToActivityScreen = (activity) => {
    setActivity(activity)
    setInProcess(true)
    setProcessList(ProcessList)
    changeCurrentScreen(SCREENS.BEGIN_ACTIVITY)
  }

  const goToSummaryScreen = () => {
    changeCurrentScreen(SCREENS.SUMMARY)
  }

  const goToRatingScreen = () => {
    changeCurrentScreen(SCREENS.RATINGS)
  }

  const shouldShowSection = (sectionName) => {
    if (device === DEVICE_TYPE.DESKTOP) {
      return showSection[sectionName].show
    }
    return showSection[sectionName].current
  }

  const handleAddNotes = (notes) => {
    setActivities(activities.map(a => a.id === activity.id ? ({ ...a, notes: notes }) : a))
  }

  const handleAddActualTimes = (actual, duration) => {
    setActivities(activities.map(a => a.id === activity.id ? ({ ...a, actual, duration }) : a))
  }

  const layoutProps = {
    showSection,
    activity,
    goToHomeScreen,
    goToActivityScreen,
    goToSummaryScreen,
  }


  const handleDoneSubmit = async () => {
    try {
      setIsLoading(true)
      await updateActivity(mapActivityToUpdate(activity, processList.filter(p => p?.start), ratings))
      toast.success("Activity was updated successfully")
    } catch (error) {
      toast.error(error?.data || error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout {...layoutProps}>
      {(aptDetail && activities) && (
        <>
          {shouldShowSection(SCREENS.HOME) && (
            <Home
              activities={activities}
              selectedActivity={activity}
              inProcess={inProcess}
              aptDetail={aptDetail}
              handleSelectItem={goToActivityScreen}
            />
          )}
          {shouldShowSection(SCREENS.BEGIN_ACTIVITY) && activity && (
            <BeginActivity
              activity={activity}
              setActivity={setActivity}
              handleFinish={goToSummaryScreen}
              processList={processList}
              setProcessList={setProcessList}
              activityProcess={activityProcess}
              setActivityProcess={setActivityProcess}
            />
          )}
          {shouldShowSection(SCREENS.SUMMARY) && (
            <Summary
              aptDetail={aptDetail}
              activity={activity}
              processList={processList}
              handleGoRating={goToRatingScreen}
              setInProcess={setInProcess}
              goToHomeScreen={goToHomeScreen}
              handleAddActualTimes={handleAddActualTimes}
              activityProcess={activityProcess}
              handleDoneSubmit={handleDoneSubmit}
            />
          )}
          {shouldShowSection(SCREENS.RATINGS) && (
            <Ratings
              goToSummaryScreen={goToSummaryScreen}
              handleAddNotes={handleAddNotes}
              dispatchRatings={setRatings}
            />
          )}
        </>
      )}
    </Layout>
  )
}
