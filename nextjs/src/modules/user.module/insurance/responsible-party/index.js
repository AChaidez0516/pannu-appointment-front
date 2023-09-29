import Link from 'next/link'

import ResponsiblePartyForm from './responsible-party-form'

import { useRouter } from 'next/router'

import { useResponsibleParty, useResponsiblePartyType } from '../../../../redux/hooks/useInsuranceStore'
import { RESPONSIBLE_PARTY_KEYS } from '../index/data'
import { FRPartySelectComponent } from './FRPartySelectComponent'
import { FRPartyDetail } from './responsible-party-detail'

import { ButtonsWrapper, ResponsiblePartyWrapper } from './styled'


export default function ResponsibleParty() {

  const router = useRouter()
  const { gotosummary } = router.query

  const { responsiblePartyType } = useResponsiblePartyType()
  const { responsibleParty } = useResponsibleParty()

  const goToAddInsuranceData = () => {
    router.push('/users/insurance/plan-data')
  }

  return (
    <ResponsiblePartyWrapper>
      {!responsibleParty?.isFetched && (
        <FRPartySelectComponent />
      )}
      {responsibleParty?.isFetched && (
        <FRPartyDetail />
      )}
      {responsiblePartyType && !responsibleParty.isFetched && (
        <ResponsiblePartyForm />
      )}
    </ResponsiblePartyWrapper>
  )
} 