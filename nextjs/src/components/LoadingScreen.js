import styled from 'styled-components'
import dynamic from 'next/dynamic'

/**
 * Audio, BallTriangle, Bars, Circles, CirclesWithBar, Grid, Hearts, LineWave, MutatingDots,
 * Oval, Plane, Puff, RevolvingDot, RotatingSquare, Rings, TailSpin,
 * ThreeDots, ThreeCircles,  Triangle, Watch, RotatingLines, FallingLines,
 * InfinitySpin,
 * */

import { Oval } from 'react-loader-spinner'

const LoaderDIV = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  animation: bg 1s;
  background-color: black;
  opacity:15%;
  z-index:99999;
`
const LoadingScreen = () => {
    return (
        <LoaderDIV>
            <Oval color="#00BFFF" height={80} width={80} />
        </LoaderDIV>
    );
};

export default LoadingScreen;