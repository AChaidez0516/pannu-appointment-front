import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Link from 'next/link';
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import PropTypes from 'prop-types'
import { 
  IconGroupWrapper, 
  HeaderWrapper, 
  ProfileBackImage, 
  ProfileWrapper, 
  StarGroup, 
  CallMeWrapper,
  SliderWrapper,
  ContactInfoWrapper,
  SpecialInterestsWrapper,
  PositionWrapper,
  LocationWrapper,
  GoogleMapArea,
  AffiliationWrapper,
  ResearchWrapper,
  RecommendedWrapper,
  PaddingWrapper} from './styled'
import Mark from '../shared/Mark'
import { ICONS, IMGS } from '../../../common/utils/styleGuide'
import useWindowDimensions from '../../../common/hooks/useWindowDimensions'
import { useEffect } from 'react';

const center = {
  lat: 36.129355,
  lng: -115.230626
}
const zoom = 11

ProviderProfile.propTypes = {
  providerDetail: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullName: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    facilityName: PropTypes.string.isRequired,
    profile: PropTypes.object
  })
}

function ProviderProfile ({providerDetail}) {
  const device = useWindowDimensions().device
  const [favorite, setFavorite] = useState(false)

  const SimpleMarker = ({ text }) => <div>
    <Image src={ICONS.mapMarker} width={19} height={31} />
  </div>;

  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  };

  useEffect(() => {
    console.log(providerDetail)
  },[providerDetail])
  return (
    <ProfileWrapper device={device}>
      <PaddingWrapper>
        <HeaderWrapper device={device}>
          {device === "MOBILE" && 
          <Link href={'/patients/provider-search/'}>
            <a>
              <Image 
                src={ICONS.backArrow} 
                height={12.75} width={10}/>
            </a>
          </Link>
          }
          <div>{providerDetail?.fullName}</div>
          {device === "MOBILE" && 
          <Image 
            src={favorite ? ICONS.heartFilled : ICONS.heartFavorit} 
            width={19} height={15} layout="fixed"
            onClick={() => {setFavorite(!favorite)}}/>
          }
        </HeaderWrapper>
        <ProfileBackImage>
          <Image src={IMGS.profileBack} width={360} height={147} layout={'responsive'} />
        </ProfileBackImage>
        <IconGroupWrapper>
          <div style={{width: 56, height: 45}}>
          <Image src={ICONS.webfy} width={56} height={45}/>
          </div>
          <Image src={IMGS.avatarMan} width={96} height={96} />
          <StarGroup isPPO>
            <Mark mark={5}/>
            <Image src={IMGS.poemImg} width={48} height={27}/>
            <div className='isPPO'>{'PPO'}</div>
          </StarGroup>
        </IconGroupWrapper>
        <CallMeWrapper>
          <h5>Call Me {providerDetail?.profile?.callMeDoctorName}</h5>
          <div className='bio' style={{padding:'5px'}}>
            {/* <div className='i-am'>I'm</div> */}

            {/* <ol>
              <li>Lorem ipsum, dolor sit amet, conig its, </li>
              <li>Lorem ipsum, dolor sit amet, conig its, </li>
              <li>Lorem ipsum, dolor sit amet, conig its, </li>
            </ol> */}
            {providerDetail.profile.bio}
          </div>
        </CallMeWrapper>
      </PaddingWrapper>
        <SliderWrapper>
          <Image src={ICONS.dashedLine} width={375} height={2} layout={'responsive'} />
          <div className='dashed-line'></div>
          <Swiper
            spaceBetween={50}
            slidesPerView={2.5}
            onSlideChange={() => {}}
            onSwiper={(swiper) => {}}
          >
            <SwiperSlide>
              <Image src={IMGS.slide1} width={152} height={141} layout="fixed"/>
            </SwiperSlide>
            <SwiperSlide>
              <Image src={IMGS.slide2} width={152} height={141} layout="fixed"/>
            </SwiperSlide>
            <SwiperSlide>
              <Image src={IMGS.slide3} width={152} height={141} layout="fixed"/>
            </SwiperSlide>
            <SwiperSlide>
              <Image src={IMGS.slide4} width={152} height={141} layout="fixed" />
            </SwiperSlide>
            <SwiperSlide>
              <Image src={IMGS.slide5} width={152} height={141} layout="fixed" />
            </SwiperSlide>
          </Swiper>
        </SliderWrapper>
        <PaddingWrapper>
        <ContactInfoWrapper>
          <h5>Contact information</h5>
          <div>
            <span>{providerDetail?.contacts[0]?.email}</span>
            <span>{providerDetail?.contacts[0]?.website || 'www.website.com'}</span>
          </div>
        </ContactInfoWrapper>
        <SpecialInterestsWrapper>
          <h5>Special interests</h5>
          {providerDetail?.specialInterests && providerDetail?.specialInterests > 0 ? 
            providerDetail?.specialInterests?.map((si, i) => (
              <span key={i}>{si?.name || 'Lorem ipsum, dolor sit amet, conig its,'}</span>
            )):
            <span>Lorem ipsum, dolor sit amet, conig its,</span>
          }
        </SpecialInterestsWrapper>
        <PositionWrapper>
          <div>
            <h5>Position</h5>
            <span>Lorem ipsum </span>
          </div>
          <div>
            <h5>Department</h5>
            <span>Lorem ipsum </span>
          </div>
          <div>
            <h5>Organization</h5>
            <span>Lorem ipsum </span>
          </div>
        </PositionWrapper>
        <LocationWrapper>
          <h5>Locations</h5>
          <ol type = "A">
          {/* please check getProviderDetail Api response data */}
          {providerDetail?.profile?.locations?.map((location, i) => (
            <li key={i}>
              <div className='locationHeader'>
                <h6>{'Practice name'}</h6>
                <div>{'(555) 555-1234'}</div>
              </div>
              <div className='locationAddress'>No., Street, Ste. no. City, ST XXXXX</div>
              <div className='workHours'>
                <h6>Working Hrs</h6>
                <div>Mon - Sat  07:00 to 17:00</div>
                <div>Sunday  08:00 to 11:00</div>
              </div>
              <div className='bottom'>
                <Link href={'#'}><a>Departments</a></Link>
                <Link href={'#'}><a className='newPatient'>New patients</a></Link>
                <Link href={'#'}><a>Make appointment</a></Link>
              </div>
            </li>
          ))
          }
          </ol>
          
        </LocationWrapper>
        {device === "MOBILE" &&
          <GoogleMapArea>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}}
              defaultCenter={center}
              defaultZoom={zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >
              <SimpleMarker {...center}/>
            </GoogleMapReact>
          </GoogleMapArea>
        }
        <AffiliationWrapper>
          <h5>Hospital affiliations</h5>
          <div>
            <span>Mayo Clinic - Rochester Rochester, MN</span>
            <Image src={ICONS.markerBlue} width={16} height={24}/>
          </div>
        </AffiliationWrapper>
        <ResearchWrapper>
          <h5>Research papers</h5>
          <div>Research paper 1</div>
        </ResearchWrapper>
        <RecommendedWrapper>
          <h5>Recommended by</h5>
          <div>Dr. Theresa Murphy </div>
        </RecommendedWrapper>
      </PaddingWrapper>
    </ProfileWrapper>
  )
}

export default ProviderProfile