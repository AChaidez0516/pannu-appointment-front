import styled from "styled-components"
import Image from "next/image"

import { IMGS } from "../../../../../common/utils/styleGuide"
import HMOComponent from "./HMOComponent"
import { useEffect } from "react"


export default function ProviderInfoComponent({ provider }) {

  useEffect(() => {
      console.log(provider)
  })
  return (
    <ProviderInfoWrapper>
      <div className="img-wrapper">
        <div>
          <Image
            src={IMGS.avatarDoctor1}
            width={42} height={42}
            layout={'fixed'}
            alt='provider user avatar'
          />
        </div>
        <div className="hmo">
          <HMOComponent>PPO</HMOComponent>
        </div>
      </div>
      <div className="right">
        <div className="header-title">
          <div className="name">{provider?.fullName}</div>
          <div className="specialty">{provider?.specialty}</div>
        </div>
        <div className="body">
          <div className="address">{provider?.facilityName}</div>
          <div className="poem">
            <HMOComponent>POEM</HMOComponent>
          </div>
        </div>
      </div>
    </ProviderInfoWrapper>
  )
}

export const ProviderInfoWrapper = styled.div`
  padding: 0 3px;
  display: flex;
  column-gap: 8px;
  .img-wrapper {
    position: relative;
    img{
      border-radius: 5px;
    }
    .hmo {
      position: absolute;
      top: -8px;
      left: 0px;
      background: white;
    }
  }
  .right {
    flex: 1;
    .header-title {
      display: flex;
      justify-content: space-between;
      .name {
        font-weight: 600;
        font-size: 12px;
        line-height: 14px;
        margin-bottom: 4px;
      }
      .specialty {
        font-weight: 600;
        font-size: 12px;
        line-height: 14px;
        /* max-width: 84px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden; */
      }
    }
    .body {
      display: flex;
      justify-content: space-between;
      .address {
        font-weight: 500;
        font-size: 11px;
        line-height: 12px;
        letter-spacing: 0.357px;
        max-width: 216px;
      }
    }
  }
  margin-bottom: 15px;
`
