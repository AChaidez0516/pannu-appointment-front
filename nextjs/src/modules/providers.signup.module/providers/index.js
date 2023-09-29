import Image from 'next/image'

import Header from '../shared/Header'
import SideMenu from '../shared/SideMenu'
import useWindowDimensions from '../../../common/hooks/useWindowDimensions'
import ConfirmDelete from '../shared/modals/ConfirmDelete'
import ConfirmEdit from '../shared/modals/ConfirmEdit'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuthUser, useLoadingStatus } from '../../../redux/hooks/useCommonStore'
import { useLocalStorage } from '../../../common/hooks/useLocalStorage'
import { MESSAGES } from '../../../common/constant/global'
import {
  saveStaff,
  updateStaff,
  deleteStaff,
  getStaffList,
  searchProviderByNpi,
  searchProviderByMemberID
} from '../../../common/lib/provider'
import { ICONS } from '../../../common/utils/styleGuide'
import {
  ProviderWrapper,
  Container,
  Panel,
  Caption,
  InputRow,
  LinkButton,
  Bottom,
  BottomWrapper,
  Item,
  ItemTitle,
  FileWrapper,
  UploadButton,
  InputDiv,
  InputFieldLabel,
  Input,
  Flex,
} from '../shared/styled'

import { MaskInput_1 } from '../../../common/styleds/imask.styled'

function Providers() {

  const { authUser } = useAuthUser()
  const { commitLoadingStatus } = useLoadingStatus()

  const PAGE_PREFIX = 'PVD_SIGNUP_PROVIDERS_'
  const PAGE_ITEMS_LAST_INDEX = 14 // means 13: count

  const requiredClass = 'required'
  const NpiMask = '000-00-0000'

  const { height, width } = useWindowDimensions()
  const calcHeight = height < 670 ? 670 : height

  const [id, setId] = useLocalStorage(`${PAGE_PREFIX}0`, 0)
  const [npi, setNpi] = useLocalStorage(`${PAGE_PREFIX}1`, '')
  const [memberID, setMemberID] = useLocalStorage(`${PAGE_PREFIX}2`, '')
  const [fullName, setFullName] = useLocalStorage(`${PAGE_PREFIX}3`, '')
  const [specialty, setSpecialty] = useLocalStorage(`${PAGE_PREFIX}4`, '')
  const [email, setEmail] = useLocalStorage(`${PAGE_PREFIX}5`, '')
  const [simpleName, setSimpleName] = useLocalStorage(`${PAGE_PREFIX}6`, '')

  const [invalidNpi, setInvalidNpi] = useState(false)
  const [invalidMemberID, setInvalidMemberID] = useState(false)
  const [invalidFullName, setInvalidFullName] = useState(false)
  const [invalidSpecialty, setInvalidSpecialty] = useState(false)
  const [invalidEmail, setInvalidEmail] = useState(false)
  const [invalidSimpleName, setInvalidSimpleName] = useState(false)

  const [staffList, setStaffList] = useState( [])
  const [isEditable, setIsEditable] = useLocalStorage(`${PAGE_PREFIX}7`, true)

  const [updatedProvider, setUpdatedProvider] = useState(null)
  const [isOpenedRemovePopup, setIsOpenedRemovePopup] = useState(false)
  const [isOpenedEditPopup, setIsOpenedEditPopup] = useState(false)

  useEffect(() => {
    init().catch(e => console.log(e))
  }, [])


  function initFormData() {
    setId(0)
    setNpi('')
    setMemberID('')
    setFullName('')
    setEmail('')
    setSpecialty('')
    setSimpleName('')
    setIsEditable(false)
  }

  function checkFormData() {
    if (npi.length == 0) {
      setInvalidNpi(true)
      return false
    }
    else {
      setInvalidNpi(false)
    }

    if (memberID.length == 0) {
      setInvalidMemberID(true)
      return false
    }
    else {
      setInvalidMemberID(false)
    }

    if (fullName.length == 0) {
      setInvalidFullName(true)
      return false
    }
    else {
      setInvalidFullName(false)
    }

    if (specialty.length == 0) {
      setInvalidSpecialty(true)
      return false
    }
    else {
      setInvalidSpecialty(false)
    }

    if (!email.toLocaleLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      setInvalidEmail(true)
      return
    }
    else {
      setInvalidEmail(false)
    }

    if (simpleName.length == 0) {
      setInvalidSimpleName(true)
      return false
    }
    else {
      setInvalidSimpleName(false)
    }

    return true
  }

  const save = async () => {
    if (!checkFormData())
      return

    let data = {
      memberID,
      npi,
      fullName,
      specialty,
      email,
      simpleName,
      position: ''
    }

    if (id == 0) {
      commitLoadingStatus(true)

      const res = await saveStaff(authUser.id, data)

      commitLoadingStatus(false)

      if (res) {
        data['id'] = res.id
        initFormData()
        setStaffList([...staffList, data])
        setIsEditable(false)

        toast.success(MESSAGES.save_data_success, { position: 'top-right' })
      }
      else {
        toast.error(MESSAGES.server_error, { position: 'top-right' })
      }

    }
    else {
      setIsOpenedEditPopup(true)
      setUpdatedProvider(data)
    }
  }

  const edit = (idx) => {
    let staff = staffList[idx]
    setId(staff.id)
    setNpi(staff.npi)
    setMemberID(staff.memberID)
    setFullName(staff.fullName)
    setSpecialty(staff.specialty)
    setEmail(staff.email)
    setSimpleName(staff.simpleName)
    setIsEditable(true)
  }

  function remove(idx) {
    let id = staffList[idx].id

    setId(id)
    setIsOpenedRemovePopup(true)
  }

  async function init() {
    let res = await getStaffList(authUser.id)
    if (res) {
      setStaffList([...res])
    }
  }

  function addAnotherStaff() {
    setIsEditable(true)
  }

  const onNpiGo = async () => {
    commitLoadingStatus(true)

    try {
      const res = await searchProviderByNpi(npi)
      if (res) {
        setMemberID(res.memberID)
        setFullName(res.fullName)
        setSpecialty(res.specialty)
      }
    }
    catch (e) {
      toast.error(MESSAGES.server_error, { position: 'top-right' })
    }

    commitLoadingStatus(false)
  }

  const onMemberIdGo = async () => {
    commitLoadingStatus(true)

    try {
      const res = await searchProviderByMemberID(memberID)
      if (res) {
        setNpi(res.npi)
        setFullName(res.fullName)
        setSpecialty(res.specialty)
      }
    }
    catch (e) {
      console.log(e)
      toast.error(MESSAGES.server_error, { position: 'top-right' })
    }

    commitLoadingStatus(false)
  }

  const removeProc = () => {
    setIsOpenedRemovePopup(false)

    if (id == 0)
      return

    commitLoadingStatus(true)

    deleteStaff(id).then(res => {

      commitLoadingStatus(false)

      if (res && res.status) {
        let new_ = staffList.filter((v, i) => v.id != id)
        setStaffList([...new_])

        toast.success(MESSAGES.save_data_success, { position: 'top-right' })
      }
      else {
        toast.error(MESSAGES.server_error, { position: 'top-right' })
      }
    })

    setId(0)
  }

  const editProc = async () => {
    setIsOpenedEditPopup(false)

    if (id == 0 || updatedProvider == null)
      return

    commitLoadingStatus(true)

    const res = await updateStaff(id, updatedProvider)

    commitLoadingStatus(false)

    if (res) {
      let new_ = staffList.map((v, i) => {
        if (v.id == id)
          return { id, ...updatedProvider }
        else
          return v
      })
      setStaffList([...new_])
      initFormData()
      setIsEditable(false)
      setUpdatedProvider(null)

      toast.success(MESSAGES.save_data_success, { position: 'top-right' })
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
            <div style={{ marginLeft: 20 }}>
              <Caption style={{lineHeight: '20px', marginBottom: 14}}>
                It is recommended to add ALL clinicians in a service location to use Pannu Corp's services to maximize benefits, profitability and savings.
                All clinicians at each service location MUST participate to achieve represented performance targets.
                Add the NPI's of the providers who work for this organization. We will fill in the data from public sources.
              </Caption>
              <Caption>
                *Simple name = Easy to use name to simplify data entry
              </Caption>
              <Caption style={{ marginTop: 10 }}>
                If you have many providers, create a CSV or Excel (xsl) spreadsheet and upload it to us.<br />
                You can download the <LinkButton style={{ display: 'inline' }}>worksheet template</LinkButton> to assist you.
              </Caption>
              <InputRow className="justify-start">
                <Caption style={{ marginTop: 20 }}>Enter the NPI of the individual if applicable and we will get their public data.</Caption>
                <InputDiv style={{ width: '20%', marginLeft: 10 }} className={(invalidNpi) && requiredClass}>
                  <InputFieldLabel>NPI{' '}</InputFieldLabel>
                  <MaskInput_1 mask={NpiMask} value={npi} placeholder="123-45-6789" onAccept={(v) => { setNpi(v) }} />
                </InputDiv>
                <LinkButton onClick={onNpiGo} style={{ justifyContent: 'left', margin: '20px 0 0 20px' }}>Go</LinkButton>
              </InputRow>
              <InputRow className="justify-start">
                <Caption style={{ marginTop: 20 }}>Enter the Pannu Corp member ID of the individual, if available</Caption>
                <InputDiv style={{ width: '20%', marginLeft: 10 }} className={(invalidMemberID) && requiredClass}>
                  <InputFieldLabel>Member id{' '}</InputFieldLabel>
                  <Input value={memberID} onChange={(e) => { setMemberID(e.target.value) }} />
                </InputDiv>
                <LinkButton onClick={onMemberIdGo} style={{ justifyContent: 'left', margin: '20px 0 0 20px' }}>Go</LinkButton>
              </InputRow>
              <InputRow>
                <InputDiv style={{ width: '20%', marginRight: 10 }} className={(invalidFullName) && requiredClass}>
                  <InputFieldLabel>Full name{' '}</InputFieldLabel>
                  <Input value={fullName} onChange={(e) => { setFullName(e.target.value) }} />
                </InputDiv>
                <InputDiv style={{ width: '30%', marginRight: 10 }} className={(invalidSpecialty) && requiredClass}>
                  <InputFieldLabel>Specialty{' '}</InputFieldLabel>
                  <Input value={specialty} onChange={(e) => { setSpecialty(e.target.value) }} />
                </InputDiv>
                <InputDiv style={{ width: '20%', marginRight: 10 }} className={(invalidEmail) && requiredClass}>
                  <InputFieldLabel>Email{' '}</InputFieldLabel>
                  <Input value={email} placeholder="abcd123@domain.com" onChange={(e) => { setEmail(e.target.value) }} />
                </InputDiv>
                <InputDiv style={{ width: '20%', marginRight: 20 }} className={(invalidSimpleName) && requiredClass}>
                  <InputFieldLabel>Simple name{' '}</InputFieldLabel>
                  <Input value={simpleName} onChange={(e) => { setSimpleName(e.target.value) }} />
                </InputDiv>
              </InputRow>
              {(id == 0 && !isEditable) && (
                <InputRow className="justify-end justify-baseline">
                  <div style={{ display: 'flex', justifyContent: 'flex-end', width: '40%', marginRight: '20px' }}>
                    <LinkButton onClick={addAnotherStaff} style={{ justifyContent: 'left', margin: '40px 0 0' }}>Add another provider</LinkButton>
                  </div>
                </InputRow>
              )}
              {(isEditable) && (
                <InputRow className="justify-end">
                  <LinkButton onClick={initFormData} style={{ color: '#000' }}>Cancel</LinkButton>
                  <LinkButton onClick={save} style={{ marginLeft: 50, marginRight: 20 }}>Save</LinkButton>
                </InputRow>
              )}
            </div>
            <Bottom>
              <FileWrapper>
              </FileWrapper>
              <BottomWrapper>
                <Flex className="justify-start flex-wrap" style={{ padding: '0 20px' }}>
                  {staffList.map((v, i) => (
                    <Item key={i}>
                      <ItemTitle>{v.fullName}</ItemTitle>
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

export default Providers