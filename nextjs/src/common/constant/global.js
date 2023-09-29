export const MARTIAL_STATUS = ['Married', 'Single', 'Divorced', 'Widowed']
export const SEX = ['Male', 'Female', 'Other']
export const PATIENT_HISTORY_STATUS = ['Owned', 'Rental', 'Other']
export const OCCUPATION = ['Business', 'Profession', 'Employment', 'Other']
export const GOOGLE_MAP_API = 'AIzaSyD0oeb2Iqncr1jwqnjfxl9lLI4JEqHrhXA'
export const AppUrls = {
  MESSAGE: 'https://messageing.app.pannucorp.com',
  REGISTRATION: 'https://registration.app.pannucorp.com',
  APPOINTMENT: 'https://appointment.app.pannucorp.com',
}
export const SUFFIXS = [
  {
    id: 1,
    label: 'I',
    value: 'I',
  }, {
    id: 2,
    label: 'II',
    value: 'II',
  }, {
    id: 3,
    label: 'III',
    value: 'III',
  }, {
    id: 4,
    label: 'IV',
    value: 'IV',
  }, {
    id: 5,
    label: 'JR',
    value: 'JR',
  }, {
    id: 6,
    label: 'SR',
    value: 'SR',
  }, {
    id: 7,
    label: 'OTHER',
    value: 'Other',
  },
]
export const SUFFIX = ['I', 'II', 'III', 'IV', 'JR', 'SR', 'OTHER']
export const PREFIXS = [
  {
    id: 5,
    label: 'MR',
    value: 'Mr',
  }, {
    id: 6,
    label: 'MS',
    value: 'Ms',
  }, {
    id: 7,
    label: 'MRS',
    value: 'Mrs',
  }, {
    id: 8,
    label: 'THEY',
    value: 'They',
  },
]

export const PREFIX = ['MR', 'MRS', 'MS', 'THEY']
export const RRELATIONSHIP = ['Grandparent', 'Foster parent', 'Sibling', 'Power of attorney', 'Caregiver', 'Other']
export const RRELATIONSHIP_KEY = ['PARENT', 'GRANDPARENT', 'FOSTER_PARENT', 'SIBLING', 'MRPOWER_OF_ATTORNEY', 'CAREGIVER', 'OTHER']
export const PRELATIONSHIP = ['Child', 'Grandchild', 'Foster care', 'Ward']
export const PRELATIONSHIP_KEY = ['CHILD', 'GRANDCHILD', 'FOSTER_CARE', 'WARD']
export const FILE_SERVER_URL = 'https://appointment.pannucorp.com';
export const DESKTOPXX = 1536
export const DESKTOPXL = 1440
export const DESKTOPX = 1366
export const DESKTOPL = 1024

export const breakpointSizes = {
  mobile: '480px' /* newest large phones */,
  tablet: '1025px' /* tablet */,
  desktop: '2048px' /* large desktop */,
}
export const ResultStatus = {
  SUCCESS: 'success',
  FAIL: 'failure'
}
export const MESSAGES = {
  save_data_success: 'The data is stored correctly.',
  remove_data_success: 'The data is removed correctly.',
  server_error: 'The error is happened on server side.',
  failed_process: 'The process is failed.',
  succeed_process: 'The process is succeed.'
}

const sizes = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopM: '1280px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const devices = {
  mobileS: `(min-width: ${sizes.mobileS})`,
  mobileM: `(min-width: ${sizes.mobileM})`,
  mobileL: `(min-width: ${sizes.mobileL})`,
  tablet: `(min-width: ${sizes.tablet})`,
  laptop: `(min-width: ${sizes.laptop})`,
  laptopL: `(min-width: ${sizes.laptopL})`,
  laptopM: `(min-width: ${sizes.laptopM})`,
  desktop: `(min-width: ${sizes.desktop})`,
};


export const patients = [
  'Brooklyn Simmons (B)',
  'Patient name B (B)',
  'Patient name C (C)',
]

