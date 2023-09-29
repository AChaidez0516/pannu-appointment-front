import { useState } from 'react'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import GoogleMapReact from 'google-map-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import PropTypes from 'prop-types'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import { GoogleMapArea, NameInPolygon, ProviderCardWrapper, SlideWrpper } from './styled'
import Marker from './Marker'
import {
  Point,
  getProvidersInPolygon,
} from './utils'
import ProviderCard from '../../shared/ProviderCard'


function MapContent(props) {
  const {
    providers, 
    setSlidePerView, 
    handleProviderDetail, 
    isLoading
  } = props

  const [swiper, setSwiper] = useState(null)
  const [showProviders, setShowProviders] = useState([])
  const [showSlide, setShowSlide] = useState(false)
  const [slidesPerView] = useState(setSlidePerView ? setSlidePerView : 1.1)
  
  const positions = providers
    .map(pvd => ([pvd.geography.lat, pvd.geography.lng]))
  
  const getMapBounds = (map, maps, positions) => {
    const bounds = new maps.LatLngBounds();
    positions.forEach((position) => {
      const [lat, lng] = position
      bounds.extend(new maps.LatLng(lat, lng));
    });
    return bounds;
  }

  const handleApiLoaded = (map, maps, positions) => {
    const bounds = getMapBounds(map, maps, positions);
    map.fitBounds(bounds);
    const drawingManager = new maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: [maps.drawing.OverlayType.POLYGON]
      },
      polygonOptions: {
        editable: false,
        fillColor: '#2F80ED',
        fillOpacity: '0.12',
        strokeColor: '#2F80ED',
        strokeWeight: 2,
        geodesic: true,
      }
    })
    drawingManager.setMap(map)

    maps.event.addListener(drawingManager, "overlaycomplete", async (event) => {
      const polygon1 = []
      const vertices = event.overlay.getPath();
      for (let i = 0; i < vertices.getLength(); i++) {
          const xy = vertices.getAt(i);
          polygon1.push(new Point(xy.lat(), xy.lng()));
          // console.log("Coordinate " + i + "," + xy.lat() + "," + xy.lng() + "");
      }
      const showProviders = getProvidersInPolygon(providers, polygon1)
      setShowProviders(showProviders)
      drawingManager.setDrawingMode(null)
      setShowSlide(true)
    })
  }

  const _onChildClick = (key, childProps) => {
    if(swiper) {
      swiper.slideTo(key);
    }
  }

  if(isLoading) return <SkeletonComponent />

  return (
    <GoogleMapArea>
      {showProviders.length > 0 && 
      <SlideWrpper>
        <Swiper
          spaceBetween={9}
          slidesPerView={slidesPerView}
          onSlideChange={() => {}}
          onSwiper={(swiper) => setSwiper(swiper)}
          centeredSlides={true}
        >
          {showProviders.map(provider => (
            <SwiperSlide key={provider.id}>
              <ProviderCardWrapper>
                <ProviderCard 
                  maxWidth={326}
                  provider={provider} 
                  handleProviderDetail={handleProviderDetail}/>
              </ProviderCardWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </SlideWrpper>
      }
      {(providers.length > 0 || showProviders.length > 0) && (
        <GoogleMapReact
          bootstrapURLKeys={{ 
            libraries: ['drawing', 'places'],
            key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
          }}
          options={{ minZoom: 3, maxZoom: 14 }}
          defaultCenter={{
            lat: 36.129355,
            lng: -115.230626  
          }}
          defaultZoom={1}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, positions)}
          onChildClick={_onChildClick}
        >
          {showSlide ? 
            showProviders.map((provider, i) => (
              <NameInPolygon 
                key={i} 
                lat={provider.geography.lat}
                lng={provider.geography.lng}
              >
                <span>{provider.fullName}</span>
              </NameInPolygon>
            ))
            :
            providers.map((provider, i) => (
            <Marker 
              key={i}
              lat={provider.geography.lat}
              lng={provider.geography.lng}
              provider={provider}
              handleProviderDetail={handleProviderDetail}
            />
          ))}
        </GoogleMapReact>
      )}
    </GoogleMapArea>
  )
}

MapContent.propTypes = {
  swiper: PropTypes.object,
  showProviders: PropTypes.object,
  showSlide: PropTypes.bool,
  slidesPerView: PropTypes.number,
}


function SkeletonComponent () {
  return (
    <GoogleMapArea>
      <Skeleton width={932} height={806} />
    </GoogleMapArea>
  )
}

export default MapContent