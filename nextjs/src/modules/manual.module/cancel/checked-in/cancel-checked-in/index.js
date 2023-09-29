import CheckedInComponent from "../../../../../components/Checked-in";
import React from "react";

function CancelCheckedIn(){

    const messageWithLineBreaks = "Refunds are sent to the original payment method(s) you used to make the appointment.\n\nAllow up to 2 weeks for refunds to show up in your bank or credit card account.";

  
    const messageLines = messageWithLineBreaks.split('\n').map((line, index) => (
        <React.Fragment key={index}>
        {line}
        <br />
        </React.Fragment>
    ));

    return(
        <CheckedInComponent
            state="success"
            successMsg="Your appointment was cancelled"
            msg={messageLines}
        />
    )
}

export default CancelCheckedIn