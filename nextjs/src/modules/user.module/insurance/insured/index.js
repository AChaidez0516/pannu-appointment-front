import Layout from '../../../../components/Layout'
import ResponsibleParty from '../responsible-party'
import InsuredForm from '../insured-form'

import { useRouter } from 'next/router'
import { INSURED_TYPE_KEYS } from '../index/data'
import { useInsuredType, useInsuredProfile } from '../../../../redux/hooks/useInsuranceStore'
import {
  FormContainer,
  FormWrapper,
  Wrapper,
  LinkButton,
  BottomWrapper, CenteredRow,
} from '../../../../common/styleds/common.styled'
import { InsuredWrapper } from './styled'

export default function Insured() {
  const router = useRouter()

  const { insuredType } = useInsuredType()
  const { insuredProfile } = useInsuredProfile()

  return (
    <Wrapper className="center">
      <FormWrapper>
        <FormContainer>
          <Layout title={ (insuredType === INSURED_TYPE_KEYS.MINOR_AGE_CHILE)
            ? "Add child's profile" : "Add Dependent's profile"} hasDesktopTitle={true}>
            <LinkButton className="normal" onClick={() => {}}>
              Add data easily by scanning ID
            </LinkButton>
            <InsuredWrapper>
              <InsuredForm />
            </InsuredWrapper>
            { insuredProfile.isValidated && (
              <ResponsibleParty />
            ) }
            <BottomWrapper>
              <CenteredRow marginTop={30}>
                <LinkButton className="normal" onClick={() => router.push('/users/insurance/summary/')}>Done. Go to insurance summary</LinkButton>
              </CenteredRow>
            </BottomWrapper>
          </Layout>
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  )
}