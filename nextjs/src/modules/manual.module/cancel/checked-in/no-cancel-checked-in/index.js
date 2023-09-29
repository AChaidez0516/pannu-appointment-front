import CheckedInComponent from "../../../../../components/Checked-in";

function NoCancelChekedIn(){
    return (
        <CheckedInComponent
            state="success"
            successMsg="Your appointment was not canceled"
            msg="Look forward to seeing you at the appointment time."
        />
    )
}

export default NoCancelChekedIn