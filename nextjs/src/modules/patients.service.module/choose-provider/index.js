import { useState } from "react"
import PropTypes from 'prop-types'
import Image from 'next/image'
import "react-datepicker/dist/react-datepicker.css";
import { ICONS } from "../../../common/utils/styleGuide"
import { 
  ChooseProviderWrapper, 
  SearchBox, 
  SlideTabWrapper, 
  TabContentWrapper,
  ComparePageWrapper,
  HeaderWrapper,
  ComparePageContainer,
  PaddingWrapper, 
} from "./styled"
import { searchProvidersFromPatient } from '../../../common/lib/provider'
import SlideTab from "../shared/SlideTab"
import MobileHeader from "../shared/MobileHeader"
import ProviderCardSimple from "../shared/ProviderCardSimple";
import CalendarContent from "./CalendarContent"
import MapContent from "./MapContent"
import ListContent from "./ListContent"
import FilterOptions from './FilterOptions'
import { TABS_IN_CHOOSE, INIT_FILTER_OPTION} from "./data"


ChooseProvider.propTypes = {
  providers: PropTypes.arrayOf(PropTypes.object),
  events: PropTypes.arrayOf(PropTypes.object),
}


function ChooseProvider ({providersFromServer, events}) {
  const [providers, setProviders] = useState(providersFromServer)
  const [typed, setTyped] = useState('')
  const [selectedTabId, setSelectedTabId] = useState(0) 
  const [filterOption, setFilterOption] = useState(INIT_FILTER_OPTION)
  const [isOpenFilter, setIsOpenFilter] = useState(true)
 
 
  const [checked, setChecked] = useState([])
  const [compare, setCompare] = useState(false)
  const [isComparePage, setIsComparePage] = useState(false)


  const setActiveTab = (tabId) => setSelectedTabId(tabId)

  const isSelected = (contentName) => contentName === TABS_IN_CHOOSE[selectedTabId]

  const handleCompareTo = () => {
    if(compare) {
      setChecked([])
    }
    setCompare(!compare)
  }

  const showComparePage = () => {
    setIsComparePage(true)
  }

  const hideComparePage = () => {
    setIsComparePage(false)
    setChecked([])
  }

  const chooseHeaderProps = {
    headerTitle: 'Choose Provider',
    isLoggedIn: true,
    isFilter: true,
    isOpenFilter,
    setIsOpenFilter,
    countOfNotifications: 14,
    backUrl: '/patients/provider-search/'
  }

  const slideTabProps = {
    tabs: TABS_IN_CHOOSE.map((tab, i) => ({id: i, name: tab})),
    selectedTabId,
    setActiveTab,
  }

  const searchProviders = async () => {
    if (!typed) return
    const providers = await searchProvidersFromPatient('ALL', typed)
    setProviders(providers)
  }

  return (
    <ChooseProviderWrapper>
      {isComparePage ? 
      <PaddingWrapper>
        <ComparePageWrapper>
          <HeaderWrapper>
            <h5>
              <Image 
                src={ICONS.backArrow} 
                width={10} height={13}
                layout="fixed"
                onClick={hideComparePage}
                />
            </h5>
            <span>{'Comparison'}</span>
          </HeaderWrapper>
          <ComparePageContainer>
            {checked
              .map(providerId => providers.find(p => p.id === providerId))
              .map(provider => <ProviderCardSimple key={provider.id} provider={provider}/>)}
          </ComparePageContainer>
        </ComparePageWrapper>
      </PaddingWrapper>
      :
      <>
        <PaddingWrapper>
          <MobileHeader {...chooseHeaderProps} />
        </PaddingWrapper>
        {isOpenFilter ?
          <>
            <PaddingWrapper>
              <SearchBox>
                <div className="map-marker">
                  <Image src={ICONS.mapMarker} width={15} height={20} layout="fixed" />
                </div>
                <input 
                  type={'text'} 
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                  />
                <div className="magnify" >
                  <Image 
                    src={ICONS.magnifyingGlass} 
                    width={17} height={16} 
                    layout="fixed"
                    onClick={(e) => searchProviders()}
                    />
                </div>
              </SearchBox>
              <SlideTabWrapper>
                <SlideTab {...slideTabProps}/>
              </SlideTabWrapper>
            </PaddingWrapper>
            <TabContentWrapper>
              {isSelected("List") && <PaddingWrapper>
                <ListContent
                  providers={providers} 
                  handleCompareTo={handleCompareTo} 
                  compare={compare} 
                  checked={checked} 
                  setChecked={setChecked} 
                  showComparePage={showComparePage}
                />
              </PaddingWrapper>}
              {isSelected("Map") && <MapContent providers={ providers
                .filter(pvd => pvd?.geography?.lat && pvd?.geography?.lng)} />
              }
              {isSelected("Calendar") && 
                <CalendarContent events={events} />
              }
            </TabContentWrapper>
          </>
          :
          <PaddingWrapper>
            <FilterOptions 
              options={filterOption} 
              setFilterOption={setFilterOption}
              setIsOpenFilter={setIsOpenFilter}
            /> 
          </PaddingWrapper>
        }
      </>
      }
    </ChooseProviderWrapper>
  )
}


export default ChooseProvider