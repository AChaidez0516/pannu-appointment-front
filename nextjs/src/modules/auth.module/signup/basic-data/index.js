import MenuItem from '@mui/material/MenuItem'

import Layout from '../../../../components/Layout'
import SelectPopupModal from '../../../../components/modals/SelectPopupModal'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
//import { CreateChatUser } from '../../../../common/lib/chat'
import { useRegUser, useIDCardData, useLoadingStatus } from '../../../../redux/hooks/useCommonStore'
import {
  SEX,
  MARTIAL_STATUS,
  PATIENT_HISTORY_STATUS,
  OCCUPATION,
  MESSAGES,
} from '../../../../common/constant/global'

import {
  Wrapper,
  FormWrapper,
  FormContainer,
  Flex,
  CenteredRow,
  InputFieldLabel,
  InputDiv,
  Input,
  CSelect,
  DesktopViewer,
  DesktopTitle,
  LinkButton,
  BottomWrapper,
  ContentWrapper,
} from '../../../../common/styleds/common.styled'
import { MaskInput } from '../../../../common/styleds/imask.styled'
import { AddressInput } from '../../../../common/styleds/autocomplete.styled'
import { MUISelect } from '../../../../common/styleds/select.styled'
import {
  Title,
} from '../../shared/styled'
import {
  AddButton,
  PoemDiv,
  EmployText,
} from './styled'
import { format, parse } from 'date-fns'

function BasicData() {
  const { regUser, commitRegUser } = useRegUser()
  const { idcardData } = useIDCardData()
  const { commitLoadingStatus } = useLoadingStatus()

  const requiredClass = 'required'
  const SsnMask = '000-00-0000'

  const router = useRouter()
  const year = new Date().getFullYear() - 10
  const years = Array.from(new Array(20), (val, index) => index + year)
  const workYears = Array.from(new Array(15), (val, index) => index + 1)
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const [email, setEmail] = useState('')
  const [ssn, setSSN] = useState('')
  const [addressList, setAddressList] = useState([])
  const [employerName, setEmployerName] = useState('')
  const [position, setPosition] = useState('')
  const [employerAddress, setEmployerAddress] = useState('')
  const [employeeNumber, setEmployerNo] = useState('')
  const [annualIncome, setAnnualIncome] = useState()
  const [gender, setGender] = useState('')
  const [maritalStatus, setMaritalStatus] = useState(``)
  const [occupation, setOccupation] = useState('')
  const [yearInWork, setYearInWork] = useState()
  const [monthInWork, setMonthInWork] = useState()

  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidSSN, setInvalidSSN] = useState(false)
  const [invalidMaritalStatus, setInvalidMaritalStatus] = useState(false)
  const [invalidAddressList, setInvalidAddressList] = useState(false)
  const [invalidYearInWork, setInvalidYearInWork] = useState(false)
  const [invalidMonthInWork, setInvalidMonthInWork] = useState(false)
  const [invalidAnnualIncome, setInvalidAnnualIncome] = useState(false)

  const [showMaritalStatusModal, setShowMaritalStatusModal] = useState(false)
  const [showGenderModal, setShowGenderModal] = useState(false)
  const [showOccupationModal, setShowOccupationModal] = useState(false)
  const [showHomeStatusModal, setShowHomeStatusModal] = useState([false])

  const SubmitAndVerify = async () => {
    if (!email.toLocaleLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setInvalidEmail(true)
      return
    }
    else {
      setInvalidEmail(false)
    }

    if (!ssn.toLocaleLowerCase().match(/^\d{3}-?\d{2}-?\d{4}$/)) {
      setInvalidSSN(true)
      return
    }
    else {
      setInvalidSSN(false)
    }

    if (maritalStatus == '') {
      setInvalidMaritalStatus(true)
      return
    }
    else {
      setInvalidMaritalStatus(false)
    }

    let blValidAddressList = true
    for (let i = 0; i < addressList.length; i++) {
      let address = addressList[i]
      if (address.name == '') {
        invalidAddressList[i].invalidName = true
        blValidAddressList = false
      }

      if (address.year == '') {
        invalidAddressList[i].invalidYear = true
        blValidAddressList = false
      }

      if (address.month == '') {
        invalidAddressList[i].invalidMonth = true
        blValidAddressList = false
      }

      if (address.homeStatus == '') {
        invalidAddressList[i].invalidHomeStatus = true
        blValidAddressList = false
      }
    }

    setInvalidAddressList([...invalidAddressList])

    if (!blValidAddressList)
      return

    if (annualIncome === undefined || annualIncome == '') {
      setInvalidAnnualIncome(true)
      return
    }
    else {
      setInvalidAnnualIncome(false)
    }

    if (yearInWork === undefined || yearInWork == '') {
      setInvalidYearInWork(true)
      return
    }
    else {
      setInvalidYearInWork(false)
    }

    if (monthInWork === undefined || monthInWork == '') {
      setInvalidMonthInWork(true)
      return
    }
    else {
      setInvalidMonthInWork(false)
    }

    let userType = 'PATIENT'
    let { fullName, suffix, prefix, dob, phoneNumber, idenfier, password, inviteCode, referralCode } = { ...regUser }
    let _annualIncome = annualIncome.length > 0 ? parseFloat(annualIncome) : 0

    let data = {
      fullName, suffix, prefix,
      dob: format(parse(dob, 'MM/dd/yyyy', new Date()), 'yyyy-MM-dd'),
      phoneNumber, idenfier, password, inviteCode, referralCode, userType,
      email, gender, maritalStatus, ssn,
      addressList,
      employeeNumber, employerName, employerAddress, yearInWork, monthInWork, occupation, position,
      annualIncome: _annualIncome
    }

    commitLoadingStatus(true)

    const { registerUser } = (await import('../../../../common/lib/user'))
    const res = await registerUser(data)

    commitLoadingStatus(false)

    if (res == null) {
      toast.error(MESSAGES.server_error)
      return
    }

    /*CreateChatUser({
        fullName: regUser.fullName,
        email: res.internalEmail,
        password: regUser.password,
        userId: res.id,
        role: regUser.userType
      }).then((res1) => {
        console.log(res1)
      })*/

    let u = {
      id: res.id,
      fullName: regUser.fullName,
      suffix: regUser.suffix,
      prefix: regUser.prefix,
      phoneNumber: regUser.phoneNumber,
      dob: regUser.dob,
      idenfier: regUser.idenfier,
      password: '',
      inviteCode: regUser.inviteCode,
      referralCode: regUser.referralCode,
      email: email,
      internalEmail: res.internalEmail,
      currentAddress: addressList[0].address,
      gender: gender,
      ssn: ssn,
      maritalStatus: maritalStatus,
      addressList: addressList,
      employeeNumber: employeeNumber,
      employerName: employerName,
      occupation: occupation,
      position: position,
      employerAddress: employerAddress,
      annualIncome: annualIncome,
      yearInWork: yearInWork,
      monthInWork: monthInWork
    }

    commitRegUser(u)

    toast.success(MESSAGES.save_data_success, {
      onClose: () => {
        router.push('/auth/signup/verify-email')
      }
    } )
  }

  const showHomeStatusPopup = (idx) => {
    showHomeStatusModal[idx] = true
    setShowHomeStatusModal([...showHomeStatusModal])
  }

  const closeHomeStatusPopup = (idx) => {
    showHomeStatusModal[idx] = false
    setShowHomeStatusModal([...showHomeStatusModal])
  }

  useEffect(() => {
    if (idcardData) {
      setAddressList([{
        address: idcardData.address,
        year: '',
        month: '',
        homeStatus: ''
      }])
      setInvalidAddressList([{ invalidAddress: false, invalidYear: false,
        invalidMonth: false, invalidHomeStatus: false }])

      setGender(idcardData.gender)
    }

    setShowHomeStatusModal([false])

    if (regUser && idcardData) {
      regUser['fullName'] = idcardData.fullName
    }

  }, [])

  const addAddress = () => {
    setAddressList([...addressList, { address: '', year: '', month: '', homeStatus: '' }])
    setInvalidAddressList([...invalidAddressList, { invalidAddress: false, invalidYear: false, invalidMonth: false, invalidHomeStatus: false }])
    setShowHomeStatusModal([...showHomeStatusModal, false])
  }

  return (
    <Wrapper className="center">
      <FormWrapper>
        <FormContainer>
          <DesktopViewer>
            <DesktopTitle className="pb-0">Basic Data</DesktopTitle>
          </DesktopViewer>
          <Layout title="Basic data">
            <ContentWrapper>
              <Title className="small left mt-8">Lets get some information. </Title>
              <Title className="small left mt-8">
                We protect your personal and financial information, and privacy using
                industry standard best practices, to comply with HIPAA and applicable
                laws.{' '}
              </Title>
              <Title className="small left mt-8">
                Your data will be saved as you enter it. You can safely stop or pause
                if you need to and come back anytime to continue where you left off.{' '}
              </Title>
              <PoemDiv style={{ display: 'flex', textAlign: 'center' }}>
                <Title className="small left mt-0">
                  To enjoy the benefits and advantages of the POEM service, complete the
                  fields inside the blue box{' '}
                </Title>
              </PoemDiv>
              <div style={{ display: 'flex', marginTop: 20 }}>
                <InputDiv style={{ flex: '1 1 60%', marginRight: 5 }} className={(invalidEmail) && requiredClass}>
                  <InputFieldLabel>Email address*</InputFieldLabel>
                  <Input type="email" value={email}
                    placeholder="abcd123@domain.com"
                    onChange={(val) => setEmail(val.target.value)} />
                </InputDiv>
                <InputDiv>
                  <InputFieldLabel style={{ left: 5 }}>Gender</InputFieldLabel>
                  <CSelect
                    onMouseDown={(e) => {
                      e.preventDefault()
                      setShowGenderModal(true)
                    }}
                    value={gender}
                    style={{ width: 80, padding: '10px 0px 10px 0px' }}
                  >
                    <option></option>
                    {SEX.map((item, idx) => (<option key={idx} value={item.toUpperCase()}>{item}</option>))}
                  </CSelect>
                  <SelectPopupModal
                    onClose={() => setShowGenderModal(false)}
                    onSelect={(id) => setGender(id)}
                    show={showGenderModal}
                    items={SEX} />
                </InputDiv>
              </div>
              <div style={{ display: 'flex' }}>
                <InputDiv style={{ width: '90%', marginRight: 5 }} className={(invalidSSN) && requiredClass}>
                  <InputFieldLabel>Social Security Number*</InputFieldLabel>
                  <MaskInput
                    type="tel"
                    mask={SsnMask}
                    value={ssn}
                    onAccept={v => setSSN(v)}
                    placeholder="123-45-6789"
                  />
                </InputDiv>

                <InputDiv className={(invalidMaritalStatus) && requiredClass}>
                  <InputFieldLabel style={{ left: 5 }}>Marital status*</InputFieldLabel>
                  <CSelect
                    onMouseDown={(e) => {
                      e.preventDefault()
                      setShowMaritalStatusModal(true)
                    }}
                    style={{ width: 130, padding: '10px 0px 10px 0px' }}
                    value={maritalStatus}
                  >
                    <option></option>
                    {MARTIAL_STATUS.map((item, idx) => (<option key={idx} value={item.toUpperCase()}>{item}</option>))}
                  </CSelect>
                  <SelectPopupModal
                    onClose={() => setShowMaritalStatusModal(false)}
                    onSelect={(id) => setMaritalStatus(id)}
                    show={showMaritalStatusModal}
                    items={MARTIAL_STATUS} />
                </InputDiv>
              </div>
              <InputDiv style={{ width: '100%', marginRight: 5 }} className={(invalidAddressList && invalidAddressList[0].invalidAddress) && requiredClass}>
                <InputFieldLabel>Address* </InputFieldLabel>
                <AddressInput
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                  libraries={['places']}
                  options={{
                    componentRestrictions: {
                      country: ['us'],
                    },
                    types: [],
                    fields: ["formatted_address"],
                  }}
                  defaultValue={addressList.length > 0 ? addressList[0].address : ''}
                  onChange={(e) => { addressList[0].address = e.target.value }}
                  placeholder="123, Any St, Any town, ST, 12345"
                  onPlaceSelected={(place) => addressList[0].address = place.formatted_address}
                />
              </InputDiv>
              <PoemDiv style={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
                <Title className="small mt-0">
                  Enter 1 year history of home addresses.
                </Title>
                <Flex>
                  <InputDiv style={{ width: 70, marginRight: 5 }} className={(invalidAddressList && invalidAddressList[0].invalidYear) && requiredClass}>
                    <InputFieldLabel style={{ left: 5 }}>Year*</InputFieldLabel>
                    <MUISelect
                      style={{ width: 70, padding: '10px 0px 10px 0px' }}
                      value={addressList.length > 0 ? addressList[0].year : ''}
                      onChange={(e) => { addressList[0].year = parseInt(e.target.value, 10); setAddressList([...addressList]) }}>
                      {years &&
                        years?.map(function (year, idx) {
                          return (
                            <MenuItem key={idx} value={year}>
                              {year}
                            </MenuItem>
                          )
                        })}
                    </MUISelect>
                  </InputDiv>
                  <InputDiv style={{ width: 70, marginRight: 5 }} className={(invalidAddressList && invalidAddressList[0].invalidMonth) && requiredClass}>
                    <InputFieldLabel style={{ left: 5 }}>Months*</InputFieldLabel>
                    <MUISelect style={{ width: 70, padding: '10px 0px 10px 0px' }}
                      value={addressList.length > 0 ? addressList[0].month : ''}
                      onChange={(e) => { addressList[0].month = parseInt(e.target.value, 10); setAddressList([...addressList]) }}>
                      {months.map((v, k) => (<MenuItem key={k} value={v}>{v}</MenuItem>))}
                    </MUISelect>
                  </InputDiv>
                  <InputDiv style={{ width: 70 }} className={(invalidAddressList && invalidAddressList[0].invalidHomeStatus) && requiredClass}>
                    <InputFieldLabel style={{ left: 5 }}>Status*</InputFieldLabel>
                    <CSelect style={{ width: 70, padding: '10px 0px 10px 0px' }}
                      value={addressList.length > 0 ? addressList[0].homeStatus : ''}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        showHomeStatusPopup(0)
                      }}>
                      <option></option>
                      {PATIENT_HISTORY_STATUS.map(function (item, idx1) {
                        return (
                          <option key={idx1 + item} value={item.toUpperCase()}>
                            {item}
                          </option>
                        )
                      })}
                    </CSelect>
                    <SelectPopupModal
                      onClose={() => closeHomeStatusPopup(0)}
                      onSelect={(id) => { addressList[0].homeStatus = id; setAddressList([...addressList]) }}
                      show={showHomeStatusModal[0]}
                      items={PATIENT_HISTORY_STATUS} />
                  </InputDiv>
                  {addressList.length < 2 && <AddButton onClick={() => addAddress()}>+ Add address</AddButton>}
                </Flex>
                {(addressList.length > 1) &&
                  addressList.map(function (item, idx) {
                    if (idx == 0) return
                    return (
                      <div key={idx}>
                        <InputDiv style={{ width: '100%', marginRight: 5 }}
                          className={(invalidAddressList[idx].invalidAddress) && requiredClass}>
                          <InputFieldLabel>Address* </InputFieldLabel>
                          {/* <Input/>                 */}
                          <AddressInput
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                            libraries={['places']}
                            options={{
                              componentRestrictions: {
                                country: ['us'],
                              },
                              types: [],
                              fields: ["formatted_address"],
                            }}
                            onPlaceSelected={(place) => addressList[idx].address = place.formatted_address}
                            defaultValue={item.address}
                            placeholder="123, Any St, Any town, ST, 12345"
                            onChange={(e) => { addressList[idx].address = e.target.value }}
                          />
                        </InputDiv>
                        <div style={{ display: 'flex' }}>
                          <InputDiv style={{ width: 70, marginRight: 5 }}
                            className={(invalidAddressList[idx].invalidYear) && requiredClass}>
                            <InputFieldLabel style={{ left: 5 }}>Year*</InputFieldLabel>
                            <MUISelect
                              style={{ width: 70, padding: '10px 0px 10px 0px' }}
                              value={item.year}
                              onChange={(e) => { addressList[idx].year = parseInt(e.target.value, 10); setAddressList([...addressList]) }}
                            >
                              {years &&
                                years?.map(function (year, idx) {
                                  return (
                                    <MenuItem key={year + idx} value={year}>
                                      {year}
                                    </MenuItem>
                                  )
                                })}
                            </MUISelect>
                          </InputDiv>
                          <InputDiv style={{ width: 70, marginRight: 5 }}
                            className={(invalidAddressList[idx].invalidMonth) && requiredClass}>
                            <InputFieldLabel style={{ left: 5 }}>Months*</InputFieldLabel>
                            <MUISelect style={{ width: 70, padding: '10px 0px 10px 0px' }}
                              value={item.month}
                              onChange={(e) => { addressList[idx].month = parseInt(e.target.value, 10); setAddressList([...addressList]) }}>
                              {months.map((v, k) => (<MenuItem key={k} value={v}>{v}</MenuItem>))}
                            </MUISelect>
                          </InputDiv>
                          <InputDiv style={{ width: 70 }}
                            className={(invalidAddressList[idx].invalidHomeStatus) && requiredClass}>
                            <InputFieldLabel style={{ left: 5 }}>Status*</InputFieldLabel>
                            <CSelect style={{ width: 70, padding: '10px 0px 10px 0px' }}
                              value={item.homeStatus}
                              onMouseDown={(e) => {
                                e.preventDefault()
                                showHomeStatusPopup(idx)
                              }}>
                              <option></option>
                              {PATIENT_HISTORY_STATUS.map((item, idx1) => (<option key={item + idx1} value={item.toUpperCase()}>{item}</option>))}
                            </CSelect>
                            <SelectPopupModal
                              onClose={() => closeHomeStatusPopup(idx)}
                              onSelect={(id) => { addressList[idx].homeStatus = id; setAddressList([...addressList]) }}
                              show={showHomeStatusModal[idx]}
                              items={PATIENT_HISTORY_STATUS} />
                          </InputDiv>
                          {idx == addressList.length - 1 && <AddButton onClick={() => addAddress()}>+ Add address</AddButton>}
                        </div>
                      </div>
                    )
                  })
                }
                <Title className="small left" style={{ marginTop: 10 }}>
                  You have entered 00 years and 00 months. Enter at least 12 months
                  more.{' '}
                </Title>
              </PoemDiv>
              <EmployText>Employment</EmployText>
              <Flex>
                <InputDiv style={{ width: '70%', marginRight: 5 }}>
                  <InputFieldLabel>Employer name</InputFieldLabel>
                  <Input
                    value={employerName}
                    onChange={(val) => setEmployerName(val.target.value)}
                  />
                </InputDiv>
                <InputDiv style={{ width: 100, marginRight: 5 }}>
                  <InputFieldLabel style={{ left: 5 }}>Occupation</InputFieldLabel>
                  <CSelect
                    onMouseDown={(e) => {
                      e.preventDefault()

                      setShowOccupationModal(true)
                    }}
                    value={occupation}
                    style={{ width: 100, padding: '10px 20px 10px 4px' }}
                  >
                    <option></option>
                    {OCCUPATION.map((item, idx) => (<option key={idx} value={item.toUpperCase()}>{item}</option>))}
                  </CSelect>
                  <SelectPopupModal
                    onClose={() => setShowOccupationModal(false)}
                    onSelect={(id) => setOccupation(id)}
                    show={showOccupationModal}
                    items={OCCUPATION} />
                </InputDiv>
                <InputDiv style={{ width: 100 }}>
                  <InputFieldLabel>Position</InputFieldLabel>
                  <InputFieldLabel>Position</InputFieldLabel>
                  <Input
                    value={position}
                    onChange={(val) => setPosition(val.target.value)}
                  />
                </InputDiv>
              </Flex>
              <InputDiv style={{ width: '100%', marginRight: 5 }}>
                <InputFieldLabel>Employer address </InputFieldLabel>
                <Input
                  value={employerAddress}
                  onChange={(val) => setEmployerAddress(val.target.value)}
                />
              </InputDiv>
              <PoemDiv style={{ display: 'flex', flexDirection: 'column', padding: 5 }}>
                <div style={{ display: 'flex' }}>
                  <InputDiv style={{ width: '50%', marginRight: 5 }}>
                    <InputFieldLabel>Employer no. </InputFieldLabel>
                    <Input
                      value={employeeNumber}
                      onChange={(val) => setEmployerNo(val.target.value)}
                    />
                  </InputDiv>
                  <InputDiv style={{ width: '50%', marginRight: 5 }}
                    className={(invalidAnnualIncome) && requiredClass}>
                    <InputFieldLabel>Annual income* </InputFieldLabel>
                    <MaskInput
                      mask={Number}
                      type="number"
                      value={annualIncome}
                      onAccept={v => setAnnualIncome(v)}
                    />
                  </InputDiv>
                </div>
                <Flex>
                  <Title className="small left mt-0" style={{  padding: 10, }}>
                    How long have you worked here?
                  </Title>
                  <InputDiv style={{ width: 70, marginRight: 5 }} className={(invalidYearInWork) && requiredClass}>
                    <InputFieldLabel style={{ left: 5 }}>Year*</InputFieldLabel>
                    <MUISelect
                      value={yearInWork}
                      onChange={(obj) => setYearInWork(parseInt(obj.target.value, 10))}
                      style={{ width: 70, padding: '10px 0px 10px 0px' }}
                    >
                      {workYears &&
                        workYears?.map(function (year, idx) {
                          return (
                            <MenuItem key={year} value={year}>
                              {year}
                            </MenuItem>
                          )
                        })}
                    </MUISelect>
                  </InputDiv>
                  <InputDiv style={{ width: 70 }} className={(invalidMonthInWork) && requiredClass}>
                    <InputFieldLabel style={{ left: 5 }}>Months*</InputFieldLabel>
                    <MUISelect
                      value={monthInWork}
                      onChange={(obj) => setMonthInWork(parseInt(obj.target.value, 10))}
                      style={{ width: 70, padding: '10px 0px 10px 0px' }}
                    >
                      {months.map((v, k) => (<MenuItem key={k} value={v}>{v}</MenuItem>))}
                    </MUISelect>
                  </InputDiv>
                </Flex>
              </PoemDiv>
              <BottomWrapper>
                <CenteredRow>
                  <LinkButton className="big strong" onClick={SubmitAndVerify}>Verify Email</LinkButton>
                </CenteredRow>
              </BottomWrapper>
            </ContentWrapper>
          </Layout>
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  )
}

export default BasicData
