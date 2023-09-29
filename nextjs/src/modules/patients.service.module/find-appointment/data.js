import { ICONS } from "../../../common/utils/styleGuide"

export const SPECIALTY_LIST = [
  'Nurse Practitioner',
  'Pharmacist',
  'Internal Medicine Physician',
  'Family Medicine Physician',
  'Physical Therapist'
]

export const SEARCH_TYPE_OPTIONS = ['Provider name', 'Specialty', 'Search these providers']

export const PLACES_LIST = [{
  id: 1, 
  label: "Home",
  address: "16513 Dogwood Ave Syracuse, AK 62927 US",
  geo: {
    lat: 36.192784817548656,
    lng: -115.17464974988552
  }
}, {
  id: 2, 
  label: "Work",
  address: "26513 Dogwood Ave undefined Syracuse, AK 62927 US",
  geo: {
    lat: 36.14982667035229,
    lng: -115.21584848035427
  }
}, {
  id: 3, 
  label: "Office 1",
  address: "36513 Dogwood Ave undefined AK 62927 US",
  geo: {
    lat: 36.23959621404129,
    lng: -115.19284585584255
  }
}, {
  id: 4, 
  label: "Office 2",
  address: "Dogwood Ave Syracuse, AK 62927 US",
  geo: {
    lat: 36.085916029920675,
    lng: -115.12436033298317
  }
}]

export const DISTANCE_LIST = [{
  id: 1,
  value: 2,
  name: '2 miles',
}, {
  id: 2,
  value: 4,
  name: '4 miles',
}, {
  id: 3,
  value: 8,
  name: '8 miles',
}, {
  id: 4,
  value: 10,
  name: '10 miles',
}]

export const DD_PROPS = {
  dropDownList: null,
  setSelectedItem: null,
  width: 82,
  height: 40,
  paddingX: 7,
  border: {
    isUnderline: false,
    width: 1, 
    color: '#000000',
    style: 'solid',
    radius: 5,
  },
  icons: {
    left: {
      src: ICONS.magnifyingGlass,
      width: 11,
      height: 11,
      padding: [4.7, 5.8]
    },
    right: {
      src: ICONS.dropdownIcon,
      width: 10,
      height: 8,
      padding: [4.7, 10]
    },
  },
  font: {
    weight: 500,
    size: 14,
    color: `#000000`,
  },
  menu: {
    padding: [10, 12],
    font: {
      weight: 400,
      size: 14,
      lineHeight: 14,
    }
  }
}