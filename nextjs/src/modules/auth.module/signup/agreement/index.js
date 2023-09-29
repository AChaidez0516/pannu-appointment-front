import Image from 'next/image'
import dynamic from 'next/dynamic'
import Layout from '../../../../components/Layout'
const CheckBox = dynamic(() => import('../../../../components/CheckBox'), { ssr: false })
import useWindowDimensions from '../../../../common/hooks/useWindowDimensions'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { IMGS } from '../../../../common/utils/styleGuide'

import {
  Wrapper,
  FormWrapper,
  FormContainer,
  FigureWrapper,
  CenteredRow,
  MobileViewer,
  LinkButton,
  BottomWrapper,
  ContentWrapper
} from '../../../../common/styleds/common.styled'
import {
  Title,
} from '../../shared/styled'
import {
  ImageWrapper,
  AgreementWrapper,
  Description,
  AgreementContentDiv,
  StrongText,
  ReadMoreWrapper,
  ErrorWrapper,
} from './styled'


function Agreement() {
  const router = useRouter()
  const { width, height } = useWindowDimensions()
  const [showReadMore, setShowReadMore] = useState(false)
  const [showedIndex, setShowedIndex] = useState(0)
  const [showError, setShowError] = useState(false)
  const [agreementList, setAgreementList] = useState([
    {
      id: 1,
      title: '1. Terms and Conditions',
      description: 'Lorem ipsum dolor sit amet, consetetur diam nonumyeirmod\nterm is go invidunt ut la magna aliq uyamerat, sedny diaming.',
      checked: false
    },
    {
      id: 2,
      title: '2. HIPAA Privacy Law Compliance',
      description: 'Lorem ipsum dolor sit amet, consetetur diam nonumyeirmod\nterm is go invidunt ut la magna aliq uyamerat, sedny diaming.',
      checked: false
    },
    {
      id: 3,
      title: '3. Permission to share and request medical, personal and financial',
      description: 'Lorem ipsum dolor sit amet, consetetur diam nonumyeirmod\nterm is go invidunt ut la magna aliq uyamerat, sedny diaming.',
      checked: false
    },
    {
      id: 4,
      title: '4. Trading Partner Agreements',
      description: 'Lorem ipsum dolor sit amet, consetetur diam nonumyeirmod\nterm is go invidunt ut la magna aliq uyamerat, sedny diaming.',
      checked: false
    },
    {
      id: 5,
      title: '5. Terms and Conditions',
      description: 'Lorem ipsum dolor sit amet, consetetur diam nonumyeirmod\nterm is go invidunt ut la magna aliq uyamerat, sedny diaming.',
      checked: false
    },
    {
      id: 6,
      title: '6. HIPAA Privacy Law Compliance',
      description: 'Lorem ipsum dolor sit amet, consetetur diam nonumyeirmod\nterm is go invidunt ut la magna aliq uyamerat, sedny diaming.',
      checked: false
    },
    {
      id: 7,
      title: '7. Permission to share and request medical, personal and financial Information',
      description: 'Lorem ipsum dolor sit amet, consetetur diam nonumyeirmod\nterm is go invidunt ut la magna aliq uyamerat, sedny diaming.',
      checked: false
    },
    {
      id: 8,
      title: '8. Trading Partner Agreements',
      description: 'Lorem ipsum dolor sit amet, consetetur diam nonumyeirmod\nterm is go invidunt ut la magna aliq uyamerat, sedny diaming.',
      checked: false
    },
    {
      id: 9,
      title: '9. Terms and Conditions',
      description: 'Lorem ipsum dolor sit amet, consetetur diam nonumyeirmod\nterm is go invidunt ut la magna aliq uyamerat, sedny diaming.',
      checked: false
    },
    {
      id: 10,
      title: '10. HIPAA Privacy Law Compliance',
      description: 'Lorem ipsum dolor sit amet, consetetur diam nonumyeirmod\nterm is go invidunt ut la magna aliq uyamerat, sedny diaming.',
      checked: false
    }
  ])


  useEffect(() => {
    if (showReadMore)
      return

    calculatePossibleCountToShow()
  }, [height])


  const getTextWidth = (text, fontSize) => {
    let font = `${fontSize + 2}px SF Pro Text`;

    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    context.font = font;
    let width = context.measureText(text).width;
    //canvas.remove()
    return Math.ceil(width)
  }

  const getOneItemHeight = (index) => {
    const contentWidth = width >= 1280 ? 345: 345

    const agreement = agreementList[index]
    const title = agreement.title
    const description = agreement.description

    let w1 = getTextWidth(title, 12)
    let w2 = getTextWidth(description, 10)
    let rowCount1 = Math.ceil(w1 / contentWidth)
    let rowCount2 = Math.ceil(w2 / (contentWidth - 23))
    let height1 = 14 * rowCount1
    let height2 = 12 * rowCount2

    return height1 + height2 + 15
  }

  const remainHeight = (width >= 1280) ? 51 + 70 + 80 : 57 + 165+ 30 * 2 + 51 + 70
  const calculatePossibleCountToShow = () => {
    const contentHeight = height - remainHeight

    let totalLength = 0
    let showedIndex = 0
    for (let i = 0; i < agreementList.length; i++) {
      const h = getOneItemHeight(i)

      totalLength += h
      if (totalLength > contentHeight)
        break;
      showedIndex = i
      // console.log('agreement', title, w1, contentWidth, rowCount1)
      // console.log('agreement',description, w2, contentWidth-23, rowCount2)
    }

    console.log('agreement','content height', contentHeight, showedIndex)
    setShowedIndex(showedIndex)

    const blMore = showedIndex < agreementList.length - 1 ? false : true
    setShowReadMore(blMore)

    if (!blMore)
      document.body.style.overflow = 'hidden'
  }

  const readMore = () => {
    setShowReadMore(true)
    document.body.style.overflow = 'unset'
  }

  function agree() {

    let bl = true
    let vh = 0;
    for (let i = 0; i < agreementList.length; i++) {
      const v = agreementList[i]
      const h = getOneItemHeight(i)
      vh += h
      if (!v.checked) {
        bl = false
        break;
      }
    }

    if (!bl) {
      window.scrollTo(0, (vh + remainHeight) - height )
      setShowError(true)
      return
    }


    router.push({ pathname: '/users/scan-ID', query: { type: 'reg' } })
  }



  return (
    <Wrapper>
      <FigureWrapper>
        <Title className="big">Consolidated agreement</Title>
        <CenteredRow marginTop={130}>
          <Image src={IMGS.agreementBG} width="511" height="393" />
        </CenteredRow>
      </FigureWrapper>
      <FormWrapper>
        <FormContainer>
          <Layout
            title="Consolidated agreement">
            <ContentWrapper>
              <MobileViewer>
                <ImageWrapper>
                  <Image src={IMGS.agreementBG} width="165" height="165" />
                </ImageWrapper>
              </MobileViewer>
              <Description>
                <div className="txt">
                  Click on all the check boxes to show you have read and agree to
                  the terms and conditions of use.{' '}
                </div>
                <div className="txt">
                  You will not be able to proceed without this step.{' '}
                </div>
              </Description>
              <AgreementWrapper>
                { agreementList.map((data, idx) => {
                  if (idx > showedIndex)
                    return

                  return (
                      <AgreementContentDiv key={data.id} align="center">
                        <div className="title">{data.title}</div>
                        <div className="content">
                          <CheckBox options={{ size: { width: 18, height: 18 } }}
                                    onChange={(checked) => {
                                      agreementList[idx].checked = checked
                                      setAgreementList([...agreementList])
                                    }}/>
                          <div className="description">
                            {data.description}
                            { /*data.description.split('\n').map((txt, ri) => (
                                <p key={ri}>{txt}</p>
                            ))*/ }
                          </div>
                        </div>
                      </AgreementContentDiv>
                  )
                }) }
                { (!showReadMore && showedIndex < agreementList.length - 1)&&
                  <div className="preview">
                    {agreementList[showedIndex + 1].description}
                  </div>
                }
                {showReadMore && (
                  agreementList.map((data, idx) => {
                    if (idx <= showedIndex)
                      return

                    return (
                      <AgreementContentDiv key={data.id} align="center">
                        <div className="title">{data.title}</div>
                        <div className="content">
                          <CheckBox options={{ size: { width: 18, height: 18 } }}
                                    onChange={(checked) => {
                                      agreementList[idx].checked = checked
                                      setAgreementList([...agreementList])
                                    }}/>
                          <div className="description">
                            {data.description}
                            { /*data.description.split('\n').map((txt, ri) => (
                                      <p key={ri}>{txt}</p>
                                  ))*/ }
                          </div>
                        </div>
                      </AgreementContentDiv>
                    )
                  })
                )}
              </AgreementWrapper>
              { !showReadMore&& (
              <ReadMoreWrapper>

                  <CenteredRow>
                    <LinkButton className="small" onClick={readMore}>Read more</LinkButton>
                  </CenteredRow>

              </ReadMoreWrapper>
              ) }
              { showReadMore&& (
                <>
                  { showError&&
                    <ErrorWrapper>
                      <div>Click all the check boxes to show you have read and agree to the terms and conditions of use.</div>
                      <div>You will not be able to proceed without this step.</div>
                    </ErrorWrapper>
                  }
                  <BottomWrapper>

                      <CenteredRow>
                        <LinkButton className="big strong" onClick={agree}>Agree</LinkButton>
                      </CenteredRow>

                  </BottomWrapper>
                </>
              ) }
            </ContentWrapper>
          </Layout>
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  )
}

export default Agreement
