import { useEffect, useState } from "react";
import styled from "styled-components"
import SimpleBar from 'simplebar-react'
import Rating from 'react-rating'
import Image from "next/image";
import toast from 'react-toastify'

import 'simplebar/dist/simplebar.min.css';
import { ActionBtn, ActionBtnWrapper } from "../../../../components/ActionBtnWrapper"
import { SectionWrapper } from "../Home/styled"
import useWindowDimensions, { DEVICE_TYPE } from "../../../../common/hooks/useWindowDimensions";
import { RATINGS } from "../Index/mockup";
import { ICONS } from "../../../../common/utils/styleGuide";
import { HEADER_HEIGHT } from "../../apt/make-apt/shared/constants";

export const SimpleBarComponent = ({ children }) => {
  const { height, device } = useWindowDimensions()
  const sectionHeight = height
    - HEADER_HEIGHT
    - 2 * 27
  const BottomBtnHeight = 120;
  const listHeightOnDesktop = sectionHeight - BottomBtnHeight

  if (device === DEVICE_TYPE.DESKTOP) {
    return (
      <SimpleBar style={{ maxHeight: listHeightOnDesktop }}>
        {children}
      </SimpleBar>
    )
  }
  return (
    <>
      {children}
    </>
  )
}

export const Ratings = ({ 
  goToSummaryScreen, 
  handleAddNotes,
  dispatchRatings,
 }) => {
  const [ratings, setRatings] = useState([])
  useEffect(() => {
    setRatings(RATINGS)
  }, [])

  const handleRating = (value, rating) => {
    setRatings(ratings.map(r => r.id === rating?.id ? ({ ...r, rating: { ...r.rating, value } }) : r))
  }

  const handleInputChange = (e, rating) => {
    const { value } = e.target
    setRatings(ratings.map(r => r.id === rating.id ? ({ ...r, comment: value }) : r))
  }

  const handleDone = async () => {
    dispatchRatings(ratings)
    const notes = ratings.find(r => r.name === 'My notes').comment
    if (notes) {
      handleAddNotes(notes)
    }
    setRatings([])
    goToSummaryScreen() // goto summary section
  }

  return (
    <div className="section">
      <RatingsWrapper>
        <SimpleBarComponent>
          <RatingsContainer>
            {ratings && ratings.map((rating, i) => (
              <RatingUnit key={i}>
                <div className="name">
                  <div>{rating?.name}</div>
                  {rating?.name === 'My notes' && <Image src={ICONS.myNotes} width={21} height={21} layout='fixed' />}
                </div>
                {rating?.rating?.isRating && (
                  <div className="stars-wrapper">
                    <Rating
                      className="ratings-stars"
                      initialRating={rating?.rating?.value}
                      emptySymbol={<Image src={ICONS.starEmpty} className="icon" width={30} height={30} layout="fixed" />}
                      fullSymbol={<Image src={ICONS.starFilled} className="icon" width={30} height={30} layout="fixed" />}
                      onClick={(number) => handleRating(number, rating)}
                    />
                  </div>
                )}
                <div className="comment">
                  <textarea name={rating?.name} value={rating?.comment} onChange={(e) => handleInputChange(e, rating)} placeholder="Type comment here"></textarea>
                </div>
              </RatingUnit>
            ))}
          </RatingsContainer>
        </SimpleBarComponent>
        <ActionBtnWrapper centered={true} >
          <ActionBtn
            fontS={18}
            lineH={14}
            onClick={handleDone}
          >Done </ActionBtn>
        </ActionBtnWrapper>
      </RatingsWrapper>
    </div>
  )
}

export const RatingsWrapper = styled(SectionWrapper)`
  @media (min-width: 1024px) {
    padding: 27px 12px;
  }
  .title {
    text-align: center;
  }
`
export const RatingsContainer = styled.div`
  padding: 0 12px;
  * {
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;
  }
`
export const RatingUnit = styled.div`
  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 16px;
    div {
      text-align: center;
      font-weight: 500;
      font-size: 13px;
      border-bottom: 1px solid #000000;
      margin-bottom: 8px;
    }
  }
  .stars-wrapper {
    padding: 0 18px;
    .ratings-stars {
      width: 100%;
      display: flex !important;
      justify-content: space-between;
      .icon {
        width: 30px;
        height: 30px;
      }
    }
  }
  .comment {
    margin-top: 15px;
    textarea {
      width: 100%;
      height: 52px;
      border: 2px solid #B7B7B9;
      border-radius: 5px;
      padding: 4px 6px;
      resize: none;
      :focus {
        outline: none;
        border: 2px solid #173FD4;
      }
    }
  }
  margin-bottom: 15px;
`


