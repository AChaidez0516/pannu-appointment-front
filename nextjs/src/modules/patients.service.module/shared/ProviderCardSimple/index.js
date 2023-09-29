import Image from 'next/image'
import { ICONS, IMGS } from '../../../../common/utils/styleGuide'
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
import Mark from '../Mark'


function ProviderCardSimple ({ provider }) {
  return (
    <ProviderCardWrapper>
      <CardTitle>
        <h5>{provider?.fullName}</h5>
      </CardTitle>
      <CardContent>
        <HeartFavorit>
          <Image src={ICONS.heartFavorit} width={15} height={14}/>
        </HeartFavorit>
        <CardLeft>
          <ImageWrapper isPPO>
            <Image src={IMGS.cardImage1} alt="provider image" width={63} height={55} layout="fixed" />
            <div>HMO</div>
          </ImageWrapper>
          <TimeList>
            <div>1/4 10:30 AM</div>
            <div>1/4 10:30 AM</div>
            <div>1/4 10:30 AM</div>
          </TimeList>
        </CardLeft>
        <CardRight>
          <RightTitle className="rightTitle">
            <div>{provider?.specialty}</div>
            <StarGroup>
              <Mark mark={3} />
            </StarGroup>
          </RightTitle>
          <RightItem>
            <ItemTitle>Facility name</ItemTitle>
            <ItemContent>{provider?.facilityName}</ItemContent>
          </RightItem>
        </CardRight>
      </CardContent>
      <CardBottom>
        <IconGroup>
          <Retactangle>
            <Image src={ICONS.linePhone} width={13} height={13} />
          </Retactangle>
          <Retactangle>
            <Image src={ICONS.mobilePhone} width={12} height={13} />
          </Retactangle>
        </IconGroup>
      </CardBottom>
    </ProviderCardWrapper>
  ) 
}

export default ProviderCardSimple