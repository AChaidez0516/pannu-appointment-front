import dynamic from 'next/dynamic'
import Header from '../shared/Header'
import SideMenu from '../shared/SideMenu'
import DropdownIndicator from '../../../common/utils/DropdownIndicator'
import useWindowDimensions from '../../../common/hooks/useWindowDimensions';
import PackageOptionComponent from './PackageOptionComponent';

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useLocalStorage } from '../../../common/hooks/useLocalStorage'
import { useAuthUser, useLoadingStatus } from '../../../redux/hooks/useCommonStore'
import { MESSAGES } from '../../../common/constant/global'
import {
  getServiceLocationList,
  getOutsourcedStaffList,
} from '../../../common/lib/provider'
import {
  PackageWrapper,
  PackageDiscountWrapper,
  DiscountInstructionWrapper,
  ButtonWrapper,
  TextWrapper,
  SubmitWrapper,
  PackageServiceList
} from './styled'

import { 
  ProviderWrapper,
  Container,
  Panel,
  Caption,
  LinkButton,
  Table,
  Row,
  Col,
  Label,
  ImgButton,
  Text,
  SimpleBar
} from '../shared/styled';

const Select = dynamic(
  () => import('react-select'),
  { ssr: false }
)
const menuWidth = '103px'
const menuHeight = '31px'
const initState = () => {
  return [
    {
      serviceLocationID: '',
      costOfLiving: '',
      skillLevel: '',
      numberOfFTE: 0,
      rate1: 0,
      rate2: 0,
      monthlyCharge1: 0,
      monthlyCharge2: 0
    }
  ]
}

export const PACKAGE_OPTIONS = {
  USE_ALL: "USE_ALL",
  SERVICE_LEVEL: "SERVICE_LEVEL",
  START_APT_SOON: "START_APT_SOON",
  START_POEM_SOON: "START_POEM_SOON",
}

const INIT_PACKAGE_OPTIONS = [
  {
    id: 1,
    type: PACKAGE_OPTIONS.USE_ALL,
    explainText: "Will you use ALL of Pannu Corp’s products and services?",
    isAgree: true,
    agreeText: 'Agree*',
    disagreeText: 'Disagree. We will select the packages and services we want to deploy'
  }, {
    id: 2,
    type: PACKAGE_OPTIONS.SERVICE_LEVEL,
    explainText: "Select the package you will use",
    isAgree: true,
    agreeText: 'Basic',
    disagreeText: 'Advanced'
  }, {
    id: 3,
    type: PACKAGE_OPTIONS.START_APT_SOON,
    explainText: "Start immediately with Appointments application",
    isAgree: true,
    agreeText: 'Yes',
    disagreeText: 'No'
  }, {
    id: 4,
    type: PACKAGE_OPTIONS.START_POEM_SOON,
    explainText: "Start immediately with POEM application",
    isAgree: true,
    agreeText: 'Yes',
    disagreeText: 'No'
  }
]

function EstimatedPricingCalculation() {
  const { authUser } = useAuthUser()
  const { commitLoadingStatus } = useLoadingStatus()

  const PAGE_PREFIX = 'PVD_SIGNUP_ESTIMATED_PRICING_CALCULATION_'
  const PAGE_ITEMS_LAST_INDEX = 16
  const { height, width } = useWindowDimensions()
  const panelHeight = height - 20;

  const [totalAmount, setTotalAmount] = useState(0)
  const [discounted, setDiscounted] = useState(0)
  const [discountedTotal, setDiscountedTotal] = useState(0)
  const [reserveFeeList, setReserveFeeList] = useState(initState())
  const [serviceLocationList, setServiceLocationList] = useState([])
  const [oSSList, setOSSList] = useState([])
  const [packageOptions, setPackageOptions] = useLocalStorage(`${PAGE_PREFIX}5`, INIT_PACKAGE_OPTIONS) // Basic, 1: Advanced

  const RATE_LIST = {
    normal: {
      low: 2500,
      average: 3250,
      high: 3750
    },
    high: {
      low: 3250,
      average: 3750,
      high: 4500
    }
  }


  useEffect(() => {
    const init = async () => {
      try {
        const res = await getServiceLocationList(authUser.id)
        if (res)
          setServiceLocationList([...res])

        const res2 = await getOutsourcedStaffList(authUser.id)
        if (res2)
          setOSSList([...res2]);
      }
      catch (error) {
        console.log('data fetching error: ', error)
        toast.error(MESSAGES.server_error, { position: 'top-right' })
      }
    }

    init().catch(e => console.log(e))

  }, [])

  useEffect(() => {
    setTotalAmount(reserveFeeList
      .reduce((prev, curr) => prev + curr.monthlyCharge1 + curr.monthlyCharge2, 0))
  }, [reserveFeeList])


  const removeFee = (idx) => {
    let new_ = reserveFeeList.filter((v, i) => i != idx)

    if (new_.length == 0) {
      setReserveFeeList(initState())
    }
    else {
      setReserveFeeList([...new_])
    }

    let sum = 0
    new_.forEach((v) => {
      sum += v.providerNum * v.rate
    })

    setTotalAmount(sum)
  }

  const addAnotherFee = () => {
    setReserveFeeList([...reserveFeeList, ...initState()])
  }

  const save = () => {
    if (true)
      return
  }

  const handleServiceLocation = (serviceLocationID, idx) => {
    let numberOfFTEByServiceLocation = oSSList
      .filter(row => row.serviceLocationID == serviceLocationID)
      .map(row => row.scribesFTE)
      .reduce((prev, curr) => prev + curr, 0)

    setReserveFeeList(oldList => {
      return oldList.map((obj, index) => {
        return index == idx ? {
          ...obj,
          serviceLocationID,
          numberOfFTE: numberOfFTEByServiceLocation,
          monthlyCharge1: numberOfFTEByServiceLocation * obj.rate1,
          monthlyCharge2: numberOfFTEByServiceLocation * obj.rate2
        } : obj
      })
    })
  }

  const handleCostOfLiving = (costOfLiving, idx) => {
    let rate1 = 0;
    if (reserveFeeList[idx].skillLevel) {
      rate1 = costOfLiving ? RATE_LIST[reserveFeeList[idx].skillLevel][costOfLiving] : 0
    }

    const rate2 = costOfLiving ? RATE_LIST['high'][costOfLiving] : 0
    setReserveFeeList(oldList => {
      return oldList.map((obj, index) => {
        return index == idx ? {
          ...obj,
          costOfLiving,
          rate1,
          rate2,
          monthlyCharge1: obj.numberOfFTE * rate1,
          monthlyCharge2: obj.numberOfFTE * rate2,
        } : obj
      })
    })
  }

  const handleSkillLevel = (skillLevel, idx) => {
    let rate1 = 0;
    if (skillLevel) {
      rate1 = reserveFeeList[idx].costOfLiving ? RATE_LIST[skillLevel][reserveFeeList[idx].costOfLiving] : 0
    }
    setReserveFeeList(oldList => {
      return oldList.map((obj, index) => {
        return index == idx ? {
          ...obj,
          skillLevel,
          rate1,
          monthlyCharge1: obj.numberOfFTE * rate1,
        } : obj
      })
    })
  }

  const updatePackageOption = (packageOptionId, isAgree) => {
    console.log(packageOptionId, isAgree)
    setPackageOptions(packageOptions.map(pk => pk.id === packageOptionId ? ({
      ...pk,
      isAgree
    }) : pk))
  }

  return (
    <section>
      <ProviderWrapper className='provider'>
        <Header />
        <Container className='container'>
          <SideMenu />
          <Panel>
            <SimpleBar style={{ padding: '0 120px 30px 20px', maxHeight: panelHeight }}>
              <Caption>Estimated pricing calculation Basic package</Caption>
              <Table>
                <thead>
                  <Row>
                    <Col style={{ width: '15%' }}><Label>Service location</Label></Col>
                    <Col style={{ width: '15%' }}><Label>Cost of living</Label></Col>
                    <Col style={{ width: '15%' }}><Label>Outsourced Staff</Label></Col>
                    <Col style={{ width: '10%' }}><Label>Skill level</Label></Col>
                    <Col style={{ width: '10%' }}><Label>Rate</Label></Col>
                    <Col style={{ width: '10%' }}><Label>No. of FTE</Label></Col>
                    <Col style={{ width: '15%' }}><Label>Monthly charge<br />before discounts</Label></Col>
                    <Col style={{ width: '10%' }}><Label></Label></Col>
                  </Row>
                </thead>
                <tbody>
                  {reserveFeeList.map((v, i) => (
                    <Row key={i}>
                      <Col>
                        <div style={{ width: menuWidth, margin: '0 auto' }}>
                          <Select
                            styles={{
                              indicatorSeparator: () => { }, // removes the "stick"
                              control: (css) => ({
                                ...css,
                                width: menuWidth || "auto",
                                height: menuHeight,
                                border: 'none',
                                outline: 'none',
                                borderRadius: '0',
                                boxShadow: 'none',
                                forcedColorAdjust: "none",
                                opacity: menuWidth ? 1 : 0
                              }),
                              menu: (provided, state) => ({
                                ...provided,
                                width: "max-content",
                                outline: "none",
                                minWidth: menuWidth
                              }),
                            }}
                            components={{ DropdownIndicator }}
                            value={serviceLocationList && serviceLocationList.map(s => ({ label: s.legalName, value: s.id }))
                              .find(sl => sl.value === reserveFeeList[i]?.serviceLocationID) || null}
                            onChange={(newValue) => handleServiceLocation(newValue.value, i)}
                            options={serviceLocationList && serviceLocationList.map(s => ({ label: s.legalName, value: s.id }))}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div style={{ width: menuWidth, margin: '0 auto' }}>
                          <Select
                            styles={{
                              indicatorSeparator: () => { }, // removes the "stick"
                              control: (css) => ({
                                ...css,
                                width: menuWidth || "auto",
                                height: menuHeight,
                                border: 'none',
                                outline: 'none',
                                borderRadius: '0',
                                boxShadow: 'none',
                                forcedColorAdjust: "none",
                                opacity: menuWidth ? 1 : 0
                              }),
                              menu: (provided, state) => ({
                                ...provided,
                                width: "max-content",
                                outline: "none",
                                minWidth: menuWidth
                              }),
                            }}
                            components={{ DropdownIndicator }}
                            value={[
                              { value: "low", label: "Low" },
                              { value: "average", label: "Average" },
                              { value: "high", label: "High" },
                            ].find(item => item.value === reserveFeeList[i]?.costOfLiving) || null}
                            onChange={(newValue) => handleCostOfLiving(newValue.value, i)}
                            options={[
                              { value: "low", label: "Low" },
                              { value: "average", label: "Average" },
                              { value: "high", label: "High" },
                            ]}
                          />
                        </div>
                      </Col>
                      <Col>
                        <div style={{ marginBottom: '16px' }}>Assistant</div>
                        <div>Scribe</div>
                      </Col>
                      <Col>
                        { /*<div style={{ marginTop: -15 }}>
                          <Select
                            styles={{
                              indicatorSeparator: () => { }, // removes the "stick"
                              control: (css) => ({
                                ...css,
                                width: menuWidth || "auto",
                                height: menuHeight,
                                border: 'none',
                                outline: 'none',
                                borderRadius: '0',
                                boxShadow: 'none',
                                forcedColorAdjust: "none",
                                opacity: menuWidth ? 1 : 0
                              }),
                              menu: (provided, state) => ({
                                ...provided,
                                width: "max-content",
                                outline: "none",
                                minWidth: menuWidth
                              }),
                            }}
                            components={{ DropdownIndicator }}
                            defaultValue={[
                              { value: "normal", label: "Normal" },
                              { value: "high", label: "High" },
                            ].find(item => item.value === reserveFeeList[i]?.skillLevel) || null}
                            onChange={(newValue) => handleSkillLevel(newValue.value, i)}
                            options={[
                              { value: "normal", label: "Normal" },
                              { value: "high", label: "High" },
                            ]}
                          />
                        </div> */ }
                        <div style={{ marginBottom: '16px' }}>Normal</div>
                        <div>High</div>
                      </Col>
                      <Col>
                        <div style={{ marginBottom: '16px' }}>
                          <Text>${reserveFeeList[i]?.rate1 || '00.00'}</Text>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <Text>${reserveFeeList[i]?.rate2 || '00.00'}</Text>
                        </div>
                      </Col>
                      <Col>
                        <div style={{ marginBottom: '16px' }}>
                          <Text>{reserveFeeList[i]?.numberOfFTE || '000'}</Text>
                        </div>
                        <Text>{reserveFeeList[i]?.numberOfFTE || '000'}</Text>
                      </Col>
                      <Col>
                        <div style={{ marginBottom: '16px' }}>
                          <Text>{reserveFeeList[i]?.monthlyCharge1 || '000,000.00'}</Text>
                        </div>
                        <Text>{reserveFeeList[i]?.monthlyCharge2 || '000,000.00'}</Text>
                      </Col>
                      <Col>
                        <div style={{ display: 'flex', columnGap: '18px' }}>
                          <ImgButton style={{ marginRight: 20 }} src="/assets/images/ico-edit1.png" width={20} height={20} />
                          <ImgButton onClick={() => { removeFee(i) }} src="/assets/images/ico-delete.png" width={20} height={20} />
                        </div>
                      </Col>
                    </Row>
                  ))}
                  <Row style={{ borderBottom: 'none' }}>
                    <Col colSpan={6} style={{ padding: '15px 47px', textAlign: 'left' }}>
                      <TextWrapper fontSize={14}>Total monthly charge before discounts</TextWrapper>
                    </Col>
                    <Col style={{ padding: '15px' }}>
                      <TextWrapper fontSize={13}>{totalAmount || '000,000.000'}</TextWrapper>
                    </Col>
                  </Row>
                  <Row style={{ border: 'none' }}>
                    <Col colSpan={8} style={{ padding: '2px 47px 0 0', textAlign: 'right' }}>
                      <ButtonWrapper onClick={addAnotherFee} >Add Another</ButtonWrapper>
                    </Col>
                  </Row>
                  <Row style={{ display: 'none', border: 'none' }}>
                    <Col colSpan={2} style={{ padding: '11px 0 0 47px', textAlign: 'left' }}>
                      <TextWrapper fontSize={14} >Total monthly charge after discount</TextWrapper>
                    </Col>
                    <Col colSpan={2} style={{ padding: '11px 0 0 0px', textAlign: 'center' }}>
                      <div style={{ width: menuWidth, margin: '0 auto' }}>
                        <Select
                          styles={{
                            indicatorSeparator: () => { }, // removes the "stick"
                            control: (css) => ({
                              ...css,
                              width: menuWidth || "auto",
                              height: menuHeight,
                              border: 'none',
                              outline: 'none',
                              borderRadius: '0',
                              boxShadow: 'none',
                              forcedColorAdjust: "none",
                              opacity: menuWidth ? 1 : 0
                            }),
                            menu: (provided, state) => ({
                              ...provided,
                              width: "max-content",
                              outline: "none",
                              minWidth: menuWidth
                            }),
                          }}
                          components={{ DropdownIndicator }}
                          defaultValue={[
                            { label: "10%", value: 0.1 },
                            { label: "15%", value: 0.15 },
                            { label: "25%", value: 0.25 },
                            { label: "35%", value: 0.35 },
                            { label: "50%", value: 0.5 },
                          ].find(item => item.value === discounted) || null}
                          onChange={(newValue) => {
                            setDiscounted(newValue.value)
                            setDiscountedTotal(totalAmount - totalAmount * newValue.value)
                          }}
                          options={[
                            { label: "10%", value: 0.1 },
                            { label: "15%", value: 0.15 },
                            { label: "25%", value: 0.25 },
                            { label: "35%", value: 0.35 },
                            { label: "50%", value: 0.5 },
                          ]}
                        />
                      </div>
                    </Col>
                    <Col colSpan={3} style={{ padding: '11px 31px 0 47px', textAlign: 'right' }}>
                      <TextWrapper fontSize={13} >{discountedTotal || '000,000.000'}</TextWrapper>
                    </Col>
                  </Row>
                </tbody>
              </Table>
              <SubmitWrapper>
                <LinkButton onClick={() => { }} style={{ color: '#000' }}>Cancel</LinkButton>
                <LinkButton onClick={save} style={{ marginLeft: 50, marginRight: 20 }}>Save</LinkButton>
              </SubmitWrapper>
              <PackageWrapper>
                <PackageDiscountWrapper>
                  <div className='title-note'>We prioritize deployment to customers who will</div>
                  <ul>
                    <li>use ALL of Pannu Corp's products and services.</li>
                    <li>Higher priority for Advanced package over Basic package</li>
                    <li>Start immediately with the Appointments AND POEM applications</li>
                  </ul>
                </PackageDiscountWrapper>

                <PackageServiceList>
                  {packageOptions.map(pk => (
                    <PackageOptionComponent
                      key={pk.id}
                      packageOption={pk}
                      updatePackageOption={updatePackageOption}
                    />
                  ))}
                </PackageServiceList>
                <DiscountInstructionWrapper>
                  <div className='title-note'>You will be sent the final quote based on the actual price</div>
                  <ol type='a'>
                    <li>Try it risk free for 30 days</li>
                    <li>Extra charge for Advanced package refunded in full if not satisfied with ROI within the trial period. No cost downgrade to the Basic package if desired.</li>
                  </ol>
                  <div className='details'>
                    <div className='bottom-detail'>
                      <div>Since many customers receive quotes at the same time, the promotional discount rate applicable will be determined after receipt of your order confirmation. </div>
                      <div>The discount rate will be locked for 24 hours. Rush your acceptance. The rate will be redetermined after that.</div>
                    </div>
                    <div className='bottom-detail'>
                      <div>*You will have the option to decline any new service or product during the risk free trial period for a full refund.</div>
                      <div> Prices, offers and terms subject to change without notice.</div>
                    </div>
                  </div>
                </DiscountInstructionWrapper>
              </PackageWrapper>
            </SimpleBar>
          </Panel>
        </Container>
      </ProviderWrapper>
    </section>
  )
}


export default EstimatedPricingCalculation