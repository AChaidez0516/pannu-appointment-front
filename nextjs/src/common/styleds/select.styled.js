import dynamic from 'next/dynamic'
import styled from 'styled-components'
const Select = dynamic(() => import('@mui/material/Select'))

export const MUISelect = styled(Select)`
  background-color: #ffffff;
  border: 0.5px solid #5a585d;
  box-sizing: border-box;
  border-radius: 5px;
  height: 43px;
  outline: none;
  padding: 10px 10px 10px 4px;
`