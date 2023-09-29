import Link from 'next/link'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PropTypes from 'prop-types'
import { ICONS, IMGS } from '../../../../common/utils/styleGuide'
import Mark from '../Mark'
import {
  CardContent, 
  CardLeft, 
  CardRight, 
  CardTitle, 
  ImageWrapper, 
  ItemTitle, 
  ItemContent,
  RightItem, 
  TimeList, 
  CardBottom,
  IconGroup,
  Retactangle,
  HeartFavorit,
  ProviderCardWrapper,
  StarGroup,
  RightTitle,
} from './styled'
import useWindowDimensions from "../../../../common/hooks/useWindowDimensions"

ProviderCard.propTypes = {
  provider: PropTypes.object,
  isCompare: PropTypes.bool,
  checkedItems: PropTypes.array,
  handleCheck: PropTypes.func,
  maxWidth: PropTypes.number,
  handleProviderDetail: PropTypes.func,
  isLoading: PropTypes.bool
}


function ProviderCard (props) {
  const { 
    provider, 
    isCompare, 
    checkedItems,
    handleCheck, 
    maxWidth, // when mobile, max 326px, 
    handleProviderDetail, 
    isLoading 
  } = props
  const device = useWindowDimensions().device
  if(isLoading) return <SkeletonComponent />
  return (
    <ProviderCardWrapper maxWidth={maxWidth}>
      <CardTitle>
        <h5>{provider?.fullName}</h5>
        <RightTitle className="rightTitle">
          <StarGroup>
            <Mark mark={3} />
          </StarGroup>
          <div>{provider?.specialty}</div>
        </RightTitle>
      </CardTitle>
      <CardContent>
        <HeartFavorit>
          {isCompare ? 
            <input
              type={'checkbox'} 
              disabled={checkedItems.length > 9 
                && !checkedItems.find(pvdId => pvdId===provider.id)}
              onClick={(e) => handleCheck(e, provider.id)}
            />
            :
            <Image src={ICONS.heartFavorit} width={15} height={12}/>
          }
        </HeartFavorit>
        <CardLeft>
          <ImageWrapper isPPO>
            <Image src={IMGS.cardImage1} alt="provider image" width={92} height={86}/>
            <div>HMO</div>
          </ImageWrapper>
          <TimeList>
            <div>1/4 10:30 AM</div>
            <div>1/4 10:30 AM</div>
            <div>1/4 10:30 AM</div>
            <div>...</div>
          </TimeList>
        </CardLeft>
        <CardRight>
          <RightItem>
            <ItemTitle notItalic={device === "DESKTOP" ? true : false}>Facility name</ItemTitle>
            <ItemContent pixel12>
              <div className='facility-name'>{provider?.facilityName}</div>
              <div className='mi'>{`4.3 mi`}</div>
            </ItemContent>
          </RightItem>
          <RightItem>
            <ItemTitle underline notItalic={device === "DESKTOP" ? true : false}>Special interests</ItemTitle>
            <ItemContent>Lorem ipsum, dolor sit amet, conits...</ItemContent>
          </RightItem>
          <RightItem>
            <ItemTitle underline notItalic={device === "DESKTOP" ? true : false}>Affiliates</ItemTitle>
            <ItemContent>Lorem ipsum, dolor sit amet,conits...</ItemContent>
          </RightItem>
          <RightItem>
            <ItemTitle underline notItalic={device === "DESKTOP" ? true : false}>Position</ItemTitle>
            <ItemContent>Lorem ipsum, dolor sit amet,conits...</ItemContent>
          </RightItem>
        </CardRight>
      </CardContent>
      <CardBottom>
        <IconGroup>
          <Retactangle>
            <Image src={ICONS.camera} width={15} height={9} />
          </Retactangle>
          <Retactangle>
            <Image src={ICONS.linePhone} width={13} height={13} />
          </Retactangle>
          <Retactangle>
            <Image src={ICONS.mobilePhone} width={12} height={13} />
          </Retactangle>
          <button>Make appointment</button>
        </IconGroup>
        {device === "MOBILE" && <Link 
          className="moreInfo" 
          href={`/patients/provider-profiles/${provider.id}`}
        >
          <a>More info</a>
        </Link>}
        {device === "DESKTOP" && <button 
          className='moreInfo'
          onClick={() => handleProviderDetail(provider.id)}>More Info</button>}
      </CardBottom>
    </ProviderCardWrapper>
  ) 
}



export default ProviderCard

function SkeletonComponent () {
  return (
    <ProviderCardWrapper>
      <CardTitle>
        <Skeleton width={160} height={14}/>
        <RightTitle className="rightTitle">
          <StarGroup>
            <Skeleton width={70} height={14} />
          </StarGroup>
          <div><Skeleton width={50} height={14} /></div>
        </RightTitle>
      </CardTitle>
      <CardContent>
        <HeartFavorit>
          <Skeleton width={15} height={15} />
        </HeartFavorit>
        <CardLeft>
          <ImageWrapper isPPO>
            <Skeleton width={76} height={71} />
          </ImageWrapper>
          <TimeList>
            <Skeleton width={63} height={10} />
            <Skeleton width={63} height={10} />
            <Skeleton width={63} height={10} />
          </TimeList>
        </CardLeft>
        <CardRight>
          <RightItem>
            <ItemTitle><Skeleton width={72} height={12} /></ItemTitle>
            <ItemContent><Skeleton width={163} height={14} /></ItemContent>
          </RightItem>
          <RightItem>
          <ItemTitle><Skeleton width={89} height={14} /></ItemTitle>
            <ItemContent><Skeleton width={198} height={14} /></ItemContent>
          </RightItem>
          <RightItem>
            <ItemTitle><Skeleton width={48} height={14} /></ItemTitle>
            <ItemContent><Skeleton width={198} height={14} /></ItemContent>
          </RightItem>
          <RightItem>
            <ItemTitle><Skeleton width={43} height={14} /></ItemTitle>
            <ItemContent><Skeleton width={198} height={14} /></ItemContent>
          </RightItem>
        </CardRight>
      </CardContent>
      <CardBottom>
        <IconGroup>
          <Skeleton width={20} height={15}/>
          <Skeleton width={20} height={15} />
          <Skeleton width={20} height={15}/>
        </IconGroup>
        <Skeleton width={105} height={15} />
      </CardBottom>
    </ProviderCardWrapper>
  )
}
