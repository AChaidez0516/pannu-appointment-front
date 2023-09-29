import dynamic from 'next/dynamic'
import DashboardLayout from '../shared/DashboardLayout'
import WorkedHourModal from '../shared/modals/WorkedHourModal'
import DropdownIndicator from '../../../common/utils/DropdownIndicator'
import ConfirmDelete from '../shared/modals/ConfirmDelete'
import useWindowDimensions from '../../../common/hooks/useWindowDimensions'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { MESSAGES } from '../../../common/constant/global'
import {
  getBillingEntityList,
  getServiceLocationList,
  getStaffList,
  saveClinicianRelationship,
  getClinicianRelationshipList,
  deleteClinicianRelationship,
} from '../../../common/lib/provider'
import {
  SelectGroup,
  FunctionGroup,
} from './styled'
import {
  InputRow,
  InputDiv,
  InputFieldLabel,
  LinkButton,
  Input,
  Table, Row, Col, Col1,
  SimpleBar
} from '../shared/styled'

import { useLocalStorage } from '../../../common/hooks/useLocalStorage'
import { useAuthUser, useLoadingStatus } from '../../../redux/hooks/useCommonStore'

import { ICONS } from "../../../common/utils/styleGuide";
import Image from "next/image";

const Select = dynamic(
  () => import('react-select'),
  { ssr: false }
)
const menuWidth = '213px'
const menuHeight = '43px'


function ClinicianRelationship() {
  const { authUser } = useAuthUser()
  const { commitLoadingStatus } = useLoadingStatus()

  const PAGE_PREFIX = 'PVD_SIGNUP_CLINICIAN_RELATIONSHIP_'
  const PAGE_ITEMS_LAST_INDEX = 16 // means 13: count

  const { height, width } = useWindowDimensions()
  const panelHeight = height

  const requiredClass = 'required'
  const [id, setId] = useLocalStorage(`${PAGE_PREFIX}0`, 0)
  const [serviceLocationID, setServiceLocationID] = useLocalStorage(`${PAGE_PREFIX}1`, 0)
  const [billingEntityID, setBillingEntityID] = useLocalStorage(`${PAGE_PREFIX}2`, 0)
  const [staffID, setStaffID] = useLocalStorage(`${PAGE_PREFIX}3`, 0)
  const [workHours, setWorkHours] = useLocalStorage(`${PAGE_PREFIX}4`, 0)
  const [fte, setFte] = useLocalStorage(`${PAGE_PREFIX}5`, 0)
  const [workedHourList, setWorkedHourList] = useLocalStorage(`${PAGE_PREFIX}6`, [])

  const [invalidServiceLocationID, setInvalidServiceLocationID] = useState(false)
  const [invalidBillingEntityID, setInvalidBillingEntityID] = useState(false)
  const [invalidStaffID, setInvalidStaffID] = useState(false)
  const [invalidWorkHours, setInvalidWorkHours] = useState(false)

  const [billingEntityList, setBillingEntityList] = useState([])
  const [staffList, setStaffList] = useState([])
  const [serviceLocationList, setServiceLocationList] = useState([])
  const [relationshipList, setRelationshipList] = useState([])

  const [showWorkedHoursModal, setShowWorkedHoursModal] = useState(false)

  const [isEditable, setIsEditable] = useLocalStorage(`${PAGE_PREFIX}7`, true)

  const [confirmRemoveProps, setConfirmRemoveProps] = useState(null)

  useEffect(() => {
    init().catch(e => console.log(e))
  }, [])

  const init = async () => {
    try {
      const [
        responseBEs,
        responseSLs,
        responseStaffs,
        responseCRs,
      ] = await Promise.all([
        getBillingEntityList(authUser.id),
        getServiceLocationList(authUser.id),
        getStaffList(authUser.id),
        getClinicianRelationshipList(authUser.id)
      ])

      setBillingEntityList(responseBEs)
      setServiceLocationList(responseSLs)
      setStaffList(responseStaffs)
      setRelationshipList(responseCRs)
      console.log('CRList: ', responseCRs);
    } catch (error) {
      console.log(error);
    }

  }

  const save = async () => {
    if (!checkFormData()) return
    if (id == 0) {
      commitLoadingStatus(true)

      const data = {
        serviceLocationID,
        billingEntityID,
        staffID,
        daysWorkedHoursList: workedHourList
      }
      const res = await saveClinicianRelationship(authUser.id, data)

      commitLoadingStatus(false)

      if (res) {
        initFormData()
        setIsEditable(false)
        const relationships = await getClinicianRelationshipList(authUser.id)
        setRelationshipList([...relationships])
        toast.success(MESSAGES.save_data_success, { position: 'top-right' })
      }
      else {
        toast.error(MESSAGES.server_error, { position: 'top-right' })
      }
    }
  }

  const initFormData = () => {
    setId(0)
    setServiceLocationID(0)
    setStaffID(0)
    setBillingEntityID(0)
    setWorkHours(0)
    setFte(0)
    setWorkedHourList([])
  }

  const showWorkHousPopup = () => {
    setShowWorkedHoursModal(true)
  }

  const checkFormData = () => {
    if (serviceLocationID == 0) {
      setInvalidServiceLocationID(true)
      return false
    }
    else {
      setInvalidServiceLocationID(false)
    }

    if (billingEntityID == 0) {
      setInvalidBillingEntityID(true)
      return false
    }
    else {
      setInvalidBillingEntityID(false)
    }

    if (staffID == 0) {
      setInvalidStaffID(true)
      return false
    }
    else {
      setInvalidStaffID(false)
    }

    return true
  }

  const closeWorkedHoursModal = () => {
    setShowWorkedHoursModal(false)
  }

  const saveWorkedHoursData = (data) => {
    let new_ = []
    let totalWokedHours = 0
    data.forEach((v, i) => {
      let o = {
        startTime: v.startTime,
        endTime: v.endTime,
        hoursWorked: v.hoursWorked,
        presentDays: {}
      }

      let validKeys = Object.keys(v.presentDays).filter((v1, i) => v.presentDays[v1])
      validKeys.forEach(v1 => o.presentDays[v1] = true)
      totalWokedHours += v.hoursWorked
      new_.push(o)
    })

    setWorkHours(totalWokedHours)

    let fte = Math.floor(totalWokedHours / 40 * 100) / 100
    setFte(fte)

    setWorkedHourList([...new_])
    setShowWorkedHoursModal(false)
  }

  const addAnother = () => {
    setIsEditable(true)
  }

  const confirmRemove = (idx) => {
    const clinicianRelationship = relationshipList[idx]
    setConfirmRemoveProps({
      id: clinicianRelationship.id,
      isOpened: true
    })
  }
  const removeClinicianRelationship = async () => {
    setConfirmRemoveProps({...confirmRemoveProps, isOpened: false})

    commitLoadingStatus(true)
    const res = await deleteClinicianRelationship(confirmRemoveProps.id)
    if (res) {
      const new_ = relationshipList.filter(v => v.id != confirmRemoveProps.id)
      setRelationshipList([...new_])
      toast.success(MESSAGES.remove_data_success, { position: 'top-right' })
    }
    else {
      toast.error(MESSAGES.server_error, { position: 'top-right' })
    }
    commitLoadingStatus(false)
  }

  return (
    <DashboardLayout>
      <SimpleBar style={{ paddingRight: 10, height: panelHeight }}>
        <InputRow marginTop={10}>
          <SelectGroup>
            <InputDiv className={invalidServiceLocationID && requiredClass}>
              <InputFieldLabel>{'Service Location'}</InputFieldLabel>
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
                value={
                  serviceLocationList.map(b => ({ value: b.id, label: b.legalName }))
                    .find(sl => sl.value === serviceLocationID) || null}
                onChange={(newValue) => setServiceLocationID(newValue.value)}
                options={serviceLocationList.map(b => ({ value: b.id, label: b.legalName }))}
              />
            </InputDiv>
            <InputDiv className={(invalidBillingEntityID) && requiredClass}>
              <InputFieldLabel>{'Billing Entity'}</InputFieldLabel>
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
                value={billingEntityList.map(b => ({ value: b.id, label: b.entityName }))
                  .find(be => be.value === billingEntityID) || null}
                onChange={(newValue) => setBillingEntityID(newValue.value)}
                options={billingEntityList.map(b => ({ value: b.id, label: b.entityName }))}
              />
            </InputDiv>
            <InputDiv className={(invalidStaffID) && requiredClass}>
              <InputFieldLabel>Provider{' '}</InputFieldLabel>
              <Select
                styles={{
                  indicatorSeparator: () => { },
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
                value={staffList.map(b => ({ value: b.id, label: b.fullName }))
                  .find(st => st.value === staffID) || null}
                onChange={(newValue) => setStaffID(newValue.value)}
                options={staffList.map(b => ({ value: b.id, label: b.fullName }))}
              />
            </InputDiv>
          </SelectGroup>
          <FunctionGroup>
            <LinkButton onClick={showWorkHousPopup} >Work hours</LinkButton>
            <InputDiv className={invalidWorkHours && requiredClass}>
              <InputFieldLabel style={{ marginTop: '-20px' }}>{'Total hours worked'}</InputFieldLabel>
              <Input value={workHours || ''} onChange={() => { }} />
            </InputDiv>
            <InputDiv>
              <InputFieldLabel style={{ marginTop: '-20px' }}>{'Scribes FTE required'}</InputFieldLabel>
              <Input value={fte || ''} onChange={() => { }} />
            </InputDiv>
          </FunctionGroup>
        </InputRow>

        <InputRow style={{ justifyContent: 'flex-end' }}>
          <LinkButton onClick={() => {
            initFormData()
            setIsEditable(false)
          }} style={{ color: '#000' }}>Cancel</LinkButton>
          <LinkButton onClick={save} style={{ marginLeft: 50, marginRight: 20 }}>Save</LinkButton>
        </InputRow>

        <Table>
          <Row className="no-border">
            <Col1 style={{ width: '15%' }}>Service Location</Col1>
            <Col1>Billing Entity</Col1>
            <Col1>Provider</Col1>
            <Col1>Total hours worked</Col1>
            <Col1>Scribes FTE required</Col1>
            <Col1></Col1>
          </Row>
          { (relationshipList.map((v, i) => (
            <Row key={v.id}>
              <Col width={{ width: '10%' }}>{ serviceLocationList.find(data => data.id == v.serviceLocationID)?.legalName }</Col>
              <Col>{ billingEntityList.find(data => data.id == v.billingEntityID)?.entityName }</Col>
              <Col>{ staffList.find(data => data.id == v.staffID)?.fullName }</Col>
              <Col>{v.totalHoursWorked}</Col>
              <Col>{v.scribesFTE}</Col>
              <Col style={{ cursor: 'pointer' }}><Image
                src={ICONS.redClose}
                width={15} height={15}
                layou={'fixed'}
                onClick={() => confirmRemove(i)}
              /></Col>
            </Row>
          ))) }
        </Table>
      </SimpleBar>
      <WorkedHourModal
        isOpen={showWorkedHoursModal}
        onCancel={closeWorkedHoursModal}
        onSave={saveWorkedHoursData}
        data={workedHourList} />
      <ConfirmDelete { ...confirmRemoveProps } onRemove={removeClinicianRelationship} onCancel={ () => setConfirmRemoveProps(null) }/>
    </DashboardLayout>
  )
}


export default ClinicianRelationship