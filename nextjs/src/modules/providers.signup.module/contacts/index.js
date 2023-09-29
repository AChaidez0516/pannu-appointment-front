import DashboardLayout from '../shared/DashboardLayout'
import ConfirmDelete from '../shared/modals/ConfirmDelete'
import ConfirmEdit from '../shared/modals/ConfirmEdit'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, FieldArray } from 'formik';
import { toast } from 'react-toastify'

import { useLocalStorage } from '../../../common/hooks/useLocalStorage'
import { useAuthUser, useLoadingStatus } from '../../../redux/hooks/useCommonStore'
import { MESSAGES } from '../../../common/constant/global'
import {
  saveProviderContact,
  updateProviderContact,
  deleteProviderContact,
  searchProviderByMemberID,
  getProviderContactListByType,
} from '../../../common/lib/provider'
import {
  ItemImg,
  BtnContainer,
  SubmitButton,
  InputField,

} from './styled'
import {
  InputRow,
  Caption,
  InputDiv,
  InputFieldLabel,
  LinkButton,
  Bottom,
  BottomWrapper,
  Item,
  ItemTitle,
  Flex,
} from '../shared/styled'
import { CONTACT_TYPES } from './contact_types'
import { VALIDATION_SCHEMA } from './validation'
import { ICONS } from '../../../common/utils/styleGuide';

const initialState = {
  memberID: '',
  fullName: '',
  position: '',
  email: '',
  phoneNumber: '',
}

function Contact() {

  const router = useRouter()
  const { type } = { ...router.query }

  const { authUser } = useAuthUser()
  const { commitLoadingStatus } = useLoadingStatus()

  const PAGE_PREFIX = 'PVD_SIGNUP_CONTACT_' + type + '_'
  const PAGE_ITEMS_LAST_INDEX = 2 // means 13: count
  const requiredClass = 'required'

  const [resetButton, setResetButton] = useState()

  const [contactList, setContactList] = useLocalStorage(`${PAGE_PREFIX}0`, [])
  const [contactType, setContactType] = useLocalStorage(`${PAGE_PREFIX}1`, null)
  const [transaction, setTransaction] = useLocalStorage(`${PAGE_PREFIX}2`, false)
  const [myFormik, setMyFormik] = useState(null)

  const [updatedContact, setUpdatedContact] = useState(null)
  const [selectedContactId, setSelectedContactId] = useState(0)
  const [isOpenedRemovePopup, setIsOpenedRemovePopup] = useState(false)
  const [isOpenedEditPopup, setIsOpenedEditPopup] = useState(false)

  const initContactList = async () => {
    commitLoadingStatus(true)
    try {
      const data = CONTACT_TYPES.find(c => c.queryType === type)
      if (data === undefined || data.value === undefined)
        return

      const _contactType = data.value
      let res = await getProviderContactListByType(authUser.id, _contactType)
      setContactType(_contactType)

      if (res) {
        setContactList(res)
        setTransaction(false)
        setSelectedContactId(0)
      }
    }
    catch (error) {
      console.log(error)
      toast.error(MESSAGES.server_error, { position: 'top-right' })
    }
    commitLoadingStatus(false)
  }

  const handleReset = (formik) => {
    setIsOpenedEditPopup(false)
    setSelectedContactId(0)
    setMyFormik(null)
    setUpdatedContact(null)
    formik.resetForm()
    //initContactList()
  }

  useEffect(() => {
    initContactList().catch(e => console.log(e))
  }, [type, transaction])

  useEffect(() => {
    resetButton?.click()
  }, [router])

  const onMemberIdGo = async (index, memberID, formik) => {
    if (!memberID) return;

    commitLoadingStatus(true)
    try {
      const res = await searchProviderByMemberID(memberID)
      if (res) {
        formik.setFieldValue(`contactList.${index}.fullName`, res.fullName, false)
      }
    }
    catch (error) {
      toast.error(MESSAGES.server_error, { position: 'top-right' })
    }

    commitLoadingStatus(false)
  }

  const removeContact = async (contactId) => {
    setSelectedContactId(contactId)
    setIsOpenedRemovePopup(true)
  }

  const editContact = (contactId, formik) => {
    setMyFormik(formik)

    const selectedContact = contactList.filter(c => c.id === contactId)
    formik.resetForm()
    formik.setValues({ contactList: selectedContact }, false)
    setSelectedContactId(contactId)
  }

  const formikSubmit = async ({ contactList }, { setSubmitting, resetForm }) => {
    if (!selectedContactId) {
      commitLoadingStatus(true)
      const res = await saveProviderContact(authUser.id, contactList.map(c => ({ ...c, contactType })))
      commitLoadingStatus(false)
      if (res) {
        resetForm()
        setSubmitting(false)
        setTransaction(true)
        toast.success(MESSAGES.save_data_success, { position: 'top-right' })
      }
      else {
        toast.error(MESSAGES.server_error, { position: 'top-right' })
      }
    }
    else {
      setUpdatedContact(contactList[0])
      setIsOpenedEditPopup(true)
    }
  }

  const removeProc = async () => {
    setIsOpenedRemovePopup(false)

    if (selectedContactId == 0)
      return

    commitLoadingStatus(true)
    const response = await deleteProviderContact(selectedContactId)
    commitLoadingStatus(false)

    if (response && response.status) {
      setTransaction(true)
      toast.success(MESSAGES.remove_data_success, { position: 'top-right' })
    }
    else {
      toast.error(MESSAGES.server_error, { position: 'top-right' })
    }

    setSelectedContactId(0)
  }

  const editProc = async () => {
    setIsOpenedEditPopup(false)
    if (selectedContactId == 0 || updatedContact == null)
      return

    const { id, __typename, contactType, ...contact } = updatedContact
    commitLoadingStatus(true)
    const res = await updateProviderContact(selectedContactId, contact)
    commitLoadingStatus(false)

    if (res) {
      setSelectedContactId(0)
      myFormik.resetForm()
      myFormik.setSubmitting(false)
      setMyFormik(null)
      setTransaction(true)
      toast.success(MESSAGES.save_data_success, { position: 'top-right' })
    }
    else {
      toast.error(MESSAGES.server_error, { position: 'top-right' })
    }
  }

  return (
    <DashboardLayout>
      <>
        <Caption>Please complete all fields</Caption>
        <Formik
          enableReinitialize
          initialValues={{
            contactList: [
              initialState,
            ]
          }}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={formikSubmit}
        >
          {(formik) => (
            <Form>
              <FieldArray
                name='contactList'
                render={(arrayHelpers) => {
                  // setMyFormik(formik)
                  const contactList = formik?.values?.contactList
                  const touchedContacts = formik?.touched?.contactList || []
                  const errorContacts = formik?.errors?.contactList || []
                  return (
                    <>
                      {contactList && contactList.length > 0 ? contactList.map((contact, index) => (
                        <div key={index} style={{ marginBottom: '35px' }}>
                          <InputRow className="justify-start" marginTop={37}>
                            <Caption>Enter the Pannu Corp member ID of the individual, if available &nbsp;&nbsp;</Caption>
                            <InputDiv style={{ width: '20%', marginTop: 0 }} className={''}>
                              <InputFieldLabel>{'Member id'}</InputFieldLabel>
                              <InputField name={`contactList.${index}.memberID`}/>
                            </InputDiv>
                            <LinkButton
                              style={{ paddingLeft: '15px', margin: 0}}
                              onClick={() => onMemberIdGo(index, contact?.memberID, formik)}>Go</LinkButton>
                          </InputRow>
                          <InputRow marginTop={20}>
                            <InputDiv style={{ width: '20%' }} className={(touchedContacts[index]?.fullName && errorContacts[index]?.fullName) && requiredClass}>
                              <InputFieldLabel>{'Full name'}</InputFieldLabel>
                              <InputField name={`contactList.${index}.fullName`} />
                            </InputDiv>
                            <InputDiv style={{ width: '15%' }} className={(touchedContacts[index]?.position && errorContacts[index]?.position) && requiredClass}>
                              <InputFieldLabel>{'Position'}</InputFieldLabel>
                              <InputField name={`contactList.${index}.position`} />
                            </InputDiv>
                            <InputDiv style={{ width: '15%' }} className={(touchedContacts[index]?.phoneNumber && errorContacts[index]?.phoneNumber) && requiredClass}>
                              <InputFieldLabel>{'Business phone no.'}</InputFieldLabel>
                              <InputField name={`contactList.${index}.phoneNumber`} />
                            </InputDiv>
                            <InputDiv style={{ width: '30%' }} className={(touchedContacts[index]?.email && errorContacts[index]?.email) && requiredClass}>
                              <InputFieldLabel>{'Business email'}</InputFieldLabel>
                              <InputField name={`contactList.${index}.email`} />
                            </InputDiv>
                            {!selectedContactId &&
                              <InputDiv>
                                <SubmitButton
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                >Remove</SubmitButton>
                              </InputDiv>
                            }
                          </InputRow>
                        </div>
                      )) : null}
                      {!selectedContactId &&
                        <InputRow marginTop={19}>
                          <SubmitButton
                            style={{ marginLeft: 'auto' }}
                            type="button"
                            onClick={() =>
                              arrayHelpers.push(initialState)
                            }
                          >
                            Add Another
                          </SubmitButton>
                        </InputRow>
                      }
                    </>
                  )
                }}
              />
              <InputRow className="justify-end">
                <LinkButton 
                  ref={input => setResetButton(input)}
                  onClick={() => handleReset(formik)} style={{ color: '#000', marginRight: '60px' }}>Reset</LinkButton>
                <SubmitButton type="submit"> {selectedContactId ? 'Update' : 'Save'}</SubmitButton>
              </InputRow>
              <Bottom>
                <BottomWrapper>
                  <Flex className="justify-start flex-wrap" style={{ padding: '0 20px' }}>
                    {contactList.map(contact => (
                      <Item key={contact.id}>
                        <ItemTitle>{contact.fullName}</ItemTitle>
                        <BtnContainer>
                          <ItemImg width={12} height={15} onClick={() => editContact(contact.id, formik)} src={ICONS.editUnderline}></ItemImg>
                          <ItemImg width={15} height={15} onClick={() => removeContact(contact.id)} src={ICONS.redClose}></ItemImg>
                        </BtnContainer>
                      </Item>
                    ))}
                  </Flex>
                </BottomWrapper>
              </Bottom>
            </Form>
          )}
        </Formik>
      </>
      <ConfirmDelete isOpened={isOpenedRemovePopup} onCancel={ () => setIsOpenedRemovePopup(false) } onRemove={removeProc} />
      <ConfirmEdit isOpened={isOpenedEditPopup} onCancel={ () => setIsOpenedEditPopup(false) } onEdit={editProc}></ConfirmEdit>
    </DashboardLayout>
  )
}

export default Contact