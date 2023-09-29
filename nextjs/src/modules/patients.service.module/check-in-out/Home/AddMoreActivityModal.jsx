import { Radio } from "@mui/material"
import { useState } from "react"
import styled from "styled-components"
import { Box, Flex, Typo, Tab } from "../../../../components/buzz"
import InputBox from "../../../../components/InputBox"

const TAB1 = ['Above', 'Below']
const TAB2 = ['Wait', 'Repeat', 'New']
const OPTIONS = [0, 1, 2, 3]

export const AddMoreActivityModal = () => {
  const [selTab1, setSelTab1] = useState(TAB1[0])
  const [selTab2, setSelTab2] = useState(TAB2[1])
  const [selOption, setSelOption] = useState(OPTIONS[0])

  const controlProps = (item) => ({
    checked: selOption == item,
    onChange: (e) => setSelOption(e.target.value),
    value: item,
    name: 'xxx',
    inputProps: { 'aria-label': item },
  });

  return (
    <Wrapper>
      <Typo fontS={14} lineH={22}>Add activity row</Typo>
      <Box mb={12}>
        <Flex x={'space-between'}>
          <Tab
            tabList={TAB1}
            selectTab={selTab1}
            setSelectTab={setSelTab1}
          />
          <InputBox
            caption="Row no."
            type="text"
            style={{ width: 68 }}
            onChange={() => { }}
          />
        </Flex>
      </Box>
      <Box mb={13}>
        <Typo fontS={14} lineH={22}>Select activity</Typo>
      </Box>
      <Box mb={13}>
        <Tab
          tabList={TAB2}
          selectTab={selTab2}
          setSelectTab={setSelTab2}
        />
      </Box>
      <Box mb={12}>
        <Typo fontS={14} lineH={22}>Select activity</Typo>
      </Box>
      <Box>
        {[...Array(4).keys()].map((i) => (
          <Box key={i}>
            <Flex x='flex-start'>
              <Radio {...controlProps(i)} sx={{ padding: '5px' }} />
              <Typo>Lorem Lorem  Lorem Lorem</Typo>
            </Flex>
          </Box>
        ))}
      </Box>
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  width: 100%;
`