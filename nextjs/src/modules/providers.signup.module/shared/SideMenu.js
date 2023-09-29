import Link from 'next/link'
import styled from 'styled-components'
import useWindowDimensions from '../../../common/hooks/useWindowDimensions'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const Menu = styled.div`
    /* flex-basis: 379px; */
    min-width: 379px;
    width: 379px;
    border-right: 1px solid rgba(0, 0, 0, 0.25);
`
const Menu_Title = styled.div`
    font-family: 'SF Pro Text';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #000;
    margin-top: 10px;
    margin-left: 16px;
`
const Menu_Body = styled.ul`
    list-style:none;
    padding: 0;
    margin-left: 20px;
    margin-right: 20px;
`
const Menu_Item = styled.li`
    font-family: SF Pro Text;
    font-size: 14px;
    font-weight: 600;
    line-height: 14px;
    letter-spacing: 0px;
    text-align: left;
    padding: 5.5px 0;
    margin: 10px 0;
    color: #65676B;
    padding-left: 30px;
    cursor:pointer;
`

function SideMenu() {
  const router = useRouter()
  const { menu: selMenu } = { ...router.query }
  const { height, width } = useWindowDimensions()
  const calcHeight = height < 670 ? 670 : height

  const [isOpenContact, setIsOpenContact] = useState(false)
  const [isOpenOtherContact, setIsOpenOtherContact] = useState(false)
  const [isOpenBillingContract, setIsOpenBillingContract] = useState(false)
  const [isOpenPerformanceReport, setIsOpenPerformanceReport] = useState(false)


  useEffect(() => {
    if (selMenu == 'contact_primary' || selMenu == 'contact_secondary') {
      setIsOpenContact(true)
    }
    else {
      setIsOpenContact(false)
    }

    if (selMenu == 'other_contact_billing_primary' || selMenu == 'other_contact_billing_secondary'
      || selMenu == 'other_contact_performance_primary' || selMenu == 'other_contact_performance_secondary') {
      setIsOpenOtherContact(true)
    }
    else {
      setIsOpenOtherContact(false)
    }

    if (selMenu == 'other_contact_billing_primary' || selMenu == 'other_contact_billing_secondary') {
      setIsOpenBillingContract(true)
    }
    else {
      setIsOpenBillingContract(false)
    }

    if (selMenu == 'other_contact_performance_primary' || selMenu == 'other_contact_performance_secondary') {
      setIsOpenPerformanceReport(true)
    }
    else {
      setIsOpenPerformanceReport(false)
    }
  }, [])

  return (
    <Menu className='menu'>
      <Menu_Title >Profile Setup</Menu_Title>
      <Menu_Body className='list'>
        <Link href={{ pathname: '/providers/signup/general', query: { menu: 'general' } }} >
          <Menu_Item className={'one ' + (selMenu == 'general' ? 'selected' : '')}>General Info</Menu_Item>
        </Link>
        <Menu_Item onClick={() => setIsOpenContact(!isOpenContact)} className={'one ' + (isOpenContact ? 'group_mark_close' : 'group_mark_open')}>Contacts</Menu_Item>
        {(isOpenContact) && (
          <div style={{ marginLeft: 15 }}>
            <Link href={{ pathname: '/providers/signup/contacts', query: { type: 'primary', menu: 'contact_primary' } }} >
              <Menu_Item className={'one ' + (selMenu == 'contact_primary' ? 'selected' : '')}>Primary</Menu_Item>
            </Link>
            <Link href={{ pathname: '/providers/signup/contacts', query: { type: 'secondary', menu: 'contact_secondary' } }} >
              <Menu_Item className={'one ' + (selMenu == 'contact_secondary' ? 'selected' : '')}>Secondary</Menu_Item>
            </Link>
          </div>
        )}
        <Menu_Item onClick={() => setIsOpenOtherContact(!isOpenOtherContact)} className={'one ' + (isOpenOtherContact ? 'group_mark_close' : 'group_mark_open')}>Other Contacts</Menu_Item>
        {(isOpenOtherContact) && (
          <div style={{ marginLeft: 15 }}>
            <Menu_Item onClick={() => setIsOpenBillingContract(!isOpenBillingContract)} className={'one ' + (isOpenBillingContract ? 'group_mark_close' : 'group_mark_open')}>Receive billing statements contacts</Menu_Item>
            {(isOpenBillingContract) && (
              <div style={{ marginLeft: 15 }}>
                <Link href={{ pathname: '/providers/signup/contacts', query: { type: 'billing_primary', menu: 'other_contact_billing_primary' } }} >
                  <Menu_Item className={'one ' + (selMenu == 'other_contact_billing_primary' ? 'selected' : '')}>Primary</Menu_Item>
                </Link>
                <Link href={{ pathname: '/providers/signup/contacts', query: { type: 'billing_secondary', menu: 'other_contact_billing_secondary' } }} >
                  <Menu_Item className={'one ' + (selMenu == 'other_contact_billing_secondary' ? 'selected' : '')}>Secondary</Menu_Item>
                </Link>
              </div>
            )}
            <Menu_Item onClick={() => setIsOpenPerformanceReport(!isOpenPerformanceReport)} className={'one ' + (isOpenPerformanceReport ? 'group_mark_close' : 'group_mark_open')}>Receive employee performance reports</Menu_Item>
            {(isOpenPerformanceReport) && (
              <div style={{ marginLeft: 15 }}>
                <Link href={{ pathname: '/providers/signup/contacts', query: { type: 'performance_primary', menu: 'other_contact_performance_primary' } }} >
                  <Menu_Item className={'one ' + (selMenu == 'other_contact_performance_primary' ? 'selected' : '')}>Primary</Menu_Item>
                </Link>
                <Link href={{ pathname: '/providers/signup/contacts', query: { type: 'performance_secondary', menu: 'other_contact_performance_secondary' } }} >
                  <Menu_Item className={'one ' + (selMenu == 'other_contact_performance_secondary' ? 'selected' : '')}>Secondary</Menu_Item>
                </Link>
              </div>
            )}
          </div>
        )}
        <Link href={{ pathname: '/providers/signup/billing-entities', query: { menu: 'entity' } }} >
          <Menu_Item className={'one ' + (selMenu == 'entity' ? 'selected' : '')}>Billing Entities</Menu_Item>
        </Link>
        <Link href={{ pathname: '/providers/signup/service-locations', query: { menu: 'service_location' } }} >
          <Menu_Item className={'one ' + (selMenu == 'service_location' ? 'selected' : '')}>Service Locations</Menu_Item>
        </Link>
        <Link href={{ pathname: '/providers/signup/providers', query: { menu: 'provider' } }} >
          <Menu_Item className={'one ' + (selMenu == 'provider' ? 'selected' : '')}>Providers</Menu_Item>
        </Link>
        <Link href={{ pathname: '/providers/signup/clinicians-relationship', query: { menu: 'clinicians_relationship' } }} >
          <Menu_Item className={'one ' + (selMenu == 'clinicians_relationship' ? 'selected' : '')}>Clinicians relationships</Menu_Item>
        </Link>
        <Link href={{ pathname: '/providers/signup/outsourced-staff', query: { menu: 'outsourced' } }} >
          <Menu_Item className={'one ' + (selMenu == 'outsourced' ? 'selected' : '')}>Outsourced staff FTE calculation</Menu_Item>
        </Link>
        <Link href={{ pathname: '/providers/signup/estimated-pricing-calculation', query: { menu: 'price_calc' } }}>
          <Menu_Item className={'one ' + (selMenu == 'price_calc' ? 'selected' : '')}>Estimated pricing calculation</Menu_Item>
        </Link>
        <Link href={{ pathname: '/providers/signup/influencer', query: { menu: 'influencer' } }}>
          <Menu_Item className={'one ' + (selMenu == 'influencer' ? 'selected' : '')}>Be our influencer or brand ambassador</Menu_Item>
        </Link>
        <Link href={{ pathname: '/providers/signup/reserve-now', query: { menu: 'reserve' } }} >
          <Menu_Item className={'one ' + (selMenu == 'reserve' ? 'selected' : '')}>Reserve now</Menu_Item>
        </Link>
      </Menu_Body>
    </Menu>
  )
}

export default SideMenu