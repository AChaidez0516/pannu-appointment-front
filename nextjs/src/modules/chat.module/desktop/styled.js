import styled from "styled-components";

export const MessageAppWrapper = styled.div`
  box-sizing: border-box;
`
export const ChatWrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) => {
    if (props.fullScreen)
      return '1fr'
    else {
      /*if (!props.scribe)
        return `1.2fr 1.2fr 3.5fr 1fr`
      else
        return `1.2fr 4.7fr 1fr`*/
      if (!props.scribe)
        return `${props.collapsedFlags[0] ? '138px' : '326px'} ${props.collapsedFlags[1] ? '138px' : '326px'} 3.5fr ${props.collapsedFlags[2] ? '163px' : '268px'}`
      else
        return `${props.collapsedFlags[0] ? '138px' : '326px'} auto ${props.collapsedFlags[2] ? '163px' : '268px'}`
    }
  }};
  gap: 0px 0px;
  grid-template-areas:
    '. . .'
    '. . .'
    '. . .';
  background: #F7F5F9;//#f3f5f7;
`
