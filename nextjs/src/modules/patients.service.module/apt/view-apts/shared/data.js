import { IMGS, ICONS } from '../../../../../common/utils/styleGuide'

export const SCREENS = {
  LIST_VIEW: 'LIST_VIEW',
  PREPARATIONS: 'PREPARATIONS',
  TRANSACTION_VIEW: 'TRANSACTION_VIEW',
  RESCHEDULE: 'RESCHEDULE',
  CHECKOUT: 'CHECKOUT'
}

export const HEADER_PROPS = {
  title: 'All Appointments',
  backUrl: '/auth/login/',
  countOfNotifications: 15,
  page: SCREENS.LIST_VIEW
}

export const APT_TYPE_TO_SEARCH = {
  ALL: 'ALL',
  FOLLOW_UP: 'FOLLOW_UP',
  PREFERRED: 'PREFERRED',
  URGENT: 'URGENT',
  WAIT_LIST: 'WAIT_LIST',
  MISSED: 'MISSED'
}

export const APT_STATUS = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
}

export const VIEW_TYPE = {
  LIST_VIEW: 'LIST_VIEW',
  CALENDAR_VIEW: 'CALENDAR_VIEW'
}

export const bookedApt = {
  providerInfo: {
    userAvatar: '',
    fullName: 'Darlene Robertson',
    specialty: 'Neurosurgeon',
    facilityName: '6513 Dogwood Ave undefined Syracuse, AK 62927 US',
    providerType: ['POEM', 'PPO'],
  },
  aptInfo: {
    reasonForVisit: 'Head ache',
    startTime: 'MM/DD, HH:MM',
  }
  
}

export const MEETING_TYPE = {
  PHONE: 'PHONE',
  VIDEO: 'VIDEO',
  ONSITE: 'ONSITE'
}

export const AptsTransactionHistory = [
  {
    id: 1,
    aptId: 5,
    aptType: APT_TYPE_TO_SEARCH.PREFERRED,
    providerName: 'Linda Bailey',
    providerAvatar: IMGS.avatarDoctor1,
    date: '2022-08-30 00:00:00',
    apptFee: 12.34,
    copay: 12.34,
    deductible: 1234.55,
    coinsurance: 1234.55,
    selfpay: 1234.55,
    serviceFee: 12.34,
    total: 10234.55,
    isRescheduled: false,
    isCancelled: false,
    isPoem: false
  },
  {
    id: 2,
    aptType: APT_TYPE_TO_SEARCH.WAIT_LIST,
    providerName: 'Linda Bailey',
    providerAvatar: IMGS.avatarDoctor1,
    date: '2022-08-30 00:00:00',
    apptFee: 12.34,
    copay: 12.34,
    deductible: 1234.55,
    coinsurance: 1234.55,
    selfpay: 1234.55,
    serviceFee: 12.34,
    total: 10234.55,
    isRescheduled: true,
    isCancelled: false,
    isPoem: false
  },
  {
    id: 3,
    aptId: 2,
    aptType: APT_TYPE_TO_SEARCH.URGENT,
    providerName: 'Linda Bailey',
    providerAvatar: IMGS.avatarDoctor2,
    date: '2022-08-30 00:00:00',
    apptFee: 12.34,
    copay: 12.34,
    deductible: 1234.55,
    coinsurance: 1234.55,
    selfpay: 1234.55,
    serviceFee: 12.34,
    total: 10234.55,
    isRescheduled: false,
    isCancelled: false,
    isPoem: false
  },
  {
    id: 4,
    aptId: 3,
    aptType: APT_TYPE_TO_SEARCH.PREFERRED,
    providerName: 'Linda Bailey',
    providerAvatar: IMGS.avatarDoctor3,
    date: '2022-08-30 00:00:00',
    apptFee: 12.34,
    copay: 12.34,
    deductible: 1234.55,
    coinsurance: 1234.55,
    selfpay: 1234.55,
    serviceFee: 12.34,
    total: 10234.55,
    isRescheduled: false,
    isCancelled: false,
    isPoem: false
  },
  {
    id: 5,
    aptId: 4,
    aptType: APT_TYPE_TO_SEARCH.PREFERRED,
    providerName: 'Linda Bailey',
    providerAvatar: IMGS.avatarDoctor3,
    date: '2022-08-30 00:00:00',
    apptFee: 12.34,
    copay: 12.34,
    deductible: 1234.55,
    coinsurance: 1234.55,
    selfpay: 1234.55,
    serviceFee: 12.34,
    total: 10234.55,
    isRescheduled: false,
    isCancelled: true,
    isPoem: false
  },
  {
    id: 6,
    aptType: APT_TYPE_TO_SEARCH.PREFERRED,
    providerName: 'Linda Bailey',
    providerAvatar: IMGS.avatarDoctor1,
    date: '2022-08-30 00:00:00',
    apptFee: 12.34,
    copay: 12.34,
    deductible: 1234.55,
    coinsurance: 1234.55,
    selfpay: 1234.55,
    serviceFee: 12.34,
    total: 10234.55,
    isRescheduled: false,
    isCancelled: false,
    isPoem: false
  },
  {
    id: 7,
    aptType: APT_TYPE_TO_SEARCH.PREFERRED,
    providerName: 'Linda Bailey',
    providerAvatar: IMGS.avatarDoctor1,
    date: '2022-08-12 00:00:00',
    apptFee: 12.34,
    copay: 12.34,
    deductible: 1234.55,
    coinsurance: 1234.55,
    selfpay: 1234.55,
    serviceFee: 12.34,
    total: 10234.55,
    isRescheduled: false,
    isCancelled: false,
    isPoem: true
  },
  {
    id: 8,
    aptType: APT_TYPE_TO_SEARCH.PREFERRED,
    providerName: 'Linda Bailey',
    providerAvatar: IMGS.avatarDoctor1,
    date: '2022-08-10 00:00:00',
    apptFee: 12.34,
    copay: 12.34,
    deductible: 1234.55,
    coinsurance: 1234.55,
    selfpay: 1234.55,
    serviceFee: 12.34,
    total: 10234.55,
    isRescheduled: false,
    isCancelled: false,
    isPoem: true
  },
  {
    id: 9,
    aptType: APT_TYPE_TO_SEARCH.PREFERRED,
    providerName: 'Linda Bailey',
    providerAvatar: IMGS.avatarDoctor1,
    date: '2022-08-10 00:00:00',
    apptFee: 12.34,
    copay: 12.34,
    deductible: 1234.55,
    coinsurance: 1234.55,
    selfpay: 1234.55,
    serviceFee: 12.34,
    total: 10234.55,
    isRescheduled: false,
    isCancelled: false,
    isPoem: true
  },
  {
    id: 10,
    aptType: APT_TYPE_TO_SEARCH.PREFERRED,
    providerName: 'Linda Bailey',
    providerAvatar: IMGS.avatarDoctor1,
    date: '2022-08-10 00:00:00',
    apptFee: 12.34,
    copay: 12.34,
    deductible: 1234.55,
    coinsurance: 1234.55,
    selfpay: 1234.55,
    serviceFee: 12.34,
    total: 10234.55,
    isRescheduled: false,
    isCancelled: false,
    isPoem: true
  },
  {
    id: 11,
    aptType: APT_TYPE_TO_SEARCH.PREFERRED,
    providerName: 'Linda Bailey',
    providerAvatar: IMGS.avatarDoctor1,
    date: '2022-08-10 00:00:00',
    apptFee: 12.34,
    copay: 12.34,
    deductible: 1234.55,
    coinsurance: 1234.55,
    selfpay: 1234.55,
    serviceFee: 12.34,
    total: 10234.55,
    isRescheduled: false,
    isCancelled: false,
    isPoem: true
  },
  {
    id: 12,
    aptType: APT_TYPE_TO_SEARCH.PREFERRED,
    providerName: 'Linda Bailey',
    providerAvatar: IMGS.avatarDoctor1,
    date: '2022-08-10 00:00:00',
    apptFee: 12.34,
    copay: 12.34,
    deductible: 1234.55,
    coinsurance: 1234.55,
    selfpay: 1234.55,
    serviceFee: 12.34,
    total: 10234.55,
    isRescheduled: false,
    isCancelled: false,
    isPoem: true
  },
  {
    id: 13,
    aptType: APT_TYPE_TO_SEARCH.PREFERRED,
    providerName: 'Linda Bailey',
    providerAvatar: IMGS.avatarDoctor1,
    date: '2022-08-10 00:00:00',
    apptFee: 12.34,
    copay: 12.34,
    deductible: 1234.55,
    coinsurance: 1234.55,
    selfpay: 1234.55,
    serviceFee: 12.34,
    total: 10234.55,
    isRescheduled: false,
    isCancelled: false,
    isPoem: true
  }
]

export const AptList = [
  {
    id: 1,
    isArchived: true,
    providerInfo: {
      userAvatar: IMGS.avatarDoctor1,
      fullName: 'Darlene Robertson',
      specialty: 'Neurosurgeon',
      facilityName: '6513 Dogwood Ave undefined Syracuse, AK 62927 US',
    },
    aptInfo: {
      aptType: APT_TYPE_TO_SEARCH.PREFERRED,
      reasonForVisit: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do minim mollit non deserunt ullamco est sit aliqua dolor do',
      startTime: '2022-09-16 09:00 AM',
      meetingType: MEETING_TYPE.PHONE,
      icon: null
    },
    history: {
      appointment: [
        {
          id: 1,
          activity: 'Start',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        },
        {
          id: 2,
          activity: 'Rescheduled',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        },
        {
          id: 3,
          activity: 'Cancelled',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        },
        {
          id: 4,
          activity: 'Repeat',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        }
      ],
      transaction: []
    },
    alerts: [
      {
        id: 1,
        datetime: "2022-08-10 09:13:00",
        isRing: true,
        isVibration: false,
        isNotification: true
      }
    ],
    testInfo: null,
    procedureInfo: null
  },
  {
    id: 2,
    isArchived: false,
    providerInfo: {
      userAvatar: IMGS.avatarDoctor2,
      fullName: 'Ralph Edwards',
      specialty: 'Neurosurgeon',
      facilityName: '6513 Dogwood Ave undefined Syracuse, AK 62927 US',
    },
    aptInfo: {
      aptType: APT_TYPE_TO_SEARCH.URGENT,
      reasonForVisit: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do minim mollit non deserunt ullamco est sit aliqua dolor do',
      startTime: '2022-09-19 09:30 AM',
      meetingType: MEETING_TYPE.VIDEO,
      icon: null
    },
    history: {
      appointment: [
        {
          id: 1,
          activity: 'Start',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        },
        {
          id: 2,
          activity: 'Rescheduled',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        },
        {
          id: 3,
          activity: 'Cancelled',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        },
        {
          id: 4,
          activity: 'Repeat',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        }
      ],
      transaction: []
    },
    alerts: [],
    testInfo: null,
    procedureInfo: null
  },
  {
    id: 3,
    isArchived: false,
    providerInfo: {
      userAvatar: IMGS.avatarDoctor3,
      fullName: 'Dianne Russell',
      specialty: 'Neurosurgeon',
      facilityName: '6513 Dogwood Ave undefined Syracuse, AK 62927 US',
    },
    aptInfo: {
      aptType: APT_TYPE_TO_SEARCH.WAIT_LIST,
      reasonForVisit: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do minim mollit non deserunt ullamco est sit aliqua dolor do',
      startTime: '2022-09-19 11:15 AM',
      meetingType: MEETING_TYPE.ONSITE,
      icon: null
    },
    history: {
      appointment: [
        {
          id: 1,
          activity: 'Start',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        },
        {
          id: 2,
          activity: 'Rescheduled',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        },
        {
          id: 3,
          activity: 'Cancelled',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        },
        {
          id: 4,
          activity: 'Repeat',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        }
      ],
      transaction: []
    },
    alerts: [],
    testInfo: null,
    procedureInfo: null
  },
  {
    id: 4,
    isArchived: false,
    providerInfo: {
      userAvatar: IMGS.avatarDoctor3,
      fullName: 'Dianne Russell',
      specialty: 'Dentist',
      facilityName: '6513 Dogwood Ave undefined Syracuse, AK 62927 US',
    },
    aptInfo: {
      aptType: APT_TYPE_TO_SEARCH.WAIT_LIST,
      reasonForVisit: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do minim mollit non deserunt ullamco est sit aliqua dolor do',
      startTime: '2022-09-20 08:30 AM',
      meetingType: MEETING_TYPE.ONSITE,
      icon: ICONS.tooth
    },
    history: {
      appointment: [
        {
          id: 1,
          activity: 'Start',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        },
        {
          id: 2,
          activity: 'Rescheduled',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        },
        {
          id: 3,
          activity: 'Cancelled',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        },
        {
          id: 4,
          activity: 'Repeat',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        }
      ],
      transaction: []
    },
    alerts: [],
    testInfo: {
      title: 'Blood test',
      additionalInfo: '(Blue syrup)',
      doctor: 'John Nutter MD,',
      date: '08/11'
    },
    procedureInfo: null
  },
  {
    id: 5,
    isArchived: false,
    providerInfo: {
      userAvatar: IMGS.avatarDoctor1,
      fullName: 'Dianne Russell',
      specialty: 'Optician',
      facilityName: '6513 Dogwood Ave undefined Syracuse, AK 62927 US',
    },
    aptInfo: {
      aptType: APT_TYPE_TO_SEARCH.PREFERRED,
      reasonForVisit: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do minim mollit non deserunt ullamco est sit aliqua dolor do',
      startTime: '2022-09-20 03:30 PM',
      meetingType: MEETING_TYPE.ONSITE,
      icon: ICONS.glasses
    },
    history: {
      appointment: [
        {
          id: 1,
          activity: 'Start',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        },
        {
          id: 2,
          activity: 'Rescheduled',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        },
        {
          id: 3,
          activity: 'Cancelled',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        },
        {
          id: 4,
          activity: 'Repeat',
          providerName: 'Leslie Alexander',
          date: '2022-05-21 09:00 AM'
        }
      ],
      transaction: []
    },
    alerts: [],
    testInfo: null,
    procedureInfo: {
      title: 'Procedure',
      additionalInfo: '(Blue syrup)',
      doctor: 'John Nutter MD,',
      date: '08/11'
    },
  },
]


export const AptMockData = [
  {
    id: 1,

    aptDate: "2022-10-14",
    aptState: "ACTIVE",
    aptTime: "15:30:00",
    aptType: "REGULAR",
    details:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean erat tortor, vulputate vel velit eget, imperdiet pharetra nunc. Donec iaculis.",
    meetingType: MEETING_TYPE.PHONE,

    instructions: [
      {
        id:2,
        title: "GERD 2",
        description: "Medications, how to take and side effects"
      },
      {
        id:1,
        title: "GERD 1",
        description: "Instructions on what to eat, times to eat, position during sleeping"
      }
    ],
    location: {
      id: 89,      
      address: "158 Octavio Brooks, New Hipolito, OH 96445",
      commonName: "Miss Demarcus Borer",
      legalName:"Darrell Jacobi",
      simpleName: "fclsx3"
    },
    patientUserId: 1,
    patient: {
      id: 1,
      dob:"1985-09-14",
      fullName:"James Hatton",      
    },
    preparations: [
      {
        id: 1,
        title: "Colonoscopy",
        description:"Colonoscopy"
      }
    ],
    providerUserId: 16,
    provider: {
      id: 16,
      facilityName: "Best children ortho in New York",
      fullName: "Floyd Miles",
      specialty: "Orthopedics"
    },
    reasons: [
      {
        description: "Peripheral neuropathy, a result of damage to the nerves located outside of the brain and spinal cord (peripheral nerves), often causes weakness, numbness and pain, usually in the hands and feet.",
        id: 4,
        providerId: 16,
        title: "Peripheral neuritis"
      },
      {
        description: "Metabolic syndrome is a cluster of conditions that occur together, increasing your risk of heart disease, stroke and type 2 diabetes.",
        id: 3,
        providerId: 16,
        title: "Metabolic syndrome"
      }
    ]
  },
  {
    id: 2,

    aptDate: "2022-10-15",
    aptState: "ACTIVE",
    aptTime: "15:30:00",
    aptType: "URGENT",
    details:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean erat tortor, vulputate vel velit eget, imperdiet pharetra nunc. Donec iaculis.",
    meetingType: MEETING_TYPE.VIDEO,

    instructions: [
      {
        id:2,
        title: "GERD 2",
        description: "Medications, how to take and side effects"
      },
      {
        id:1,
        title: "GERD 1",
        description: "Instructions on what to eat, times to eat, position during sleeping"
      }
    ],
    location: {
      id: 89,      
      address: "158 Octavio Brooks, New Hipolito, OH 96445",
      commonName: "Miss Demarcus Borer",
      legalName:"Darrell Jacobi",
      simpleName: "fclsx3"
    },
    patientUserId: 1,
    patient: {
      id: 1,
      dob:"1985-09-14",
      fullName:"James Hatton",      
    },
    preparations: [
      {
        id: 1,
        title: "Colonoscopy",
        description:"Colonoscopy"
      }
    ],
    providerUserId: 16,
    provider: {
      id: 16,
      facilityName: "Best children ortho in New York",
      fullName: "Floyd Miles",
      specialty: "Orthopedics"
    },
    reasons: [
      {
        description: "Peripheral neuropathy, a result of damage to the nerves located outside of the brain and spinal cord (peripheral nerves), often causes weakness, numbness and pain, usually in the hands and feet.",
        id: 4,
        providerId: 16,
        title: "Peripheral neuritis"
      },
      {
        description: "Metabolic syndrome is a cluster of conditions that occur together, increasing your risk of heart disease, stroke and type 2 diabetes.",
        id: 3,
        providerId: 16,
        title: "Metabolic syndrome"
      }
    ]
  }  
]