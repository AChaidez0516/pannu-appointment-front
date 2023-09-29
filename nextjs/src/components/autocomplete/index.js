import AutoComplete from 'react-google-autocomplete'
import styled, { css } from "styled-components"
import parser from 'parse-address'
import axios from 'axios'
import {useState, useEffect, useRef, Component} from 'react'
// import { GOOGLE_MAP_API_KEY, TAMU_API_KEY, TAMU_API_URL, TAMU_API_VERSION } from '../../commons/utils/config'


const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
const TAMU_API_KEY = process.env.NEXT_PUBLIC_TAMU_API_KEY;
const TAMU_API_URL = process.env.NEXT_PUBLIC_TAMU_API_URL;
const TAMU_API_VERSION = process.env.NEXT_PUBLIC_TAMU_API_VERSION;

export const AddressType = {
  GOOGLE: 1,
  TYPO: 2
}

export const checkAddress = (value, addressType, callback) => {

  if (!value) {
    callback(false) //null is available now
    return
  }

  if (addressType === AddressType.GOOGLE) {
    callback(false)
    return
  }

  const ret = parser.parseLocation(value)
  if (ret) {
    let list = []

    if (ret.number)
      list.push(ret.number)
    if (ret.street)
      list.push(ret.street)
    if (ret.type)
      list.push(ret.type)

    const data = {
      apiKey: TAMU_API_KEY,
      version: TAMU_API_VERSION,
      responseFormat: 'csv',
    }

    if (list.length > 0)
      data['streetAddress'] = list.join(' ')
    if (ret.city)
      data['city'] = ret.city
    if (ret.state)
      data['state'] = ret.state
    if (ret['zip'])
      data['zip'] = ret.zip

    axios.get(TAMU_API_URL, {
      params: data
    }, { timeout: 2 })
      .then(res => {
        const data = res.data
        const arr = data.split(',')
        const matchedStatus = arr[8]
        if (['Exact', 'Relaxed', 'Soundex'].includes(matchedStatus))
        {
          callback(false)
        }
        else {
          callback(true)
        }
      })
      .catch(error => {
        callback(true)
      })
  }
  else {
    callback(true)
  }
}

export class AutoCompleteComponent extends Component {

  constructor(props) {
    super(props);

    this.handleAddressFromGoogle = this.handleAddressFromGoogle.bind(this)
    this.handleAddressFromTypo = this.handleAddressFromTypo.bind(this)
    this.delayCheckAddress = this.delayCheckAddress.bind(this)
  }

  handleAddressFromGoogle = (address) => {
    const { onAddressType, onChangePlace, onChange } = this.props
    onAddressType && onAddressType(AddressType.GOOGLE)
    console.log("@@", address);
    onChangePlace && onChangePlace(address)
    onChange && onChange(address)
  }

  handleAddressFromTypo = (address) => {
    const { onAddressType, onChangePlace, onChange } = this.props
    onAddressType && onAddressType(AddressType.TYPO)
    console.log("##", address);
    onChangePlace && onChangePlace(address)
    onChange && onChange(address)
  }

  delayCheckAddress = () => {
    setTimeout(() => {
      checkAddress(this.props.value, this.props.addressType, this.props.onInvalidAddress)
    }, 1000)
  }

  render() {
    return (
      <AutoCompleteWrapper
        apiKey={GOOGLE_MAP_API_KEY}
        options={{
          componentRestrictions: {
            country: ['us'],
          },
          types: ['geocode'],
          fields: ["place_id", "geometry", "name", "formatted_address", "plus_code"]
        }}
        value={this.props.pvalue}
        placeholder="12345 Anywhere St, Anytown, ST 12345"
        onPlaceSelected={(place) => {
          this.handleAddressFromGoogle(place.formatted_address)
        }}
        onChange={(e) => {
          this.handleAddressFromTypo(e.target.value)
        }}
        {...this.props.rest}
        onBlur={() => this.delayCheckAddress()}
      />
    )
  }
}

export const AutoCompleteWrapper = styled(AutoComplete)`
  width: 100%;
  border: 0.5px solid #5a585d!important;
  margin-top:4px!important;
  outline: none;
  box-sizing: border-box;
  border-radius: 5px;
  height: 43px;
  width: 100%;
  padding: 10px 10px 10px 10px;
  font-size: 14px;
  line-height: 18px;
  ${({ errorMessage }) => errorMessage && css`
    border-color: red;
  `}
  &:focus {
    font-size: 21px;
    border-color: #173FD4;
    border-width: 1px;
  }
`