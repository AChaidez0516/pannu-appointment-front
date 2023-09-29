import dynamic from 'next/dynamic'
import { useEffect, useState } from "react";
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import PropTypes from 'prop-types'
import DesktopHeader from "../shared/DesktopHeader";
import { MainContentWrapper } from './desktopv2.styled';
import useWindowDimensions, { DEVICE_TYPE } from "../../../common/hooks/useWindowDimensions";
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
ProviderSearchDesktopV2.propTypes = {
  user: PropTypes.object,
}


function ProviderSearchDesktopV2 ({user}) {

    const HEADER_HEIGHT = 83;
    const MAIN_BODY_PADDING_Y = 18;
    const { height, device } = useWindowDimensions()

    const sectionHeight = height
      - HEADER_HEIGHT
      - 2 * MAIN_BODY_PADDING_Y

    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(false)

    const mobileHeaderProps = {
    headerTitle: 'Provider search',
    isLoggedIn: true,
    isFilter: false,
    countOfNotifications: 14,
    }

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
        <>
        <DesktopHeader 
            title={`Provider search`}
            marginBottom={0}
        />
        <MainContentWrapper
            sectionHeight={sectionHeight}
        >
        <div className="inner-content-wrapper">
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
        </div>


      </MainContentWrapper>
        </>
    )
}

function Advertise () {
    return <AdsContent>
      <OurMembers>
        <AdsTitle>Our members</AdsTitle>
        <Image src={IMGS.ads1} width={279} height={135} layout="fixed" />
        <SlideImgWrapper>
          <Image src={IMGS.adsSlide1} width={74} height={74} layout="fixed"  style={{cursor:'pointer'}}/>
          <Image src={IMGS.adsSlide2} width={74} height={74} layout="fixed"  style={{cursor:'pointer'}}/>
          <Image src={IMGS.adsSlide3} width={74} height={74} layout="fixed"  style={{cursor:'pointer'}}/>
          <Image src={IMGS.adsSlide4} width={74} height={74} layout="fixed"  style={{cursor:'pointer'}}/>
        </SlideImgWrapper>
      </OurMembers>
      <SpecialOffers>
        <AdsTitle>Special offers</AdsTitle>
        <Image src={IMGS.adsSlide3} width={164} height={121} layout="fixed" style={{cursor:'pointer'}}/>
        <div>$249.00</div>
      </SpecialOffers>
      <UserComments>
        <AdsTitle>User comments</AdsTitle>
        <Image src={IMGS.adsSlide1} width={164} height={121} layout="fixed" style={{cursor:'pointer'}} />
      </UserComments>
    </AdsContent>
}


export default ProviderSearchDesktopV2 