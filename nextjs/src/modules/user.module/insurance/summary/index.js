import Link from 'next/link'
import Image from 'next/image'

import Layout from '../../../../components/Layout'
import ConfirmDelete from '../shared/modals/ConfirmDelete'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { format, parse } from 'date-fns'
import {
  Wrapper,
  FormWrapper,
  FormContainer,
  Flex,
  LinkButton,
  BottomWrapper,
} from '../../../../common/styleds/common.styled'
import {
  Title,
  TableDiv,
  TrHeader,
  TrFooter,
  Tr,
  Td,
  TdText,
  LabelDesc
} from './styled'
import { RESPONSIBLE_PARTY_KEYS, INSURED_TYPE_KEYS } from '../index/data'
import { useInsuredProfile, useInsurancePlanList, useResponsibleParty, useOOPCost,
  useInsuredType, useResponsiblePartyType, useInsurance } from '../../../../redux/hooks/useInsuranceStore'
import { useRegUser, useLoadingStatus } from '../../../../redux/hooks/useCommonStore'
import {getUserDetail, saveInsuranceInfo, updateInsuranceInfo} from '../../../../common/lib/user'
import { MESSAGES } from '../../../../common/constant/global'

function Summary() {
  const router = useRouter()

  const { regUser } = useRegUser()
  const { commitLoadingStatus } = useLoadingStatus()

  const { insuredProfile } = useInsuredProfile()
  const { responsibleParty, initResponsibleParty } = useResponsibleParty()
  const { insurancePlanList, deleteInsurancePlan, removedPlanList } = useInsurancePlanList()
  const { deleteOOPCost } = useOOPCost()
  const { initInsurance } = useInsurance()

  const { insuredType } = useInsuredType()
  const { responsiblePartyType } = useResponsiblePartyType()

  const [alertPropsToDelete, setAlertPropsToDelete] = useState(null)

  /** edit/delete plan-data */
  const editInsuranceData = (editId) => {
    router.push({ pathname: '/users/insurance/plan-data/[editId]', query: { editId } })
  }

  const confirmDeleteInsuranceData = (deleteId) => {
    const insuranceDataToDelete = insurancePlanList.find(data => data.id === deleteId)
    setAlertPropsToDelete({
      isOpened: true,
      id: deleteId,
      message: `Are you sure you want to delete ${insuranceDataToDelete?.planName}?`,
    })
  }

  const removeInsuranceData = () => {
    deleteInsurancePlan(alertPropsToDelete.id)
    setAlertPropsToDelete(null)
  }

  /** edit/delete oop by planid */
  const editOopCost = (planId) => {
    router.push({ pathname: '/users/insurance/oop/[plan]', query: { plan: planId, mode: 'edit' } })
  }

  const deleteOop = (planId) => {
    deleteOOPCost(planId)
  }

  /** responsible party */

  const editResponsibleParty = () => {
    if (insuredType == INSURED_TYPE_KEYS.YOU)
      router.push('/users/insurance?gotosummary=edit')
    else if (insuredType == INSURED_TYPE_KEYS.MINOR_AGE_CHILE)
      router.push('/users/insurance/add-profile?gotosummary=edit')
    else if (insuredType == INSURED_TYPE_KEYS.ADULT_DEPENDENT)
      router.push('/users/insurance/add-profile?gotosummary=edit')
  }

  const deleteResponsibleParty = () => {
    initResponsibleParty()
    if (insuredType == INSURED_TYPE_KEYS.YOU)
      router.push('/users/insurance?gotosummary=edit')
    else if (insuredType == INSURED_TYPE_KEYS.MINOR_AGE_CHILE)
      router.push('/users/insurance/add-profile?gotosummary=edit')
    else if (insuredType == INSURED_TYPE_KEYS.ADULT_DEPENDENT)
      router.push('/users/insurance/add-profile?gotosummary=edit')
  }

  const addResponsibleParty = () => {
    if (insuredType == INSURED_TYPE_KEYS.YOU)
      router.push('/users/insurance?gotosummary=edit')
    else if (insuredType == INSURED_TYPE_KEYS.MINOR_AGE_CHILE)
      router.push('/users/insurance/add-profile?gotosummary=edit')
    else if (insuredType == INSURED_TYPE_KEYS.ADULT_DEPENDENT)
      router.push('/users/insurance/add-profile?gotosummary=edit')
  }

  const SaveAndNext = async () => {

    const data = {
      info: {
        type: insuredType,
        prefix: insuredProfile.prefix,
        suffix: insuredProfile.suffix,
        fullNameOnID: insuredProfile.fullNameOnID,
        dob: insuredProfile.dob ? format(parse(insuredProfile.dob, 'MM/dd/yyyy', new Date()), 'yyyy-MM-dd') : undefined,
        gender: insuredProfile.gender,
        relationship: insuredProfile.relationship,
        ssn: insuredProfile.ssn,
        maritalStatus: insuredProfile.maritalStatus,
        address: insuredProfile.address,

        responsibleParty: {
          frFullNameOnID: responsibleParty.fullName,
          frRelationship: responsibleParty.relationship,
          frAddress: responsibleParty.address,
          frPhoneNumber: responsibleParty.phoneNumber,
          frType: responsibleParty.responsiblePartyType,
          frEmail: responsibleParty.primaryEmail,
        },

        plans: [],
      },

      deletedPlans: [...removedPlanList]
    }

    if (insuredType == INSURED_TYPE_KEYS.YOU)
    {
      const user = await getUserDetail(regUser.id)
      data.info.prefix = user.prefix
      data.info.suffix = user.suffix
      data.info.ssn = user.basicData.ssn
      data.info.dob = user.dob
      data.info.gender = user.basicData.gender
      data.info.maritalStatus = user.basicData.maritalStatus
      data.info.address = user.basicData.currentAddress
      data.info.fullNameOnID = user.fullName
      data.info.relationship = 'YOU' //additional data for case that insure type is YOU
    }

    insurancePlanList.forEach(v => {
      let plan = {
        id: v.originalId,

        planName: v.planName,
        planIssuer: v.planIssuer,
        effectiveDate: v.effectiveDate ? format(parse(v.effectiveDate, 'MM/dd/yyyy', new Date()), 'yyyy-MM-dd') : undefined,
        nameOnCard: v.nameOnCard,
        memberId: v.memberId,
        planAddress: v.planAddress,
        groupPlanId: v.groupPlanId,
        patientSupportPhoneNumber: v.patientSupportPhoneNumber,
        providerSupportPhoneNumber: v.providerSupportPhoneNumber,
        type: v.planType,
        email: v.email,

        oopCost: {

        }
      }

      if (v.oop) {
        plan.oopCost = {
          isInNetworkBenefit: v.oop.isInNetworkBenefit,
          inNetworkIndividualDeductible: v.oop.inNetworkIndividualDeductible,
          inNetworkIndividualMaximumOOP: v.oop.inNetworkIndividualMaximumOOP,
          inNetworkFamilyDeductible: v.oop.inNetworkFamilyDeductible,
          inNetworkFamilyMaximumOOP: v.oop.inNetworkFamilyMaximumOOP,
          isOutNetworkBenefit: v.oop.isOutNetworkBenefit,
          outNetworkIndividualDeductible: v.oop.outNetworkIndividualDeductible,
          outNetworkIndividualMaximumOOP: v.oop.outNetworkIndividualMaximumOOP,
          outNetworkFamilyDeductible: v.oop.outNetworkFamilyDeductible,
          outNetworkFamilyMaximumOOP: v.oop.outNetworkFamilyMaximumOOP
        }
      }
      data.info.plans.push(plan)
    })

    if (insuredProfile.originalId == 0) {
      // add
      commitLoadingStatus(true)
      const res = await saveInsuranceInfo(regUser.id, data)
      commitLoadingStatus(false)
      if (res) {
        toast.success(MESSAGES.save_data_success, {
          onClose: () => {
            initInsurance()
            router.push('/users/insurance/')
          }
        })
      }
      else {
        toast.error(MESSAGES.server_error)
      }
    }
    else {
      // modify
      commitLoadingStatus(true)
      const res = await updateInsuranceInfo(insuredProfile.originalId, data)
      commitLoadingStatus(false)
      if (res) {
        toast.success(MESSAGES.save_data_success, {
          onClose: () => {
            initInsurance()
            router.push('/users/insurance/')
          }
        })
      }
      else {
        toast.error(MESSAGES.server_error)
      }
    }
  }

  return (
    <Wrapper className="center">
      <FormWrapper>
        <FormContainer>
          <Layout title="Insurance summary" hasDesktopTitle={true}>
            <Flex marginTop={15} style={{ marginBottom: 10 }}>
              <Title>Refer to your insurance benefits for this information. </Title>
            </Flex>
            <>
              <Flex>
                <Image
                  src="/assets/images/avatar.png"
                  width="42" height="42"
                  style={{ borderRadius: '50%' }}
                />
                <Flex marginTop={15} style={{ marginLeft: 10 }}>
                  <Title>{insuredType == INSURED_TYPE_KEYS.YOU ? 'YOU' : insuredProfile.fullNameOnID}</Title>
                </Flex>
              </Flex>

              <Flex className="justify-between align-center" marginTop={20}>
                <Flex className="col" style={{ width: '70%' }}>
                  <LabelDesc style={{ marginBottom: 16 }}>Financially responsible party* </LabelDesc>
                  { responsibleParty.fullName ? (
                    <>
                      <LabelDesc>{responsibleParty.fullName} - {(responsiblePartyType == RESPONSIBLE_PARTY_KEYS.ME) ? 'ME' : responsibleParty.relationship} </LabelDesc>
                      <LabelDesc>{responsibleParty.address}</LabelDesc>
                    </>
                  ) : (
                    <LabelDesc>Please add responsible party</LabelDesc>
                  ) }

                </Flex>
                { responsibleParty.fullName ? (
                  <>
                    <Image onClick={editResponsibleParty} src="/assets/images/ico-edit.png" width="16" height="20" />
                    <Image onClick={deleteResponsibleParty} src="/assets/images/ico-delete.png" width="20" height="20" />
                  </>
                ) : (
                  <Image onClick={addResponsibleParty} src="/assets/images/ico-plus.png" width="20" height="20" />
                ) }

              </Flex>

              <TableDiv>
                <TrHeader>
                  <Td style={{ width: '50%' }}>
                    <TdText>Insurance company</TdText>
                  </Td>
                  <Td style={{ width: '30%' }}>
                    <TdText>Insurance info</TdText>
                  </Td>
                  <Td style={{ width: '20%' }}>
                    <TdText style={{ textAlign: 'center' }}>OOP costs</TdText>
                  </Td>
                </TrHeader>

                { insurancePlanList.map((data, i) => (
                  <TrFooter key={i}>
                    <Td style={{ width: '50%' }}>
                      <TdText>{data.planName}</TdText>
                      <TdText>{data.planAddress}</TdText>
                    </Td>
                    <Td
                      style={{
                        width: '25%',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}
                    >
                      <Image
                        src="/assets/images/ico-edit.png"
                        width="16" height="20"
                        onClick={() => editInsuranceData(data.id)}
                      />
                      <Image
                        src="/assets/images/ico-delete.png"
                        width="20" height="20"
                        onClick={() => confirmDeleteInsuranceData(data.id)}
                      />
                    </Td>
                    <Td
                      style={{
                        width: '25%',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                      }}
                    >
                      { (!data?.oop) && (
                        <Link href={
                          {
                            pathname: "/users/insurance/oop/[plan]",
                            query: { plan: data.id, mode: 'add' }
                          }
                        }>
                          <Image src="/assets/images/ico-plus.png" width="20" height="20" />
                        </Link>
                      )}
                      { data?.oop && (
                        <>
                          <Image onClick={() => editOopCost(data.id)} src="/assets/images/ico-edit.png" width="16" height="20" />
                          <Image onClick={() => deleteOop(data.id)} src="/assets/images/ico-delete.png" width="20" height="20" />
                        </>
                      )}
                    </Td>
                  </TrFooter>
                ))}
              </TableDiv>
            </>

            <Flex marginTop={15}>
              <Link href={{ pathname: "/users/insurance/plan-data" }}>
                <LinkButton className="small">
                  Add more insurance
                </LinkButton>
              </Link>
            </Flex>

            <BottomWrapper>
              <Flex marginTop={30} className="justify-center">
                <LinkButton onClick={SaveAndNext} className="middle">
                  Go to insurance information
                </LinkButton>
              </Flex>
            </BottomWrapper>

            <ConfirmDelete
              {...alertPropsToDelete}
              onRemove={ removeInsuranceData }
              onCancel={ () => setAlertPropsToDelete(null) }
            />
          </Layout>
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  )
}

export default Summary
