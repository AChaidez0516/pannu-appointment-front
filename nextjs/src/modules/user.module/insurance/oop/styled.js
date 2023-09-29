import styled from 'styled-components'

import Switch from '@mui/material/Switch'
import { IMaskInput } from 'react-imask'

export const Title = styled.label`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
`

export const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: '42px !important',
    height: '26px !important',
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: '#E2E2E2E2',
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#39393D',
        opacity: 1,
    },
    padding: '0 !important',
}))

export const TableDiv = styled.div`
  background: #ffffff;
  box-shadow: 4px -5px 20px rgba(0, 0, 0, 0.14);
  border-radius: 5px;
  margin: 20px 0px 20px 0px;
`
export const Tr = styled.div`
  height: 50px;
  display: flex;
`
export const Td = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e7e7e7;
`
export const TdText = styled.span`
  padding: 8px 0px 0px 8px;
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 13px;
  color: #000000;
`
export const MaskInput = styled(IMaskInput)`
  border: none;
  outline: none;
  width: 90%;
  padding: 0 10px 0 0;
  
`