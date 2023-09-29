import Image from "next/image"
import { useState } from "react"
import styled from "styled-components"
import SimpleBar from "simplebar-react"
import { ICONS } from "../../../../common/utils/styleGuide"
import { ActionBtn, ActionBtnWrapper } from "../../../../components/ActionBtnWrapper"
import { Box } from "../../../../components/buzz/Box"
import { Flex } from "../../../../components/buzz/Flex"
import { Typo } from "../../../../components/buzz/Typo"
import CheckBox from "../../../../components/CheckBox"
import { FILTER_OPTIONS, FILTER_OPTION_LIST } from "../shared/data"
import { SearchBox } from "../shared/SearchBox"
import useWindowDimensions from "../../../../common/hooks/useWindowDimensions"


export const FilterOptions = ({ handleClose }) => {

  const { height } = useWindowDimensions()

  const maxHeight = height - 365;
  const [options, setOptions] = useState(FILTER_OPTION_LIST)
  const [search, setSearch] = useState('')

  const handleCheck = (optionId) => {
    setOptions(options.map(option => option.id === optionId ? ({ ...option, checked: !option?.checked }) : option))
  }

  return (
    <FilterModalWrapper>
      <InnerWrapper>
        <Box my={19} pl={16}>
          <SearchBox>
            <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search' />
            <div className="magnifier">
              <Image src={ICONS.magnifyingGlass} width={12} height={12} layout={'fixed'} />
            </div>
          </SearchBox>

        </Box>

        <ContentWrapper>
          <TopContent>
            <Box mb={5}>
              <Flex xGap={7} y='flex-start'>
                <Box>
                  <Image src={ICONS.highImportantMark} width={22} height={22} layout={'fixed'} />
                </Box>
                <Box>
                  <Typo fontW={500}>Use this selector when you are not sure about the data. Can only be used with patients with whom you have an existing relationship.</Typo>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex x='space-between' xGap={8}>
                {options.map((option, i) => (
                  <CheckBox key={i}
                    onChange={() => handleCheck(option.id)}
                  >
                    <Flex xGap={2}>
                      <Flex><Typo lineH={10}>{option?.label}</Typo></Flex>
                      <Flex>{option?.dropDown && <Image src={ICONS.arrowDown} width={8} height={5} layout={'fixed'} />}</Flex>
                    </Flex>
                  </CheckBox>
                ))}
              </Flex>
            </Box>
          </TopContent>
          <SimpleBar style={{ maxHeight: maxHeight + 'px' }}>
            <MainContent>
              {[...Array(18).keys()].map(i => (
                <Box key={i} mb={30}>
                  <Flex xGap={8} x={'flex-start'}>
                    <Typo color={'#000000'} fontS={14} line={10} fontW={600}>Tech</Typo>
                    <Typo color={'#777777'} fontS={14} line={10}>Treatment braces {i + 1}</Typo>
                  </Flex>
                </Box>
              ))}
            </MainContent>
          </SimpleBar>
        </ContentWrapper>
        <ActionBtnWrapper>
          <ActionBtn onClick={() => handleClose(false)}>Done</ActionBtn>
        </ActionBtnWrapper>
      </InnerWrapper>
    </FilterModalWrapper>
  )
}

export const FilterModalWrapper = styled.div`
  width: 100%;
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    max-width: 370px;
  } 
`
export const InnerWrapper = styled.div`
  width: 100%;
  background: #F9F9F9;
  border-radius: 12px;
  padding: 6px;
`
export const ContentWrapper = styled.div`
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #C4C4C4;
  border-radius: 5px;

`
export const TopContent = styled.div`
  padding: 10px;
  border-radius: 5px;
  /* background: #ececec; */
  border-bottom: 1px solid #c3c3c3;
`
export const MainContent = styled.div`
  margin: 23px 0;
  padding: 0 8px;
`
