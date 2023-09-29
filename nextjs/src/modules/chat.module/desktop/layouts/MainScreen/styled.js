import styled from "styled-components";

export const MainScreenWrapper = styled.div`
  //min-width: 700px;

  flex: 3;
  display: grid;
  grid-template-rows: ${props => props.isReduceHeight? '46px 1fr 0.2fr' : '71px 1fr 0.2fr'} ;
  border-right: 1px solid #c4c4c4;
  overflow: auto;
  
  &.paste {
    grid-template-rows: auto 61px 1fr 0.07fr;
  }
`
export const SearchBox = styled.div`
  font-family: SF Pro Text;
  
  display: flex;
  margin-left: 15px;
  margin-bottom: 5px;
  padding: 20px 0;
  height: 60px;
  
  .caption {
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
    margin-right: 20px;
    align-self: center;
  }
  .alarm {
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 14px;
    color: #e85d00;
    margin-left: 10px;
    align-self: center;
  }
`