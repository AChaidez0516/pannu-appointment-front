import { useState } from "react"
import Image from "next/image"
import AutoComplete from 'react-google-autocomplete'
import { ICONS } from "../../../common/utils/styleGuide"
import MobileHeader from "../shared/MobileHeader"
import { 
  AddressMainWrapper,
  DistanceWrapper,
  FindAppointmentWrapper, 
  MainWrapper, 
  ProviderSearchBox, 
  SearchBoxWrapper, 
  SearchProviderOption, 
  SearchResultsWrapper, 
  SearchWrapper, 
  SpecialtyOptions, 
  SubmitWrapper, 
  UrgentWrapper,
} from "./styled"
import DropDown from "../shared/DropDown"
import { 
  DD_PROPS, 
  DISTANCE_LIST, 
  PLACES_LIST, 
  SEARCH_TYPE_OPTIONS,
 } from "./data"
import { getDistance, twoPointsToTest } from '../../../common/utils/distance'


function FindAppointment ({loggedInUser}) {
  const [checkUrgent, setCheckUrgent] = useState()
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [labelInput, setLabelInput] = useState('')
  const [selectedMile, setSelectedItem] = useState(DISTANCE_LIST[0])
  const [searchTypeOption, setSearchTypeOption] = useState(SEARCH_TYPE_OPTIONS[0])
  const [typedInput, setTypedInput] = useState()

  const dropDownProps = {...DD_PROPS, 
    dropDownList: DISTANCE_LIST,
    icons: {...DD_PROPS.icons, left: null},
    setSelectedItem,
  }  

  const handleSearchProviders = async () => {
    // from point, {lat, lng} from selected place
    // miles from selectedMile
    // searchType 
    // typedInput
    //  - provider name
    //  - specialty 
    //  - provider name
    
    if(selectedPlace) {
      const lat = selectedPlace?.geometry?.location?.lat()
      const lng = selectedPlace?.geometry?.location?.lng()
      const formatted_address = selectedPlace?.formatted_address 
      console.log({selectedPlace, lat, lng, formatted_address})
    }
    
    const getDistanceInMeter = getDistance(twoPointsToTest.points[0], twoPointsToTest.points[1])  
  }

  // google map autocomplete to get lat/lng, address
  // dropwodn for mobile
  const handleResponsePlace = (place) => {
    if (place) {
      setSelectedPlace(place)
    }
  }


  return (
    <FindAppointmentWrapper>
      <MobileHeader 
        headerTitle={'Find an appointment'}
        backUrl={'/patients/provider-search'}
        isLoggedIn={true}
        countOfNotifications={3}
        //user={loggedInUser}
      />
      <MainWrapper>
        <UrgentWrapper>
          <label htmlFor="check-urgent" className="text-note">I need an urgent appointment with a specialist</label>
          <input 
            id="check-urgent"
            className="checkbox" 
            type={'checkbox'} 
            name={'checkUrgent'}
            checked={checkUrgent}
            onChange={(e) => setCheckUrgent(!checkUrgent)}
          />
        </UrgentWrapper>
        <SearchBoxWrapper>
          <div className="input-box">
            <AutoComplete 
              className="auto-complete"
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
              libraries={['places']}
              options={{
                componentRestrictions: {
                  country: ['us']
                },
                types: ['hospital', 'pharmacy', 'physiotherapist', 'veterinary_care' ]
              }}
              onPlaceSelected={(place) => handleResponsePlace(place)}
            />
            <div className="map-marker">
              <Image src={ICONS.mapMarker} width={13} height={20} layout={'fixed'} />
            </div>
            <div className="magnifier">
              <Image src={ICONS.magnifyingGlass} width={17} height={16} layout={'fixed'} />
            </div>
          </div>
          <button className="search-location">Search</button>
        </SearchBoxWrapper>
        <AddressMainWrapper>
          <div className="stored-list">
            <div className="label-title-wrapper">
              {PLACES_LIST.map((place, i) => 
                <div 
                  key={i} 
                  className={place.id === selectedPlace?.id ? `label-title active`: `label-title`} 
                  onClick={() => setSelectedPlace(place)}
                >{place.label}</div>
              )}
              
            </div>
            <div className="select-address">
              {selectedPlace && selectedPlace.address}
            </div>
          </div>
          <div className="save-address">
            <div className="text-note">To Save address for future use add label :</div>
            <div className="button-group">
              <input 
                className="label-input"
                placeholder="Label"
                value={labelInput}
                onChange={(e) => setLabelInput(e.target.value)}
              />
              <button className="skip-btn">Skip</button>
              <button className="save-btn">Save</button>
            </div>
          </div>
        </AddressMainWrapper>
        <DistanceWrapper>
          <div className="text-note">Enter the furthest distance you want to search from your address</div>
          <DropDown {...dropDownProps } />
        </DistanceWrapper>
        <SearchWrapper>
          <SearchProviderOption>
            <div className="text-note">Search By:</div>
            <div className="option-group">
              <div className="option-item">
                <input 
                  id="pvd-name"
                  className="option-tag" 
                  type={'radio'}
                  name="target-option"
                  checked={searchTypeOption === SEARCH_TYPE_OPTIONS[0]}
                  onChange={(e) => setSearchTypeOption(SEARCH_TYPE_OPTIONS[0])}
                />
                <label htmlFor="pvd-name" className="option-label">Provider name</label>
              </div>
              <div className="option-item">
                <input 
                  id="pvd-specialty"
                  className="option-tag" 
                  type={'radio'}
                  name="target-option"
                  checked={searchTypeOption === SEARCH_TYPE_OPTIONS[1]}
                  onChange={(e) => setSearchTypeOption(SEARCH_TYPE_OPTIONS[1])}
                />
                <label htmlFor="pvd-specialty" className="option-label">Specialty</label>
              </div>
              <div className="option-item">
                <input 
                  id="pvd-several"
                  className="option-tag" 
                  type={'radio'}
                  name="target-option"
                  checked={searchTypeOption === SEARCH_TYPE_OPTIONS[2]}
                  onChange={(e) => setSearchTypeOption(SEARCH_TYPE_OPTIONS[2])}
                />
                <label htmlFor="pvd-several" className="option-label">Search these providers</label>
              </div>
            </div>
            <div className="search-group">
              <ProviderSearchBox>
                <input 
                  className="input-box" 
                  type={'text'} 
                  value={typedInput}
                  placeholder={`John Doe`}
                  onChange={(e) => setTypedInput(e.target.value)}
                />
                <div className="magnifier">
                  <Image src={ICONS.magnifyingGlass} width={17} height={16} layout={'fixed'} />
                </div>
              </ProviderSearchBox>
              {false && 
                <SpecialtyOptions></SpecialtyOptions>
              }
              <button 
                className="search-provider-btn"
                onClick={handleSearchProviders}
              >Search</button>
            </div>
          </SearchProviderOption>
          <SearchResultsWrapper>
            <div className="result-item">
              <div className="info">Arlene McCoy, Facility name, Location</div>
              <div className="delete-btn">
                <Image src={ICONS.redClose} width={20} height={20} layout={'fixed'} />
              </div>
            </div>
            <div className="result-item">
              <div className="info">Arlene McCoy, Facility name, Location</div>
              <div className="delete-btn">
                <Image src={ICONS.redClose} width={20} height={20} layout={'fixed'} />
              </div>
            </div>
          </SearchResultsWrapper>
        </SearchWrapper>
        <SubmitWrapper>
          <button className="submit-btn">Submit</button>
        </SubmitWrapper>
      </MainWrapper>
    </FindAppointmentWrapper>
  )
}

export default FindAppointment