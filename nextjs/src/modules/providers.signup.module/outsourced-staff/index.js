import dynamic from 'next/dynamic'

import OutsourcedWorkedHourModal from '../shared/modals/OutsourcedWorkedHourModal'
import DropdownIndicator from '../../../common/utils/DropdownIndicator'
import useWindowDimensions from '../../../common/hooks/useWindowDimensions'
import DashboardLayout from '../shared/DashboardLayout'
import ConfirmDelete from '../shared/modals/ConfirmDelete'

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAuthUser, useLoadingStatus } from '../../../redux/hooks/useCommonStore'
import { useLocalStorage } from '../../../common/hooks/useLocalStorage'
import { MESSAGES } from '../../../common/constant/global'
import {
  getProviderDetail,
  getBillingEntityList,
  getServiceLocationList,
  getOutsourcedStaffList,
  getOutsourcedStaffDetail,
  saveOutsourcedStaff,
  saveWorkedHoursOutsourced,
  updateWorkedHoursOutsourced,
  deleteWorkedHoursOutsourced,
  deleteClinicianRelationship,
  deleteOutsourcedStaff
} from '../../../common/lib/provider'
import {
  SelectGroup,
} from './styled'
import { 
  LinkButton,
  InputRow,
  InputDiv,
  Input,
  InputFieldLabel,
  Flex,
  Table, Row, Col1, Col,
  SimpleBar,
} from '../shared/styled'
import Image from "next/image";
import {ICONS} from "../../../common/utils/styleGuide";

const Select = dynamic(
  () => import('react-select'),
  { ssr: false }
)

const menuWidth = '213px'
const menuHeight = '43px'
const staffTypeOptions = [
  {
    label: "Medical Assistant",
    value: "MEDICAL_ASSISTANT"
  },
  {
    label: "Nurse",
    value: "NURSE"
  },
  {
    label: "Licensed Practice Nurse",
    value: "LICENSED_PRACTICE_NURSE"
  },
  {
    label: "Non medical clerical",
    value: "NON_MEDICAL_CLERICAL"
  }
]

function Outsourced() {
  const { authUser } = useAuthUser()
  const { commitLoadingStatus } = useLoadingStatus()

  const PAGE_PREFIX = 'PVD_SIGNUP_OUTSOURCED_STAFF_'
  const PAGE_ITEMS_LAST_INDEX = 11 // means 13: count

  const requiredClass = 'required'
  const { height, width } = useWindowDimensions()
  const panelHeight = height;

  const [serviceLocationID, setServiceLocationID] = useLocalStorage(`${PAGE_PREFIX}0`, 0)
  const [billingEntityID, setBillingEntityID] = useLocalStorage(`${PAGE_PREFIX}1`, 0)
  const [staffType, setStaffType] = useLocalStorage(`${PAGE_PREFIX}2`, 0)
  const [serviceLocationList, setServiceLocationList] = useLocalStorage(`${PAGE_PREFIX}3`, [])
  const [billingEntityList, setBillingEntityList] = useLocalStorage(`${PAGE_PREFIX}4`, [])
  const [outsourcedStaffList, setOutsourcedStaffList] = useState([])

  const [workedHourList, setWorkedHourList] = useState([])
  const [workHours, setWorkHours] = useState(0)
  const [fte, setFte] = useState(0)

  const [invalidServiceLocationID, setInvalidServiceLocationID] = useState(false)
  const [invalidBillingEntityID, setInvalidBillingEntityID] = useState(false)
  const [invalidStaffType, setInvalidStaffType] = useState(false)
  const [invalidWorkHours, setInvalidWorkHours] = useState(false)

  const [showWorkedHoursModal, setShowWorkedHoursModal] = useState(false)
  const [isEditable, setIsEditable] = useLocalStorage(`${PAGE_PREFIX}5`, false)

  const [confirmRemoveProps, setConfirmRemoveProps] = useState(null)

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const [
      resBEs,
      resSLs,
      resOSs
    ] = await Promise.all([
      getBillingEntityList(authUser.id),
      getServiceLocationList(authUser.id),
      getOutsourcedStaffList(authUser.id)
    ])

    setBillingEntityList([...resBEs])
    setServiceLocationList([...resSLs])
    setOutsourcedStaffList([...resOSs])

  }

  const initFormData = () => {
    setServiceLocationID(0)
    setStaffType('')
    setBillingEntityID(0)
    setWorkHours(0)
    setFte(0)
    setWorkedHourList([])
  }

  const showWorkHousPopup = () => {
    if (staffType == '')
      return
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

    if (staffType == '') {
      setInvalidStaffType(true)
      return false
    }
    else {
      setInvalidStaffType(false)
    }

    if (workHours == 0) {
      setInvalidWorkHours(true)
      return false
    }
    else {
      setInvalidWorkHours(false)
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
        staffName: v.staffName,
        numberOfStaff: v.numberOfStaff,
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

  const save = async () => {
    if (!checkFormData())
      return

    let data = {
      serviceLocationID, billingEntityID, staffType
    }
    getOutsourcedStaffList(authUser.id)
    commitLoadingStatus(true)

    saveOutsourcedStaff(authUser.id, data).then((res) => {
      if (res) {
        saveWorkedHoursOutsourced(res.id, workedHourList).then(res => {
          commitLoadingStatus(false)

          if (res) {
            setWorkedHourList([])

            toast.error(MESSAGES.server_error, { position: 'top-right' })
          }
          else {
            toast.error(MESSAGES.server_error, { position: 'top-right' })
          }
        })

        initFormData()
        setIsEditable(false)
      }
      else {
        commitLoadingStatus(false)
        toast.error(MESSAGES.server_error, { position: 'top-right' })
        return
      }
    })
  }

  const confirmRemove = (idx) => {
    const clinicianRelationship = outsourcedStaffList[idx]
    setConfirmRemoveProps({
      id: clinicianRelationship.id,
      isOpened: true
    })
  }
  const removeOutsourcedStaff = async () => {
    setConfirmRemoveProps({...confirmRemoveProps, isOpened: false})

    commitLoadingStatus(true)
    const res = await deleteOutsourcedStaff(confirmRemoveProps.id)
    if (res) {
      const new_ = outsourcedStaffList.filter(v => v.id != confirmRemoveProps.id)
      setOutsourcedStaffList([...new_])
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
        <InputRow className="justify-around justify-baseline" marginTop={10}>
          <SelectGroup>
            <InputDiv style={{ width: '30%', marginRight: 10 }} className={(invalidServiceLocationID) && requiredClass}>
              <InputFieldLabel>Service Location{' '}</InputFieldLabel>
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
                value={serviceLocationList && serviceLocationList.map(b => ({ value: b.id, label: b.legalName }))
                  .find(s => s.value === serviceLocationID) || null}
                onChange={(newValue) => setServiceLocationID(newValue.value)}
                options={serviceLocationList.map(b => ({ value: b.id, label: b.legalName }))}
              />
            </InputDiv>
            <InputDiv style={{ width: '30%', marginRight: 10 }} className={(invalidBillingEntityID) && requiredClass}>
              <InputFieldLabel>Billing Entity{' '}</InputFieldLabel>
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
                value={billingEntityList && billingEntityList.map(b => ({ value: b.id, label: b.entityName }))
                  .find(s => s.value === billingEntityID) || null}
                onChange={(newValue) => setBillingEntityID(newValue.value)}
                options={billingEntityList.map(b => ({ value: b.id, label: b.entityName }))}
              />
            </InputDiv>
            <InputDiv style={{ width: '30%', marginRight: 10 }} className={(invalidStaffType) && requiredClass}>
              <InputFieldLabel>Staff Type{' '}</InputFieldLabel>
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
                value={staffTypeOptions.find(s => s.value === staffType) || null}
                onChange={(newValue) => setStaffType(newValue.value)}
                options={staffTypeOptions}
              />
            </InputDiv>
            <LinkButton onClick={showWorkHousPopup} style={{ justifyContent: 'left', margin: '20px 20px 0' }}>Go</LinkButton>
          </SelectGroup>
          <Flex className="justify-end" style={{ width: '50%', marginRight: '10px', visibility: (workedHourList.length > 0) ? 'visible' : 'hidden' }}>
            <InputDiv style={{ width: '35%', marginRight: 10 }} className={(invalidWorkHours) && requiredClass}>
              <InputFieldLabel style={{ left: 0, top: -30 }}>Total hours days{' '}</InputFieldLabel>
              <Input value={workHours} />
            </InputDiv>
            <InputDiv style={{ width: '35%', marginRight: 10 }}>
              <InputFieldLabel style={{ left: 0, top: -30 }}>Scribes FTE required{' '}</InputFieldLabel>
              <Input value={fte} />
            </InputDiv>
          </Flex>
        </InputRow>
        {(!isEditable) && (
          <InputRow className="justify-end">
            <LinkButton onClick={addAnother} style={{ marginLeft: 50, marginRight: 20 }}>Add Another</LinkButton>
          </InputRow>
        )}
        {(isEditable && workedHourList.length > 0) && (
          <InputRow className="justify-end">
            <LinkButton onClick={() => {
              initFormData()
              setIsEditable(false)
            }} style={{ color: '#000' }}>Cancel</LinkButton>
            <LinkButton onClick={save} style={{ marginLeft: 50, marginRight: 20 }}>Save</LinkButton>
          </InputRow>
        )}

        {/* <Bottom>
            <BottomWrapper>
                <div style={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap', padding: '0 20px'}}>
                    {relationshipList.map((v, i) => (
                    <Item key={i}>
                        <ItemTitle>{v.serviceLocationID} - {v.billingEntityID} - {v.staffID}</ItemTitle>
                        <ItemImg onClick={() => edit(i)} style={{marginRight: 20}} src={require('../../public/assets/images/ico-edit.png')}></ItemImg>
                        <ItemImg onClick={() => remove(i)} src={require('../../public/assets/images/ico-delete.png')}></ItemImg>
                    </Item>
                    ))}
                </div>
            </BottomWrapper>
        </Bottom> */}

        <Table>
          <Row className="no-border">
            <Col1 style={{ width: '10%' }}>Service Location</Col1>
            <Col1>Billing Entity</Col1>
            <Col1>Provider</Col1>
            <Col1>Total hours worked</Col1>
            <Col1>Scribes FTE required</Col1>
          </Row>
          { (outsourcedStaffList.map((v, i) => (
            <Row key={v.id}>
              <Col style={{ width: '10%' }}>{ serviceLocationList.find(data => data.id == v.serviceLocationID)?.legalName }</Col>
              <Col>{ billingEntityList.find(data => data.id == v.billingEntityID)?.entityName }</Col>
              <Col>{v.staffType}</Col>
              <Col>{v.totalHoursWorked}</Col>
              <Col>{v.scribesFTE}</Col>
              <Col style={{ cursor: 'pointer' }}>
                <Image
                  src={ICONS.redClose}
                  width={15} height={15}
                  layou={'fixed'}
                  onClick={() => confirmRemove(i)}
                />
              </Col>
            </Row>
          ))) }
        </Table>
    </SimpleBar>
    <OutsourcedWorkedHourModal
      isOpen={showWorkedHoursModal}
      onCancel={closeWorkedHoursModal}
      onSave={saveWorkedHoursData}
      data={workedHourList}
      staffType={staffType} />
      <ConfirmDelete { ...confirmRemoveProps } onRemove={removeOutsourcedStaff} onCancel={ () => setConfirmRemoveProps(null) }/>
  </DashboardLayout>

  )
}

export default Outsourced
