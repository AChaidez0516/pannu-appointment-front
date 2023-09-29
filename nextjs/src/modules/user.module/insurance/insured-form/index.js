import MenuItem from '@mui/material/MenuItem'

import SelectPopupModal from '../../../../components/modals/SelectPopupModal'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { format, parse } from 'date-fns'

import {
  MARTIAL_STATUS,
  PREFIX,
  PRELATIONSHIP,
  PRELATIONSHIP_KEY,
  SEX,
  SUFFIX
} from '../../../../common/constant/global'
import {
  CSelect,
  Input,
  InputDiv,
  InputFieldLabel,
  LinkButton,
  Flex,
  InputReadOnly
} from '../../../../common/styleds/common.styled'
import { AddressInput } from '../../../../common/styleds/autocomplete.styled'
import { MaskInput } from '../../../../common/styleds/imask.styled'
import { MUISelect } from '../../../../common/styleds/select.styled'
import { InsuredFormWrapper } from './styled'

import { useInsuredType, useInsuredProfile } from '../../../../redux/hooks/useInsuranceStore'


export default function InsuredForm() {
  const router = useRouter()
  const { gotosummary: type } = router.query

  const { insuredProfile, commitInsuredProfile } = useInsuredProfile()
  const { insuredType } = useInsuredType()

  const DateMask = '00/00/0000'
  const SsnMask = '000-00-000'
  const requiredClass = 'required'

  const [prefix, setPrefix] = useState(insuredProfile.prefix || 'I')
  const [fullName, setFullName] = useState(insuredProfile.fullNameOnID)
  const [suffix, setSuffix] = useState(insuredProfile.suffix || 'I')
  const [dob, setDob] = useState(insuredProfile.dob)
  const [gender, setGender] = useState(insuredProfile.gender)
  const [ssn, setSsn] = useState(insuredProfile.ssn)
  const [maritalStatus, setMaritalStatus] = useState(insuredProfile.maritalStatus)
  const [paddress, setPAddress] = useState(insuredProfile.address)
  const [pRelationshipId, setPRelationshipId] = useState(PRELATIONSHIP_KEY.indexOf(insuredProfile.relationship))
  const [prelationship, setPRelationship] = useState(insuredProfile.relationship)

  const [invalidFullName, setInvalidFullName] = useState(false)
  const [invalidDob, setInvalidDob] = useState(false)
  const [invalidGender, setInvalidGender] = useState(false)
  const [invalidMaritalStatus, setInvalidMaritalStatus] = useState(false)

  const [showGenderModal, setShowGenderModal] = useState(false)
  const [showPRelationshipModal, setShowPRelationshipModal] = useState(false)
  const [showMaritalStatusModal, setShowMaritalStatusModal] = useState(false)


  const save = () => {
    if (fullName == '') {
      setInvalidFullName(true)
      return
    }
    else {
      setInvalidFullName(false)
    }

    if (!dob.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[01])\/\d{4}$/)) {
      setInvalidDob(true)
      return
    }
    else {
      setInvalidDob(false)
    }

    if (gender == '') {
      setInvalidGender(true)
      return
    }
    else {
      setInvalidGender(false)
    }

    if (maritalStatus == '') {
      setInvalidMaritalStatus(true)
      return
    }
    else {
      setInvalidMaritalStatus(false)
    }

    commitInsuredProfile({
      id: uuidv4(),
      originalId: 0,
      isValidated: true,
      prefix,
      fullNameOnID: fullName,
      suffix,
      dob: dob,
      maritalStatus,
      address: paddress,
      relationship: prelationship,
      insuredType: insuredType
    })

  }

  return (
    <InsuredFormWrapper>
      <Flex className="justify-between" marginTop={10}>
        <InputDiv style={{ width: '15%', marginRight: 5 }}>
          <InputFieldLabel>Prefix</InputFieldLabel>
          { type != 'edit' ? (
            <MUISelect value={prefix} onChange={(e) => setPrefix(e.target.value)} style={{ width: '100%' }}>
              {PREFIX.map((v, i) => (<MenuItem key={i} value={v.toUpperCase()}>{v}</MenuItem>))}
            </MUISelect>
          ) : (
            <InputReadOnly>{prefix}</InputReadOnly>
          ) }

        </InputDiv>
        <InputDiv style={{ flex: "1 0 230px", marginRight: 5 }} className={(invalidFullName) && requiredClass}>
          <InputFieldLabel>Full name on government issued ID*</InputFieldLabel>
          { (type != 'edit') ? (
            <Input value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
          ) : (
            <InputReadOnly>{fullName}</InputReadOnly>
          ) }
        </InputDiv>
        <InputDiv style={{ width: '15%' }}>
          <InputFieldLabel>Suffix </InputFieldLabel>
          { type != 'edit' ? (
            <MUISelect value={suffix} onChange={(e) => { setSuffix(e.target.value) }} style={{ width: '100%' }}>
              {SUFFIX.map((v, i) => (<MenuItem key={i} value={v.toUpperCase()}>{v}</MenuItem>))}
            </MUISelect>
          ) : (
            <InputReadOnly>{suffix}</InputReadOnly>
          ) }
        </InputDiv>
      </Flex>
      <Flex className="justify-between" marginTop={10}>
        <InputDiv style={{ flex: '1 1 40%', marginRight: 5 }} className={(invalidDob) && requiredClass}>
          <InputFieldLabel>Date of birth* </InputFieldLabel>
          { (type != 'edit') ? (
            <MaskInput
              type="tel"
              mask={DateMask}
              value={dob}
              placeholder="MM/DD/YYYY"
              onAccept={v => setDob(v)} />
          ) : (
            <InputReadOnly>{dob}</InputReadOnly>
          ) }
        </InputDiv>
        <InputDiv style={{ flex: '1 1 30%', marginRight: 5 }} className={(invalidGender) && requiredClass}>
          <InputFieldLabel>Gender* </InputFieldLabel>
          { (type != 'edit') ? (
            <>
              <CSelect
                value={gender}
                style={{ width: '100%' }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  setShowGenderModal(true)
                }} >
                <option></option>
                {SEX.map((item, idx) => (<option key={item} value={item.toUpperCase()}>{item}</option>))}
              </CSelect>
              <SelectPopupModal
                onClose={() => setShowGenderModal(false)}
                onSelect={(id) => setGender(id)}
                show={showGenderModal}
                items={SEX} />
            </>
          ) : (
            <InputReadOnly>{SEX.filter(v => v.toUpperCase() == gender)[0]}</InputReadOnly>
          ) }

        </InputDiv>
        <InputDiv style={{ flex: '1 1 40%' }} >
          <InputFieldLabel>Relationship </InputFieldLabel>
          { (type != 'edit') ? (
            <>
              <CSelect
                style={{ width: '100%' }}
                value={pRelationshipId}
                onMouseDown={(e) => {
                  e.preventDefault()
                  setShowPRelationshipModal(true)
                }} >
                <option></option>
                {PRELATIONSHIP.map((v, i) => (<option key={i} value={i}>{v}</option>))}
              </CSelect>
              <SelectPopupModal
                onClose={() => setShowPRelationshipModal(false)}
                onSelect={(id) => {
                  let index = PRELATIONSHIP.indexOf(PRELATIONSHIP.find(v => v.toUpperCase() === id))
                  setPRelationshipId(index)
                  setPRelationship(PRELATIONSHIP_KEY[index])
                }}
                show={showPRelationshipModal}
                items={PRELATIONSHIP} />
            </>
          ) : (
            <InputReadOnly>{PRELATIONSHIP.filter(v => v.toUpperCase() == prelationship)[0]}</InputReadOnly>
          ) }
        </InputDiv>
      </Flex>
      <Flex className="justify-between" marginTop={10}>
        <InputDiv style={{ width: '70%', marginRight: 5 }}>
          <InputFieldLabel>Social Security Number </InputFieldLabel>
          { (type != 'edit') ? (
            <>
              <MaskInput
                type="tel"
                mask={SsnMask} value={ssn}
                placeholder="123-45-6789"
                onAccept={v => setSsn(v)} />
            </>
          ) : (
            <InputReadOnly>{ssn}</InputReadOnly>
          ) }

        </InputDiv>
        <InputDiv style={{ width: '30%' }} className={(invalidMaritalStatus) && requiredClass}>
          <InputFieldLabel>Marital Status* </InputFieldLabel>
          { (type != 'edit') ? (
            <>
              <CSelect style={{ width: '100%' }}
                       value={maritalStatus}
                       onMouseDown={(e) => {
                         e.preventDefault()
                         setShowMaritalStatusModal(true)
                       }} >
                <option></option>
                {MARTIAL_STATUS.map((item, idx) => (<option key={item} value={item.toUpperCase()}>{item}</option>))}
              </CSelect>
              <SelectPopupModal
                onClose={() => setShowMaritalStatusModal(false)}
                onSelect={(id) => setMaritalStatus(id)}
                show={showMaritalStatusModal}
                items={MARTIAL_STATUS} />
            </>
          ) : (
            <InputReadOnly>{MARTIAL_STATUS.filter(v => v.toUpperCase() == maritalStatus)[0]}</InputReadOnly>
          ) }
        </InputDiv>
      </Flex>
      <Flex className="justify-between" marginTop={10}>
        <InputDiv style={{ width: '100%' }}>
          <InputFieldLabel>Address </InputFieldLabel>
          { (type != 'edit') ? (
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
              defaultValue={paddress}
              placeholder="123, Any St, Any town, ST, 12345"
              onPlaceSelected={(place) => setPAddress(place.formatted_address)}
            />
          ) : (
            <InputReadOnly>{paddress}</InputReadOnly>
          ) }
        </InputDiv>
      </Flex>
      {!insuredProfile.isValidated && (
        <Flex className="justify-between" marginTop={20}>
          <LinkButton className="small" marginTop={15}>Cancel</LinkButton>
          <LinkButton className="small" marginTop={15} onClick={() => save()}>Save</LinkButton>
        </Flex>
      )}
    </InsuredFormWrapper>
  )
}