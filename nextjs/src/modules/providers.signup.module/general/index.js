import dynamic from 'next/dynamic'
import useWindowDimensions from '../../../common/hooks/useWindowDimensions'
import DropdownIndicator from '../../../common/utils/DropdownIndicator'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { useAuthUser, useLoadingStatus } from '../../../redux/hooks/useCommonStore'
import { useLocalStorage } from '../../../common/hooks/useLocalStorage'
import { saveProviderGeneralInfo, searchProviderByNpi } from '../../../common/lib/provider'
import { MESSAGES } from '../../../common/constant/global'
import {
  ReferralWrapper,
} from './styled'
import {
  InputFieldLabel,
  InputDiv,
  Input,
  Caption,
  InputRow,
  LinkButton,
  Flex,
} from '../shared/styled'
import { MaskInput_1 } from '../../../common/styleds/imask.styled'
import { AddressInput_1 } from '../../../common/styleds/autocomplete.styled'

import {
  menuWidth,
  menuHeight,
  institutionTypeOptions,
  ownershipTypeOptions,
} from './data'
import DashboardLayout from "../shared/DashboardLayout";

const Select = dynamic(
  () => import('react-select'),
  { ssr: false }
)


//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

function General() {
  /**
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState(() => {}), []); console.log('render');
  */
  const { authUser } = useAuthUser()
  const { commitLoadingStatus } = useLoadingStatus()

  const PAGE_PREFIX = 'PVD_SIGNUP_GENERAL_'

  const requiredClass = 'required'
  const NpiMask = '000-00-00000'
  const PhoneMask = '000-000-0000'
  const TaxMask = '00-0000000'

  const [referralCode, setReferralCode] = useLocalStorage(`${PAGE_PREFIX}0`, '')
  const [npi, setNpi] = useLocalStorage(`${PAGE_PREFIX}1`, '')
  const [institutionName, setInstitutionName] = useLocalStorage(`${PAGE_PREFIX}2`, '')
  const [businessAddress, setBusinessAddress] = useLocalStorage(`${PAGE_PREFIX}14`, '')
  const [taxID, setTaxID] = useLocalStorage(`${PAGE_PREFIX}3`, '')
  const [phoneNumber, setPhoneNumber] = useLocalStorage(`${PAGE_PREFIX}4`, '')
  const [institutionType, setInstitutionType] = useLocalStorage(`${PAGE_PREFIX}5`, '')
  const [ownership, setOwnership] = useLocalStorage(`${PAGE_PREFIX}6`, '')

  const [invalidNpi, setInvalidNpi] = useLocalStorage(`${PAGE_PREFIX}7`, false)
  const [invalidInstitutionName, setInvalidInstitutionName] = useLocalStorage(`${PAGE_PREFIX}13`, false)
  const [invalidBusinessAddress, setInvalidBusinessAddress] = useLocalStorage(`${PAGE_PREFIX}8`, false)
  const [invalidTaxID, setInvalidTaxID] = useLocalStorage(`${PAGE_PREFIX}9`, false)
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useLocalStorage(`${PAGE_PREFIX}10`, false)
  const [invalidInstitutionType, setInvalidInstitutionType] = useLocalStorage(`${PAGE_PREFIX}11`, false)
  const [invalidOwnership, setInvalidOwnership] = useLocalStorage(`${PAGE_PREFIX}12`, false)

  const save = async () => {
    if (!checkFormData()) return

    let data = {
      userId: authUser.id,
      npi,
      institutionName,
      businessAddress: businessAddress,
      taxID,
      phoneNumber,
      institutionType,
      //lat: place?.geometry?.location?.lat(),
      //lng: place?.geometry?.location?.lng(),
      //plusCode: place?.plus_code?.global_code || null,
      ownership
    }

    commitLoadingStatus(true)
    const res = await saveProviderGeneralInfo(data)
    commitLoadingStatus(false)

    if (res) {
      clearForm()
      toast.success(MESSAGES.save_data_success, { position: 'top-right' })
    }
    else {
      toast.error(MESSAGES.server_error, { position: 'top-right' })
    }
  }

  const clearForm = async () => {
    setNpi('')
    setReferralCode('')
    setInstitutionName('')
    setBusinessAddress('')
    setTaxID('')
    setPhoneNumber('')
    setInstitutionType('')
    setInstitutionType('')
    setOwnership('')
  }

  const checkFormData = () => {
    if (npi.length < 10) {
      setInvalidNpi(true)
      return false
    }
    else {
      setInvalidNpi(false)
    }

    if (institutionName.length == 0) {
      setInvalidInstitutionName(true)
      return false
    }
    else {
      setInvalidInstitutionName(false)
    }

    if (!businessAddress) {
      setInvalidBusinessAddress(true)
      return false
    }
    else {
      setInvalidBusinessAddress(false)
    }

    if (taxID.length == 0) {
      setInvalidTaxID(true)
      return false
    }
    else {
      setInvalidTaxID(false)
    }

    if (institutionType.length == 0) {
      setInvalidInstitutionType(true)
      return false
    }
    else {
      setInvalidInstitutionType(false)
    }

    if (ownership == null || ownership.length == 0) {
      setInvalidOwnership(true)
      return false
    }
    else {
      setInvalidOwnership(false)
    }

    return true
  }

  const onNpiGo = async () => {
    if (!npi) {
      return
    }

    commitLoadingStatus(true)
    // 1215698485
    try {
      const res = await searchProviderByNpi(npi)
      setInstitutionName(res.institutionName)
      setTaxID(res.taxID)
    }
    catch (error) {
      console.log(error)
      toast.error(MESSAGES.server_error, { position: 'top-right' })
    }
    commitLoadingStatus(false)
  }

  return (
    <DashboardLayout paddingRight={75}>
      <ReferralWrapper>
        <div className="title-note">Enter your provider referral code here</div>
        <div className="input-wrapper">
          <div className="label">Referral code</div>
          <input
            type={'text'}
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            className="input-box"
          />
        </div>
      </ReferralWrapper>
      <Caption>Please complete all fields</Caption>
      <InputRow className="justify-start">
        <InputDiv style={{ width: '20%' }} className={(invalidNpi) && requiredClass}>
          <InputFieldLabel>NPI{' '}</InputFieldLabel>
          <MaskInput_1 mask={NpiMask} value={npi} placeholder="123-45-67890" onAccept={(v) => { setNpi(v) }} />
        </InputDiv>
        <LinkButton
          onClick={onNpiGo}
          style={{ justifyContent: 'left', margin: '20px 0 0 20px' }}>Go</LinkButton>
      </InputRow>
      <InputRow columnGap={15}>
        <InputDiv style={{ width: '213px' }} className={(invalidInstitutionName) && requiredClass}>
          <InputFieldLabel>Institution name{' '}</InputFieldLabel>
          <Input value={institutionName} onChange={(e) => { setInstitutionName(e.target.value) }} />
        </InputDiv>
        <InputDiv style={{ flex: 1 }} className={(invalidBusinessAddress) && requiredClass}>
          <InputFieldLabel>Business address for notices{' '}</InputFieldLabel>
          <AddressInput_1
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
            libraries={['places']}
            options={{
              componentRestrictions: {
                country: ['us'],
              },
              types: ['hospital', 'pharmacy', 'physiotherapist', 'veterinary_care'],
              fields: ["place_id", "geometry", "name", "formatted_address", "plus_code"],
            }}
            defaultValue={businessAddress}
            placeholder="123, Any St, Any town, ST, 12345"
            onPlaceSelected={(place) => setBusinessAddress(place.formatted_address)} />
        </InputDiv>
        <InputDiv style={{ width: '124px' }} className={(invalidTaxID) && requiredClass}>
          <InputFieldLabel>Tax ID{' '}</InputFieldLabel>
          <MaskInput_1 mask={TaxMask} value={taxID} placeholder="12-3456789" onAccept={(v) => { setTaxID(v) }} />
        </InputDiv>
        <InputDiv style={{ width: '163px' }} className={(invalidPhoneNumber) && requiredClass}>
          <InputFieldLabel>Phone NO{' '}</InputFieldLabel>
          <MaskInput_1 mask={PhoneMask} value={phoneNumber} placeholder="123-456-7890" onAccept={(v) => { setPhoneNumber(v) }} />
        </InputDiv>
      </InputRow>
      <InputRow className="justify-around justify-baseline">
        <Flex className="justify-start" style={{ width: '100%' }}>
          <InputDiv style={{ marginRight: '13px' }} className={(invalidInstitutionType) && requiredClass}>
            <InputFieldLabel>Institution type{' '}</InputFieldLabel>
            <Select
              styles={{
                indicatorSeparator: () => { }, // removes the "stick"
                control: (css) => ({
                  ...css,
                  width: menuWidth || "auto",
                  height: menuHeight,
                  opacity: menuWidth ? 1 : 0
                }),
                menu: ({ width, ...css }) => ({
                  ...css,
                  width: "max-content",
                  minWidth: menuWidth
                }),
              }}
              components={{ DropdownIndicator }}
              value={institutionTypeOptions.find(op => op.value === institutionType) || null}
              onChange={(newValue) => setInstitutionType(newValue.value)}
              options={institutionTypeOptions}
            />
          </InputDiv>
          <InputDiv className={(invalidOwnership) && requiredClass}>
            <InputFieldLabel>Ownership{' '}</InputFieldLabel>
            <Select
              styles={{
                indicatorSeparator: () => { }, // removes the "stick"
                control: (css) => ({
                  ...css,
                  width: menuWidth || "auto",
                  height: menuHeight,
                  opacity: menuWidth ? 1 : 0
                }),
                menu: ({ width, ...css }) => ({
                  ...css,
                  width: "max-content",
                  minWidth: menuWidth
                }),
              }}
              components={{ DropdownIndicator }}
              value={ownershipTypeOptions.find(op => op.value === ownership) || null}
              onChange={(newValue) => setOwnership(newValue.value)}
              options={ownershipTypeOptions}
            />

          </InputDiv>
        </Flex>
      </InputRow>
      <InputRow className="justify-end">
        <LinkButton onClick={clearForm} style={{ color: '#000' }}>Cancel</LinkButton>
        <LinkButton onClick={save} style={{ marginLeft: 50, marginRight: 20 }}>Save</LinkButton>
      </InputRow>
    </DashboardLayout>
  )
}


export default General