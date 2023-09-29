import Image from 'next/image'
import Layout from '../../../components/Layout'
import 'react-datepicker/dist/react-datepicker.css'
import {
  FormContainer,
  LinkButton, CenteredRow,
} from '../../../common/styleds/common.styled'
import {
  Description,
} from './styled'
import styled from 'styled-components'

export default function NoInformation () {    

    return (
        <Wrapper className="center">
            <FormWrapper>
                <FormContainer>
                    <Layout title="No information" hasDesktopTitle={true}>
                        <div style={{display: 'flex', justifyContent: 'center', padding: 20}}>
                            <Image src="/assets/images/payment_pending.png" width="218" height="181" />
                        </div>
                        <Description>          
                            <p>We are sorry we don’t have any information on you.</p>
                            <p>Please ask the provider’s staff to help you.</p>
                            <p>You can also call them on 1-xxx-xxx-xxxx and press option x, between xx.xx AM to xx.xx AM/PM.</p>
                            <p>Sorry for the inconvenience.</p>
                        </Description>
                        <CenteredRow marginTop={46}>
                            <LinkButton onclick="done" className="big">Done</LinkButton>
                        </CenteredRow>
                    </Layout>
                </FormContainer>
            </FormWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  * {
    font-family: SF Pro Text;
    font-style: normal;
  }
  width: 375px;
  margin: auto;
  display: block;
  &.center {
    justify-content: center;
  }
`
const FormWrapper = styled.div`
  padding:0px;
  background-color: white;
`
