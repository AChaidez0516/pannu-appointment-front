import { useSelector } from 'react-redux'
import ProviderSearch from "../../../src/modules/patients.service.module/search-provider"
import useWindowDimensions from "../../../src/common/hooks/useWindowDimensions"
import ProviderSearchDesktop from "../../../src/modules/patients.service.module/search-provider/desktop";
function ProviderSearchPage () {
  // const loggedInUser = useSelector( state => state.reg.user)
  const { height, width } = useWindowDimensions()

  if (width < 768) {
    return <ProviderSearch /> /** mobile */
  } else if( width < 1024) {
    return <ProviderSearch /> /** tablet */
  } else {
    return <ProviderSearchDesktop width={width}/> /** desktop */
  }
}

export default ProviderSearchPage