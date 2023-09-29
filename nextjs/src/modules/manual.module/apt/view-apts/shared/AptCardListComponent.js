import PropTypes from 'prop-types'
import styled from 'styled-components'
// import SimpleBar from 'simplebar-react'
// import 'simplebar/dist/simplebar.min.css';
import useWindowDimensions, { DEVICE_TYPE } from '../../../../../common/hooks/useWindowDimensions';


export default function AptCardListComponent(props) {
  const {
    children,
    cardListHeightOnDesktop,
  } = props
  const { device } = useWindowDimensions()

  if (device === DEVICE_TYPE.DESKTOP) {
    return (
      // <SimpleBar style={{ maxHeight: cardListHeightOnDesktop }}>
        <AptCardsListWrapper>
          {children}
        </AptCardsListWrapper>
      // </SimpleBar>
    )
  }
  return (
    <AptCardsListWrapper>
      {children}
    </AptCardsListWrapper>
  )
}

AptCardListComponent.propTypes = {
  cardListHeightOnDesktop: PropTypes.number
}

export const AptCardsListWrapper = styled.div`
  padding: 0 19px;
  display: flex;
  flex-direction: column;
  row-gap: 14px;
`