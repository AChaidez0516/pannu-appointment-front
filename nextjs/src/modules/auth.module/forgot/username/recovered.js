import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import {
    CenteredRow,
    FormContainer,
    FormWrapper,
    Wrapper,
    LinkButton
}
from '../../../../common/styleds/common.styled'
import {
    Title,
    RecoveredName,
} from '../shared/styled'

function Recovered() {
    const router = useRouter()
    const { token } = { ...router.query }
    return (
        <Wrapper className="center">
            <FormWrapper>
                <FormContainer>
                    <div>
                        <Title className="normal">Recovered username</Title>
                        <CenteredRow marginTop={66}>
                            <Image src="/assets/images/recovered_banner.png" width="270" height="224" />
                        </CenteredRow>
                        <CenteredRow marginTop={51}>
                            <RecoveredName>{token}</RecoveredName>
                        </CenteredRow>
                        <CenteredRow marginTop={30}>
                            <Link href="/auth/login">
                                <LinkButton className="big">Sign in</LinkButton>
                            </Link>
                        </CenteredRow>
                    </div>
                </FormContainer>
            </FormWrapper>
        </Wrapper>
    )
}

export default Recovered
