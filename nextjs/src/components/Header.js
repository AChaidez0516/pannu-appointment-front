import styled from 'styled-components'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { ICONS } from '../common/utils/styleGuide'

const HeaderDiv = styled.div`
  flex: 1;
  flex-direction: row;
  display: flex;
  align-items: center;
`
const Title = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
`
const TitleClaim = styled.div`
  flex: 1;
  display: flex;
  justify-content: start;
  margin-left: 26px;
`
const TitleH3 = styled.h3`
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
`
const Badge = styled.p`
  text-align: center;
  font-family: SF Pro Text;
  font-style: normal;
  font-weight: 500;
  font-size: 9px;
  line-height: 0px;
  position: absolute;
  right: 41px;
  top: -13px;
  border-radius: 50%;
  color: red;
  padding: 8px 3px;
  border: 1px solid #ff0000;
`

const BadgeContent = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 8px;
`

export default function Header({ title, doc, bell, href, types, imgsrc }) {
  const router = useRouter()

  return (
    <HeaderDiv>
      <Image src="/assets/images/arrow-left.png" onClick={() => {
          if (href) {
              router.push(href, '/')
          }
          else {
              router.back()
          }

      } } width="10" height="13" />
      {types === '1' && (
        <>
          <Title>
            <TitleH3 style={{ marginLeft: 'calc(50% - 72px)' }}>
              {title}
            </TitleH3>
          </Title>
          <BadgeContent>
            <span style={{ marginRight: 24 }}><Image src={ICONS.bell} width="20" height="19" /></span>
            <Badge>{bell}</Badge>
          </BadgeContent>
          <img
            src={imgsrc}
            style={{ width: 30, height: 30, borderRadius: 15 }}
          />
        </>
      )}
      {types === '2' && (
        <>
          <Title>
            <TitleH3 style={{ marginLeft: 'calc(50% - 100px)', width: '58%' }}>
              {title}
            </TitleH3>
          </Title>
          <BadgeContent>
          <span style={{ marginRight: 24 }}>
            <Image src="/assets/images/cloud.png" width="19" height="19" />
          </span>
          </BadgeContent>
          <BadgeContent>
            <Image src="/assets/images/printer.png" width="19" height="19" />
          </BadgeContent>
        </>
      )}
      {types === '3' && (
        <>
          <Title>
            <TitleH3 style={{ marginLeft: 'calc(50% - 100px)', width: '52%' }}>
              {title}
            </TitleH3>
          </Title>
          <BadgeContent>
          <span style={{ marginRight: 24 }}>
            <Image src="/assets/images/config.png" width="19" height="19" />
          </span>
          </BadgeContent>
          <BadgeContent>
            <span style={{ marginRight: 16 }}>
            <Image src="/assets/images/bell.png" width="19" height="19" />
            </span>
            <Badge style={{ right: 30 }}>{bell}</Badge>
          </BadgeContent>
          <BadgeContent>
            <img src={imgsrc} width="30" height="30" style={{ borderRadius: 15 }} />
          </BadgeContent>
        </>
      )}
      {types === '4' && (
        <>
          <Title>
            <TitleH3
              style={{ marginLeft: 20, width: '100%', textAlign: 'start' }}
            >
              {title}
            </TitleH3>
          </Title>
          <BadgeContent>
          <span style={{ marginRight: 24 }}>
            <Image src="/assets/images/svg/search.svg" width="19" height="19" />
          </span>
          </BadgeContent>
          <BadgeContent>
          <span style={{ marginRight: 24 }}>
            <Image src="/assets/images/config.png" width="19" height="19" />
          </span>
          </BadgeContent>
          <BadgeContent>
            <Image src="/assets/images/menu.png" width="5" height="19" />
          </BadgeContent>
        </>
      )}
      {typeof types === 'undefined' && title !== 'Claims' && (
        <Title>
          <TitleH3>{title}</TitleH3>
        </Title>
      )}
      {typeof types === 'undefined' && title === 'Claims' && (
        <>
          <TitleClaim>
            <TitleH3>{title}</TitleH3>
          </TitleClaim>
          <Image src="/assets/images/cloud.png" width="20" height="13" style={{ marginRight: 24 }} />
          <Image src="/assets/images/printer.png" width="19" height="20" style={{ marginRight: 24 }} />
          <BadgeContent>
            <Image src="/assets/images/doc.png" width="20" height="20" style={{ marginRight: 24 }} />
            <Badge>{doc}</Badge>
          </BadgeContent>
          <BadgeContent>
            <Image src="/assets/images/bell.png" width="19" height="19" style={{ marginRight: 24 }} />
            <Badge>{bell}</Badge>
          </BadgeContent>
          <Image src="/assets/images/menu.png" width="5" height="19" />
        </>
      )}
    </HeaderDiv>
  )
}
