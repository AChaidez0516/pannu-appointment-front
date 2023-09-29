import Layout from '../../../../components/Layout'
import PlanTypeTabsComponent from '../shared/PlanTypeTabsComponent'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { INSURANCE_PLAN_TYPE } from '../index/data'
import {
  Wrapper,
  FormWrapper,
  FormContainer,
  Flex,
  LinkButton,
  BottomWrapper
} from '../../../../common/styleds/common.styled'
import {
  Title,
  IOSSwitch,
  TableDiv,
  Tr,
  Td,
  TdText,
  MaskInput,
} from './styled'
import { useInsurancePlanList, useOOPCost } from '../../../../redux/hooks/useInsuranceStore'

function Oop() {
  const router = useRouter()
  const { insurancePlanList } = useInsurancePlanList()
  const { commitOOPCost }  = useOOPCost()

  const { plan, mode } = { ...router.query } // plan=planId in insuranceData

  const planType = insurancePlanList.find(data => data.id === plan)?.planType || INSURANCE_PLAN_TYPE.MAIN
  const [inNetworkBenefit, setInNetworkBenefit] = useState(true)
  const [outNetworkBenefit, setOutNetworkBenefit] = useState(false)
  const [inNetworkIndividualDeductible, setInNetworkIndividualDeductible] = useState()
  const [inNetworkIndividualMaximumOOP, setInNetworkIndividualMaximumOOP] = useState()
  const [inNetworkFamilyDeductible, setInNetworkFamilyDeductible] = useState()
  const [inNetworkFamilyMaximumOOP, setInNetworkFamilyMaximumOOP] = useState()
  const [outNetworkIndividualDeductible, setOutNetworkIndividualDeductible] = useState()
  const [outNetworkIndividualMaximumOOP, setOutNetworkIndividualMaximumOOP] = useState()
  const [outNetworkFamilyDeductible, setOutNetworkFamilyDeductible] = useState()
  const [outNetworkFamilyMaximumOOP, setOutNetworkFamilyMaximumOOP] = useState()

  const done = () => {
    let data = {
      planId: plan,
      oopCost: {
        isInNetworkBenefit: inNetworkBenefit,
        inNetworkIndividualDeductible: inNetworkIndividualDeductible,
        inNetworkIndividualMaximumOOP: inNetworkIndividualMaximumOOP,
        inNetworkFamilyDeductible: inNetworkFamilyDeductible,
        inNetworkFamilyMaximumOOP: inNetworkFamilyMaximumOOP,
        isOutNetworkBenefit: outNetworkBenefit,
        outNetworkIndividualDeductible: outNetworkIndividualDeductible,
        outNetworkIndividualMaximumOOP: outNetworkIndividualMaximumOOP,
        outNetworkFamilyDeductible: outNetworkFamilyDeductible,
        outNetworkFamilyMaximumOOP: outNetworkFamilyMaximumOOP
      }
    }

    commitOOPCost(data.planId, data.oopCost)
    router.push('/users/insurance/summary')
  }

  useEffect(() => {
    if (mode == 'edit') {
      const oopCost = insurancePlanList.find(data => data.id === plan).oop
      if (oopCost) {
        setInNetworkBenefit(oopCost.isInNetworkBenefit)
        setInNetworkIndividualDeductible(`${oopCost.inNetworkIndividualDeductible}`)
        setInNetworkIndividualMaximumOOP(`${oopCost.inNetworkIndividualMaximumOOP}`)
        setInNetworkFamilyDeductible(`${oopCost.inNetworkFamilyDeductible}`)
        setInNetworkFamilyMaximumOOP(`${oopCost.inNetworkFamilyMaximumOOP}`)
        setOutNetworkBenefit(`${oopCost.isOutNetworkBenefit}`)

        if (oopCost.isOutNetworkBenefit) {
          setOutNetworkBenefit(true)
          setOutNetworkIndividualDeductible(`${oopCost.outNetworkIndividualDeductible}`)
          setOutNetworkIndividualMaximumOOP(`${oopCost.outNetworkIndividualMaximumOOP}`)
          setOutNetworkFamilyDeductible(`${oopCost.outNetworkFamilyDeductible}`)
          setOutNetworkFamilyMaximumOOP(`${oopCost.outNetworkFamilyMaximumOOP}`)
        }
        else {
          setOutNetworkBenefit(false)
        }
      }
    }
  }, [])

  return (
    <Wrapper className="center">
      <FormWrapper>
        <FormContainer>
          <Layout title="Out of pocket costs" hasDesktopTitle={true}>
            <div style={{ marginBottom: 19 }}>
              <PlanTypeTabsComponent 
                planType={planType}
                canChangePlanType={false}
              />
            </div>
            <div>
              <Flex className="row justify-between">
                <Flex marginTop={15}>
                  <Title>
                    Do you have an out-of-pocket maximum for in-network benefits?*
                  </Title>
                </Flex>
                <Flex style={{ marginLeft: 20 }}>
                    <IOSSwitch
                      sx={{ m: 1 }}
                      defaultChecked
                      disabled={true}
                      onChange={(e) => console.log(e.target.checked)}
                    />
                </Flex>
              </Flex>
              <TableDiv>
                <Tr>
                  <Td style={{ width: '20%' }}>
                    <TdText>Individual</TdText>
                  </Td>
                  <Td style={{ width: '30%' }}>
                    <TdText>Deductible</TdText>
                    <TdText><MaskInput type="tel" mask={Number} value={inNetworkIndividualDeductible}
                      onAccept={v => setInNetworkIndividualDeductible(v)} /></TdText>
                  </Td>
                  <Td style={{ width: '50%' }}>
                    <TdText>Out-of-pocket maximum</TdText>
                    <TdText><MaskInput type="tel" mask={Number} value={inNetworkIndividualMaximumOOP}
                      onAccept={v => setInNetworkIndividualMaximumOOP(v)} /></TdText>
                  </Td>
                </Tr>
                <Tr>
                  <Td style={{ width: '20%' }}>
                    <TdText>Family</TdText>
                  </Td>
                  <Td style={{ width: '30%' }}>
                    <TdText>Deductible</TdText>
                    <TdText><MaskInput type="tel" mask={Number} value={inNetworkFamilyDeductible}
                      onAccept={v => setInNetworkFamilyDeductible(v)} /></TdText>
                  </Td>
                  <Td style={{ width: '50%' }}>
                    <TdText>Out-of-pocket maximum</TdText>
                    <TdText><MaskInput type="tel" mask={Number} value={inNetworkFamilyMaximumOOP}
                      onAccept={v => setInNetworkFamilyMaximumOOP(v)} /></TdText>
                  </Td>
                </Tr>
              </TableDiv>
              <Flex className="justify-between">
                <Flex marginTop={15}>
                  <Title>Out-of-network benefits.* </Title>
                </Flex>
                <Flex style={{ margin: 0, marginLeft: 20 }}>
                  <IOSSwitch
                    sx={{ m: 1 }}
                    style={{ padding: 0 }}
                    checked={outNetworkBenefit}
                    onChange={(e) => setOutNetworkBenefit(e.target.checked)}
                  />
                </Flex>
              </Flex>
              { (outNetworkBenefit)&& (
                <TableDiv>
                  <Tr>
                    <Td style={{ width: '20%' }}>
                      <TdText>Individual</TdText>
                    </Td>
                    <Td style={{ width: '30%' }}>
                      <TdText>Deductible</TdText>
                      <TdText><MaskInput type="tel" mask={Number} value={outNetworkIndividualDeductible}
                        onAccept={v => setOutNetworkIndividualDeductible(v)} /></TdText>
                    </Td>
                    <Td style={{ width: '50%' }}>
                      <TdText>Out-of-pocket maximum</TdText>
                      <TdText><MaskInput type="tel" mask={Number} value={outNetworkIndividualMaximumOOP}
                        onAccept={v => setOutNetworkIndividualMaximumOOP(v)} /></TdText>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td style={{ width: '20%' }}>
                      <TdText>Family</TdText>
                    </Td>
                    <Td style={{ width: '30%' }}>
                      <TdText>Deductible</TdText>
                      <TdText><MaskInput type="tel" mask={Number} value={outNetworkFamilyDeductible}
                        onAccept={v => setOutNetworkFamilyDeductible(v)} /></TdText>
                    </Td>
                    <Td style={{ width: '50%' }}>
                      <TdText>Out-of-pocket maximum</TdText>
                      <TdText><MaskInput type="tel" mask={Number} value={outNetworkFamilyMaximumOOP}
                        onAccept={v => setOutNetworkFamilyMaximumOOP(v)} /></TdText>
                    </Td>
                  </Tr>
                </TableDiv>
              )}
              <BottomWrapper>
                <Flex className="justify-center" marginTop={30}>
                  <LinkButton className="middle" onClick={done}>Done</LinkButton>
                </Flex>
              </BottomWrapper>
            </div>
          </Layout>
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  )
}

export default Oop
