import { useSelector } from "react-redux"
import CheckInOutView from "../../../src/modules/patients.service.module/check-in-out/Index"


export const getServerSideProps = async (context) => {
  try {
    /** will not use server side rendering for now, 9/19
    const [activities, aptDetail] = await Promise.all([
      getActivitiesByAptId(parseInt(context.params.aptId)),
      getAppointmentDetail(parseInt(context.params.aptId))
    ])
    return {
      props: {
        aptDetail,
        activities,
      }
    }
     */
    return {
      props: { aptId: parseInt(context.params.aptId) }
    }
  } catch (error) {
    console.log("server error: ", error);
  }
}

function CheckInOutPage({ aptId }) {
  // const loggedInUser = useSelector( state => state.reg.user)

  return <CheckInOutView aptId={aptId} />
}

export default CheckInOutPage