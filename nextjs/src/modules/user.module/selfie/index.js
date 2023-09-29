import Image from 'next/image'

import Layout from '../../../components/Layout'

import { useState } from 'react'
import { useRouter } from 'next/router'

import { useRegUser, useLoadingStatus, useIDCardData } from '../../../redux/hooks/useCommonStore'
import {
  Wrapper,
  CenteredRow,
  FormContainer,
  FormWrapper,
  LinkButton,
} from '../../../common/styleds/common.styled'
import {
    Desc,
    IDBackDiv,
    FILE,
} from './styled'

function Selfie() {
    const router = useRouter()
    const { regUser } = useRegUser()
    const { idcardData } = useIDCardData()
    const { commitLoadingStatus } = useLoadingStatus()

    const { type } = { ...router.query }

    const [is_retake, setIsRetake] = useState(false)
    const [selfieFile, setSelfieFile] = useState()
    const [fileData, setFileData] = useState()

    function onFileChanged(event) {
        const selectedFile = event.target.files[0]

        setSelfieFile(selectedFile)

        const reader = new FileReader()
        reader.onload = (r) => {
            setFileData(r.target.result)
            console.log(r.target.result)
        }
        reader.readAsDataURL(selectedFile)
    }

    function checkSelfieAndNext() {
        /*const formData = new FormData()

        formData.append('videoURL', selfieFile)
        formData.append('imageURL', idcardData.frontFile)

        axios.post('http://registration.pannucorp.com/upload/face/images', formData)
            .then(res => {
                console.log(res)

            })
            .catch(error => {
                console.log(error)
            })

        if (type == 'reg')
            router.push('/users/insurance/')
        else if (type == 'insurance')
            router.back()*/

        router.push('/users/insurance/')
    }

    return (
        <Wrapper style={{ justifyContent: 'center' }}>
            <FormWrapper>
                <FormContainer>
                    <Layout title="Take selfie photo" hasDesktopTitle={true}>
                        <CenteredRow marginTop={20}>
                            <Image src="/assets/images/smartphone_banner.png" width="159" height="167" />
                        </CenteredRow>
                        {!is_retake&& (
                            <CenteredRow style={{ flex: 1 }}>
                                <IDBackDiv>
                                    {(fileData)&&
                                        <img src={fileData} width="100%" style={{borderRadius: '10px'}}/>
                                    }
                                    {(!fileData)&& (
                                        <div
                                            style={{
                                                display: 'flex',
                                                position: 'relative',
                                                flexDirection: 'column',
                                                flex: 1,
                                                justifyContent: 'space-evenly',
                                                alignItems: 'center',
                                                height: 300,
                                            }}>
                                            <Desc>Selfie</Desc>
                                            <Image src="/assets/images/fromCamera.png" width="35" height="35" />
                                            <FILE type="file" accept="image/*" onChange={onFileChanged} capture="user" />
                                        </div>
                                    )}
                                </IDBackDiv>
                            </CenteredRow>
                        )}
                        {/*} : (
              <div
                style={{ display: 'flex', justifyContent: 'center', flex: 1 }}
                onClick={() => setIsRetake(!is_retake)}
              >
                <IDBackDiv style={{ border: '2px dashed #FF0000' }}>
                {(fileData)&&
                    <img src={fileData} width="100%" style={{borderRadius:'10px'}}/>
                    }
                {(!fileData)&& (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      height: 300,
                    }}
                  >
                    <Desc style={{ color: '#FF0000' }}>Please retake photo.</Desc>
                    <img
                      src={require('../../public/assets/images/fromCamera.png')}
                      style={{ width: 35, height: 35 }}
                    />
                  </div>
                  )
                </IDBackDiv>
              </div>
            )}*/}

                        <CenteredRow marginTop={50}>
                            <LinkButton className="big" onClick={checkSelfieAndNext}>Add your insurance information</LinkButton>
                        </CenteredRow>
                    </Layout>
                </FormContainer>
            </FormWrapper>
        </Wrapper>
    )
}

export default Selfie
