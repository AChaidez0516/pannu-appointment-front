import { useState } from "react"
import Image from 'next/image'
import { 
  InputBox, 
  SearchBoxContainer, 
  SearchBoxWrapper, 
  MagnifyingGlass, 
  DropDownWrapper,
  DropDownButton, 
  Caption, 
  DropDownContent, 
  DropDownItem} from "./styled"
import { ICONS } from '../../../../common/utils/styleGuide'


const ITEMS =  [
  { name: 'All', value: 'ALL' }, 
  { name: 'Name', value: 'NAME' },
  { name: 'Specialty', value: 'SPECIALTY' },
  { name: 'Address', value: 'ADDRESS' } 
]


function SearchBox ({ handleSearchFrom }) {

  const [openDropDown, setOpenDropDown] = useState(false)
  const [selected, setSelected] = useState(ITEMS[0])
  const [typed, setTyped] = useState("")

  const handleDropDown = () => {
    setOpenDropDown(!openDropDown)
  }

  const handleSelectItem = (item) => {
    setSelected(item)
    setOpenDropDown(false)
  }

  const handleChangeTyped = (e) => {
    setTyped(e?.target?.value)
  }

  const handleSearchSubmit = () => {
    if (!typed) {
      return
    }
    handleSearchFrom(selected.value, typed)
  }

  return (
    <SearchBoxWrapper>
      <SearchBoxContainer>
        <InputBox 
          placeholder="Search here..." 
          onChange={(e) => handleChangeTyped(e)}/>
        <MagnifyingGlass>
          <Image src={ICONS.magnifyingGlass} width={17} height={16} layout={'fixed'} />
        </MagnifyingGlass>
        <DropDownWrapper>
          <DropDownButton onClick={() => {handleDropDown()}}>
            <Caption>{selected.name}</Caption>
            <Image src={ICONS.dropdownIcon} width={10} height={5} layout={'fixed'}/>
          </DropDownButton>
          {openDropDown && 
          <DropDownContent>
            {ITEMS.map((item, index) => (
              <DropDownItem 
                key={index}
                onClick={() => handleSelectItem(item)}
              >{item.name}</DropDownItem>
            ))}
          </DropDownContent>
          }
        </DropDownWrapper>
      </SearchBoxContainer>
      <button onClick={() => handleSearchSubmit()}>Search</button>
    </SearchBoxWrapper>
  )
}

export default SearchBox