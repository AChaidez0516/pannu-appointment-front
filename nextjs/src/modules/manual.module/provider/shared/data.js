import {
  ArrowLeft,
  CrossCloseIcon,
  RescheduleClockIcon,
} from "../../../../common/utils/Icons";

export const SCREENS = {
  HOME: "HOME",
  FOLLOWUP: "FOLLOWUP",
  DETAILS: "DETAILS",
  EDITOR: "EDITOR",
};

/** [show: true] can be multiple, [current: true] can be only one
 * if desktop, check [show]
 * if mobile, check [current]
 */
export const SHOW_SECTIONS = [
  {
    id: 1,
    name: SCREENS.HOME,
    title: "Appointments",
    current: true,
    show: true,
  },
  {
    id: 2,
    name: SCREENS.FOLLOWUP,
    title: "Follow up appointment",
    current: false,
    show: false,
  },
  {
    id: 3,
    name: SCREENS.DETAILS,
    title: "Add another appointment",
    current: false,
    show: false,
  },
  {
    id: 4,
    name: SCREENS.EDITOR,
    title: "Edit",
    current: false,
    show: false,
  },
];

export const EDITOR_TYPE = {
  PREPARATION: "PREPARATION",
  INSTRUCTION: "INSTRUCTION",
  MY_NOTES: "MY NOTES",
  RESOURCE_NOTIFICATION: "RESOURCE NOTIFICATION",
  FORMS: "FORMS"
};

export const FILTER_OPTIONS = {
  NAME: "NAME",
  AGE_RANGE: "AGE_RANGE",
  DOB_RANGE: "DOB_RANGE",
  DATE_RANGE: "DATE_RANGE",
};
export const FILTER_OPTION_LIST = [
  {
    id: 1,
    name: FILTER_OPTIONS.NAME,
    label: "Name",
  },
  {
    id: 2,
    name: FILTER_OPTIONS.AGE_RANGE,
    label: "Age range",
    dropDown: true,
  },
  {
    id: 3,
    name: FILTER_OPTIONS.DOB_RANGE,
    label: "Range date of birth",
    dropDown: true,
  },
  {
    id: 4,
    name: FILTER_OPTIONS.DATE_RANGE,
    label: "Date range",
    dropDown: true,
  },
];

export const MORE_ACTIONS = [
  {
    id: 1,
    value: "ADMIT",
    label: "Admit",
    icon: null,
  },
  {
    id: 2,
    value: "RESCHEDULE",
    label: "Reschedule",
    icon: <RescheduleClockIcon />,
  },
  {
    id: 3,
    value: "CANCEL_APPOINTMENT",
    label: "Cancel appointment",
    icon: <CrossCloseIcon />,
  },
  {
    id: 4,
    value: "NO_SHOW",
    label: "No-show",
    icon: null,
  },
];

export const RESCHEDULED_PAGE_SCREENS = {
  HOME: "HOME",
  HISTORY: "HISTORY",
};
