import React, { useState } from "react";
import styled from "styled-components";
import { useLayer, Arrow } from "react-laag";
import ProviderCard from "../../shared/ProviderCard";


const StyledMarker = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 20px;
  height: 20px;
  background-color: #001AFF;
  border-radius: 50%;
  cursor: pointer;
  transform: translate(-50%, -50%);
  &:hover {
    z-index: 1;
  }
`;
const InfoBox = styled.div`
  position: relative;
  width: 326px;
`;

export default function Marker({ provider, handleProviderDetail }) {
  const [isOpen, setOpen] = useState(false);
  const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
    isOpen,
    triggerOffset: 10,
    auto: true,
    overflowContainer: false,
    onOutsideClick: () => setOpen(false)
  });
  return (
    <>
      <StyledMarker
        {...triggerProps}
        onClick={() => setOpen((prev) => !prev)}
      />
      {isOpen &&
        renderLayer(
          <InfoBox style={{position: 'relative'}} {...layerProps}>
              <ProviderCard 
                provider={provider} 
                handleProviderDetail={handleProviderDetail}/>
            <Arrow {...arrowProps} />
          </InfoBox>
        )}
    </>
  );
}
