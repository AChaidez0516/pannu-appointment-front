import Link from 'next/link'

import Layout from '../../../../components/Layout'
import FaceDetect from '../../../../components/FaceDetect'

import { useState } from 'react'
import { useRouter } from 'next/router'

import {
    Wrapper,
    FormWrapper,
    FormContainer,
    CenteredRow,
    LinkButton,
} from '../../../../common/styleds/common.styled'

import {
    ContentDiv,
    Title
} from './styled'

function Index() {
    const router = useRouter()
    const [showPwd, setShowPwd] = useState(false)

    return (
        <Wrapper style={{ justifyContent: 'center' }}>
            <FormWrapper>
                <FormContainer>
                    <Layout title="Set up biometric verification" hasDesktopTitle={true}>
                        <ContentDiv>
                            <Title>
                                For added security, we strongly recommend that you set up and use your
                                device's biometric authentication.{' '}
                            </Title>
                        </ContentDiv>

                        <FaceDetect />

                        <CenteredRow marginTop="47">
                            <Link href={{ pathname: "/users/selfie", query: { type: 'reg' } }}>
                                <LinkButton className="big">Take selfie</LinkButton>
                            </Link>
                        </CenteredRow>
                        <Link href={{ pathname: "/users/selfie", query: { type: 'reg' } }}>
                            <p style={{ textAlign: 'center' }}>Skip</p>
                        </Link>
                    </Layout>
                </FormContainer>
            </FormWrapper>
        </Wrapper>
    )
}

export default Index
