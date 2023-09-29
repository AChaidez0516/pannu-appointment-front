import styled from 'styled-components'

export const GroupedMessageBoxWrapper = styled.div`
  flex: 1;
  display: flex;
  
  flex-direction: ${ props => props.reverse ? 'column-reverse' : 'column' } ;
  
  .more-loading {
    color: #999;
    text-align: right;
    font-size: 12px;
  }
  .no-message {
    text-align: center;
    font-size: 12px;
    color: #999;
  }
`
