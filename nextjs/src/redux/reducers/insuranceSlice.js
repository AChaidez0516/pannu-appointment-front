import storage from 'redux-persist/lib/storage'
import { createSlice } from '@reduxjs/toolkit'
import { INSURANCE_PLAN_TYPE, INSURED_TYPE_KEYS } from '../../modules/user.module/insurance/index/data'

const DefaultResponsibleParty = {
  isFetched: false,
  primaryEmail: undefined,
  isInvited: false,
  userAvatar: undefined,
  fullName: '',
  relationship: '',
  address: null,
  phoneNumber: '',
  responsiblePartyType: ''
}
export const insuranceSlice = createSlice({
  name: 'insurance',
  initialState: {
    ui: {
      responsiblePartyType: undefined,
      insuredType: INSURED_TYPE_KEYS.YOU,
      planType: INSURANCE_PLAN_TYPE.MAIN,
    },
    userId: undefined,
    responsibleParty: DefaultResponsibleParty,
    insurancePlanList: [],
    insured: {},
    removedPlans: []
  },

  reducers: {
    setInsuranceData: (state, action) => {
      state.ui = action.payload.ui
      state.insured = action.payload.insured
      state.responsibleParty = {
        responsiblePartyType: undefined,
        insuredType: INSURED_TYPE_KEYS.YOU,
        planType: INSURANCE_PLAN_TYPE.MAIN,
      }
      state.insurancePlanList = action.payload.plans
      state.removedPlans = []
    },
    initInsuranceData: (state, action) => {
      state.ui = {
        responsiblePartyType: undefined,
        insuredType: INSURED_TYPE_KEYS.YOU,
        planType: INSURANCE_PLAN_TYPE.MAIN,
      }
      state.insured = {}
      state.responsibleParty = DefaultResponsibleParty
      state.insurancePlanList = []
      state.removedPlans = []
    },
    addLoginUserId: (state, action) => {
      state.userId = action.payload
    },
    setInsuredType: (state, action) => {
      state.ui.insuredType = action.payload
    },
    setPlanType: (state, action) => {
      state.ui.planType = action.payload
    },
    setInsuredProfile: (state, action) => {
      state.insured = action.payload
    },
    setResponsiblePartyType: (state, action) => {
      state.ui.responsiblePartyType = action.payload
    },
    setResponsiblePartyDetail: (state, action) => {
      state.responsibleParty = action.payload
    },
    updateResponsiblePartyDetail(state, action) {
      state.responsibleParty[action.payload.key] = action.payload.value
    },
    initResponsiblePartyDetail(state) {
      state.responsibleParty = DefaultResponsibleParty
    },
    addInsurancePlanData: (state, action) => {
      state.insurancePlanList.push(action.payload)
    },
    updateInsurancePlanData: (state, action) => {
      const _updated = state.insurancePlanList
        .map(data => data.id === action.payload.id ? ({
          ...data,
          ...action.payload.insuranceData
        }) : data)
      state.insurancePlanList = _updated
    },
    deleteInsurancePlanData: (state, action) => {
      const removedPlan = state.insurancePlanList.find(data => data.id = action.payload)
      console.log(removedPlan)
      if (removedPlan && removedPlan.originalId > 0)
        state.removedPlans.push(removedPlan.originalId)

      const filtered = state.insurancePlanList
        .filter(data => data.id !== action.payload)
      state.insurancePlanList = filtered
    },
    addOOPCost: (state, action) => {
      const added = state.insurancePlanList
        .map(data => data.id === action.payload.planId ? ({ ...data, oop: action.payload.oop }) : data)
      state.insurancePlanList = added
    },
    removeOOPCost: (state, action) => {
      const deleted = state.insurancePlanList
        .map(data => data.id === action.payload ? ({ ...data, oop: null }) : data)
      state.insurancePlanList = deleted
    }
  }
})

export const {
  setInsuranceData,
  initInsuranceData,
  addLoginUserId,
  setInsuredType,
  setPlanType,
  setInsuredProfile,
  setResponsiblePartyType,
  setResponsiblePartyDetail,
  updateResponsiblePartyDetail,
  initResponsiblePartyDetail,
  addInsurancePlanData,
  updateInsurancePlanData,
  deleteInsurancePlanData,
  addOOPCost,
  removeOOPCost
} = insuranceSlice.actions

export const selectInsuredType = state => state.insurance.ui.insuredType
export const selectInsuredProfile = state => state.insurance.insured
export const selectInsurancePlanList = state => state.insurance.insurancePlanList
export const selectPlanType = state => state.insurance.ui.planType
export const selectResponsibleParty = state => state.insurance.responsibleParty
export const selectResponsiblePartyType = state => state.insurance.ui.responsiblePartyType
export const selectInsurance = state => state.insurance
export const selectRemovedPlanList = state => state.insurance.removedPlans

export const insuranceReducerConfig = {
  key: 'insurance',
  storage: storage,
  blacklist: []
}

export default insuranceSlice.reducer