import {
  PreferredAppointments,
  YourAppointment,
  RegularAppointments,
  FreeSubject,
  ClickTo,
} from "./styled";

const CalendarTitle = () => {
  return (
    <div>
      <PreferredAppointments>
        Preferred appointments - premium service provided by Pannu Corp
      </PreferredAppointments>
      <YourAppointment>
        Your appointment is assured except if unavoidable
      </YourAppointment>
      <RegularAppointments>Regular appointments</RegularAppointments>
      <FreeSubject>Free - subject to change without any notice</FreeSubject>
      <ClickTo>Click to select the appointment you want</ClickTo>
    </div>
  );
};

export default CalendarTitle;
