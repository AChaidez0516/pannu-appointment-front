import SelectPopupModal from "../../../../../components/modals/SelectPopupModal"
import FRPartySaveCancelComponent from '../FRPartySaveCancelComponent'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import {
  Input,
  InputDiv,
  InputFieldLabel,
} from '../../../../../common/styleds/common.styled'
import { AddressInput } from '../../../../../common/styleds/autocomplete.styled'
import { MaskInput } from '../../../../../common/styleds/imask.styled'
import { FRPartyOtherFormWrapper } from "./styled"
import { Select } from "../../index/styled"

import { RRELATIONSHIP, RRELATIONSHIP_KEY } from '../../../../../common/constant/global'
import { RESPONSIBLE_PARTY_KEYS, RPARTY_RELATIONSHIPS, RPARTY_RELATIONSHIP_KEY, } from '../../index/data'
import { IMGS } from '../../../../../common/utils/styleGuide'

import { useRegUser } from '../../../../../redux/hooks/useCommonStore'
import { useResponsibleParty, useResponsiblePartyType } from "../../../../../redux/hooks/useInsuranceStore";

export default function ResponsiblePartyForm(props) {
  const PhoneNumberMask = '000-000-0000'
  const requiredClass = 'required'

  const {
  } = props

  const { regUser } = useRegUser()
  const { responsiblePartyType, commitResponsiblePartyType } = useResponsiblePartyType()
  const { responsibleParty, commitResponsibleParty, updateResponsibleParty } = useResponsibleParty()

  const [fullName, setFullName] = useState(responsibleParty.fullName)
  const [phoneNumber, setPhoneNumber] = useState(responsibleParty.phoneNumber)
  const [address, setAddress] = useState(responsibleParty.address)
  const [relationship, setRelationship] = useState(responsibleParty.relationship)
  const [relationshipId, setRelationshipId] = useState(RRELATIONSHIP_KEY.indexOf(responsibleParty.relationship))

  const [showRelationshipModal, setShowRelationshipModal] = useState(false)

  const [invalidFullNameOnID, setInvalidFullNameOnID] = useState(false)
  const [invalidAddress, setInvalidAddress] = useState(false)

  const validateOtherForm = () => {

    if (!fullName) {
      setInvalidFullNameOnID(true)
      return false
    }
    setInvalidFullNameOnID(false)
    if (!address) {
      setInvalidAddress(true)
      return false
    }
    setInvalidAddress(false)

    return true;
  }

  const cancelResponsibleParty = () => {
    if (responsibleParty.fullName) {
      updateResponsibleParty('isFetched', true)
      commitResponsiblePartyType(responsibleParty.responsiblePartyType)
    }
    else
      commitResponsiblePartyType(undefined)
  }

  const submitResponsiblePartyDetail = () => {
    // ME
    if (responsiblePartyType === RESPONSIBLE_PARTY_KEYS.ME) {
      commitResponsibleParty({
        isFetched: true,
        userAvatar: regUser?.avatar?.image || IMGS.avatarWoman,
        fullName: regUser?.fullName,
        relationship: RPARTY_RELATIONSHIP_KEY.ME,
        address: regUser?.basicData?.currentAddress,
        phoneNumber: '',
        responsiblePartyType: 'ME' //additional data for case that responsible type is ME
      })
    }
    // OTHER
    if (responsiblePartyType === RESPONSIBLE_PARTY_KEYS.OTHER && validateOtherForm()) {
      commitResponsibleParty({
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber,
        isFetched: true,
        relationship: relationship ? relationship : RPARTY_RELATIONSHIP_KEY.PARENT,
        responsiblePartyType: RESPONSIBLE_PARTY_KEYS.OTHER
      })
    }
  }

  if (responsiblePartyType === RESPONSIBLE_PARTY_KEYS.ME) {
    return (
      <FRPartySaveCancelComponent
        cancelResponsibleParty={cancelResponsibleParty}
        submitResponsiblePartyDetail={submitResponsiblePartyDetail}
        responsiblePartyType={RESPONSIBLE_PARTY_KEYS.ME}
      />
    )
  }

  return (
    <FRPartyOtherFormWrapper>
      <div style={{ display: 'flex' }}>
        <InputDiv style={{ width: '100%', marginRight: 5 }} className={(invalidFullNameOnID) && requiredClass}>
          <InputFieldLabel>Full name on government issued ID*</InputFieldLabel>
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <div className="err-msg">
            {invalidFullNameOnID ? 'Full name is required' : ''}
          </div>
        </InputDiv>
        <InputDiv style={{ width: '40%', marginRight: 5 }}>
          <InputFieldLabel style={{ left: 5 }}>Relationship</InputFieldLabel>
          <Select
            value={relationshipId}
            onMouseDown={(e) => {
              e.preventDefault()
              setShowRelationshipModal(true)
            }}
            style={{ width: '100%' }}>
            {RRELATIONSHIP.map((v, i) => (<option key={i} value={i}>{v}</option>))}
          </Select>
          <SelectPopupModal
            onClose={() => setShowRelationshipModal(false)}
            onSelect={(id) => {
              let index = RRELATIONSHIP.indexOf(RRELATIONSHIP.find(v => v.toUpperCase() === id))
              setRelationshipId(index)
              setRelationship(RRELATIONSHIP_KEY[index])
            }}
            show={showRelationshipModal}
            items={RRELATIONSHIP} />
        </InputDiv>
      </div>
      <div style={{ display: 'flex', marginTop: 30 }}>
        <InputDiv style={{ width: '100%', marginRight: 5 }} className={(invalidAddress) && requiredClass}>
          <InputFieldLabel>Address*</InputFieldLabel>
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
            defaultValue={address}
            placeholder="123, Any St, Any town, ST, 12345"
            onPlaceSelected={(place) => setAddress(place.formatted_address)} />
          <div className="err-msg">
            {invalidAddress ? 'Please enter a valid USPS serviceable address':''}
          </div>
        </InputDiv>
      </div>
      <div style={{ display: 'flex', marginTop: 30 }}>
        <InputDiv style={{ width: '100%', marginRight: 5 }}>
          <InputFieldLabel>Telephone no.</InputFieldLabel>
          <MaskInput
            type='tel'
            mask={PhoneNumberMask}
            value={phoneNumber}
            onAccept={value => setPhoneNumber(value)}
            placeholder="123-456-7890" />
        </InputDiv>
      </div>
      <FRPartySaveCancelComponent
        submitResponsiblePartyDetail={submitResponsiblePartyDetail}
        cancelResponsibleParty={cancelResponsibleParty}
        responsiblePartyType={RESPONSIBLE_PARTY_KEYS.OTHER}
      />
    </FRPartyOtherFormWrapper>
  )
}

