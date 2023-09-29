import { useDispatch, useSelector } from 'react-redux'
import {
  setInsuredType, setInsuredProfile, addInsurancePlanData, deleteInsurancePlanData,
  addOOPCost, removeOOPCost, setPlanType, updateInsurancePlanData, setResponsiblePartyDetail, initResponsiblePartyDetail,
  setResponsiblePartyType, updateResponsiblePartyDetail, setInsuranceData, initInsuranceData,
  selectInsuredType, selectInsuredProfile, selectInsurancePlanList, selectRemovedPlanList,
  selectPlanType, selectResponsibleParty, selectResponsiblePartyType, selectInsurance
} from '../reducers/insuranceSlice'

export const useInsurance = () => {
  const dispatch = useDispatch()

  const insurance = useSelector(selectInsurance)
  const commitInsurance = (data) => {
    dispatch(setInsuranceData(data))
  }
  const initInsurance = () => {
    dispatch(initInsuranceData())
  }
  return { insurance, commitInsurance, initInsurance }
}

export const useInsuredType = () => {
  const dispatch = useDispatch()

  const insuredType = useSelector(selectInsuredType)

  const commitInsuredType = (type) => {
    dispatch(setInsuredType(type))
  }

  return { insuredType, commitInsuredType }
}

export const useInsuredProfile = () => {
  const dispatch = useDispatch()

  const insuredProfile = useSelector(selectInsuredProfile)

  const commitInsuredProfile = (profile) => {
    dispatch(setInsuredProfile(profile))
  }

  return { insuredProfile, commitInsuredProfile }
}

export const useInsurancePlanList = () => {
  const dispatch = useDispatch()

  const insurancePlanList = useSelector(selectInsurancePlanList)
  const removedPlanList = useSelector(selectRemovedPlanList)

  const addInsurancePlan = (data) => {
    dispatch(addInsurancePlanData(data))
  }

  const updateInsurancePlan = (planId, data) => {
    dispatch(updateInsurancePlanData({ id: planId, insuranceData: data }))
  }

  const deleteInsurancePlan = (planId) => {
    dispatch(deleteInsurancePlanData(planId))
  }

  return { insurancePlanList, removedPlanList, addInsurancePlan, updateInsurancePlan, deleteInsurancePlan }
}

export const useOOPCost = () => {
  const dispatch = useDispatch()

  const commitOOPCost = (planId, oopCost) => {
    dispatch(addOOPCost({ planId, oop: oopCost }))
  }

  const deleteOOPCost = (planId) => {
    dispatch(removeOOPCost(planId))
  }

  return { commitOOPCost, deleteOOPCost }
}

export const usePlanType = () => {
  const dispatch = useDispatch()

  const commitPlanType = (planType) => {
    dispatch(setPlanType(planType))
  }

  const planType = useSelector(selectPlanType)

  return { planType, commitPlanType }
}

export const useResponsibleParty = () => {
  const dispatch = useDispatch()

  const responsibleParty = useSelector(selectResponsibleParty)

  const commitResponsibleParty = (data) => {
    dispatch(setResponsiblePartyDetail(data))
  }

  const initResponsibleParty = () => {
    dispatch(initResponsiblePartyDetail())
  }

  const updateResponsibleParty = (key, value) => {
    dispatch(updateResponsiblePartyDetail({ key, value }))
  }

  return { responsibleParty, commitResponsibleParty, updateResponsibleParty, initResponsibleParty }
}

export const useResponsiblePartyType = () => {
  const dispatch = useDispatch()

  const responsiblePartyType = useSelector(selectResponsiblePartyType)

  const commitResponsiblePartyType = (type) => {
    dispatch(setResponsiblePartyType(type))
  }

  return { responsiblePartyType, commitResponsiblePartyType }
}