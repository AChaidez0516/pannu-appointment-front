import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { useResponsibleParty, useResponsiblePartyType } from '../../../../../redux/hooks/useInsuranceStore'
import { Input, InputDiv, InputFieldLabel } from '../../../../../common/styleds/common.styled'
import { DeleteIcon, EditIcon } from '../../../../../common/utils/Icons'

import { RESPONSIBLE_PARTY_KEYS } from '../../index/data'
import { FRPartyDetailWrapper } from "./styled"
import { IMGS } from "../../../../../common/utils/styleGuide";

export function FRPartyDetail() {
  const router = useRouter()
  const { gotosummary: type } = router.query

  const { responsiblePartyType, commitResponsiblePartyType } = useResponsiblePartyType()
  const { responsibleParty, initResponsibleParty, updateResponsibleParty } = useResponsibleParty()

  const [primaryEmail, setPrimaryEmail] = useState(responsibleParty.primaryEmail)

  const removeResponsibleParty = () => {
		commitResponsiblePartyType(undefined)
    initResponsibleParty()
	}

  const editResponsibleParty = () => {
		if (responsiblePartyType === RESPONSIBLE_PARTY_KEYS.ME) {
      if (type != 'edit')
			  removeResponsibleParty()
      else
        updateResponsibleParty('isFetched', false)
		}
    else {
      updateResponsibleParty('isFetched', false)
		}
	}

  const handleSubmitOtherRParty = () => {
    // if user is subscribe, send sms,

    // if not, send email.
    updateResponsibleParty('primaryEmail', primaryEmail)
    updateResponsibleParty('isInvited', true)
  }
  return (
    <FRPartyDetailWrapper>
      <div className='detail-info'>
        <div className='title'>Financially responsible party* </div>
        <div className='content'>
          <div className='avatar'>
            <Image
              src={responsibleParty.userAvatar || IMGS.avatarWoman }
              width={35}
              height={35}
              alt={'user avatar'}
            />
          </div>
          <div className='detail-action'>
            <div className='detail'>
              <div className='name'>{responsibleParty?.fullName} - {responsibleParty?.relationship}</div>
              <div className='address'>{responsibleParty?.address}</div>
              <div className='address' style={{marginTop:'2px'}}>{responsibleParty?.primaryEmail}</div>
            </div>
            <div className='action'>
              <div
                style={{height: 28}}
                onClick={() => editResponsibleParty()}
              > <EditIcon /> </div>
              <div
                onClick={() => removeResponsibleParty()}
              > <DeleteIcon /> </div>

            </div>
          </div>
        </div>
      </div>

      {(responsiblePartyType === RESPONSIBLE_PARTY_KEYS.OTHER && (!responsibleParty?.primaryEmail)) && (
        <div className='contact-section'>
          <div className='contact-other'>
            <div className='desc'>
              Please enter email address of this person so that we will
              contact them to get their agreement
            </div>
          </div>
          <InputDiv>
            <InputFieldLabel>
              Email address of primary*
            </InputFieldLabel>
            <Input
              type="email"
              value={primaryEmail}
              onChange={(e) => setPrimaryEmail(e.target.value)} />
          </InputDiv>
          <div className='invite-btn'>
            <button
              className='transparent-btn-jin'
              onClick={() => removeResponsibleParty()}
            >Cancel</button>
            <button
              className='transparent-btn-jin'
              onClick={() => handleSubmitOtherRParty()}
            >Submit</button>
          </div>
        </div>
      )}

    </FRPartyDetailWrapper>
  )
}