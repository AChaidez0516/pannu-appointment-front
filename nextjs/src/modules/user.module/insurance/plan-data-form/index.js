import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router"
import { useEffect, useReducer, useState } from "react"
import {
  Input,
  InputDiv,
  InputFieldLabel,
  LinkButton,
  Flex
} from '../../../../common/styleds/common.styled'
import { AddressInput } from '../../../../common/styleds/autocomplete.styled'
import { MaskInput } from '../../../../common/styleds/imask.styled'
import { PlanDataFormWrapper } from './styled'
import { useInsurancePlanList, usePlanType } from '../../../../redux/hooks/useInsuranceStore'

const requiredClass = 'required'
const DateMask = '00/00/0000'
const PhoneNumberMask = '000-000-0000'

const initData = {
  planName: '',
  planIssuer: '',
  effectiveDate: '',
  nameOnCard: '',
  memberId: '',
  planAddress: '',
  groupPlanId: '',
  patientSupportPhoneNumber: '',
  providerSupportPhoneNumber: '',
}

const INSURANCE_DATA_ACTION_TYPES = {
  UPDATE_SINGLE: 'UPDATE_SINGLE'
}

const reducerData = (state, { type, payload }) => {
  switch (type) {
    case INSURANCE_DATA_ACTION_TYPES.UPDATE_SINGLE:
      return { ...state, [payload.key]: payload.value }
    default:
      return state;
  }
}

const updateSingle = (key, value) => ({
  type: INSURANCE_DATA_ACTION_TYPES.UPDATE_SINGLE,
  payload: { key, value }
})

export default function PlanDataForm(props) {
  const {
    setManually,
    isEditPage = false,
    isUpdate,
    setUpdate,
    insuranceDataToEdit,
  } = props

  const router = useRouter()
  const { addInsurancePlan, updateInsurancePlan } = useInsurancePlanList()
  const { planType } = usePlanType()

  const [insuranceData, dispatchData] = useReducer(reducerData, isEditPage ? insuranceDataToEdit : initData)

  const [invalidPlanName, setInvalidPlanName] = useState(false)
  const [invalidEffectiveDate, setInvalidEffectiveDate] = useState(false)
  const [invalidNameOnCard, setInvalidNameOnCard] = useState(false)
  const [invalidMemberId, setInvalidMemberId] = useState(false)

  const formValidate = () => {
    if (!insuranceData?.planName) {
      setInvalidPlanName(true)
      return false
    }
    setInvalidPlanName(false)

    if (!insuranceData?.effectiveDate.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[01])\/\d{4}$/)) {
      setInvalidEffectiveDate(true)
      return false
    }
    setInvalidEffectiveDate(false)

    if (!insuranceData?.nameOnCard) {
      setInvalidNameOnCard(true)
      return false
    }
    setInvalidNameOnCard(false)

    if (!insuranceData?.memberId) {
      setInvalidMemberId(true)
      return false
    }
    setInvalidMemberId(false)
    return true
  }
  const validate = () => {
    const bl = formValidate()
    console.log(bl)
    if (!bl)
      return

    const editId = uuidv4()
    addInsurancePlan({
      id: editId,
      originalId: 0,
      planType,
      ...insuranceData
    })
    router.push({ pathname: '/users/insurance/plan-data/[editId]', query: { editId } })
  }

  const update = () => {
    const bl = formValidate()
    if (!bl)
      return

    const {
      id,
      ...data
    } = insuranceData

    updateInsurancePlan(id, {...data, planType})

    setUpdate(false)
  }

  return (
    <PlanDataFormWrapper>
      <Flex className="justify-between">
        <InputDiv style={{ width: '30%', marginRight: 5 }} className={(invalidPlanName) && requiredClass}>
          <InputFieldLabel>Plan name* </InputFieldLabel>
          <Input
            value={insuranceData.planName}
            onChange={(e) => dispatchData(updateSingle('planName', e.target.value))} />
        </InputDiv>
        <InputDiv style={{ width: '30%', marginRight: 5 }}>
          <InputFieldLabel>Plan issuer </InputFieldLabel>
          <Input
            value={insuranceData.planIssuer}
            onChange={(e) => dispatchData(updateSingle('planIssuer', e.target.value))} />
        </InputDiv>
        <InputDiv style={{ width: '30%' }} className={(invalidEffectiveDate) && requiredClass}>
          <InputFieldLabel>Effective date* </InputFieldLabel>
          <MaskInput
            type="tel"
            mask={DateMask} value={insuranceData.effectiveDate}
            placeholder="MM/DD/YYYY"
            onAccept={v => dispatchData(updateSingle('effectiveDate', v))} />
        </InputDiv>
      </Flex>
      <Flex className="justify-between">
        <InputDiv style={{ width: '70%', marginRight: 5 }} className={(invalidNameOnCard) && requiredClass}>
          <InputFieldLabel>Name on card* </InputFieldLabel>
          <Input
            value={insuranceData.nameOnCard}
            onChange={(e) => dispatchData(updateSingle('nameOnCard', e.target.value))} />
        </InputDiv>
        <InputDiv style={{ width: '30%' }} className={(invalidMemberId) && requiredClass}>
          <InputFieldLabel>Member ID* </InputFieldLabel>
          <Input
            value={insuranceData.memberId}
            onChange={(e) => dispatchData(updateSingle('memberId', e.target.value))} />
        </InputDiv>
      </Flex>
      <Flex className="justify-between">
        <InputDiv style={{ width: '70%', marginRight: 5 }}>
          <InputFieldLabel>Plan address </InputFieldLabel>
          <AddressInput
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
            libraries={['places']}
            options={{
              componentRestrictions: {
                country: ['us'],
              },
              types: [],
              fields: ["formatted_address"],
            }}
            defaultValue={insuranceData.planAddress}
            placeholder="123, Any St, Any town, ST, 12345"
            onPlaceSelected={(place) => dispatchData(updateSingle('planAddress', place?.formatted_address))}
          />
        </InputDiv>
        <InputDiv style={{ width: '30%' }}>
          <InputFieldLabel>Group plan ID </InputFieldLabel>
          <Input
            value={insuranceData.groupPlanId}
            onChange={(e) => dispatchData(updateSingle('groupPlanId', e.target.value))} />
        </InputDiv>
      </Flex>
      <Flex className="justify-between">
        <InputDiv style={{ width: '50%', marginRight: 5 }}>
          <InputFieldLabel>Patient support phone no. </InputFieldLabel>
          <MaskInput
            type="tel"
            mask={PhoneNumberMask}
            value={insuranceData.patientSupportPhoneNumber}
            onAccept={v => dispatchData(updateSingle('patientSupportPhoneNumber', v))}
            placeholder="123-456-7890" />
        </InputDiv>
        <InputDiv style={{ width: '50%' }}>
          <InputFieldLabel>Provider support phone no. </InputFieldLabel>
          <MaskInput
            type="tel"
            mask={PhoneNumberMask}
            value={insuranceData.providerSupportPhoneNumber}
            onAccept={v => dispatchData(updateSingle('providerSupportPhoneNumber', v))}
            placeholder="123-456-7890" />
        </InputDiv>
      </Flex>
      {!isEditPage && (
        <Flex className="justify-between" marginTop={10}>
          <LinkButton className="small" onClick={() => setManually(false)}>Cancel</LinkButton>
          <LinkButton className="small" onClick={() => validate()}>Validate</LinkButton>
        </Flex>
      )}
      {isEditPage && isUpdate && (
        <Flex className="justify-between" marginTop={10}>
          <LinkButton className="small" onClick={() => setUpdate(false)}>Cancel</LinkButton>
          <LinkButton className="small" onClick={() => update()}>Update</LinkButton>
        </Flex>
      )}

    </PlanDataFormWrapper>
  )
}
