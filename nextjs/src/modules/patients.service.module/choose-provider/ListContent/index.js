import PropTypes from 'prop-types'
import { CompareNotifyWrapper, ListWrapper, ToCompareWrapper } from "./styled"
import ProviderCard from "../../shared/ProviderCard"


ListContent.propTypes = {
  providers: PropTypes.array,
  handleCompareTo: PropTypes.func,
  compare: PropTypes.bool,
  checked: PropTypes.array,
  setChecked: PropTypes.func,
  showComparePage: PropTypes.func
}

function ListContent(props) {
  const {
    providers, 
    handleCompareTo, 
    compare, 
    checked, 
    setChecked, 
    showComparePage } = props

  const handleCheck = (e, providerId) => {
    if (e.target.checked) {
      if (checked.length > 9) return false
      setChecked(prev => ([...prev, providerId]))
    } else {
      setChecked(prev => prev.filter(pId => pId !== providerId))
    }
  }

  return (
    <ListWrapper>
      {compare && 
      <CompareNotifyWrapper>
        {checked.length > 0 ? 
        <div>
          <span>{checked.length}/10 selected</span> 
          <button onClick={showComparePage}>Compare now</button>
        </div>
        :
        <span>Select up to 10 offers to compare</span>
        }
      </CompareNotifyWrapper>}
      {providers && providers.length > 0 && providers.map(provider => (
      <ProviderCard 
        key={provider.id}
        provider={provider}
        isCompare={compare}
        checkedItems={checked}
        handleCheck={handleCheck}
      />
      ))}
      <ToCompareWrapper>
        <button 
          onClick={handleCompareTo}
        >To compare</button>
      </ToCompareWrapper>
    </ListWrapper>
  )
}



export default ListContent