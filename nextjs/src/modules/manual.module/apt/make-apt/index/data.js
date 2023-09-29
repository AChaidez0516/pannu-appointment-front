import { v4 as uuidv4 } from 'uuid';

export const GUTTER_WIDTH = 50
export const MAX_STEP = 3

export const STEP_NUMBERS = {
  START_STEP: 0,
  CALENDAR_STEP: 1,
  SUMMARY_STEP: 2,
  PAYMENT_STEP: 3,
}

export const APTTYPE = {
  URGENT: 'URGENT',
  PREFERRED: 'PREFERRED',
  REGULAR: 'REGULAR',
  WAIT_LIST: 'WAIT_LIST'
}

export const APTKIND = {
  FOLLOWUP: 'FOLLOWUP',
  REGULAR: 'REGULAR',
  WALK_IN: 'WALK_IN',
}

export const fakePastReasons = [
  {
    id: 1,
    title: "Munch",
    lastSeenDate: "13/10/2021",
    available: true,
    futureDate: null
  }, {
    id: 2,
    title: "Botticelli",
    lastSeenDate: "13/10/2021",
    available: true,
    futureDate: null,
    isDisableChange: true,
  }, {
    id: 3,
    title: "El Greco",
    lastSeenDate: null,
    available: false,
    futureDate: "13/10/2021",
    isDisableChange: true,
  }, {
    id: 4,
    title: "Cassatt",
    lastSeenDate: "13/10/2021",
    available: true,
    futureDate: null
  }, {
    id: 5,
    title: "Picasso",
    lastSeenDate: "13/10/2021",
    available: false,
    futureDate: "13/10/2021"
  },
];
export const fakeNewReasons = [
  {
    id: 11,
    title: "Reason1",
    description: "Description of reason of reason of reason of reason of reason of reason of reason of reason of reason of reason of reason of reason of"
  }, {
    id: 12,
    title: "Reason2",
    description: "Description of reason of reason of reason of reason of reason of reason of reason of reason of reason of reason of reason of reason of"
  }, {
    id: 13,
    title: "Reason3",
    description: "Description of reason of reason of reason of reason of reason of reason of reason of reason of reason of reason of reason of reason of"
  }, {
    id: 14,
    title: "Reason4",
    description: "Description of reason of reason of reason of reason of reason of reason of reason of reason of reason of reason of reason of reason of"
  }, {
    id: 15,
    title: "Reason5",
    description: "Description of reason of reason of reason of reason of reason of reason of reason of reason of reason of reason of reason of reason of"
  }
]
export const fakeAllReasons = [
  {
    id: 1,
    title: "Munch",
    // checked: false,
  }, {
    id: 2,
    title: "Botticelli"
  }, {
    id: 3,
    title: "El Greco"
  }, {
    id: 4,
    title: "Cassatt"
  }, {
    id: 5,
    title: "Picasso"
  }, {
    id: 6,
    title: "new reason 6"
  }, {
    id: 7,
    title: "new reason 7"
  }, {
    id: 8,
    title: "new reason 8"
  }, {
    id: 9,
    title: "new reason 9"
  }, {
    id: 10,
    title: "new reason 10"
  },
]

export const WEEK_BUSY_TIMES = [
  {
    id: 1,
    day: 'M',
    from: '08:00',
    to: '14:00',
    hr: 0,
    min: 45,
    isBusy: true,
  }, {
    id: 2,
    day: 'Tu',
    from: '08:00',
    to: '14:00',
    hr: 0,
    min: 45,
    isBusy: true,
  }, {
    id: 3,
    day: 'Th',
    from: '08:00',
    to: '14:00',
    hr: 0,
    min: 30,
    isBusy: true,
  }, {
    id: 4,
    day: 'F',
    from: '08:00',
    to: '14:00',
    hr: 0,
    min: 20,
    isBusy: true,
  }, {
    id: 5,
    day: 'W',
    from: '08:00',
    to: '14:00',
    hr: 0,
    min: 20,
    isBusy: false,
  }, {
    id: 6,
    day: 'S',
    from: '08:00',
    to: '14:00',
    hr: 1,
    min: 20,
    isBusy: false,
  }, {
    id: 7,
    day: 'Su',
    from: '08:00',
    to: '14:00',
    isClosed: true
  },
]

export const APT_KINDS = [
  {
    isChooseType: true,
    label: 'Follow up appointment',
    value: APTKIND.FOLLOWUP,
  }, {
    isChooseType: true,
    label: 'First available appointment',
    value: APTKIND.REGULAR,
  }, {
    isChooseType: true,
    label: 'Walk in',
    value: APTKIND.WALK_IN,
  }
]

export const INIT_URGENT_DETAIL = {
  needUrgentApt: undefined,
  willGoToEmergencyRoom: undefined,
  willFindAnotherProvider: undefined,
}


export const CALENDAR_TYPE = [
  {
    id: 1,
    label: "Urgent appointment",
    value: APTTYPE.URGENT,
    selectedAsMain: false, // unused for now
  }, {
    id: 2,
    label: "Preferred appointment",
    value: APTTYPE.PREFERRED,
    selectedAsMain: false,
  }, {
    id: 3,
    label: "First available appointment",
    value: APTTYPE.REGULAR,
    selectedAsMain: false,
  }, {
    id: 4,
    label: "Wait list appointment",
    value: APTTYPE.WAIT_LIST,
    selectedAsMain: false,
  },
]
export const HEADER_PROPS = {
  title: 'Appointment',
  backUrl: '/auth/login/',
  countOfNotifications: 20
}

const m = 8
export const regularEvents = [
  {
    id: 1,
    title: '',
    start: new Date(2022, m, 16, 10),
    end: new Date(2022, m, 16, 10, 5)
  }, {
    id: 2,
    title: '',
    start: new Date(2022, m, 16, 11),
    end: new Date(2022, m, 16, 11, 5)
  }, {
    id: 3,
    title: '',
    start: new Date(2022, m, 17, 12),
    end: new Date(2022, m, 17, 12, 5)
  }, {
    id: 4,
    title: '',
    start: new Date(2022, m, 18, 10),
    end: new Date(2022, m, 18, 10, 5),
    // isInWaitList: true, // waitlist
    // isBookedSlot: true // 
  }, {
    id: 5,
    title: '',
    start: new Date(2022, m, 18, 15),
    end: new Date(2022, m, 18, 15, 5)
  }, {
    id: 6,
    title: '',
    start: new Date(2022, m, 19, 9),
    end: new Date(2022, m, 19, 9, 5)
  }, {
    id: 7,
    title: '',
    start: new Date(2022, m, 19, 9, 15),
    end: new Date(2022, m, 19, 9, 20)
  }, {
    id: 8,
    title: '',
    start: new Date(2022, m, 19, 9, 30),
    end: new Date(2022, m, 19, 9, 35)
  }, , {
    id: 9,
    title: '',
    start: new Date(2022, m, 6, 15),
    end: new Date(2022, m, 6, 15, 5)
  }, {
    id: 10,
    title: '',
    start: new Date(2022, m, 10, 9),
    end: new Date(2022, m, 10, 9, 5)
  }, {
    id: 11,
    title: '',
    start: new Date(2022, m, 13, 9, 15),
    end: new Date(2022, m, 23, 9, 20)
  }, {
    id: 12,
    title: '',
    start: new Date(2022, m, 14, 9, 30),
    end: new Date(2022, m, 14, 9, 35)
  }, {
    id: 12,
    title: '',
    start: new Date(2022, m, 21, 9, 30),
    end: new Date(2022, m, 21, 9, 35)
  },  {
    id: 12,
    title: '',
    start: new Date(2022, m, 2, 9, 30),
    end: new Date(2022, m, 2, 9, 35)
  }, 
]

export const PAYMENT_CARD_LIST = [
  {
    id: 1, // paymentCardId
    lastDigit: 8887,
    dateToCharge: new Date(),
    amount: 32.32,
    convFee: 23.22,
    totalCharge: 1232.33,
  }, {
    id: 2,
    lastDigit: 2345,
    dateToCharge: new Date(),
    amount: 32.32,
    convFee: 23.22,
    totalCharge: 1232.33,
  }, {
    id: 3,
    lastDigit: 9876,
    dateToCharge: new Date(),
    amount: 32.32,
    convFee: 23.22,
    totalCharge: 1232.33,
  },
] 
const initialCard = {
  lastDigit: 2323,
  dateToCharge: new Date(),
  amount: 0,
  convFee: 30.33,
  totalCharge: 0,
}
export const PAYMENT_CARDS_REDUCER_ACTIONS = {
  ROW_ADD: 'ROW_ADD',
  ROW_DELETE: 'ROW_DELETE',
  UPDATE_DATE: 'UPDATE_DATE',
  UPDATE_AMOUNT: 'UPDATE_AMOUNT'
}
export const paymentCardsReducer = (state, {type, payload}) => {
  switch (type) {
    case PAYMENT_CARDS_REDUCER_ACTIONS.ROW_ADD:
      return [...state, {...initialCard, id: uuidv4()}]

    case PAYMENT_CARDS_REDUCER_ACTIONS.ROW_DELETE:
      // if(state.length === 1) return state
      return state.filter(row => row.id !== payload.paymentCardId)

    case PAYMENT_CARDS_REDUCER_ACTIONS.UPDATE_DATE:
      return state.map(row => row.id === payload.paymentCardId ? 
        ({...row, dateToCharge: payload.dateToCharge }) : row)

    case PAYMENT_CARDS_REDUCER_ACTIONS.UPDATE_AMOUNT:
      return state.map(row => row.id === payload.paymentCardId ? 
        ({...row, amount: payload.amount }) : row)

    default:
      return state
  }
}
export const APT_FORM_FIELDS = {
  SELECTED_REASONS: 'reasonsToSelect',
  IS_VIDEO: 'isVideo',
  IS_PHONE: 'isPhone',
  DETAIL_REASON: 'detailReason',
  START_TIME_EVENT: 'startTimeEvent',
  CALENDAR_TYPE: 'calendarType',
  WAIT_LIST: 'waitList'
}
export const APT_FORM_INIT = {
  reasonsToSelect: [],
  isVideo: false,
  isPhone: false,
  detailReason: '',
  startTimeEvent: null,
  calendarType: null,
  waitList: []
}

export const APT_FORM_REDUCER_ACTION = {
  UPDATE_STATE: 'UPDATE_STATE',
}

export const aptFormReducer = (state, {type, payload}) => {
  switch (type) {
    case APT_FORM_REDUCER_ACTION.UPDATE_STATE:
      return {...state, [payload.field]: payload.value}
    
    default:
      return state
  }
}

export const RESCHEDULE_FLOW_ORDER = {
  FIRST_RESCHEDULE: 1,
  EDIT_RESCHEDULE: 2 
};