import styled from "styled-components"


export const GoogleMapArea = styled.div`
  position: relative;
  width: 100%;
  height: 580px;
  .gm-fullscreen-control {
    display: none;
  }
`
export const SlideWrpper = styled.div`
  position: absolute;
  top: 38px;
  left: 0px;
  right: 0px;
  z-index: 1000;
  .swiper-slide-active {
    /* border: 1px solid #F6A5456B;
    border-radius: 5px;
    box-shadow: 0px 0px 8px #FAC23C; */
  }
`
export const ProviderCardWrapper = styled.div`
  min-width: 310px;
`
export const NameInPolygon = styled.div`
  width: 63px;
  height: 15px;
  background: #173FD4;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  span {
    display: inline-block;
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 13px;
    color: #FFFFFF;
    max-width: 55px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
`