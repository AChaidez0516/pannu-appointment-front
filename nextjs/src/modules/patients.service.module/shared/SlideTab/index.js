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
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    selectedId: PropTypes.number
  })).isRequired,
  selectedTabId: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  tabType: PropTypes.string,
}

SlideTab.defaultProps = {
  tabType: 'ROUND_TAB'
}