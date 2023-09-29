import Image from 'next/image'
import Select from 'react-select'
import NumberFormat from 'react-number-format'
import Header from '../shared/Header'
import SideMenu from '../shared/SideMenu'
import useWindowDimensions from '../../../common/hooks/useWindowDimensions'

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAuthUser, useLoadingStatus } from '../../../redux/hooks/useCommonStore'
import { useLocalStorage } from '../../../common/hooks/useLocalStorage'
import { MESSAGES } from '../../../common/constant/global'
import {
  getBillingEntityList, getServiceLocationList, getClinicianRelationshipList,
  saveReserve
} from '../../../common/lib/provider'
import DropdownIndicator from '../../../common/utils/DropdownIndicator'
import {
  Text_Blue
} from './styled'
import {
  ProviderWrapper,
  Container,
  InputFieldLabel,
  InputDiv,
  Input,
  Panel,
  Caption,
  InputRow,
  LinkButton,
  Bottom,
  BottomWrapper,
  Item,
  ItemTitle,
  Table,
  Row,
  Col,
  Label,
  ImgButton,
  Text,
  SimpleBar,
  Flex,
} from '../shared/styled'
import { MaskInput_1 } from '../../../common/styleds/imask.styled'
import { AddressInput_1 } from '../../../common/styleds/autocomplete.styled'
import { PackageDiscountWrapper } from '../estimated-pricing-calculation/styled';

const menuWidth = '103px'
const menuHeight = '31px'
const INIT_RATE = 4000 // Pannu Corp sets it

const getEmptyReserveFeeData = () => {
  return {
    serviceLocationId: 0,
    billingEntityId: 0,
    providerNum: 3,
    rate: INIT_RATE
  }
}

function BillingEntities() {

  const { authUser } = useAuthUser()
  const { commitLoadingStatus } = useLoadingStatus()

  const PAGE_PREFIX = 'PVD_SIGNUP_RESERVE_NOW_'
  const PAGE_ITEMS_LAST_INDEX = 24

  const requiredClass = 'required'
  const PhoneMask = '000-000-0000'
  const DateMask = '00/00/0000'

  const { height, width } = useWindowDimensions()
  const panelHeight = height;

  const calcHeight = height < 670 ? 670 : height

  const [totalAmount, setTotalAmount] = useLocalStorage(`${PAGE_PREFIX}0`, 0)
  const [balance, setBalance] = useLocalStorage(`${PAGE_PREFIX}1`, 0)

  const [id, setId] = useLocalStorage(`${PAGE_PREFIX}2`, 0)
  const [companyName, setCompanyName] = useLocalStorage(`${PAGE_PREFIX}3`, '')
  const [fullName, setFullName] = useLocalStorage(`${PAGE_PREFIX}4`, '')
  const [email, setEmail] = useLocalStorage(`${PAGE_PREFIX}5`, '')
  const [mobileNumber, setMobileNumber] = useLocalStorage(`${PAGE_PREFIX}6`, '')
  const [nameOnCard, setNameOnCard] = useLocalStorage(`${PAGE_PREFIX}7`, '')
  const [cardNumber, setCardNumber] = useLocalStorage(`${PAGE_PREFIX}8`, '')
  const [cvv, setCvv] = useLocalStorage(`${PAGE_PREFIX}9`, '')
  const [expiryDate, setExpiryDate] = useLocalStorage(`${PAGE_PREFIX}10`, '')
  const [billingAddress, setBillingAddress] = useLocalStorage(`${PAGE_PREFIX}11`, '')

  const [invalidCompanyName, setInvalidCompanyName] = useState(false)
  const [invalidFullName, setInvalidFullName] = useState(false)
  const [invalidMobileNumber, setInvalidMobileNumber] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidNameOnCard, setInvalidNameOnCard] = useState(false)
  const [invalidCardNumber, setInvalidCardNumber] = useState(false)
  const [invalidCvv, setInvalidCvv] = useState(false)
  const [invalidExpiryDate, setInvalidExpiryDate] = useState(false)
  const [invalidBillingAddress, setInvalidBillingAddress] = useState(false)

  const [reserveList, setReserveList] = useState([])
  const [reserveFeeList, setReserveFeeList] = useState([getEmptyReserveFeeData()])
  const [serviceLocationList, setServiceLocationList] = useState([getEmptyReserveFeeData()])
  const [billingEntityList, setBillingEntityList] = useState([])
  const [relationshipList, setRelationshipList] = useState([])

  const [isEditable, setIsEditable] = useState(true)

  useEffect(() => {
    init().catch(e => console.log(e))
  }, [])

  const init = async () => {
    try {
      const [res1, res2, res3] = await Promise.all([
        getBillingEntityList(authUser.id),
        getServiceLocationList(authUser.id),
        getClinicianRelationshipList(authUser.id),
      ])
      setBillingEntityList(res1),
        setServiceLocationList(res2)
      setRelationshipList(res3)
    } catch (error) {
      console.log("data fetching error: ", error)
      toast.error(MESSAGES.server_error, { position: 'top-right' })
    }
  }

  const addAnotherFee = () => {
    setReserveFeeList([...reserveFeeList, getEmptyReserveFeeData()])
  }

  const deleteRow = (idx) => {
    if (reserveFeeList.length === 1) {
      return false
    }
    setReserveFeeList(reserveFeeList.filter((row, index) => idx !== index))
  }

  const save = () => {
    if (!checkFormData())
      return

    let data = {
      companyName: companyName,
      fullName: fullName,
      mobileNumber: mobileNumber,
      email: email,
      cardDetail: {
        nameOnCard: nameOnCard,
        cardNumber: cardNumber,
        cvv: cvv,
        expiryDate: expiryDate,
        billingAddress: billingAddress
      },
      reservedAmount: totalAmount,
      balanceToPaid: balance
    }

    if (id == 0) {
      commitLoadingStatus(true)
      saveReserve(authUser.id, data).then((res) => {
        commitLoadingStatus(false)
        if (res) {
          initFormData()
          setIsEditable(false)
        }
        else {
          toast.error(MESSAGES.server_error, { position: 'top-right' })
        }
      })
    }
    else {

    }
  }

  const initFormData = () => {
    setId(0)
    setCompanyName('')
    setFullName('')
    setEmail('')
    setMobileNumber('')
    setNameOnCard('')
    setCardNumber('')
    setCvv('')
    setExpiryDate('')
    setBillingAddress('')

    setTotalAmount()
    setBalance(0)
    setReserveFeeList([getEmptyReserveFeeData()])
  }

  const addAnotherReserve = () => {
    setIsEditable(true)
  }

  const checkFormData = () => {
    if (companyName == '') {
      setInvalidCompanyName(true)
      return false
    }
    else {
      setInvalidCompanyName(false)
    }

    if (fullName == '') {
      setInvalidFullName(true)
      return false
    }
    else {
      setInvalidFullName(false)
    }

    if (mobileNumber == '') {
      setInvalidMobileNumber(true)
      return false
    }
    else {
      setInvalidMobileNumber(false)
    }

    if (!email.toLocaleLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setInvalidEmail(true)
      return false
    }
    else {
      setInvalidEmail(false)
    }

    if (nameOnCard == '') {
      setInvalidNameOnCard(true)
      return false
    }
    else {
      setInvalidNameOnCard(false)
    }

    if (cardNumber == '') {
      setInvalidCardNumber(true)
      return false
    }
    else {
      setInvalidCardNumber(false)
    }

    if (cvv == '') {
      setInvalidCvv(true)
      return false
    }
    else {
      setInvalidCvv(false)
    }

    if (expiryDate == '') {
      setInvalidExpiryDate(true)
      return false
    }
    else {
      setInvalidExpiryDate(false)
    }

    if (billingAddress == '') {
      setInvalidBillingAddress(true)
      return false
    }
    else {
      setInvalidBillingAddress(false)
    }

    return true
  }

  const calcRelatedFee = (idx) => {
    console.log('calcRelatedFee')
    let feeData = reserveFeeList[idx]
    let providerNum = 0
    relationshipList.forEach(v => {
      if (v.serviceLocationID == feeData.serviceLocationId && v.billingEntityID == feeData.billingEntityId)
        providerNum++
    })

    reserveFeeList[idx].providerNum = providerNum

    let sum = 0
    reserveFeeList.forEach((v) => {
      sum += v.providerNum * v.rate
    })

    setTotalAmount(sum)
    setBalance(sum >= 500 ? sum - 500 : 0)
  }
  return (
    <section>
      <ProviderWrapper className='provider' style={{ minHeight: calcHeight }}>
        <Header />
        <Container className='container'>
          <SideMenu />
          <Panel style={{ minHeight: calcHeight - 105 }}>
            <SimpleBar style={{ marginLeft: 20, paddingRight: 120, maxHeight: panelHeight }}>
              <Caption>Calculation of reserve fee</Caption>
              <Table style={{ width: '80%', marginTop: 10 }}>
                <thead>
                  <Row>
                    <Col style={{ width: '20%' }}><Label>Service location</Label></Col>
                    <Col style={{ width: '20%' }}><Label>Billing entity</Label></Col>
                    <Col style={{ width: '20%' }}><Label>No.of providers</Label></Col>
                    <Col style={{ width: '15%' }}><Label>Rate</Label></Col>
                    <Col style={{ width: '15%' }}><Label>Amount</Label></Col>
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
                            value={serviceLocationList.map(b => ({ value: b.id, label: b?.legalName }))
                              .find(item => item.value === reserveFeeList[i]?.serviceLocationId) || null}
                            onChange={(newValue) => {
                              reserveFeeList[i].serviceLocationId = newValue.value
                              calcRelatedFee(i)
                              setReserveFeeList([...reserveFeeList])
                            }}
                            options={serviceLocationList.map(b => ({ value: b.id, label: b?.legalName }))}
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
                            value={billingEntityList.map(b => ({ value: b.id, label: b?.entityName }))
                              .find(item => item.value === reserveFeeList[i]?.billingEntityId)}
                            onChange={(newValue) => {
                              reserveFeeList[i].billingEntityId = newValue.value
                              calcRelatedFee(i)
                              setReserveFeeList([...reserveFeeList])
                            }}
                            options={billingEntityList.map(b => ({ value: b.id, label: b?.entityName }))}
                          />
                        </div>
                      </Col>
                      <Col><Text_Blue style={{color: '#173FD4'}}>{new String(v.providerNum).padStart(3, 0)}</Text_Blue></Col>
                      <Col>
                        <NumberFormat style={{color: '#65676B'}}
                          value={reserveFeeList[i].rate}
                          displayType={'text'}
                          thousandSeparator=','
                          decimalScale={2}
                          fixedDecimalScale={true}
                          prefix={'$'}
                        />
                      </Col>
                      <Col>
                        <NumberFormat style={{color: '#65676B'}}
                          value={v.providerNum * v.rate}
                          displayType={'text'}
                          thousandSeparator=','
                          decimalScale={2}
                          fixedDecimalScale={true}
                          prefix={'$'}
                        />
                      </Col>
                      <Col>
                        <Flex className="justify-between" style={{ width: '49px' }}>
                          <ImgButton src="/assets/images/ico-edit1.png" width="18" height="18" />
                          <ImgButton onClick={() => deleteRow(i)} src="/assets/images/ico-delete.png" width="18" height="18" />
                        </Flex>
                      </Col>
                    </Row>
                  ))}

                </tbody>
              </Table>
              <InputRow classNme="justify-between" marginTop={15} style={{width: '81.5%'}}>
                <Label>Toatal</Label>
                <Text style={{ marginRight: 90, width: '15%', textAlign: 'center' }}>
                  <NumberFormat
                    value={reserveFeeList.reduce((acc, cur) => (acc + cur.rate * cur.providerNum), 0)}
                    displayType={'text'}
                    thousandSeparator=','
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={'$'}
                  />
                </Text>
              </InputRow>
              <InputRow style={{ justifyContent: 'flex-end', width: '80%' }}>
                <LinkButton onClick={addAnotherFee} style={{ marginLeft: 50, marginRight: 20 }}>Add Another</LinkButton>
              </InputRow>
              <PackageDiscountWrapper>
                <div className='title-note'></div>
                <ul>
                  <li>Initial $500.00 by credit or debit card. Use form below.</li>
                  <li>Balance ${balance} must be paid using wire transfer. Wire transfer instructions and your reference number will also be in the email receipt for the card payment.</li>
                  <li>Wire transfers are due within 10 days. Include the reference number when you send the wire transfer.</li>
                  <li>Reservations are not final until the wire transfer payment is received.</li>
                </ul>
              </PackageDiscountWrapper>
              <Caption style={{ marginTop: 15 }}>Enter account details</Caption>
              <InputRow className="flex-start">
                <InputDiv style={{ width: '20%', marginRight: 10 }} className={(invalidCompanyName) && requiredClass}>
                  <InputFieldLabel>Company name{' '}</InputFieldLabel>
                  <Input value={companyName} onChange={(e) => { setCompanyName(e.target.value) }} />
                </InputDiv>
                <InputDiv style={{ width: '30%', marginRight: 10 }} className={(invalidFullName) && requiredClass}>
                  <InputFieldLabel>Full name on government issued ID{' '}</InputFieldLabel>
                  <Input value={fullName} onChange={(e) => { setFullName(e.target.value) }} placeholder={'First M.I. Last'} />
                </InputDiv>
                <InputDiv style={{ width: '15%', marginRight: 10 }} className={(invalidMobileNumber) && requiredClass}>
                  <InputFieldLabel>Mobile number{' '}</InputFieldLabel>
                  <MaskInput_1 mask={PhoneMask} value={mobileNumber} placeholder="123-456-7890" onAccept={(v) => { setMobileNumber(v) }} />
                </InputDiv>
                <InputDiv style={{ flex: 1, marginRight: 10 }} className={(invalidEmail) && requiredClass}>
                  <InputFieldLabel>Email address{' '}</InputFieldLabel>
                  <Input value={email} placeholder="abcd123@domain.com" onChange={(e) => { setEmail(e.target.value) }} />
                </InputDiv>
              </InputRow>
              <Caption style={{ marginTop: 15 }}>Card details</Caption>
              <InputRow className="flex-start">
                <InputDiv style={{ width: '20%', marginRight: 10 }} className={(invalidNameOnCard) && requiredClass}>
                  <InputFieldLabel>Name on card{' '}</InputFieldLabel>
                  <Input value={nameOnCard} onChange={(e) => { setNameOnCard(e.target.value) }} placeholder={'First M.I. Last'} />
                </InputDiv>
                <InputDiv style={{ width: '15%', marginRight: 10 }} className={(invalidCardNumber) && requiredClass}>
                  <InputFieldLabel>Card number{' '}</InputFieldLabel>
                  <Input value={cardNumber} onChange={(e) => { setCardNumber(e.target.value) }} placeholder='5498-5726-8774-6087' />
                </InputDiv>
                <InputDiv style={{ width: '7%', marginRight: 10 }} className={(invalidCvv) && requiredClass}>
                  <InputFieldLabel>Cvv{' '}</InputFieldLabel>
                  <Input value={cvv} onChange={(e) => { setCvv(e.target.value) }} />
                </InputDiv>
                <InputDiv style={{ width: '15%', marginRight: 10 }} className={(invalidExpiryDate) && requiredClass}>
                  <InputFieldLabel>Expiry date{' '}</InputFieldLabel>
                  <MaskInput_1 mask={DateMask} value={expiryDate} placeholder="MM/YY" onAccept={(v) => { setExpiryDate(v) }} />
                </InputDiv>
                <InputDiv style={{ flex: 1, marginRight: 10 }} className={(invalidBillingAddress) && requiredClass}>
                  <InputFieldLabel>Billing address{' '}</InputFieldLabel>
                  <AddressInput_1
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                    libraries={['places']}
                    options={{
                      componentRestrictions: {
                        country: ['us'],
                      },
                      types: [],
                      fields: ["place_id", "geometry", "name", "formatted_address", "plus_code"],
                    }}
                    defaultValue={billingAddress?.formated_address}
                    placeholder="12345 Anywhere St, Anytown, ST 12345 "
                    onPlaceSelected={(place) => setBillingAddress(place)} />
                </InputDiv>
              </InputRow>
              {(!isEditable) && (
                <InputRow className="justify-end" style={{ justifyContent: 'flex-end' }}>
                  <LinkButton onClick={addAnotherReserve} style={{ marginLeft: 50, marginRight: 20 }}>Add Another</LinkButton>
                </InputRow>
              )}
              {(isEditable) && (
                <InputRow className="justify-end">
                  <LinkButton onClick={() => {
                    setIsEditable(true)
                    initFormData()
                  }} style={{ color: '#000' }}>Cancel</LinkButton>
                  <LinkButton onClick={save} style={{ marginLeft: 50, marginRight: 20 }}>Reserve Now</LinkButton>
                </InputRow>
              )}
            </SimpleBar>
            <Bottom>
              {reserveList.length > 0 &&
                <BottomWrapper>
                  <Flex className="justify-start flex-wrap" style={{ padding: '0 20px' }}>
                    {reserveList.map((v, i) => (
                      <Item key={i}>
                        <ItemTitle>{v.companyName}</ItemTitle>
                        <div className='btn-group'>
                          <Image
                            src={ICONS.editUnderline}
                            width={12} height={15}
                            layou={'fixed'}
                            onClick={() => { }}
                          />
                          <Image
                            src={ICONS.redClose}
                            width={15} height={15}
                            layou={'fixed'}
                            onClick={() => { }}
                          />
                        </div>
                      </Item>
                    ))}
                  </Flex>
                </BottomWrapper>
              }
            </Bottom>
          </Panel>
        </Container>
      </ProviderWrapper>
    </section>
  )
}

export default BillingEntities