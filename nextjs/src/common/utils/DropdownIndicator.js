import { components } from 'react-select'
import { ICONS } from './styleGuide'
import Image from 'next/image'


const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Image src={ICONS.dropdownIcon} width={13} height={8} />
    </components.DropdownIndicator>
  )
}

export default DropdownIndicator
