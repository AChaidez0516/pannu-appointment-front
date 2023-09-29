import styled from 'styled-components'
import useWindowDimensions from '../../../common/hooks/useWindowDimensions'
import Header from './Header'
import SideMenu from './SideMenu'

const FullScreenWraper = styled.div`
  width: 100%;
  background-color: #F0F2F5;
`
const Container = styled.div`
  padding: 19px 16px;
  overflow-y: hidden;
`
const ContainerPanel = styled.div`
  display: flex;
  max-width: 1467px;
  border-radius: 8px;
  background-color:white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  margin: auto;
  height: 100%;
`
const Panel = styled.div`
  position: relative;
  flex-grow: 1;
  padding: 20px;
  padding-right: ${props => props.paddingRight}px;
`
const EmptySpacer = styled.div`
  width: 100%;
  height: 18px;
`
function DashboardLayout({ children, paddingRight }) {
  const { height, width } = useWindowDimensions()
  const calcHeight = height < 670 ? 670 : height
  const panelHeight = height - 2 * 20 - 65 - 40;
  return (

    <FullScreenWraper >
      <Header />
      <Container style={{ minHeight: calcHeight - 103 }}>
        <ContainerPanel style={{ minHeight: calcHeight - 103 }}>
          <SideMenu style={{ maxHeight: panelHeight }} />
          <Panel paddingRight={paddingRight}>
            {children}
          </Panel>
        </ContainerPanel>
      </Container>
    </FullScreenWraper>
  )
}

export default DashboardLayout