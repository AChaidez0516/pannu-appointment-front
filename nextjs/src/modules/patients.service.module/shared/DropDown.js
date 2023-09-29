import { useState } from "react"
import styled, { css } from "styled-components"
import Image from "next/image"
import PropTypes from 'prop-types'


export default function DropDown(props) {
  const {
    dropDownList,
    setSelectedItem
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(dropDownList[0] || null)

  const handleSelect = (item) => {
    setIsOpen(false)
    setSelected(item)
    setSelectedItem(item)
  }

  return (
    <Wrapper {...props}>
      <button
        onClick={() => setIsOpen(!isOpen)}>
        {props?.icons?.left && 
        <div className="left">
          <Image 
            src={props.icons.left.src} 
            width={props.icons.left?.width || 11} 
            height={props.icons.left?.height || 11} 
            layout="fixed" />
        </div>
        }
        <div className="selected">{selected.name}</div>
        {props?.icons?.right && 
        <div className="right">
          <Image 
            src={props.icons.right.src} 
            width={props.icons.right?.width || 10} 
            height={props.icons.right?.height || 8} 
            layout="fixed" />
        </div>
        }
      </button>
      {isOpen && dropDownList.length > 0 && 
      <div className="dropdown-menu">
        {dropDownList.map((item, i) => 
          <div key={i}
            className="item"
            onClick={() => handleSelect(item)}
          >
            <div>{item.name}</div>
          </div>
        )}
      </div>
      }
    </Wrapper>
  )
}

DropDown.propTypes = {
  dropDownList: PropTypes.array.isRequired,
  setSelectedItem: PropTypes.func.isRequired
}

const Wrapper = styled.div`
  position: relative;
  button {
    display: flex;
    align-items: center;
    outline: none;
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: 'SF Pro Text';
    font-style: normal;
    .left {
    }
    .selected {
      white-space: nowrap;
      text-align: left;
      padding: 0 4px;
      flex: 1;
      overflow-x: hidden;
      ${({width, paddingX, icons, font}) => css`
        max-width: ${width 
        - paddingX*2 || 0
        - icons?.left?.width || 0 
        - icons?.right?.width || 0}px;
        font-weight: ${font.weight};
        font-size: ${font.size}px;
        color: ${font.color};
      `}
      text-overflow: ellipsis;
    }
    .right {
    }
    ${({width, height, paddingX}) => css`
      width: ${width}px;
      height: ${height}px;
      padding: 0px ${paddingX}px;
    `} 
    ${({border}) => border.isUnderline && css`
      border-bottom: ${border.width}px ${border.style} ${border.color};
    `} 
    ${({border}) => !border.isUnderline && css`
      border: ${border.width}px ${border.style} ${border.color};
      border-radius: ${border.radius}px;
    `} 
  }
  .dropdown-menu {
    position: absolute;
    left: 0px;
    background: white;
    box-shadow: 0px 0px 8px #C4C4C4;
    cursor: pointer;
    .item {
      div {
        padding: 8px;
        font-family: 'SF Pro Text';
        font-style: normal;
        ${({menu}) => menu?.font && css`
          font-size: ${menu.font?.size}px;
          font-weight: ${menu.font?.weight};
          color: ${menu.font?.color};
          line-height: ${menu.font?.lineHeight}px;
        `}
        color: #3E3D3E;
        word-break: break-all;
      }
      &:hover {
        background-color: rgba(0, 101, 251, 0.2);
      }
    }
    z-index: 1;
    ${({height, width}) => css`
      top: ${height + 3}px;
      max-width: ${width}px;
      min-width: ${width}px;
    `}
  }
`