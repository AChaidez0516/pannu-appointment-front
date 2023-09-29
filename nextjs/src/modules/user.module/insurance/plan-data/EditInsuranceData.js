import { useRouter } from 'next/router'
import { useState } from 'react'

import {
  FormContainer,
  FormWrapper,
  Wrapper,
  LinkButton,
  Flex, CenteredRow,
  BottomWrapper
} from '../../../../common/styleds/common.styled'
import Layout from '../../../../components/Layout'
import PlanDataForm from '../plan-data-form'
import PlanTypeTabsComponent from '../shared/PlanTypeTabsComponent'
import {
  Title,
  EditInsuranceDataFormWrapper
} from './styled'
import { useInsurancePlanList } from '../../../../redux/hooks/useInsuranceStore'

export default function EditInsuranceData() {

  const router = useRouter()
  const { editId } = { ...router.query }
  const { insurancePlanList } = useInsurancePlanList()
  const insuranceData = insurancePlanList.find(data => data.id === editId)
  const [isUpdate, setUpdate] = useState(false)

  return (
    <Wrapper className="center">
      <FormWrapper>
        <FormContainer>
          <Layout title={isUpdate ? 'Edit Insurance data' : 'Insurance data'} hasDesktopTitle={true}>
            <div style={{marginTop: 9}}>
              <PlanTypeTabsComponent 
                planType={insuranceData.planType}
                canChangePlanType={isUpdate}
              />
            </div>
            <div>
              <Flex marginTop={15} style={{ marginBottom: 24 }}>
                <Title>
                  This is the current insurance data we have received from
                  the insurance provider.
                </Title>
              </Flex>
              {!isUpdate && (
                <Flex className="justify-between align-center" style={{marginBottom: '14px'}}>
                  <Flex>
                    <Title>You can edit any data if it is incorrect. </Title>
                  </Flex>
                  <LinkButton className="small" onClick={() => setUpdate(true)}>Edit</LinkButton>
                </Flex>
              )}
              <EditInsuranceDataFormWrapper isUpdate={isUpdate}>
                {insuranceData && (
                  <PlanDataForm
                    isUpdate={isUpdate}
                    setUpdate={setUpdate}
                    isEditPage={true}
                    insuranceDataToEdit={insuranceData}
                  />
                )}
                <div className="cover-veil"></div>
              </EditInsuranceDataFormWrapper>
              {!isUpdate && (
                <>
                  <Flex marginTop={30}>
                    <LinkButton className="normal" onClick={() => router.push('/users/insurance/plan-data')}>Add Insurances</LinkButton>
                  </Flex>
                  <BottomWrapper>
                    <CenteredRow marginTop={30}>
                      <LinkButton className="normal" onClick={() => router.push('/users/insurance/summary/')}>Done. Go to insurance summary</LinkButton>
                    </CenteredRow>
                  </BottomWrapper>
                </>
              )}
            </div>
          </Layout>
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  )
}
