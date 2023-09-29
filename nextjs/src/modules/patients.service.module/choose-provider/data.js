export const TABS_IN_CHOOSE = ['List', 'Map', 'Calendar']
export const SPECIALTIES = [
  'Nurse Practitioner',
  'Pharmacist',
  'Internal Medicine Physician',
  'Family Medicine Physician',
  'Physical Therapist',
  'Other'
]
export const INIT_FILTER_OPTION = {
  isPCP: true,
  isHMO: true,
  isPOEM: true,
  specialty: SPECIALTIES[0],
  acceptNew: true,
  isNow: true,
  dateTime: [null, null],
  price: [0, 0],
  ratings: [
    {
      id: 1,
      name: 'Cleanliess',
      value: 3,
    },{
      id: 2,
      name: 'Service quality',
      value: 4,
    },{
      id: 3,
      name: 'Customer care',
      value: 5,
    },{
      id: 4,
      name: 'Ambiance',
      value: 2,
    },{
      id: 5,
      name: 'Service provider',
      value: 3,
    },
  ],
  keywords: ['xxx', 'yyy']
}
