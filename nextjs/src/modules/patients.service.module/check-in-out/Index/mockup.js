import { IMGS } from "../../../../common/utils/styleGuide";
import { APT_TYPE_TO_SEARCH } from "../../apt/view-apts/shared/data";

export const FEATURES_IN_ACTIVITIES = {
  CANCELED: "CANCELED",
  RESCHEDULED: "RESCHEDULED",
  WAITING: "WAITING",
}


export const Activities_In_CheckInCheckOut = [
  {
    id: 1,
    name: "Amet minii b vm mo non deserun",
    planned: ["10:30", "11:20"],
    actual: ["10:20", "11:10"],
    description: "Amet minii b vm mo non deserunAmet minii b vm mo non deserunAmet minii b vm mo non deserunnon deserun",
    duration: {
      planned: 50, // min, if less then 61, not attach 'm'
      actual: 50,
    },
    featured: "",
    notes: '1. Appointments are not guaranteed and subject to change or cancellation at any tAppointments are not guaranteed and subject to change or cancellation at any time without any notice. Appointments are not guaranteed and subject to change or cancellation at any time without any notice.\n' +
      '2. Appointments are not guaranteed.\n' +
      '3. Appointments are not guaranteed and subject to change or cancellation at any time without any notice.Appointments are not guaranteed and subject to change or cancellation at any time without any notice.'
  }, {
    id: 2,
    name: "Amet minii b vm mo non deserun",
    planned: ["10:30", "11:30"],
    actual: ["10:30", "11:40"],
    description: "Amet minii b vm mo non deserunAmet minii b vm mo non deserunAmet minii b vm mo non deserunnon deserun",
    duration: {
      planned: 60, // min, if less then 61, not attach 'm'
      actual: 70,
    },
    featured: "",
    notes: []
  }, {
    id: 3,
    name: "Amet minii b vm mo non deserun",
    planned: ["10:30", "11:00"],
    description: "Amet minii b vm mo non deserunAmet minii b vm mo non deserunAmet minii b vm mo non deserunnon deserun",
    duration: {
      planned: 30, // min, if less then 61, not attach 'm'
      actual: 0,
    },
    actual: [],
    featured: FEATURES_IN_ACTIVITIES.CANCELED,
    notes: []
  }, {
    id: 4,
    name: "Amet minii b vm mo non deserun",
    planned: ["10:30", "11:30"],
    description: "Amet minii b vm mo non deserunAmet minii b vm mo non deserunAmet minii b vm mo non deserunnon deserun",
    actual: ["10:10", "11:10"],
    duration: {
      planned: 40, // min, if less then 61, not attach 'm'
      actual: 40,
    },
    featured: "",
    notes: []
  }, {
    id: 5,
    name: "Amet minii b vm mo non deserun",
    planned: ["10:30", "11:30"],
    description: "Amet minii b vm mo non deserunAmet minii b vm mo non deserunAmet minii b vm mo non deserunnon deserun",
    actual: [],
    duration: {
      planned: 60, // min, if less then 61, not attach 'm'
      actual: 0,
    },
    featured: "",
    notes: []
  }, {
    id: 6,
    name: "Amet minii b vm mo non deserun",
    planned: ["10:30", "11:30"],
    description: "Amet minii b vm mo non deserunAmet minii b vm mo non deserunAmet minii b vm mo non deserunnon deserun",
    actual: [],
    duration: {
      planned: 60, // min, if less then 61, not attach 'm'
      actual: 0,
    },
    featured: FEATURES_IN_ACTIVITIES.RESCHEDULED,
    notes: []
  },
]

export const AptDetail = {
  'id': '1',
  'type': 'regular',
  'start_time': '8:00',
  'patient': {
    'id': 1,
    'fullName': 'Arlene McCoy',
    'dob': '9/4/2022',
  },
  'provider': {
    'fullName': 'Alex Daniel',
    'specialty': 'Neurosurgeon',
    'facilityName': 'Lorem ipsum',
  },
  'aptDate': '2022-09-30',
  'aptTime': '10:30 AM',
  'reason': 'Amet minim mollit non deserunt ullamco est sit aliqua dolor dAmet minim mollit nono',
  'duration': 30,
  'reasonsForVisit': '1. Appointments are not guaranteed and subject to change or cancellation at any tAppointments are not guaranteed and subject to change or cancellation at any time without any notice. Appointments are not guaranteed and subject to change or cancellation at any time without any notice.\n' +
    '2. Appointments are not guaranteed.\n' +
    '3. Appointments are not guaranteed and subject to change or cancellation at any time without any notice.Appointments are not guaranteed and subject to change or cancellation at any time without any notice.',
  'preparations': '1. Appointments are not guaranteed and subject to change or cancellation at any tAppointments are not guaranteed and subject to change or cancellation at any time without any notice. Appointments are not guaranteed and subject ime without any notice. Appointments are not guaranteed and subject to change or cancellation at any time without any notice. Appointments are not guaranteed\n' +
    '2. Appointments are not guaranteed.\n' +
    '3. Appointments are not guaranteed and subject to change or cancellation at any time without any notice.Appointments are not guaranteed and subject to change or cancellation at any time without any notice.',
  'instructions': '1. Appointments are not guaranteed and subject to change or cancellation at any tAppointments are not guaranteed and subject to change or cancellation at any time without any notice. Appointments are not guaranteed and subject ime without any notice. Appointments are not guaranteed and subject to change or cancellation at any time without any notice. Appointments are not guaranteed.\n' +
    '2. Appointments are not guaranteed.\n' +
    '3. Appointments are not guaranteed and subject to change or cancellation at any time without any notice.Appointments are not guaranteed and subject to change or cancellation at any time without any notice.',
  'tasks': '',
  'patientNotes': '1. Appointments are not guaranteed and subject to change or cancellation at any tAppointments are not guaranteed and subject to change or cancellation at any time without any notice. Appointments are not guaranteed and subject ime without any notice. Appointments are not guaranteed and subject to change or cancellation at any time without any notice.\n' +
    '2. Appointments are not guaranteed.\n' +
    '3. Appointments are not guaranteed and subject to change or cancellation at any time without any notice.Appointments are not guaranteed and subject to change or cancellation at any time without any notice.'
}

export const ACTIVITY_PROCESS = {
  // id: 1,
  color: '#000000',
  title: '', // activity title
  start: null, // dateInstance
  duration: 0, // seconds
}

export const ProcessList = [
  {
    id: 1,
    color: '#FF0000',
    title: 'With staff'
  }, {
    id: 2,
    color: '#067EEB',
    title: 'Doctor present'
  }, {
    id: 3,
    color: '#000000',
    title: 'Wait time'
  }, {
    id: 4,
    color: '#1EC510',
    title: 'Waiting'
  }, {
    id: 5,
    color: '#854FC8',
    title: 'Waiting'
  }, {
    id: 6,
    color: '#BE1E2D',
    title: 'Staff busy'
  }
]

export const RATINGS = [
  {
    id: 1,
    name: 'Cleanliess',
    rating: {
      isRating: true,
      value: 0,
    },
    comment: ''
  }, {
    id: 2,
    name: 'Service quality',
    rating: {
      isRating: true,
      value: 0,
    },
    comment: ''
  }, {
    id: 3,
    name: 'Customer care',
    rating: {
      isRating: true,
      value: 0,
    },
    comment: ''
  }, {
    id: 4,
    name: 'Ambiance',
    rating: {
      isRating: true,
      value: 0,
    },
    comment: ''
  }, {
    id: 5,
    name: 'Service provider',
    rating: {
      isRating: true,
      value: 0,
    },
    comment: ''
  }, {
    id: 6,
    name: 'Suggestion',
    rating: {
      isRating: false,
      value: 0,
    },
    comment: ''
  }, {
    id: 7,
    name: 'My notes',
    rating: {
      isRating: false,
      value: 0,
    },
    comment: ''
  }
]