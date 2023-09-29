import { useState } from 'react'
import { SearchIcon, SearchOptionIcon } from "../../../../../common/utils/Icons";
import {
  SearchWrapper,
} from './styled'

export default function Index({ placeHolder, showOptions, onSearch }) {
  const [keyword, setKeyword] = useState('')

  return (
    <SearchWrapper>
      <div className="box-wrapper">
        <div className="input-wrapper">
          <input placeholder={placeHolder} value={keyword} onChange={ (e) => setKeyword(e.target.value) } />
        </div>
        <div className="icon" onClick={ () => onSearch(keyword) }>
          <SearchIcon color="#000" width={16} height={16} />
        </div>
      </div>
      { (showOptions)&&
        <div className="search-option">
          <SearchOptionIcon />
        </div>
      }
    </SearchWrapper>
  )
}
