import {useState} from "react";
import Image from "next/image";
import {InputGroupWrapper} from "./styled";

export default function InputBox(props) {
  const {
    caption = 'label',
    type = 'text',
    className,
    value,
    autoComplete = '',
    showIcon = false,
    iconType,
    iconSrc,
    onChange,
    onClickInput,
    onClickIcon,
    min,
    style = {
      width: 100
    }
  } = props

  return (
    <InputGroupWrapper className={className} style={style}>
      <span className='caption'>{caption}</span>
      <input
        type={type}
        className='input-box'
        autoComplete={autoComplete}
        onClick={() => onClickInput && onClickInput()}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        min={min}
      />
      {showIcon &&
        <div className='eye-icon' onClick={() => onClickIcon && onClickIcon()}>
          { iconType === 'image' &&
            <Image
              src={iconSrc}
              width={20} height={19}
              layout={'fixed'}
              quality={100}
            />
          }
          { iconType === 'svg' &&
            <span>{iconSrc}</span>
          }
        </div>
      }
    </InputGroupWrapper>
  )
}