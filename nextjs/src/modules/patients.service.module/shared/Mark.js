import React from "react"
import styled from "styled-components"
import Image from 'next/image'
import PropTypes from 'prop-types'
import { ICONS } from "../../../common/utils/styleGuide"


const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 12px;
    height: 12px;
  }
`

const Mark = ({ mark }) => {
  return (
    <StarWrapper>
      {[...Array(5).keys()].map(i => (
        <React.Fragment key={i}>
          {i < mark ? <Image src={ICONS.starFilled} alt='filled' width={16} height={16} /> : <Image src={ICONS.starEmpty} alt='star' width={16} height={16} />}
        </React.Fragment>
      ))}
    </StarWrapper>
  )
}

Mark.propTypes = {
  mark: PropTypes.number.isRequired
}

export default Mark