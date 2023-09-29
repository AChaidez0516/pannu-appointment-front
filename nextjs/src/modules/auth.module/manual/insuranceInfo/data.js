export const RESPONSIBLE_PARTY_KEYS = {
  ME: 'ME',
  OTHER: 'OTHER',
}
export const RESPONSIBLE_PARTYS = [
  {
    id: 1,
    label: 'Me',
    value: RESPONSIBLE_PARTY_KEYS.ME
  }, {
    id: 2,
    label: 'Other',
    value: RESPONSIBLE_PARTY_KEYS.OTHER
  }, 
]

export const RESPONSIBLE_PARTY_DETAIL_INIT =  {
  isFetched: false,
  isInvited: false,
  userAvatar: undefined,
  fullName: '',
  relationship: '',
  address: null,
  phoneNumber: '',
}

export const RPARTY_RELATIONSHIP_KEY = {
  ME: 'ME',
  PARENT: 'PARENT',
  GRANDPARENT: 'GRANDPARENT',
  FOSTER_PARENT: 'FOSTER_PARENT',
  SIBLING: 'SIBLING',
  MRPOWER_OF_ATTORNEY: 'MRPOWER_OF_ATTORNEY',
  CAREGIVER: 'CAREGIVER',
  OTHER: 'OTHER'
}

export const RPARTY_RELATIONSHIPS = [
  {
    id: 1, 
    lavel: 'Me',
    value: RPARTY_RELATIONSHIP_KEY.ME
  }, {
    id: 2, 
    lavel: 'Parent',
    value: RPARTY_RELATIONSHIP_KEY.PARENT
  }, {
    id: 3, 
    lavel: 'Parent',
    value: RPARTY_RELATIONSHIP_KEY.GRANDPARENT
  }, {
    id: 4, 
    lavel: 'Grand Parent',
    value: RPARTY_RELATIONSHIP_KEY.SIBLING
  }, {
    id: 5, 
    lavel: 'Power of attorney',
    value: RPARTY_RELATIONSHIP_KEY.MRPOWER_OF_ATTORNEY
  }, {
    id: 6, 
    lavel: 'Caregiver',
    value: RPARTY_RELATIONSHIP_KEY.CAREGIVER
  }, {
    id: 7, 
    lavel: 'Other',
    value: RPARTY_RELATIONSHIP_KEY.OTHER
  }, 
]

export const INSURED_TYPE_KEYS = {
  YOU: 'YOU',
  MINOR_AGE_CHILE: 'MINOR_AGE_CHILE',
  ADULT_DEPENDENT: 'ADULT_DEPENDENT',
}
export const INSURED_TYPE_ARRAY = [
  {
    id: 1, 
    lavel: 'You',
    value: INSURED_TYPE_KEYS.YOU
  }, {
    id: 2, 
    lavel: 'Minor age child',
    value: INSURED_TYPE_KEYS.MINOR_AGE_CHILE
  }, {
    id: 3, 
    lavel: 'Adult dependent',
    value: INSURED_TYPE_KEYS.ADULT_DEPENDENT
  },
]

export const INSURANCE_PLAN_TYPE = {
  MAIN: 'MAIN',
  OTHER: 'OTHER',
  DENTAL: 'DENTAL',
  VISION: 'VISION',
}

export const INSURANCE_PLAN_TYPE_ARRAY = [
  {
    id: 1, 
    lavel: 'MAIN',
    value: INSURANCE_PLAN_TYPE.MAIN
  }, {
    id: 2, 
    lavel: 'Other',
    value: INSURANCE_PLAN_TYPE.OTHER
  }, {
    id: 3, 
    lavel: 'Dental',
    value: INSURANCE_PLAN_TYPE.DENTAL
  }, {
    id: 4, 
    lavel: 'Vision',
    value: INSURANCE_PLAN_TYPE.VISION
  },
]

export const INSURED_DETAIL_INIT = {
  isValidate: false,
  prefix: null,
  fullName: undefined,
  suffix: null,
  dob: null,
  gender: undefined,
  relationship: null,
  ssn: undefined,
  maritalStatus: null,
  address: undefined,
  email: undefined,
  startDate: null,
  endDate: null,
}