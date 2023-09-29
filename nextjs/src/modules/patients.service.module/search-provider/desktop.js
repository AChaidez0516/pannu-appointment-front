import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";
const DatePicker = dynamic(() => import("react-datepicker"))
import "react-datepicker/dist/react-datepicker.css"
import Image from 'next/image'
import moment from 'moment'
import Rating from 'react-rating'
import PropTypes from 'prop-types'
import DesktopHeader from "../shared/DesktopHeader";
import { ICONS } from "../../../common/utils/styleGuide"
import { 
  AddedProvidersWrapper,
  DateTimeContainer,
  DateTimeBlock,
  FormGroup,
  NetworkWrapper,
  CheckboxWrapper,
  ContentWrapper, 
  FilterWrapper, 
  MainContainer, 
  MainPageWrapper, 
  MedicineWrapper, 
  OptionWrapper, 
  ParagraphFont, 
  PatientLocationWrapper, 
  ProfileWrapper, 
  RatingContainer,
  RatingWrapper,
  UnitRating,
  KeywordsWrapper,
  ButtonWrapper,
  ContentTabWrapper,
  ContentContainer,
  ListContentWrapper,
  ProfileContent,
  CopyLinkWrapper} from "./desktop.styled"

import { getAllProviders, getProviderDetail } from "../../../common/lib/provider";
import MapContent from "../choose-provider/MapContent"
import ProviderCard from "../shared/ProviderCard";
import DesktopCalendarContent from "../choose-provider/DesktopCalendarContent";
import ProviderProfile from "../provider-profile";
import { getAptFetchAllFromDate } from "../../../common/lib/appointment";


ProviderSearchDesktop.propTypes = {
  user: PropTypes.object,
}

function ProviderSearchDesktop ({user}) {
  
  const [loading, setLoading] = useState(false)
  const [providers, setProviders] = useState([])
  const [apts, setApts] = useState([])
  const [provider, setProvider] = useState(null)
  const [selectedTab, setSelectedTab] = useState(1)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [distanceDropDown, setDistanceDropDown] = useState("2 miles")
  const [distanceDropDownOpen, setDistanceDropDownOpen] = useState(false)
  const [fromPoint, setFromPoint] = useState("Bay Minette, AL 36507, USA")
  const [typed, setTyped] = useState("")

  const handleFetch = async () => {
    setLoading(true)
    try {
      const today = moment(new Date()).format('YYYY-MM-DD');
      const result = await getAllProviders()
      setProviders(result)
      const apts = await getAptFetchAllFromDate(today)
      setApts(apts)
    } catch (error) {
      // exception handling
    } finally {
      setLoading(false)
    }
  }

  const handleProviderDetail = async (pid) => {
    try {
      const provider = await getProviderDetail(pid)
      setProvider(provider)
    } catch (error) {
      // exception handling
    }
  }

  return (
    <>
      <DesktopHeader 
        title={`Provider search`}
        marginBottom={0}
      />
      <MainPageWrapper>
        <MainContainer>
          <FilterWrapper>
            <div className="title">
              <ParagraphFont>{'Manish Malhotra'}</ParagraphFont>
              <ParagraphFont>{"Bay Minette, AL 36507, USA"}</ParagraphFont>
            </div>
            <div className="search-params">Search parameters</div>
            <PatientLocationWrapper>
              <div className="location">
                <ParagraphFont>Patient location</ParagraphFont>
                <input 
                  className="from-point"
                  name={`fromPoint`} 
                  type={'text'} 
                  value={fromPoint}
                  onChange={(e) => setFromPoint(e.target.value)}
                />
              </div>
              <div className="distance">
                <ParagraphFont>Distance</ParagraphFont>
                <button onClick={() => setDistanceDropDownOpen(!distanceDropDownOpen)}>
                  <span>{distanceDropDown}</span>
                  <Image src={ICONS.dropdownIconGray} width={10} height={8} layout="fixed" />
                </button>
                {distanceDropDownOpen && 
                <div className="distance-dropdown-menu">
                  <div 
                    className="item"
                    onClick={() => {
                      setDistanceDropDownOpen(false)
                      setDistanceDropDown("2 miles")
                    }}
                  ><div>2 miles</div></div>
                  <div 
                    className="item"
                    onClick={() => {
                      setDistanceDropDownOpen(false)
                      setDistanceDropDown("4 miles")
                    }}
                  ><div>4 miles</div></div>
                  <div 
                    className="item"
                    onClick={() => {
                      setDistanceDropDownOpen(false)
                      setDistanceDropDown("8 miles")
                    }}
                  ><div>8 miles</div></div>
                </div>
                }
              </div>
            </PatientLocationWrapper>
            <div className="my-options">
              <OptionWrapper>
                <input type="radio" id="now" name="selDate" />
                <label htmlFor="now">Specialty</label>
              </OptionWrapper>
              <OptionWrapper>
                <input type="radio" id="later" name="selDate" checked onChange={() => {}}/>
                <label htmlFor="later">Search these providers</label>
              </OptionWrapper>
            </div>
            <MedicineWrapper>
              <div className="input">
                <input 
                  type={'text'} 
                  placeholder={'Internal medicine'}
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                />
                <div className="icon">
                  <Image src={ICONS.magnifyingGlass} width={12} height={11} layout="fixed" />
                </div>
              </div>
              <Image src={ICONS.squareAdd} width={24} height={24} alt="xxx" />
            </MedicineWrapper>
            <AddedProvidersWrapper>
              <div className="title">Added providers</div>
              <div className="added-providers">
                <div>Arlene McCoy, Facility name, Location</div>
                <div>Arlene McCoy, Facility name, Location</div>
                <div>Arlene McCoy, Facility name, Location</div>
              </div>
            </AddedProvidersWrapper>
            <DateTimeContainer>
              <DateTimeBlock>
                <FormGroup>
                  <span className="date-title">Date from</span>
                  <DatePicker
                    id="startDate"
                    wrapperClassName="my-date-picker" 
                    dateFormat={'MM/dd'}
                    minDate={new Date()}
                    showTimeInput
                    timeInputLabel="Start Time"
                    timeFormat="HH:mm"
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)} 
                  />
                  <label htmlFor="startDate">
                    <Image src={ICONS.calendar} width={19} height={19} layout="fixed" />
                  </label>
                </FormGroup>
              </DateTimeBlock>
              <DateTimeBlock>
                <FormGroup>
                  <span className="date-title">Date to</span>
                  <DatePicker
                    id="endDate"
                    wrapperClassName="my-date-picker" 
                    dateFormat={'MM/dd'}
                    minDate={startDate}
                    showTimeInput
                    timeInputLabel="Start Time"
                    selected={endDate} 
                    onChange={(date) => setEndDate(date)} 
                  />
                  <label htmlFor="endDate">
                    <Image src={ICONS.calendar} width={19} height={19} layout="fixed" />
                  </label>
                </FormGroup>
              </DateTimeBlock>
            </DateTimeContainer>
            
            <NetworkWrapper>
              <div className="item">
                <h6>In-network only</h6>
                <div className="boxgroup">
                  <CheckboxWrapper>
                    <input id="hmo" type="checkbox"/>
                    <label htmlFor="hmo">HMO</label>
                  </CheckboxWrapper>
                  <CheckboxWrapper isPPO>
                    <input id="ppo" type="checkbox"/>
                    <label htmlFor="ppo">PPO</label>
                  </CheckboxWrapper>
                </div>
              </div>
              <div className="item">
                <h6 className="spec-item">Accepting new patients</h6>
                <CheckboxWrapper acceptNew>
                  <input id="acceptnew" type="checkbox"/>
                </CheckboxWrapper>
              </div>
              <div className="item">
                <h6 className="spec-item">POEM network only</h6>
                <CheckboxWrapper>
                  <input id="poem" type="checkbox"/>
                </CheckboxWrapper>
              </div>
            </NetworkWrapper>
            <RatingWrapper>
              <h6>Rating</h6>
              <RatingContainer>
                <UnitRating>
                  <label>Cleanliess</label>
                  <div className="stars-wrapper">
                    <Rating 
                      className="my-stars"
                      initialRating={3} 
                      emptySymbol={<Image width={19} height={19} src={ICONS.starEmpty} className="icon" />}
                      fullSymbol={<Image  width={19} height={19} src={ICONS.starFilled} className="icon" />}
                    />
                  </div>
                </UnitRating>
                <UnitRating>
                  <label>Service quality</label>
                  <div className="stars-wrapper">
                    <Rating 
                      className="my-stars"
                      initialRating={3} 
                      emptySymbol={<Image width={19} height={19} src={ICONS.starEmpty} className="icon" />}
                      fullSymbol={<Image width={19} height={19} src={ICONS.starFilled} className="icon" />}
                    />
                  </div>
                </UnitRating>
                <UnitRating>
                  <label>Customer care</label>
                  <div className="stars-wrapper">
                    <Rating 
                      className="my-stars"
                      initialRating={4} 
                      emptySymbol={<Image width={19} height={19} src={ICONS.starEmpty} className="icon" />}
                      fullSymbol={<Image width={19} height={19} src={ICONS.starFilled} className="icon" />}
                    />
                  </div>
                </UnitRating>
                <UnitRating>
                  <label>Ambiance</label>
                  <div className="stars-wrapper">
                    <Rating 
                      className="my-stars"
                      initialRating={3} 
                      emptySymbol={<Image width={19} height={19} src={ICONS.starEmpty} className="icon" />}
                      fullSymbol={<Image width={19} height={19} src={ICONS.starFilled} className="icon" />}
                    />
                  </div>
                </UnitRating>
                <UnitRating>
                  <label>Service provider</label>
                  <div className="stars-wrapper">
                    <Rating 
                      className="my-stars"
                      initialRating={4} 
                      emptySymbol={<Image width={19} height={19} src={ICONS.starEmpty} className="icon" />}
                      fullSymbol={<Image width={19} height={19} src={ICONS.starFilled} className="icon" />}
                    />
                  </div>
                </UnitRating>
              </RatingContainer>
            </RatingWrapper>
            <KeywordsWrapper>
              <label>Keywords</label>
              <textarea defaultValue={'Dentist, nails, hair'} />
            </KeywordsWrapper>
            <ButtonWrapper>
              <button onClick={handleFetch}>Search</button>
            </ButtonWrapper>
          </FilterWrapper>
          <ContentWrapper>
            <ContentTabWrapper>
              <button 
                className={ selectedTab===0 ? 'active': null}
                onClick={() => setSelectedTab(0)}
              >Calendar</button>
              <button 
                className={ selectedTab===1 ? 'active': null}
                onClick={() => setSelectedTab(1)}
              >List</button>
              <button 
                className={ selectedTab===2 ? 'active': null}
                onClick={() => setSelectedTab(2)}
              >Map</button>
            </ContentTabWrapper>
            <ContentContainer>
              {selectedTab === 0 && <>
                {loading && <DesktopCalendarContent isLoading={loading} />}
                {!loading && apts.length > 0 && 
                  <DesktopCalendarContent events={ 
                    apts.length > 0 && apts.map(apt => {
                      const providerId = apt.providerUserId;
                      const provider = providers.find(pvd => pvd.id === providerId)
                      const start = new Date(apt.aptDate + " " + apt.aptTime)
                      return {
                        start,
                        end: new Date(moment(start).add(25, 'minutes')),
                        provider: {
                          ...provider, 
                          isPCP: provider?.id > 22 ? true : false, 
                          isPOEM: apt.id > 30 ? true : false
                        },
                        rating: 4
                      }
                    })} 
                  />}
                  {!loading && apts.length === 0 && 
                  <DesktopCalendarContent events={[]}
                  />}
                </>}
              {selectedTab === 1 &&  
              <ListContentWrapper>
                {loading && [...Array(providers?.length || 8).keys()].map((i) => 
                  <ProviderCard 
                    key={i} 
                    isLoading={loading} />)}
                {providers && providers.length > 0 && providers.map(pvd => (
                  <ProviderCard 
                    key={pvd?.id} 
                    provider={pvd} 
                    handleProviderDetail={handleProviderDetail}/>
                ))}
              </ListContentWrapper>}
              {selectedTab === 2 && <>
                {loading && 
                  <MapContent 
                    providers={providers.filter(pvd => pvd?.geography?.lat && pvd?.geography?.lng)} 
                    setSlidePerView={2.7}
                    handleProviderDetail={handleProviderDetail} 
                    isLoading={loading} />}
                {providers.length > 0 && 
                  <MapContent 
                    providers={providers.filter(pvd => pvd?.geography?.lat && pvd?.geography?.lng)} 
                    setSlidePerView={2.7}
                    handleProviderDetail={handleProviderDetail} />}
              </>}
              {providers && providers.length > 0 && false &&
                <div className="filter-option">
                  <Image src={ICONS.settingIcon} width={18} height={20} layout="fixed" />
                </div>}
            </ContentContainer>
          </ContentWrapper>
          <ProfileWrapper>
            <CopyLinkWrapper>
              <div>
                <span>{'Darlene Robertson'}, MD BC {'Neurosurgeon'}</span>
                <Image src={ICONS.copyLink} width={24} height={24} alt={'copy-link'} />
              </div>
              <div>
                <span>{'Facility name'}</span>
                <Image src={ICONS.copyLink} width={24} height={24} alt={'copy-link'} />
              </div>
            </CopyLinkWrapper>
            <ProfileContent>
              {provider && 
                <ProviderProfile providerDetail={provider} />}
            </ProfileContent>
          </ProfileWrapper>
        </MainContainer>
      </MainPageWrapper>
    </>
  )
}

export default ProviderSearchDesktop 