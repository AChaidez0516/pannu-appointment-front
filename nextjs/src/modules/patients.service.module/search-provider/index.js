import { useState } from "react"
import Link from 'next/link'
import Image from "next/image"
import MobileHeader from "../shared/MobileHeader/"
import SearchBox from "../shared/SearchBox"
import ProviderCard from "../shared/ProviderCard"
import { IMGS, ICONS } from '../../../common/utils/styleGuide'
import { 
  AddressWrapper, 
  AdsContent, 
  AdsTitle, 
  OurMembers, 
  ProviderSearchWrapper, 
  ResultsWrapper, 
  SlideImgWrapper, 
  SpecialOffers, 
  UserComments,
  } from "./styled"
import { searchProvidersFromPatient } from '../../../common/lib/provider'


function ProviderSearch () {

  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const mobileHeaderProps = {
    headerTitle: 'Provider search',
    isLoggedIn: true,
    isFilter: false,
    countOfNotifications: 14,
    backUrl:localStorage.getItem('parentUrl')?localStorage.getItem('parentUrl'):'/auth/login'
  }

  console.log(mobileHeaderProps)
  const handleSearch = async (selected, typed) => {
    setLoading(true)
    try {
      const results = await searchProvidersFromPatient(selected, typed)
      setResults(results)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <ProviderSearchWrapper>    
        <MobileHeader {...mobileHeaderProps} />
        <SearchBox handleSearchFrom={handleSearch} />
        <AddressWrapper>
          <div className="location">
            <div><Image src={ICONS.mapMarker} width={9} height={14} layout="fixed" /></div>
            <div className="address">Las Vegas, NV</div>
          </div>
          <div className="links">
            <Link href={'/patients/find-appointment'}><a>Find an Appointment</a></Link>
            <Link href={'/patients/choose-provider'}><a>Choose Provider</a></Link>
          </div>
        </AddressWrapper>
        {loading ? <ResultsWrapper>
          {[...Array(4).keys()].map((i) => <ProviderCard key={i} isLoading={loading} />)}
        </ResultsWrapper>
        :
        results && results.length > 0 ?
          <ResultsWrapper>
            {results.map((provider, i) => 
            <ProviderCard 
              key={i} 
              provider={provider} />)}
          </ResultsWrapper>
          : 
          <Advertise />
        }
    </ProviderSearchWrapper>
  )
}

function Advertise () {
  return <AdsContent>
    <OurMembers>
      <AdsTitle>Our members</AdsTitle>
      <Image src={IMGS.ads1} width={279} height={135} layout="fixed" />
      <SlideImgWrapper>
        <Image src={IMGS.adsSlide1} width={74} height={74} layout="fixed" />
        <Image src={IMGS.adsSlide2} width={74} height={74} layout="fixed" />
        <Image src={IMGS.adsSlide3} width={74} height={74} layout="fixed" />
        <Image src={IMGS.adsSlide4} width={74} height={74} layout="fixed" />
      </SlideImgWrapper>
    </OurMembers>
    <SpecialOffers>
      <AdsTitle>Special offers</AdsTitle>
      <Image src={IMGS.adsSlide3} width={164} height={121} layout="fixed" />
      <div>$249.00</div>
    </SpecialOffers>
    <UserComments>
      <AdsTitle>User comments</AdsTitle>
      <Image src={IMGS.adsSlide1} width={164} height={121} layout="fixed" />
    </UserComments>
  </AdsContent>
}

export default ProviderSearch