import Image from "next/image";
import { IMGS } from "../../../../../common/utils/styleGuide";
import {
  AptDataViewWrapper,
  ProviderInfo,
  ProviderInfoContent,
  AppointmentData,
  TermsAndCondition,
  CancelReschedulePolicy,
  OurPolicies,
} from "./styled";
import { ListViewButtonGroup, ListViewButton } from "../shared/Calendar/styled";
import { Checkbox } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { APT_TYPE_TO_SEARCH, SCREENS } from "../shared/data";
import ProviderInfoComponent from "../../../../../components/ProviderInfoComponent";
import AptInfoComponent from "../../../../../components/AptInfoComponent";
import LoadingButton from "../../../../../components/Button/LoadingButton";
import { useState } from "react";

const useStyles = makeStyles({
  customCheckbox: {
    color: "#173FD4!important", // Set the color here
  },
});

export default function AptDataView({ selectedApt, handleBack }) {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <AptDataViewWrapper>
      {/* <ProviderInfo>
        <div className="avatar">
          <Image
            src={IMGS.avatarDoctor1}
            width={42}
            height={42}
            layout={"responsive"}
          />
        </div>
        <div className="providerInfoContent">
          <div className="name">Darlene Robertson</div>
          <div className="address">
            6513 Dogwood Ave undefined Syracuse, Alaska 62927 United States
          </div>
        </div>
        <div className="role">Neurosurgeon</div>
      </ProviderInfo> */}
      <ProviderInfoComponent providerId={16} hideHMO={true} />
      {/* <AppointmentData
        borderColor={
          selectedApt.aptType === APT_TYPE_TO_SEARCH.PREFERRED
            ? "#2f80ed80"
            : "#ff00004d"
        }
      >
        <div className="aptDataContent">
          <div
            className="aptDataType"
            style={{
              color:
                selectedApt.aptType === APT_TYPE_TO_SEARCH.PREFERRED
                  ? "#0065fb"
                  : "#ff0000",
            }}
          >{`${
            selectedApt.aptType.charAt(0).toUpperCase() +
            selectedApt.aptType.slice(1).toLowerCase()
          } Appointment`}</div>
          <div className="aptDataTime">
            <div className="aptDataDay">{`${
              selectedApt.aptDay.charAt(0).toUpperCase() +
              selectedApt.aptDay.slice(1).toLowerCase()
            } ${selectedApt.aptDate}`}</div>
            <div className="aptDataStarttime">{`Start time ${
              selectedApt.aptTime
            } ${
              Number(selectedApt.aptTime.slice(0, 2)) > 11 ? "PM" : "AM"
            }`}</div>
          </div>
        </div>
        <div
          className="aptDataEdit"
          style={{
            color:
              selectedApt.aptType === APT_TYPE_TO_SEARCH.PREFERRED
                ? "#0065fb"
                : "#ff0000",
          }}
        >
          Edit
        </div>
      </AppointmentData> */}
      <AptInfoComponent aptId={2} isNotCancel={true} showEditBtn={true}/>
      <TermsAndCondition>
        <div className="feesTitle">Fees</div>
        <div className="feesContent">
          Clinicians strive to give their patients the time and attention they
          need to deliver high quality care. <br />
          <br />
          The unpredictable environment may make it difficult to keep
          appointments to schedule.
          <br />
          <br />
          You will receive a request to pay the copay + deductible + coinsurance
          + self pay after we obtain the amount from your insurance plan close
          to your appointment.
        </div>
        <div className="feesList">
          <ol className="numberedList">
            <li>
              <div className="listOption">
                <div>
                  Appointment reservation fee <br /> Refundable. See cancelation
                  policy below
                </div>
                <div>$ XX.XX</div>
              </div>
              <div className="listOption">
                <div>
                  On completion of this appointment, roll over this amount to
                  pay for future appointments with any provider on this network,
                  instead of refunding back to you.
                </div>
                <Checkbox
                  className={classes.customCheckbox}
                  defaultChecked
                ></Checkbox>
              </div>
            </li>
            <li>
              <div className="listOption">
                <div>
                  Urgent/Preferred/Wait listed appointment fee <br /> Payable to
                  Pannu Corp
                </div>
                <div>$0.00</div>
              </div>
              <div className="listOption bold">
                <div>Total charge today</div>
                <div>$XX.XX</div>
              </div>
            </li>
          </ol>
        </div>
        <div className="deductible">
          Deductible, coinsurance and self pay are subject to change before or
          after the appointment based on updated data from your insurance plan,
          and services performed during the appointment.
          <br />
          <br />
          You will be notified if we need to process any adjustments or refunds.
        </div>
        <div className="agreeOption">
          <div className="agree">
            I agree to the <span>Terms and Conditions</span>*
          </div>
          <Checkbox
            className={classes.customCheckbox}
            defaultChecked
          ></Checkbox>
        </div>
      </TermsAndCondition>
      <CancelReschedulePolicy>
        <div className="title">No-show, cancel and reschedule policy</div>
        <div className="noshowfee">No show fee - $XX.XX </div>
        <div className="cancelReschedule">
          <span className="title">Cancel</span>
          <br /> 1. Under 1 business day before appointment - $XX.XX <br /> 2.
          1-2 business days before appointment - $XX.XX
        </div>
        <div className="cancelReschedule">
          <span className="title">Reschedule</span>
          <br /> 1. Under 1 business day before appointment - $XX.XX <br /> 2.
          1-2 business days before appointment - $XX.XX
        </div>
        <div className="emergency">
          Cancel because of an emergency - reversal of fee charged by and at the
          sole discretion of the clinician.
        </div>
      </CancelReschedulePolicy>
      <OurPolicies>
        <div className="title">Our policies</div>
        <div className="content">
          <span>Important:</span> You may receive additional forms and
          instructions from the provider when the appointment is confirmed
        </div>
      </OurPolicies>
      <ListViewButtonGroup>
        <ListViewButton onClick={() => handleBack(SCREENS.APPOINTMENT_DATA)}>
          Cancel
        </ListViewButton>
        <LoadingButton isLoading={isLoading}>
           <ListViewButton>Checkout</ListViewButton>
        </LoadingButton>
       
      </ListViewButtonGroup>
    </AptDataViewWrapper>
  );
}
