import Image from 'next/image'
import {
    Wrapper,
    Text,
    SuccessContainer,
    UserParagraph,
} from './styled'

function Success({ state, msg, successMsg }) {
  return (
    <SuccessContainer>
      <Wrapper>
        {state === 'success' ? (
          <Image width={30} height={30} src="/assets/images/ico-check.png" />
        ) : (
          <Image width={30} height={30} src="/assets/images/ico-failure.png" />
        )}
        <Text>{successMsg}</Text>
      </Wrapper>
    
      <UserParagraph>
        {msg}
      </UserParagraph>
     
    </SuccessContainer>
  )
}

export default Success
