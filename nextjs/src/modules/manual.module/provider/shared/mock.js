import moment from "moment"

export const APT_LIST = [
  {
    'id': '1',
    'aptType': 'regular',
    aptDate: moment().format('YYYY-MM-DD'),
    'aptTime': '08:00',
    'patient': {
      'id': 1,
      'fullName': 'Arlene McCoy',
      'dob': '9/4/2022',
    },
    'provider': {
      'fullName': 'Alex Daniel',
      'specialty': 'Neurosurgeon'
    },
    'reasonss': 'Amet minim mollit non deserunt',
    'duration': 30,
    _disp: {
      isCurrent: false,
      isExpired: false,
      reasons: "1. Diabetes\n2. Peripheral neuritis\n3. Hypertension\n",
    }
  },
  {
    'id': '2',
    'aptType': 'preferred',
    aptDate: moment().format('YYYY-MM-DD'),
    'aptTime': '08:45',
    'patient': {
      'id': 1,
      'fullName': 'Arlene McCoy',
      'dob': '9/4/2022',
    },
    'provider': {
      'fullName': 'Alex Daniel',
      'specialty': 'Neurosurgeon'
    },
    'reasons': 'Amet minim mollit non deserunt',
    'duration': 30,
    _disp: {
      isCurrent: true,
      isExpired: false,
      reasons: "1. Diabetes\n2. Peripheral neuritis\n3. Hypertension\n",
    }
  },
  {
    'id': '3',
    'aptType': 'preferred',
    aptDate: moment().format('YYYY-MM-DD'),
    'aptTime': '10:00',
    'patient': {
      'id': 1,
      'fullName': 'Arlene McCoy',
      'dob': '9/4/2022',
    },
    'provider': {
      'fullName': 'Alex Daniel',
      'specialty': 'Neurosurgeon'
    },
    'reasons': 'Amet minim mollit non deserunt',
    'duration': 30,
    _disp: {
      isCurrent: false,
      isExpired: true,
      reasons: "1. Diabetes\n2. Peripheral neuritis\n3. Hypertension\n",
    },
    feature: true, // for camera
  },
  {
    'id': '4',
    'aptType': 'urgent',
    aptDate: moment().format('YYYY-MM-DD'),
    'aptTime': '11:30',
    'patient': {
      'id': 1,
      'fullName': 'Arlene McCoy',
      'dob': '9/4/2022',
    },
    'provider': {
      'fullName': 'Alex Daniel',
      'specialty': 'Neurosurgeon'
    },
    'reasons': 'Amet minim mollit non deserunt',
    'duration': 30,
    _disp: {
      isCurrent: false,
      isExpired: false,
      reasons: "1. Diabetes\n2. Peripheral neuritis\n3. Hypertension\n",
    }
  },
  {
    'id': '6',
    'aptType': 'preferred',
    aptDate: moment().format('YYYY-MM-DD'),
    'aptTime': '16:00',
    'patient': {
      'id': 1,
      'fullName': 'Arlene McCoy',
      'dob': '9/4/2022',
    },
    'provider': {
      'fullName': 'Alex Daniel',
      'specialty': 'Neurosurgeon'
    },
    'reasons': 'Amet minim mollit non deserunt',
    'duration': 30,
    _disp: {
      isCurrent: false,
      isExpired: false,
      reasons: "1. Diabetes\n2. Peripheral neuritis\n3. Hypertension\n",
    },

  },
]

export const APT_DETAIL = {
  'id': '1',
  'aptType': 'regular',
  aptDate: moment().format('YYYY-MM-DD'),
  'aptTime': '08:00',
  'patient': {
    'id': 1,
    'fullName': 'Arlene McCoy',
    'dob': '9/4/2022',
  },
  'provider': {
    'fullName': 'Alex Daniel',
    'specialty': 'Neurosurgeon'
  },
  'aptTime': '10:30 AM',
  'reasons': 'Amet minim mollit non deserunt',
  'duration': 30,
  _disp: {
    reasons: '1. Appointments are not guaranteed and subject to change or cancellation at any tAppointments are not guaranteed and subject to change or cancellation at any time without any notice. Appointments are not guaranteed and subject to change or cancellation at any time without any notice.\n' +
      '2. Appointments are not guaranteed.\n' +
      '3. Appointments are not guaranteed and subject to change or cancellation at any time without any notice.Appointments are not guaranteed and subject to change or cancellation at any time without any notice.',
    'preparations': '1. Appointments are not guaranteed and subject to change or cancellation at any tAppointments are not guaranteed and subject to change or cancellation at any time without any notice. Appointments are not guaranteed and subject ime without any notice. Appointments are not guaranteed and subject to change or cancellation at any time without any notice. Appointments are not guaranteed\n' +
      '2. Appointments are not guaranteed.\n' +
      '3. Appointments are not guaranteed and subject to change or cancellation at any time without any notice.Appointments are not guaranteed and subject to change or cancellation at any time without any notice.',
    'instructions': '1. Appointments are not guaranteed and subject to change or cancellation at any tAppointments are not guaranteed and subject to change or cancellation at any time without any notice. Appointments are not guaranteed and subject ime without any notice. Appointments are not guaranteed and subject to change or cancellation at any time without any notice. Appointments are not guaranteed.\n' +
      '2. Appointments are not guaranteed.\n' +
      '3. Appointments are not guaranteed and subject to change or cancellation at any time without any notice.Appointments are not guaranteed and subject to change or cancellation at any time without any notice.',
  },
  'tasks': '',
  'patientNotes': '1. Appointments are not guaranteed and subject to change or cancellation at any tAppointments are not guaranteed and subject to change or cancellation at any time without any notice. Appointments are not guaranteed and subject ime without any notice. Appointments are not guaranteed and subject to change or cancellation at any time without any notice.\n' +
    '2. Appointments are not guaranteed.\n' +
    '3. Appointments are not guaranteed and subject to change or cancellation at any time without any notice.Appointments are not guaranteed and subject to change or cancellation at any time without any notice.'
}