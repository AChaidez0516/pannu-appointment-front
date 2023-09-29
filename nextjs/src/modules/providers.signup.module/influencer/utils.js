import { v4 as uuidv4 } from 'uuid';


export const TYPES = [{
    id: 1,
    label: 'Social media',
    value: 'SOCIAL_MEDIA'
  }, {
    id: 2,
    label: 'Press',
    value: 'PRESS'
  }, {
    id: 3,
    label: 'Talks/presentations',
    value: 'TALKS'
  }]

export const MEDIUM_TYPES = [{
    id: 1,
    typeId: 1,
    label: 'Twitter',
    value: 'TWITTER'
  }, {
    id: 2,
    typeId: 1,
    label: 'Facebook',
    value: 'FACEBOOK'
  }, {
    id: 3,
    typeId: 1,
    label: 'Instagram',
    value: 'INSTAGRAM'
  }, {
    id: 4,
    typeId: 1,
    label: 'WhatsApp',
    value: 'WHATSAPP'
  }, {
    id: 5,
    typeId: 1,
    label: 'Tik Tok',
    value: 'TIK_TOK'
  }, {
    id: 6,
    typeId: 1,
    label: 'YouTube',
    value: 'YOUTUBE'
  }, {
    id: 7,
    typeId: 1,
    label: 'Snap',
    value: 'SNAP'
  }, {
    id: 8,
    typeId: 2,
    label: 'Print regular',
    value: 'PRINT_REGULAR'
  }, {
    id: 9,
    typeId: 2,
    label: 'journals',
    value: 'JOURNALS'
  }, {
    id: 10,
    typeId: 2,
    label: 'publications',
    value: 'PUBLICATIONS'
  }, {
    id: 11,
    typeId: 2,
    label: 'TV local',
    value: 'TV_LOCAL'
  }, {
    id: 12,
    typeId: 2,
    label: 'Radio',
    value: 'RADIO'
  }, {
    id: 13,
    typeId: 2,
    label: 'Podcast',
    value: 'PODCAST'
  }, {
    id: 14,
    typeId: 3,
    label: 'General',
    value: 'GENERAL'
  }, {
    id: 15,
    typeId: 3,
    label: 'Specialty ',
    value: 'SPECIALTY'
  }]

export const MAIN_AUDIENCE = [{
    id: 1,
    label: 'Providers/clinicians',
    value: 'PROVIDERS'
  }, {
    id: 2,
    label: 'Payers',
    value: 'PAYERS'
  }, {
    id: 3,
    label: 'Employers',
    value: 'EMPLOYERS'
  }, {
    id: 4,
    label: 'Patients',
    value: 'PATIENTS' 
  }]

export const intialRow = {
  id: 1,
  selectedProviderId: null,
  isProviders: false,
  isPayers: false,
  isEmployers: false,
  isPatients: false
}

export const REDUCER_ACTION_TYPES = {
  ROW_ADD:              'ROW_ADD',
  ROW_DELETE:           'ROW_DELETE',
  CHANGE_AUDIENCE:      'CHANGE_AUDIENCE',
  CHOOSE_PROVIDER:      'CHOOSE_PROVIDER',
  SELECT_PROVIDER:      'SELECT_PROVIDER',
  SELECT_TYPE:          'SELECT_TYPE',
  SELECT_MEDIUM:        'SELECT_MEDIUM',
  SELECT_MAIN_AUDIENCE: 'SELECT_MAIN_AUDIENCE',
  INPUT_FOLLOWER_NUMBER:'INPUT_FOLLOWER_NUMBER'
}

export const influencerReducer = (state, {type, payload}) => {
  switch (type) {
    case REDUCER_ACTION_TYPES.ROW_ADD:
      return [...state, {...intialRow, id: uuidv4()}]

    case REDUCER_ACTION_TYPES.ROW_DELETE:
      if(state.length === 1) return state
      return state.filter(row => row.id !== payload.deleteId)

    case REDUCER_ACTION_TYPES.CHANGE_AUDIENCE:
      return state.map(row => row.id === payload.influencerId ? 
        ({...row, [payload.field]: !row[payload.field]}) : row)

    case REDUCER_ACTION_TYPES.CHOOSE_PROVIDER:
      return state.map(row => row.id === payload.influencerId ? 
        ({...row, selectedProviderId: payload.providerId }) : row)

    default:
      return state
  }
}

export const intialDetailRow = {
  id: 1,
  selectedProviderId: null,
  mediaType: null,     // will be the value
  mediumType: null,
  followerNumber: 0,
  mainAudienceType: null
}

export const detailReducer = (state, {type, payload}) => {
  switch (type) {
    case REDUCER_ACTION_TYPES.ROW_ADD:
      return [...state, {...intialDetailRow, id: uuidv4()}]

    case REDUCER_ACTION_TYPES.ROW_DELETE:
      if(state.length === 1) return state
      return state.filter(row => row.id !== payload.rowId)

    case REDUCER_ACTION_TYPES.SELECT_PROVIDER:
      return state.map(row => row.id === payload.rowId ? 
        ({...row, selectedProviderId: payload.value}) : row)

    case REDUCER_ACTION_TYPES.SELECT_TYPE:
      return state.map(row => row.id === payload.rowId ? 
        ({...row, mediaType: payload.value}) : row)

    case REDUCER_ACTION_TYPES.SELECT_MEDIUM:
      return state.map(row => row.id === payload.rowId ? 
        ({...row, mediumType: payload.value}) : row)

    case REDUCER_ACTION_TYPES.SELECT_MAIN_AUDIENCE:
      return state.map(row => row.id === payload.rowId ? 
        ({...row, mainAudienceType: payload.value}) : row)

    case REDUCER_ACTION_TYPES.INPUT_FOLLOWER_NUMBER:
      return state.map(row => row.id === payload.rowId ? 
        ({...row, followerNumber: payload.followerNumber }) : row)
    default:
      return state;
  }
}

const validateInfluencer = (influencer) => {
  return influencer.selectedProviderId 
}

const validateDetail = (detail) => {
  return detail.selectedProviderId &&
    detail.mediaType &&
    detail.mediumType &&
    detail.followerNumber &&
    detail.mainAudienceType 
}

export const enableSaveAllButton = (influencers, details) => {
  const existOneRowValidatedInInfluencers = influencers
    .reduce((acc, influencer) => (acc || validateInfluencer(influencer)), false)
  if (!existOneRowValidatedInInfluencers) return false

  const existOneRowValidatedInDetails = details
    .reduce((acc, detail) => (acc || validateDetail(detail)), false)
  if (!existOneRowValidatedInDetails) return false

  return true
}

export const requestsFactory = (influencers, details) => {
  const filteredDetails = details.filter(detail => validateDetail(detail))
  return influencers
    .filter(influencer => validateInfluencer(influencer))
    .map(influencer => {
      const {isProviders, isPayers, isEmployers, isPatients} = influencer // consider
      return {
        staffID: influencer.selectedProviderId,
        isProviders,
        isPayers,
        isEmployers,
        isPatients,
        influenceDetails: filteredDetails
          .filter(detail => detail.selectedProviderId === influencer.selectedProviderId)
          .map(detail => {
            const {mediaType, mediumType, followerNumber, mainAudienceType} = detail
            return {
              mediaType,
              mediumType,
              followerNumber,
              mainAudienceType,
            }
          })
      }
    })
}

export const renderFactory = (allInfluencers) => {

}