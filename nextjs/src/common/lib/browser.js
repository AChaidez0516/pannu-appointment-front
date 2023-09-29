import { isMobile } from 'react-device-detect'

export function isClientMobile() {
  if (isMobile) {
    return true
  }
  return false
}
