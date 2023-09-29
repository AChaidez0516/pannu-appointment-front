import { useState } from 'react'
import { RadioOnIcon, RadioOffIcon } from '../../common/utils/Icons'
import { RadioWrapper } from './styled'

const defaultOption = {
  size: {
    width: 25,
    height: 25,
  },
  marginTop: 0
}
const RadioBox = (props) => {

  const { children, status, onClick, options = defaultOption } = props

  const [checked, setChecked] = useState(status | false)

  return (
    <RadioWrapper onClick={onClick} marginTop={options.marginTop}>{ status ? <RadioOnIcon width={options.size.width} height={options.size.height} /> : <RadioOffIcon width={options.size.width} height={options.size.height} /> } {children}</RadioWrapper>
  )
}

export default RadioBox