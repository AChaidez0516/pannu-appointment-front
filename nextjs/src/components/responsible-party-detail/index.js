import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { useResponsibleParty, useResponsiblePartyType } from '../../redux/hooks/useInsuranceStore'

import { Input, InputDiv, InputFieldLabel } from '../../common/styleds/common.styled'
import { DeleteIcon, EditIcon } from '../../common/utils/Icons'

import { RESPONSIBLE_PARTY_KEYS } from '../../modules/user.module/insurance/index/data'
import { FRPartyDetailWrapper } from "./styled"
import { IMGS } from "../../common/utils/styleGuide";

import {
  deleteFRParty
} from "../../common/lib/user";

export function FRPartyDetail() {
  const router = useRouter()
  const { gotosummary: type } = router.query

  const { responsiblePartyType, commitResponsiblePartyType } = useResponsiblePartyType()
  const { responsibleParty, initResponsibleParty, updateResponsibleParty } = useResponsibleParty()

  const [primaryEmail, setPrimaryEmail] = useState(responsibleParty.primaryEmail)

  const removeResponsibleParty = async() => {
    let deleteData = await deleteFRParty(1); //userId
    commitResponsiblePartyType(undefined);
    initResponsibleParty();
  }

  const editResponsibleParty = () => {
    router.push("/manual/insuranceInfo");
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
        {responsibleParty.fullName ?
          <div className='content'>
            <div className='avatar'>
              <Image
                src={responsibleParty.userAvatar || IMGS.avatarWoman}
                width={35}
                height={35}
                alt={'user avatar'}
              />
            </div>
            <div className='detail-action'>
              <div className='detail'>
                <div className='name'>{responsibleParty?.fullName} - {responsibleParty?.relationship}</div>
                <div className='address'>{responsibleParty?.address}</div>
                <div className='address' style={{ marginTop: '2px' }}>{responsibleParty?.primaryEmail}</div>
              </div>
              <div className='action'>
                <div
                  style={{ height: 28 }}
                  onClick={() => editResponsibleParty()}
                > <EditIcon /> </div>
                <div
                  onClick={() => removeResponsibleParty()}
                > <DeleteIcon /> </div>

              </div>
            </div>
          </div> :
          <div className='contentEmpty'>
            <p style={{ cursor: 'pointer' }} onClick={() => { router.push("/manual/insuranceInfo") }}>Please add this data</p>
          </div>}
      </div>
    </FRPartyDetailWrapper>
  )
}