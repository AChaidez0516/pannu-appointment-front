import { DesktopTitle, DesktopViewer, MobileViewer } from '../common/styleds/common.styled'
import Header from './Header'
import styled from 'styled-components'

const LayoutWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  padding: 0 15px 70px;
  
`
const Layout = (props) => (
  <LayoutWrapper>
    <MobileViewer>
      <Header
        title={props.title}
        doc={props.doc}
        bell={props.bell}
        href={props.href}
        types={props.types}
        imgsrc={props.imgsrc}
      />
    </MobileViewer>
    { (props.hasDesktopTitle)&&
    <DesktopViewer>
      <DesktopTitle>{props.title}</DesktopTitle>
    </DesktopViewer>
    }
    {props.children}
  </LayoutWrapper>
)

export default Layout
