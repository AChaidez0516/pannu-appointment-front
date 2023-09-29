import PropTypes from 'prop-types'
import { SlideTabWrapper, TabItem } from "./styled"


export default function SlideTab (props) {
  const {
    tabs, 
    selectedTabId, 
    setActiveTab,
    tabType,
  } = props

  return (
    <SlideTabWrapper tabType={tabType}>
      {tabs.length > 0 && tabs.map(tab => (
        <TabItem 
          key={tab.id} 
          tabType={tabType}
          isActive={tab.id === selectedTabId ? true : false}
          onClick={() => setActiveTab(tab.id)}
        >{tab.name}</TabItem>
      ))}
    </SlideTabWrapper>
  )
}

SlideTab.propTypes = {
  tabs: PropTypes.array.isRequired,
  selectedTabId: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  tabType: PropTypes.string,
}

SlideTab.defaultProps = {
  tabType: 'ROUND_TAB'
}