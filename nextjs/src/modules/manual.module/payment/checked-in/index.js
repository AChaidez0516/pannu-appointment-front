import CheckedInComponent from '../../../../components/Checked-in'

function CheckedIn() {

    return (
      <CheckedInComponent 
        state="success" 
        successMsg="You are checked in" 
        msg="Please have a seat and our friendly staff will call you when it is your turn."
      />
    )
}

export default CheckedIn
