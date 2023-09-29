import styled from "styled-components"
import ReactLoading from 'react-loading';


export const GlobalLoading = ({ type='spin', color }) => {
  return (
    <Wrapper>
      <ReactLoading type={type} height={'80px'} width={'80px'} />
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  /* color: lightblue; */
`
