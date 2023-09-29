import { useSelector } from "react-redux"
import FindAppointment from "../../../src/modules/patients.service.module/find-appointment"


function FindAppointmentPage () {
  //const loggedInUser = useSelector( state => state.reg.user)
  
  return <FindAppointment 
    //user={loggedInUser}
  />
}

export default FindAppointmentPage