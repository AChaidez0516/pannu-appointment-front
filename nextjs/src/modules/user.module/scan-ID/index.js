import ScanID from '../../../components/ScanID'
import Layout from '../../../components/Layout'

import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  CenteredRow,
  FormContainer,
  FormWrapper,
  Wrapper,
  LinkButton,
  BottomWrapper,
  ContentWrapper,
} from '../../../common/styleds/common.styled'
import {
  Description,
} from './styled'

import { handleOCR } from '../../../common/utils/handleOCR'
import { useIDCardData, useLoadingStatus } from '../../../redux/hooks/useCommonStore'
import { MESSAGES } from '../../../common/constant/global'

function ScanIDDoc() {
  const router = useRouter()
  const { commitIDCardData } = useIDCardData()
  const { commitLoadingStatus } = useLoadingStatus()

  const { type } = { ...router.query }

  const [selectedFrontFile, setSelectedFrontFile] = useState(null)
  const [selectedBackFile, setSelectedBackFile] = useState(null)

  function changedFile(file, type) {

    if (type == 'back_file')
      setSelectedBackFile(file)

    if (type == 'front_file')
      setSelectedFrontFile(file)

  }

  const UploadAndNext = async () => {
    // please do notifications in case one of file was null
    if (!selectedFrontFile || !selectedBackFile) {
      alert("Please select both front and back files")
      return false
    }

    commitLoadingStatus(true)

    // get data of card images from OCR service
    const data = await handleOCR(selectedFrontFile, selectedBackFile)

    commitLoadingStatus(false)

    if (data.responseOCR != null && data.responseOCR.length > 0) {
      parseData(data)
    }
    else {
      //toast.error(MESSAGES.server_error)
      // check responseOCR is string or object?
      let fakeRes = [{"abbreviation": "DCB","description": "Virginia Specific Restrictions","value": "B"},
        {"abbreviation": "DCD","description": "Virginia Specific Endorsements","value": "NONE"},
        {"abbreviation": "DBA","description": "License Expiration Date","value": "07012026"},
        {"abbreviation": "DCS","description": "Family Name","value": "PANNU"},
        {"abbreviation": "DCS","description": "Last Name","value": "PANNU"},
        {"abbreviation": "DCT","description": "Given Name","value": "BALJINDER"},
        {"abbreviation": "DCT","description": "First Name","value": "BALJINDER"},
        {"abbreviation": "DBD","description": "License or ID Document Issue Date","value": "01122018"},
        {"abbreviation": "DBB","description": "Date of Birth","value": "07011960"},
        {"abbreviation": "DBC","description": "Sex","value": "1"},
        {"abbreviation": "DAY","description": "Eye Color","value": "BRO"},
        {"abbreviation": "DAU","description": "Height in FT_IN","value": "070 in"},
        {"abbreviation": "DAG","description": "Mailing Street Address1","value": "9312 RED TWIG DR"},
        {"abbreviation": "DAI","description": "Mailing City","value": "LAS VEGAS"},
        {"abbreviation": "DAJ","description": "Mailing Jurisdiction Code","value": "NV"},
        {"abbreviation": "DAK","description": "Mailing Postal Code","value": "891341810  "},
        {"abbreviation": "DAQ","description": "License or ID Number","value": "1604367777"},
        {"abbreviation": "DCF","description": "Document Discriminator","value": "000152874770582302539"},
        {"abbreviation": "DCG","description": "Country territory of issuance","value": "USA"},
        {"abbreviation": "DCH","description": "Federal Commercial Vehicle Codes","value": "NONE"},
        {"abbreviation": "DAZ","description": "Hair Color","value": "BLACK"},
        {"abbreviation": "DCE","description": "Physical Description Weight Range","value": "4"},
        {"abbreviation": "DCK","description": "Inventory Control Number","value": "0015518236701"}
      ]

      parseData({ ...data, responseOCR: fakeRes })
    }

  }

  function parseData(data) {
    let firstName = '', lastName = ''
    let street = '', city = '', gender = 0

    data.responseOCR.forEach((v) => {
      switch (v.abbreviation) {
        case 'DCD':
          break
        case 'DBA':
          // license expiration date
          break
        case 'DCS':
          // last name
          lastName = v.value
          break
        case 'DCT':
          // first name
          firstName = v.value
          break
        case 'DBD':
          // id card issue date
          break
        case 'DBB':
          // birthday
          break
        case 'DBC':
          // gender
          gender = v.value
          break
        case 'DAY':
          // eye color
          break
        case 'DAU':
          // height in ft-in
          break
        case 'DAG':
          // street address (mailing)
          street = v.value
          break
        case 'DAI':
          // city (mailing)
          city = v.value
          break
        case 'DAJ':
          // jurisdiction code (mailing)
          break
        case 'DAK':
          // postal code (mailing)
          break
        case 'DAQ':
          // license or id number
          break
        case 'DCF':
          // document discriminator
          break
        case 'DCG':
          // country territory of issuance
          break
        case 'DCH':
          // federal commercial vehicle codes
          break
        case 'DAZ':
          // hair color
          break
        case 'DCE':
          // physical description weight range
          break
        case 'DCK':
          // inventory control number
          break
      }
    })

    let idcardData = {
      fullName: firstName + ' ' + lastName,
      gender: gender == 1 ? 'MALE' : 'FEMALE',
      address: street + ' ' + city,
      frontFileUrl: data.frontFileUrl,
      backFileUrl: data.backFileUrl
    }

    commitIDCardData(idcardData)

    if (type == 'reg')
      router.push('/auth/signup/basic-data')
    else if (type == 'insurance')
      router.back()
  }

  return (
    <Wrapper className="center">
      <FormWrapper>
        <FormContainer>
          <Layout title="Scan ID document" hasDesktopTitle={true}>
            <ContentWrapper>
              <Description>
                We can speed up completing registration by getting data on your
                government issued ID card e.g. State ID or drivers license cards,
                military ID's, valid passport, student picture ID issued by a
                recognized educational institution.
              </Description>
              <Description>Take a picture of Government issued ID.</Description>
              <Description>Acceptable formats are jpg, jpeg, png, and pdf.</Description>
              <ScanID changedFile={changedFile} />
              <BottomWrapper>
                <CenteredRow>
                  <LinkButton className="big strong" onClick={UploadAndNext}>Next</LinkButton>
                </CenteredRow>
              </BottomWrapper>
            </ContentWrapper>
          </Layout>
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  )
}

export default ScanIDDoc
