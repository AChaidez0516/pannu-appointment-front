import styled from "styled-components";

export const ServerSideWrapper = styled.div`
  flex:1;
  border-right: 1px solid #c4c4c4;
  grid-template-rows: ${props => props.isReduceHeight? '46px auto' : '71px auto'};
  
  display: grid;
  
`
export const Divider = styled.div`
  box-sizing: border-box;
  border-top: 1px solid #c4c4c4;
  flex: 1;
  margin: 20px 10px;
`


export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`

export const Container = styled.div`
  position: relative;
  padding-bottom: 20px;
  &.disable-overflow {
    overflow: hidden;
  }
`

export const Overlay = styled.div`
  position: absolute;
  left: 0; top: 0;
  background-color: #FFFFFF80;
  
  width: 100%;
  height: 100vh;
`