import Image from 'next/image'
import Layout from '../../../../components/Layout'
import ScanID from '../../../../components/ScanID'
import PlanDataForm from '../plan-data-form'
import PlanTypeTabsComponent from '../shared/PlanTypeTabsComponent'

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

import { useInsuredType, useInsurancePlanList } from '../../../../redux/hooks/useInsuranceStore'
import { useRegUser } from '../../../../redux/hooks/useCommonStore'
import { getUserDetail } from '../../../../common/lib/user'

import {
  Wrapper,
  FormContainer,
  FormWrapper,
  Flex,
  LinkButton, CenteredRow,
  BottomWrapper
} from '../../../../common/styleds/common.styled'
import {
  Title, FileUploadWrapper,
} from './styled'

import { INSURANCE_PLAN_TYPE, INSURED_TYPE_KEYS } from '../index/data'

import { MESSAGES } from '../../../../common/constant/global'
import {v4 as uuidv4} from "uuid";

function InsurancePlan() {
  const router = useRouter()

  const { insuredType } = useInsuredType()
  const { regUser } = useRegUser()
  const { addInsurancePlan } = useInsurancePlanList()

  const [haveMoreInsuranceForChild, setHaveAddMoreInsuranceForChild] = useState(false)

  const [isManually, setManually] = useState(false)

  const [selectedFrontFile, setSelectedFrontFile] = useState(undefined)
  const [selectedBackFile, setSelectedBackFile] = useState(undefined)

  const [guardianPlanList, setGuardianPlanList] = useState([])
  const [checkedGuardianPlan, setCheckedGuardianPlan] = useState([])

  function changedFile(file, type) {

    if (type == 'back_file')
      setSelectedBackFile(file)

    if (type == 'front_file')
      setSelectedFrontFile(file)

  }

  const submitInsuranceCard = () => {
    alert('OCR process')
  }

  const addGuardianInsurancePlan = () => {
    checkedGuardianPlan.forEach( (v, idx) => {
      if (v) {
        const plan = guardianPlanList[idx]

        const data = {
          id: uuidv4(),
          planName: plan.planName,
          planIssuer: plan.planIssuer,
          effectiveDate: '',
          nameOnCard: plan.nameOnCard,
          memberId: plan.memberId,
          planAddress: plan.planAddress,
          groupPlanId: plan.groupPlanId,
          patientSupportPhoneNumber: '',
          providerSupportPhoneNumber: '',
          oop: {}
        }

        if (plan.oopCost) {
          let isInNetworkBenefit = plan.oopCost.isInNetworkBenefit !== undefined ? plan.oopCost.isInNetworkBenefit : null
          let inNetworkIndividualDeductible = plan.oopCost.inNetworkIndividualDeductible !== undefined ? plan.oopCost.inNetworkIndividualDeductible : null
          let inNetworkIndividualMaximumOOP = plan.oopCost.inNetworkIndividualMaximumOOP !== undefined ? plan.oopCost.inNetworkIndividualMaximumOOP : null
          let inNetworkFamilyDeductible = plan.oopCost.inNetworkFamilyDeductible !== undefined ? plan.oopCost.inNetworkFamilyDeductible : null
          let inNetworkFamilyMaximumOOP = plan.oopCost.inNetworkFamilyMaximumOOP !== undefined ? plan.oopCost.inNetworkFamilyMaximumOOP : null
          let isOutNetworkBenefit = plan.oopCost.isOutNetworkBenefit !== undefined ? plan.oopCost.isOutNetworkBenefit : null
          let outNetworkIndividualDeductible = plan.oopCost.outNetworkIndividualDeductible !== undefined ? plan.oopCost.outNetworkIndividualDeductible : null
          let outNetworkIndividualMaximumOOP = plan.oopCost.outNetworkIndividualMaximumOOP !== undefined ? plan.oopCost.outNetworkIndividualMaximumOOP : null
          let outNetworkFamilyDeductible = plan.oopCost.outNetworkFamilyDeductible !== undefined ? plan.oopCost.outNetworkFamilyDeductible : null
          let outNetworkFamilyMaximumOOP = plan.oopCost.isInNetworkBenefit !== undefined ? plan.oopCost.outNetworkFamilyMaximumOOP : null

          data.oop = {
            isInNetworkBenefit: isInNetworkBenefit,
            inNetworkIndividualDeductible: inNetworkIndividualDeductible,
            inNetworkIndividualMaximumOOP: inNetworkIndividualMaximumOOP,
            inNetworkFamilyDeductible: inNetworkFamilyDeductible,
            inNetworkFamilyMaximumOOP: inNetworkFamilyMaximumOOP,
            isOutNetworkBenefit: isOutNetworkBenefit,
            outNetworkIndividualDeductible: outNetworkIndividualDeductible,
            outNetworkIndividualMaximumOOP: outNetworkIndividualMaximumOOP,
            outNetworkFamilyDeductible: outNetworkFamilyDeductible,
            outNetworkFamilyMaximumOOP: outNetworkFamilyMaximumOOP
          }
        }

        addInsurancePlan(data)
      }
    } )
  }
  const addMoreInsuranceForChild = () => {
    addGuardianInsurancePlan()
    setHaveAddMoreInsuranceForChild(true)
  }

  const doneForInsuredPerson = () => {
    addGuardianInsurancePlan()
    router.push('/users/insurance/summary')
  }

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUserDetail(regUser.id)
      if (!res) {
        toast.error(MESSAGES.server_error)
        return
      }

      const plans = res.insurancePlans
      const list = []
      plans.forEach((v, i) => {
        if (v.insureds == null || v.insureds.length == 0)
        {
          list.push(v)
        }

      })

      setGuardianPlanList(list)
      setCheckedGuardianPlan(Array.from(new Array(list.length), () => false))
    }

    if (insuredType == INSURED_TYPE_KEYS.MINOR_AGE_CHILE && !haveMoreInsuranceForChild)
      getUserInfo().catch(e => console.log(e))

  }, [])

  return (
    <Wrapper className="center">
      <FormWrapper>
        <FormContainer>
          <Layout title='Insurance data' hasDesktopTitle={true}>
            <Flex marginTop={10}>
              <PlanTypeTabsComponent 
                planType={INSURANCE_PLAN_TYPE.MAIN}
                canChangePlanType={true}
              />
            </Flex>
            { (insuredType == INSURED_TYPE_KEYS.MINOR_AGE_CHILE && guardianPlanList.length > 0 && haveMoreInsuranceForChild == false) ? (
              <div>
                <Flex marginTop={15}>
                  <Title>Child has parent's insurance</Title>
                </Flex>
                <Flex marginTop={15} className="col">
                  {guardianPlanList.map((v, i) => (
                    <Flex key={i} className="justify-between" marginTop={30}>
                      <div>{v.planName}</div>
                      <div>
                        <input type="checkbox" checked={checkedGuardianPlan[i]}
                               onChange={ (e) => {
                                 checkedGuardianPlan[i] = e.target.value
                                 setCheckedGuardianPlan([...checkedGuardianPlan])
                               } }
                               style={{width: 30, height: 15, background: '#EEEEEE', marginRight: '3px'}} />
                      </div>
                    </Flex>
                  ))}
                </Flex>
                <Flex marginTop={27}>
                  <LinkButton className="normal" onClick={addMoreInsuranceForChild}>Add more insurances</LinkButton>
                </Flex>
                <BottomWrapper>
                  <CenteredRow marginTop={30}>
                    <LinkButton className="big"
                                onClick={doneForInsuredPerson}>
                      Done. Go to insurance summary
                    </LinkButton>
                  </CenteredRow>
                </BottomWrapper>
              </div>
            ) : (
              <div>
                <FileUploadWrapper>
                  <Flex marginTop={15}>
                    <Title>
                      Take a photo of front and back of your insurance card.
                      Acceptable formats are jpg, jpeg, png, and pdf.*
                    </Title>
                  </Flex>
                  <ScanID changedFile={changedFile} />
                  <Flex className="justify-between" marginTop={10}>
                    <LinkButton className={ "small " + (isManually ? 'cl-gray' : '') }
                                onClick={ () => {
                                  isManually ? {} : setManually(true)
                                } }
                    >
                      Enter manually
                    </LinkButton>
                    <LinkButton className={"small " + ((isManually || !selectedFrontFile || !selectedBackFile) ? 'cl-gray' : '')}
                                onClick={() => {
                                  isManually || !selectedFrontFile || !selectedBackFile ? {} : submitInsuranceCard()
                                }}
                    >
                      Submit
                    </LinkButton>
                  </Flex>
                </FileUploadWrapper>

                {isManually && (
                  <>
                    <Flex marginTop={15}>
                      <Title>Complete applicable fields </Title>
                    </Flex>
                    <Flex marginTop={15}>
                      <Title>
                        Enter the insurance plan name. We will fill the plan name,
                        plan issuer, address and contact information if we have
                        it.
                      </Title>
                    </Flex>
                    <PlanDataForm
                      setManually={setManually}
                    />
                    <BottomWrapper>
                      <CenteredRow marginTop={30}>
                        <LinkButton className="big cl-gray"
                                    onClick={() => { }}>
                          Done. Go to insurance summary
                        </LinkButton>
                      </CenteredRow>
                    </BottomWrapper>
                  </>
                )}
              </div>
            ) }
          </Layout>
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  )
}

export default InsurancePlan
