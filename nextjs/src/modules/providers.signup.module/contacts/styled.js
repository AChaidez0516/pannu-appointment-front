import styled from 'styled-components'
import { Field } from 'formik'
import Image from 'next/image'


export const InputField = styled(Field)`
  border: 0.5px solid #65676B;
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  width: 100%;
  padding: 10px 10px 10px 10px;
  &:focus {
    outline: none;
    border: 0.5px solid #173FD4;
  }
`
export const ImgButton = styled(Image)`
  cursor:pointer;
  width: 20px; height: 20px;
`
export const SubmitButton = styled.button`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #173fd4;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
`
export const ItemImg = styled(Image)`
  cursor:pointer;
`
export const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 45px;
`