
import styled from 'styled-components'


export const ProviderWrapper = styled.div`
  width: 100%;
  padding-bottom: 20px;
  background-color: #F0F2F5;
`
export const Container = styled.div`
  position: relative;
  display: flex;
  width: 1467px;
  border-radius: 8px;
  background-color:white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  margin: 0px auto;
  margin-top: 19px;
`
export const Panel = styled.div`
  position: relative;
  flex-grow: 1;
  padding-top: 20px;
`
export const Caption = styled.div`
  font-family: SF Pro Text;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  color: #000;
`
export const LinkButton = styled.p`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #173fd4;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
`
export const Bottom = styled.div`
  position: absolute;
  width: 100%;
  left:0; bottom: 0;
`
export const BottomWrapper = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.25);    
  padding: 10px 0;
  width: 100%;    
`
export const Item = styled.div`
  display: flex;
  align-items: center;
  column-gap: 13px;
  padding: 5px 10px;
  margin-right: 30px;
  .btn-group {
      width: 49px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
          cursor: pointer;
      }
  }
`
export const ItemTitle = styled.div`
  font-family: SF Pro Text;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  letter-spacing: 0px;
  text-align: left;
`
export const FileWrapper = styled.div`
  margin-left: 20px;
  margin-bottom: 5px;
`
export const UploadButton = styled.div`
  border-radius: 5px;
  border: 1px solid #173fd4;
  padding: 5px;
  cursor: pointer;
  display: inline;
  color: #173fd4;
`
