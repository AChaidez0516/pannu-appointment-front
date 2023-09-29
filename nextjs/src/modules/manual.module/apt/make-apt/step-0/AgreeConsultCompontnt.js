import PropTypes from 'prop-types'
import styled from 'styled-components'
import Image from 'next/image'
import { ICONS } from '../../../../../common/utils/styleGuide'


export default function AgreeConsultComponent(props) {
  const {
    isVideo,
    setIsVideo,
    isPhone,
    setIsPhone,
  } = props

  return (
    <AgreeConsultWrapper>
      <div className='title'>If you agree to a virtual consult, check the ones that apply</div>
      <div className='check-wrapper'>
        <div className='check-group'>
          <div className='check-unit'>
            <label
              onClick={() => setIsVideo(!isVideo)}
            >Video</label>
            <Image
              src={isVideo ? ICONS.checkOn : ICONS.checkOff}
              width={18} height={18} layout={'fixed'}
              quality={100}
              onClick={() => setIsVideo(!isVideo)}
            />
          </div>
          <div className='check-unit'>
            <label
              onClick={() => setIsPhone(!isPhone)}
            >Phone</label>
            <Image
              src={isPhone ? ICONS.checkOn : ICONS.checkOff}
              width={18} height={18} layout={'fixed'}
              quality={100}
              onClick={() => setIsPhone(!isPhone)}
            />
          </div>
        </div>
      </div>
    </AgreeConsultWrapper>
  )
}

AgreeConsultComponent.propTypes = {
  isVideo: PropTypes.bool,
  setIsVideo: PropTypes.func.isRequired,
  isPhone: PropTypes.bool,
  setIsPhone: PropTypes.func.isRequired,
}


export const AgreeConsultWrapper = styled.div`
  border: 2px solid #B5ACFE;
  border-radius: 5px;
  padding: 7px 8px;
  .title {
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 10px;
  }
  .check-wrapper {
    display: flex;
    justify-content: end;
  }
  .check-group {
    width: 210px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .check-unit {
      display: flex;
      align-items: center;
      column-gap: 5px;
      cursor: pointer;
      label {
        margin: 0;
        font-weight: 500;
        font-size: 12px;
        line-height: 12px;
      }
    }
  }
  margin-bottom: 15px;
`