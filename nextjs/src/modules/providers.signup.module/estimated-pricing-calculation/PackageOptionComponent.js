import Image from 'next/image'
import PropTypes from 'prop-types'
import { PACKAGE_OPTIONS } from '.'
import { ICONS } from '../../../common/utils/styleGuide'
import { PackageOptionWrapper } from "./styled"


export default function PackageOpetionComponent(props) {
  const {
    packageOption,
    updatePackageOption
  } = props

  return (
    <PackageOptionWrapper>
      <div className='explain-text'>{packageOption?.explainText}</div>
      <div className='option-group'>
        <div className='option-item'>
          <Image
            src={packageOption.isAgree ? ICONS.radioOn : ICONS.radioOff}
            width={25}
            height={25}
            layout='fixed'
            onClick={() => updatePackageOption(packageOption?.id, true)}
          />
          <label className='short-label'>{packageOption?.agreeText}</label>
        </div>
        <div className='option-item'>
          <Image
            src={!packageOption.isAgree ? ICONS.radioOn : ICONS.radioOff}
            width={25}
            height={25}
            layout='fixed'
            onClick={() => updatePackageOption(packageOption?.id, false)}
          />
          <label>{packageOption?.disagreeText}</label>
        </div>
      </div>
    </PackageOptionWrapper>
  )
}

PackageOpetionComponent.propTypes = {
  isUseAll: PropTypes.bool.isRequired,
  packageOption: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    explainText: PropTypes.string.isRequired,
    isAgree: PropTypes.bool.isRequired,
    agreeText: PropTypes.string.isRequired,
    disagreeText: PropTypes.string.isRequired,
  }).isRequired,
  updatePackageOption: PropTypes.func.isRequired,
}

