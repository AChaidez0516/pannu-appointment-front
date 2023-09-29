import React from 'react'
import styled from 'styled-components'
import { Menu, MenuItem, SubMenu, MenuDivider } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import {
  Logout
} from '@mui/icons-material'

const WithIco = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 10px;
  color: #000000;
`
const WithOutIco = styled(WithIco)`
  padding: 5px 0px;
  margin-left: 28px;
`
export default function UserPopup({
  renderItem,
  handleSignOut
}) {
  return (
    <Menu menuButton={renderItem} direction="left" offsetX={1} offsetY={15}>
      <MenuItem onClick={handleSignOut}>
        <Logout
          fontSize="small"
          sx={{ transform: 'rotateY(180deg)', marginRight: 1 }}
        />{' '}
        <WithIco>Sign Out</WithIco>
      </MenuItem>
    </Menu>
  )
}
