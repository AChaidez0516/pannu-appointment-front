import { useState, useEffect } from 'react'
import { CheckOnIcon, CheckOffIcon } from '../../common/utils/Icons'
import { CheckWrapper } from './styled'

const defaultOption = {
  size: {
    width: 16,
    height: 16,
  },
  marginTop: 0
}
const CheckBox = (props) => {

  const { children, status, onChange, options = defaultOption } = props

  const [checked, setChecked] = useState(status | false)

  useEffect(() => {
    return onChange(checked)
  }, [checked])

  return (
    <CheckWrapper onClick={() => setChecked(!checked)}
      marginTop={options.marginTop}>
      {checked ?
        <span><CheckOnIcon width={options.size.width} height={options.size.height} /></span>
        :
        <span><CheckOffIcon width={options.size.width} height={options.size.height} /></span>} {children}
    </CheckWrapper>
  )
}

export default CheckBox