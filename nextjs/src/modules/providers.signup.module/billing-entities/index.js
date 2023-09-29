
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Header from '../shared/Header'
import SideMenu from '../shared/SideMenu'
import useWindowDimensions from '../../../common/hooks/useWindowDimensions'
import DropdownIndicator from '../../../common/utils/DropdownIndicator'
import ConfirmDelete from '../shared/modals/ConfirmDelete'
import ConfirmEdit from '../shared/modals/ConfirmEdit'

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import {
  getBillingEntityList,
  searchProviderByNpi,
  deleteBillingEntity,
  saveBillingEntity,
  updateBillingEntity
} from '../../../common/lib/provider'
import { ICONS } from '../../../common/utils/styleGuide'
import {
  menuWidth,
  menuHeight,
  ownershipTypeOptions
} from '../general/data'
import {
  ProviderWrapper,
  Container,
  Panel,
  LinkButton,
  InputRow,
  InputDiv,
  Input,
  InputFieldLabel,
  Item,
  Caption,
  Bottom,
  BottomWrapper,
  ItemTitle,
  FileWrapper,
  UploadButton,
  Flex,
} from '../shared/styled'
import { MaskInput_1 } from '../../../common/styleds/imask.styled'
import { AddressInput_1 } from '../../../common/styleds/autocomplete.styled'

import { useLocalStorage } from '../../../common/hooks/useLocalStorage'
import { useAuthUser, useLoadingStatus } from '../../../redux/hooks/useCommonStore'
import {MESSAGES} from "../../../common/constant/global";

const Select = dynamic(
  () => import('react-select'),
  { ssr: false }
)

const entityTypeOptions = [
  {
    label: "Ambulatory surgery center",
    value: "AMBULATORY_SURGERY_CENTER"
  }, {
    label: "Diagnostics center",
    value: "DIAGNOSTICS_CENTER"
  }, {
    label: "DME",
    value: "DME"
  }, {
    label: "Hospital",
    value: "HOSPITAL"
  }, {
    label: "Laboratory",
    value: "LABORATORY"
  }, {
    label: "Pharmacy",
    value: "PHARMACY"
  }, {
    label: "Physician practice",
    value: "PHYSICIAN_PRACTICE"
  }, {
    label: "Short or long-term care facility",
    value: "SHORT_OR_LONG_TERM_CARE_FACILITY"
  }, {
    label: "Specialized services NEC ",
    value: "SPECIALIZED_SERVICES_NEC"
  }, {
    label: "Therapies (PT, OT)",
    value: "THERAPIES"
  }, {
    label: "Urgent care",
    value: "URGENT_CARE"
  },
]


function BillingEntities() {

  const PAGE_PREFIX = 'PVD_SIGNUP_BILLING_ENTITY_'
  const PAGE_ITEMS_LAST_INDEX = 14 // means 13: count

  const { authUser } = useAuthUser()
  const { commitLoadingStatus } = useLoadingStatus()

  const requiredClass = 'required'
  const NpiMask = '000-00-0000'
  const PhoneMask = '000-000-0000'
  const TaxMask = '00-0000000'

  const { height, width } = useWindowDimensions()
  const calcHeight = height < 670 ? 670 : height

  const [id, setId] = useLocalStorage(`${PAGE_PREFIX}0`, '')
  const [npi, setNpi] = useLocalStorage(`${PAGE_PREFIX}1`, '')
  const [entityName, setEntityName] = useLocalStorage(`${PAGE_PREFIX}2`, '')
  const [businessAddress, setBusinessAddress] = useState(null)
  const [taxID, setTaxID] = useLocalStorage(`${PAGE_PREFIX}3`, '')
  const [phoneNumber, setPhoneNumber] = useLocalStorage(`${PAGE_PREFIX}4`, '')
  const [entityType, setEntityType] = useLocalStorage(`${PAGE_PREFIX}5`, '')
  const [ownershipType, setOwnershipType] = useLocalStorage(`${PAGE_PREFIX}6`, '')

  const [invalidNpi, setInvalidNpi] = useState(false)
  const [invalidEntityName, setInvalidEntityName] = useState(false)
  const [invalidBusinessAddress, setInvalidBusinessAddress] = useState(false)
  const [invalidTaxID, setInvalidTaxID] = useState(false)
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false)
  const [invalidEntityType, setInvalidEntityType] = useState(false)
  const [invalidOwnershipType, setInvalidOwnershipType] = useState(false)

  const [billingEntityList, setBillingEntityList] = useState([])
  const [tempEntityList, setTempEntityList] = useState([])

  const [isOpenedRemovePopup, setIsOpenedRemovePopup] = useState(false)
  const [isOpenedEditPopup, setIsOpenedEditPopup] = useState(false)
  const [updatedBillingEntity, setUpdatedBillingEntity] = useState(null)


  useEffect(async () => {
    try {
      const res = await getBillingEntityList(authUser.id)
      setBillingEntityList(res)
    }
    catch (error) {
      console.log(error);
    }
  }, [])

  const edit = (idx) => {
    let entity = billingEntityList[idx]
console.log(entity)
    setId(entity.id)
    setNpi(entity.npi)
    setEntityName(entity.entityName)
    setBusinessAddress(entity.businessAddress)
    setEntityType(entity.entityType)
    setOwnershipType(entity.ownershipType)
    setTaxID(entity.taxID)
    setPhoneNumber(entity.phoneNumber)
  }

  const remove = (idx) => {
    let id = billingEntityList[idx].id

    setId(id)
    setIsOpenedRemovePopup(true)
  }

  const save = async () => {
    if (!checkFormData())
      return

    let data = {
      npi,
      entityName,
      businessAddress: businessAddress,
      taxID,
      phoneNumber,
      entityType,
      ownershipType
    }

    if (id == 0) {
      tempEntityList.push(data)
      commitLoadingStatus(true)
      const res = await saveBillingEntity(authUser.id, tempEntityList)
      commitLoadingStatus(false)
      if (res) {
        toast.success(MESSAGES.save_data_success, { position: 'top-right' })
        setBillingEntityList([...billingEntityList, ...res])
        setTempEntityList([])
        initFormData()
      }
      else {
        toast.error(MESSAGES.server_error, { position: 'top-right' })
      }
    }
    else {
      setUpdatedBillingEntity(data)
      setIsOpenedEditPopup(true)
    }
  }

  const initFormData = () => {
    setId(0)
    setNpi('')
    setEntityName('')
    setBusinessAddress('')
    setEntityType('')
    setOwnershipType('')
    setTaxID('')
    setPhoneNumber('')
  }

  const addAnotherEntity = () => {
    if (!checkFormData())
      return

    tempEntityList.push({
      npi,
      entityName,
      businessAddress,
      taxID,
      phoneNumber,
      entityType,
      ownershipType
    })

    initFormData()
  }

  const checkFormData = () => {
    if (npi.length < 10) {
      setInvalidNpi(true)
      return false
    }
    else {
      setInvalidNpi(false)
    }

    if (!entityName) {
      setInvalidEntityName(true)
      return false
    }
    else {
      setInvalidEntityName(false)
    }

    if (!businessAddress) {
      setInvalidBusinessAddress(true)
      return false
    }
    else {
      setInvalidBusinessAddress(false)
    }

    if (taxID.length == 0) {
      setInvalidTaxID(true)
      return false
    }
    else {
      setInvalidTaxID(false)
    }

    if (entityType.length == 0) {
      setInvalidEntityType(true)
      return false
    }
    else {
      setInvalidEntityType(false)
    }

    if (ownershipType == null || ownershipType.length == 0) {
      setInvalidOwnershipType(true)
      return false
    }
    else {
      setInvalidOwnershipType(false)
    }

    return true
  }

  const onNpiGo = async () => {
    commitLoadingStatus(true)
    try {
      const res = await searchProviderByNpi(npi)
      if (res) {
        setEntityName(res.institutionName)
        setTaxID(res.taxID)
      }
    }
    catch (error) {
      // npi is not valid
      toast.error(MESSAGES.server_error, { position: 'top-right' })
      console.log("fetch error: ", error);
    }
    commitLoadingStatus(false)
  }

  const removeProc = () => {
    setIsOpenedRemovePopup(false)

    if (id == 0)
      return

    commitLoadingStatus(true)

    deleteBillingEntity(id).then((res) => {
      commitLoadingStatus(false)

      if (res) {
        let new_ = billingEntityList.filter((v, i) => v.id != id)
        setBillingEntityList([...new_])
        toast.success(MESSAGES.remove_data_success, { position: 'top-right' })
      }
      else {
        toast.error(MESSAGES.server_error, { position: 'top-right' })
      }

      setId(0)

    })
  }

  const editProc = async () => {
    setIsOpenedEditPopup(false)

    if (id == 0 || updatedBillingEntity == null)
      return

    commitLoadingStatus(true)
    const res = await updateBillingEntity(id, updatedBillingEntity)
    commitLoadingStatus(false)

    if (res) {
      toast.success(MESSAGES.save_data_success, { position: 'top-right' })
      let new_ = billingEntityList.map((v, i) => {
        if (v.id == id)
          return { id, ...updatedBillingEntity }
        else
          return v
      })

      setBillingEntityList([...new_])
      setUpdatedBillingEntity(null)
      initFormData()
    }
    else {
      toast.error(MESSAGES.server_error, { position: 'top-right' })
    }
  }

  return (
    <section>
      <ProviderWrapper className='provider' style={{ minHeight: calcHeight }}>
        <Header />
        <Container className='container'>
          <SideMenu />
          <Panel style={{ minHeight: calcHeight - 105 }}>
            <div style={{ marginLeft: 20, marginRight: 75 }}>
              <Caption>Fill the NPI's of billing entities for healthcare services that will be covered by the same contract with Pannu Corp. We will fill in the data if we have it.</Caption>
              <InputRow className="justify-start">
                <InputDiv style={{ width: '20%' }} className={(invalidNpi) && requiredClass}>
                  <InputFieldLabel>NPI{' '}</InputFieldLabel>
                  <MaskInput_1 mask={NpiMask} value={npi} placeholder="123-45-6789" onAccept={(v) => { setNpi(v) }} />
                </InputDiv>
                <LinkButton onClick={onNpiGo} style={{ justifyContent: 'left', margin: '20px 0 0 20px' }}>Go</LinkButton>
              </InputRow>
              <InputRow columnGap={15}>
                <InputDiv style={{ width: '213px' }} className={(invalidEntityName) && requiredClass}>
                  <InputFieldLabel>Entity name{' '}</InputFieldLabel>
                  <Input value={entityName} onChange={(e) => { setEntityName(e.target.value) }} />
                </InputDiv>
                <InputDiv style={{ flex: 1 }} className={(invalidBusinessAddress) && requiredClass}>
                  <InputFieldLabel>Business address for notices{' '}</InputFieldLabel>
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
                    defaultValue={businessAddress}
                    placeholder="123, Any St, Any town, ST, 12345"
                    onPlaceSelected={(place) => setBusinessAddress(place.formatted_address)} />
                </InputDiv>
                <InputDiv style={{ width: '124px' }} className={(invalidTaxID) && requiredClass}>
                  <InputFieldLabel>Tax ID{' '}</InputFieldLabel>
                  <MaskInput_1 mask={TaxMask} value={taxID} placeholder="12-3456789" onAccept={(v) => { setTaxID(v) }} />
                </InputDiv>
                <InputDiv style={{ width: '163px' }} className={(invalidPhoneNumber) && requiredClass}>
                  <InputFieldLabel>Phone NO{' '}</InputFieldLabel>
                  <MaskInput_1 mask={PhoneMask} value={phoneNumber} placeholder="123-456-7890" onAccept={(v) => { setPhoneNumber(v) }} />
                </InputDiv>
              </InputRow>
              <InputRow className="justify-around justify-baseline">
                <Flex className="justify-start" style={{ width: '100%' }}>
                  <InputDiv style={{ marginRight: 13 }} className={(invalidEntityType) && requiredClass}>
                    <InputFieldLabel>Entity type{' '}</InputFieldLabel>
                    <Select
                      styles={{
                        indicatorSeparator: () => { }, // removes the "stick"
                        control: (css) => ({
                          ...css,
                          width: menuWidth || "auto",
                          height: menuHeight,
                          opacity: menuWidth ? 1 : 0
                        }),
                        menu: ({ width, ...css }) => ({
                          ...css,
                          width: "max-content",
                          minWidth: menuWidth
                        }),
                      }}
                      components={{ DropdownIndicator }}
                      value={entityTypeOptions.find(e => e.value === entityType) || null}
                      onChange={(newValue) => setEntityType(newValue.value)}
                      options={entityTypeOptions}
                    />
                  </InputDiv>
                  <InputDiv className={(invalidOwnershipType) && requiredClass}>
                    <InputFieldLabel>Ownership{' '}</InputFieldLabel>
                    <Select
                      styles={{
                        indicatorSeparator: () => { }, // removes the "stick"
                        control: (css) => ({
                          ...css,
                          width: menuWidth || "auto",
                          height: menuHeight,
                          opacity: menuWidth ? 1 : 0
                        }),
                        menu: ({ width, ...css }) => ({
                          ...css,
                          width: "max-content",
                          minWidth: menuWidth
                        }),
                      }}
                      components={{ DropdownIndicator }}
                      value={ownershipTypeOptions.find(e => e.value === ownershipType) || null}
                      onChange={(newValue) => setOwnershipType(newValue.value)}
                      options={ownershipTypeOptions}
                    />
                  </InputDiv>
                </Flex>
                {(id == 0) && (
                  <Flex className="justify-end" style={{ width: '40%', marginRight: '20px' }}>
                    <LinkButton onClick={addAnotherEntity} style={{ justifyContent: 'left', margin: '40px 0 0' }}>Add another billing entity</LinkButton>
                  </Flex>
                )}
              </InputRow>
              <InputRow className="justify-end">
                <LinkButton onClick={initFormData} style={{ color: '#000' }}>Cancel</LinkButton>
                <LinkButton onClick={save} style={{ marginLeft: 50, marginRight: 20 }}>Save</LinkButton>
              </InputRow>
            </div>
            <Bottom>
              <BottomWrapper>
                <Flex className="justify-start flex-wrap" style={{ padding: '0 20px' }}>
                  {billingEntityList.map((v, i) => (
                    <Item key={i}>
                      <ItemTitle>{v.entityName}</ItemTitle>
                      <div className='btn-group'>
                        <Image
                          src={ICONS.editUnderline}
                          width={12} height={15}
                          layou={'fixed'}
                          onClick={() => edit(i)}
                        />
                        <Image
                          src={ICONS.redClose}
                          width={15} height={15}
                          layou={'fixed'}
                          onClick={() => remove(i)}
                        />
                      </div>
                    </Item>
                  ))}
                </Flex>
              </BottomWrapper>
            </Bottom>
          </Panel>
        </Container>
      </ProviderWrapper>
      <ConfirmDelete isOpened={isOpenedRemovePopup} onCancel={ () => setIsOpenedRemovePopup(false) } onRemove={removeProc} />
      <ConfirmEdit isOpened={isOpenedEditPopup} onCancel={ () => setIsOpenedEditPopup(false) } onEdit={editProc} />
    </section>
  )
}

export default BillingEntities