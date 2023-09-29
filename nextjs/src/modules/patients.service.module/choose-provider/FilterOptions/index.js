import dynamic from 'next/dynamic'
import { useState } from "react"
import Image from 'next/image'
const DatePicker = dynamic(() => import("react-datepicker"))
import "react-datepicker/dist/react-datepicker.css";
import Rating from 'react-rating'
import { ICONS } from "../../../../common/utils/styleGuide";
import { SPECIALTIES } from "../data";
import { 
  FilterWrapper, 
  NetworkWrapper,
  CheckboxWrapper,
  SpecialtyWrapper,
  DateTimeWrapper,
  OptionWrapper,
  DateTimeBlock,
  DateTimeContainer,
  FormGroup,
  PriceRangeWrapper,
  RatingWrapper,
  RatingContainer,
  UnitRating,
  KeywordsWrapper,
  ButtonWrapper,
} from "./styled"


function FilterOptions ({options, setFilterOption, setIsOpenFilter}) {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [specialtyPopup, setSpecialtyPopup] = useState(false)

  const handleOptions = (e) => {
    setFilterOption(prev => {
      if (e.target.type === 'checkbox') {
        return {
          ...prev, [e.target.name]: e.target.checked
        }  
      } else if (e.target.type === 'radio') {
        const isNow = e.target.id === "now" ? true : false
        return {
          ...prev, [e.target.name]: isNow
        }
      } else if (e.target.name === 'priceFrom') {
        console.log("priceFrom", e);
        return {
          ...prev, price: [e.target.value, prev.price[1]] 
        }
      } else if (e.target.name === 'priceTo') {
        return {
          ...prev, price: [prev.price[0], e.target.value] 
        }
      }
      return prev
    })
  }

  const handleRating = (number, ratingId) => {
    const ratings = options.ratings.map(rating => {
      if(rating.id === ratingId) return {...rating, value: number}
      return rating
    })
    setFilterOption(prev => ({...prev, ratings}))
  }

  const handleFilterOption = () => {
    setIsOpenFilter(prev => !prev)
    setFilterOption(prev => {
      return {...prev, dateTime: [startDate, endDate]}
    })

  }

  return (
    <FilterWrapper>
      <NetworkWrapper>
        <div className="item">
          <h6>In-network only</h6>
          <div className="boxgroup">
            <CheckboxWrapper>
              <input 
                id="hmo" 
                type="checkbox"
                name="isHMO"
                checked={options.isHMO}
                onChange={(e) => handleOptions(e)}
              />
              <label htmlFor="hmo">HMO</label>
            </CheckboxWrapper>
            <CheckboxWrapper isPCP>
              <input 
                id="ppo" 
                type="checkbox"
                name="isPCP"
                checked={options.isPCP}
                onChange={(e) => handleOptions(e)}  
              />
              <label htmlFor="ppo">PCP</label>
            </CheckboxWrapper>
          </div>
        </div>
        <div className="item">
          <h6>POEM network only</h6>
          <CheckboxWrapper isPOEM>
            <input 
              id="poem" 
              type="checkbox"
              name="isPOEM"
              checked={options.isPOEM}
              onChange={(e) => handleOptions(e)}
            />
            <label htmlFor="poem">POEM</label>
          </CheckboxWrapper>
        </div>
      </NetworkWrapper>
      <SpecialtyWrapper>
        <div className="specialty-popup">
          <label>Specialty</label>
          <button
            className="dropdown-btn" 
            onClick={() => setSpecialtyPopup(!specialtyPopup)}
          >
            <span className="selected-specialty">
              <Image src={ICONS.magnifyingGlass} width={11} height={11} layout="fixed" />
              {options.specialty}
            </span>
            <img src={ICONS.dropdownIcon} width={10} height={8} />
          </button>
          {specialtyPopup && 
          <div className="popup-body">
            {SPECIALTIES.map((specialty, i) => (
              <button 
                key={i} 
                className="item"
                name={specialty}
                onClick={(e) => {
                  setSpecialtyPopup(false)
                  setFilterOption(prev => ({...prev, specialty:  e.target.name}))
                }}
                >{specialty}</button>
            ))}
          </div>
          }
        </div>
        <div>
          <label htmlFor="acceptNew">Accepting new patients</label>
          <CheckboxWrapper>
            <input 
              id="acceptNew" 
              type="checkbox" 
              name="acceptNew"
              checked={options.acceptNew}
              onChange={(e) => handleOptions(e)}
            />
          </CheckboxWrapper>
        </div>
      </SpecialtyWrapper>
      <DateTimeWrapper>
        <div className="header">
          <OptionWrapper>
            <input 
              type="radio" 
              id="now" 
              name={'isNow'} 
              checked={options.isNow} 
              onChange={(e) => handleOptions(e)}
            />
            <label htmlFor="now">Now</label>
          </OptionWrapper>
          <OptionWrapper>
            <input 
              type="radio" 
              id="later" 
              name={'isNow'} 
              checked={!options.isNow} 
              onChange={(e) => handleOptions(e)}
            />
            <label htmlFor="later">Later</label>
          </OptionWrapper>
        </div>
        <DateTimeContainer>
          <DateTimeBlock>
            <FormGroup disabled={options.isNow}>
              <span className="title">Date from</span>
              <DatePicker
                id="startDate"
                wrapperClassName="my-date-picker" 
                dateFormat={'MM/dd'}
                disabled={options.isNow}
                showTimeInput
                timeInputLabel="Start Time:"
                selected={startDate} 
                minDate={new Date()}
                onChange={(date) => setStartDate(date)} 
              />
              <label htmlFor="startDate">
                <Image src={ICONS.calendar} width={19} height={19} layout="fixed" />
              </label>
            </FormGroup>
          </DateTimeBlock>
          <DateTimeBlock>
            <FormGroup disabled={options.isNow}>
              <span className="title">Date to</span>
              <DatePicker
                id="endDate"
                wrapperClassName="my-date-picker" 
                dateFormat={'MM/dd'}
                disabled={options.isNow}
                selected={endDate} 
                showTimeInput
                timeInputLabel="End Time:"
                minDate={startDate || new Date()}
                onChange={(date) => setEndDate(date)} 
              />
              <label htmlFor="endDate">
                <Image src={ICONS.calendar} width={19} height={19} layout="fixed" />
              </label>
            </FormGroup>
          </DateTimeBlock>
        </DateTimeContainer>
      </DateTimeWrapper>
      <PriceRangeWrapper>
        <FormGroup>
          <span className="title">Price from</span>
          <input 
            className="usual-input" 
            type="number"
            name="priceFrom"
            value={options.price[0] || ""}
            onChange={(e) => handleOptions(e)}
          />
        </FormGroup>
        <FormGroup>
          <span className="title">Price from</span>
          <input 
            className="usual-input" 
            type="number"
            name="priceTo"
            value={options.price[1] || ""}
            onChange={(e) => handleOptions(e)}
          />
        </FormGroup>
      </PriceRangeWrapper>
      <RatingWrapper>
        <h6>Rating</h6>
        <RatingContainer>
          {options.ratings.map(rating => (
            <UnitRating key={rating.id}>
              <label>{rating.name}</label>
              <div className="stars-wrapper">
                <Rating 
                  className="my-stars"
                  initialRating={rating.value} 
                  emptySymbol={<Image src={ICONS.starEmpty} className="icon" width={30} height={30} layout="fixed" />}
                  fullSymbol={<Image src={ICONS.starFilled} className="icon" width={30} height={30} layout="fixed" />}
                  onClick={(number) => handleRating(number, rating.id)}
                />
              </div>
            </UnitRating>
          ))}
        </RatingContainer>
      </RatingWrapper>
      <KeywordsWrapper>
        <label>Keywords</label>
        <textarea
          name="keywords"
          value={options.keywords}
          onChange={(e) => {setFilterOption(prev => ({...prev, keywords: e.target.value}))}} 
        />
      </KeywordsWrapper>
      <ButtonWrapper>
        <button onClick={handleFilterOption}>Done</button>
      </ButtonWrapper>
    </FilterWrapper>
  )
}

export default FilterOptions