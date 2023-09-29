import Image from 'next/image'
import Header from '../shared/Header'
import SideMenu from '../shared/SideMenu'
import useWindowDimensions from '../../../common/hooks/useWindowDimensions'
import ConfirmDelete from '../shared/modals/ConfirmDelete'
import ConfirmEdit from '../shared/modals/ConfirmEdit'

import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useAuthUser, useLoadingStatus } from '../../../redux/hooks/useCommonStore'
import { MESSAGES } from '../../../common/constant/global'
import { useLocalStorage } from '../../../common/hooks/useLocalStorage'
import {
  getServiceLocationList,
  saveServiceLocation,
  updateServiceLocation,
  deleteServiceLocation
} from '../../../common/lib/provider'
import { ICONS } from '../../../common/utils/styleGuide'
import {
  ProviderWrapper,
  Container,
  Panel,
  Caption,
  LinkButton,
  Bottom,
  BottomWrapper,
  Item,
  ItemTitle,
  FileWrapper,
  UploadButton,
} from './styled'
import {
  InputDiv,
  InputFieldLabel,
  Input,
  Flex,
  InputRow
} from '../shared/styled'
import { AddressInput_1 } from '../../../common/styleds/autocomplete.styled'

function ServiceLocations() {
  const { authUser } = useAuthUser()
  const { commitLoadingStatus } = useLoadingStatus()

  const PAGE_PREFIX = 'PVD_SIGNUP_SERVICE_LOCATION_'
  const PAGE_ITEMS_LAST_INDEX = 12 // means 13: count

  const requiredClass = 'required'

  const { height, width } = useWindowDimensions()

  const calcHeight = height < 670 ? 670 : height

  const [id, setId] = useLocalStorage(`${PAGE_PREFIX}0`, 0)
  const [address, setAddress] = useState(null)
  const [legalName, setLegalName] = useLocalStorage(`${PAGE_PREFIX}2`, '')
  const [commonName, setCommonName] = useLocalStorage(`${PAGE_PREFIX}3`, '')
  const [simpleName, setSimpleName] = useLocalStorage(`${PAGE_PREFIX}4`, '')

  const [invalidAddress, setInvalidAddress] = useState(false)
  const [invalidLegalName, setInvalidLegalName] = useState(false)
  const [invalidCommonName, setInvalidCommonName] = useState(false)
  const [invalidSimpleName, setInvalidSimpleName] = useState(false)

  const [serviceLocationList, setServiceLocationList] = useState([])
  const [isEditable, setIsEditable] = useLocalStorage(`${PAGE_PREFIX}5`, true)

  const [isOpenedRemovePopup, setIsOpenedRemovePopup] = useState(false)
  const [isOpenedEditPopup, setIsOpenedEditPopup] = useState(false)
  const [updatedServiceLocation, setUpdatedServiceLocation] = useState(null)

  useEffect(() => {
    const getServiceLocationData = async () => {
      commitLoadingStatus(true)
      try {
        const res = await getServiceLocationList(authUser.id)
        setServiceLocationList(res)
      }
      catch (error) {
        console.log("fetch error: ", error)
        toast.error(MESSAGES.server_error, { position: 'top-right' })
      }
      commitLoadingStatus(false)
    }

    getServiceLocationData().catch(e => console.log(e))

  }, [])

  const initFormData = () => {
    setIsEditable(false)
    setId('')
    setAddress('')
    setLegalName('')
    setCommonName('')
    setSimpleName('')
  }

  const checkFormData = () => {
    if (!address) {
      setInvalidAddress(true)
      return false
    }
    else {
      setInvalidAddress(false)
    }

    if (legalName.length == 0) {
      setInvalidLegalName(true)
      return false
    }
    else {
      setInvalidLegalName(false)
    }

    if (commonName.length == 0) {
      setInvalidCommonName(true)
      return false
    }
    else {
      setInvalidCommonName(false)
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

    const data = {
      address: address,
      legalName: legalName,
      commonName: commonName,
      simpleName: simpleName
    }

    if (id == 0) {
      commitLoadingStatus(true)

      const res = await saveServiceLocation(authUser.id, data)

      commitLoadingStatus(false)

      if (res) {
        data['id'] = res.id
        setServiceLocationList([...serviceLocationList, data])
        initFormData()
        setIsEditable(false)
        toast.success(MESSAGES.save_data_success, { position: 'top-right' })
      }
      else {
        toast.error(MESSAGES.server_error, { position: 'top-right' })
      }
    }
    else {
      setIsOpenedEditPopup(true)
      setUpdatedServiceLocation(data)
    }
  }

  const edit = (idx) => {
    let serviceLocation = serviceLocationList[idx]

    setId(serviceLocation.id)
    setAddress(serviceLocation.address)
    setLegalName(serviceLocation.legalName)
    setCommonName(serviceLocation.commonName)
    setSimpleName(serviceLocation.simpleName)
    setIsEditable(true)
  }

  const remove = (idx) => {
    let id = serviceLocationList[idx].id
    setId(id)
    setIsOpenedRemovePopup(true)
  }

  const addAnotherServiceLocation = () => {
    setIsEditable(true)
  }

  const removeProc = () => {
    setIsOpenedRemovePopup(false)

    if (id == 0)
      return

    commitLoadingStatus(true)
    deleteServiceLocation(id).then(res => {
      commitLoadingStatus(false)
      if (res) {
        let new_ = serviceLocationList.filter((v, i) => v.id != id)
        setServiceLocationList([...new_])
        toast.success(MESSAGES.remove_data_success, { position: 'top-right' })
      }
      else {
        toast.error(MESSAGES.server_error, { position: 'top-right' })
      }
    })

    setId(0)
  }

  const editProc = async () => {
    setIsOpenedEditPopup(false)

    if (id == 0 || updatedServiceLocation == null)
      return

    commitLoadingStatus(true)
    const res = await updateServiceLocation(id, updatedServiceLocation)
    commitLoadingStatus(false)

    if (res) {
      let new_ = serviceLocationList.map((v, i) => {
        if (v.id == id)
          return { id, ...updatedServiceLocation }
        else
          return v
      })

      setServiceLocationList([...new_])
      initFormData()
      setIsEditable(false)
      setUpdatedServiceLocation(null)

      toast.success(MESSAGES.save_data_success, { position: 'top-right' })
    }
    else {
      toast.error(MESSAGES.server_error, { position: 'top-right' })
    }
  }

  return (
    <section>
      {/* {width > 1800 && ( */}
      <ProviderWrapper className='provider' style={{ minHeight: calcHeight }}>
        <Header />
        <Container className='container'>
          <SideMenu />
          <Panel style={{ minHeight: calcHeight - 105 }}>
            <div style={{ marginLeft: 20 }}>
              <Caption>Locations where billed services are performed</Caption>
              <Caption style={{ marginTop: 10 }}>If you have many service locations, create a CSV or Excel (xsl) spreadsheet and upload it to us.<br />
                You can download the <LinkButton style={{ display: 'inline' }}>worksheet template</LinkButton> to assist you.</Caption>
              <InputRow>
                <InputDiv style={{ width: '40%', marginRight: 10 }} className={(invalidAddress) && requiredClass}>
                  <InputFieldLabel>Address{' '}</InputFieldLabel>
                  <AddressInput_1
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                    libraries={['places']}
                    options={{
                      componentRestrictions: {
                        country: ['us'],
                      },
                      types: ['hospital', 'pharmacy', 'physiotherapist', 'veterinary_care'],
                      fields: ["place_id", "geometry", "name", "formatted_address", "plus_code"],
                    }}
                    defaultValue={address}
                    placeholder="123, Any St, Any town, ST, 12345"
                    onPlaceSelected={(place) => setAddress(place.formatted_address)} />
                </InputDiv>
                <InputDiv style={{ width: '20%', marginRight: 10 }} className={(invalidLegalName) && requiredClass}>
                  <InputFieldLabel>Legal name{' '}</InputFieldLabel>
                  <Input value={legalName} onChange={(e) => { setLegalName(e.target.value) }} />
                </InputDiv>
                <InputDiv style={{ width: '30%', marginRight: 10 }} className={(invalidCommonName) && requiredClass}>
                  <InputFieldLabel>Common name (if applicable){' '}</InputFieldLabel>
                  <Input value={commonName} onChange={(e) => { setCommonName(e.target.value) }} />
                </InputDiv>
                <InputDiv style={{ width: '10%', marginRight: 20 }} className={(invalidSimpleName) && requiredClass}>
                  <InputFieldLabel>Simple name*{' '}</InputFieldLabel>
                  <Input value={simpleName} onChange={(e) => { setSimpleName(e.target.value) }} />
                </InputDiv>
              </InputRow>
              {(id == 0 && !isEditable) && (
                <InputRow className="justify-end justify-baseline">
                  <LinkButton onClick={addAnotherServiceLocation} style={{ justifyContent: 'left', marginRight: 20 }}>Add service location</LinkButton>
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
                { /*<div style={{ marginBottom: 10 }}>
                  <UploadButton>
                    <span style={{ marginRight: 15 }}>
                      <Image src="/assets/images/ico-link.png" width={10} height={10} />
                    </span>Upload
                  </UploadButton>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                  <Item>
                    <ItemTitle>test1</ItemTitle>
                    <Image style={{ cursor: 'pointer' }} src="/assets/images/ico-delete.png" width={15} height={15} />
                  </Item>
                </div>*/ }
              </FileWrapper>
              <BottomWrapper>
                <Flex className="justify-start flex-wrap" style={{ padding: '0 20px' }}>
                  {serviceLocationList.map((v, i) => (
                    <Item key={i}>
                      <ItemTitle>{v.legalName}</ItemTitle>
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


export default ServiceLocations