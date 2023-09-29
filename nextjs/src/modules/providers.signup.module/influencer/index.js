import Image from 'next/image'
import dynamic from 'next/dynamic'

import DashboardLayout from '../shared/DashboardLayout'
import DropdownIndicator from '../../../common/utils/DropdownIndicator'
import useWindowDimensions from '../../../common/hooks/useWindowDimensions'

import { useEffect, useReducer } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useAuthUser, useLoadingStatus } from '../../../redux/hooks/useCommonStore'
import { MESSAGES } from '../../../common/constant/global'
import { useLocalStorage } from '../../../common/hooks/useLocalStorage'
import {
  AddButtonWrapper,
  AudienceTableWrapper,
  DetailWrapper,
  ExplanationWrapper,
  InfluencersWrapper,
  MediumTypeDetailWrapper,
  MediumTypeTableWrapper,
} from "./styled";
import {
  SimpleBar
} from '../shared/styled'
import { ButtonWrapper } from "../estimated-pricing-calculation/styled";
import { ICONS } from "../../../common/utils/styleGuide";
import {
  getStaffList,
  allInfluencersByProviderId,
  saveInfluencers,
  saveInfluencer,
} from "../../../common/lib/provider";
import {
  TYPES,
  MEDIUM_TYPES,
  MAIN_AUDIENCE,
  intialRow,
  influencerReducer,
  intialDetailRow,
  detailReducer,
  REDUCER_ACTION_TYPES as ACTIONS,
  requestsFactory,
  enableSaveAllButton,
  renderFactory
} from './utils'

const Select = dynamic(
  () => import('react-select'),
  { ssr: false }
)

/** select custom menu */
const menuWidth = '213px'
const menuHeight = '45px'

const initInfluencer = () => {

}

const initDetail = () => {

}

const getLocalStorageValue = (key, defaultValue) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
  }
}

function Influencer() {

  const { authUser } = useAuthUser()
  const { commitLoadingStatus } = useLoadingStatus()

  const { height, width } = useWindowDimensions()
  const panelHeight = height;

  const PAGE_PREFIX = 'PVD_SIGNUP_INFLUENCER_NOW_'
  const router = useRouter()
  const [providerList, setProviderList] = useLocalStorage(`${PAGE_PREFIX}2`, [])
  const [influencers, influencerDispatch] = useReducer(influencerReducer, getLocalStorageValue(`${PAGE_PREFIX}0`,  [intialRow]))
  const [details, detailDispatch] = useReducer(detailReducer, getLocalStorageValue(`${PAGE_PREFIX}1`, [intialDetailRow]))

  useEffect(() => {
    const fetchProviders = async (providerId) => {
      try {
        const providers = await getStaffList(providerId)
        setProviderList(providers)
      }
      catch (e) {
        console.log("fetch providers : ", error)
        toast.error(MESSAGES.server_error)
      }
    }

    const fetchAllInfluencers = async (providerId) => {
      try {
        const allInfluencers = await allInfluencersByProviderId(providerId)
        // console.log({ allInfluencers });
        const fetchedInfluencers = []
        const fetchedDetails = []

        allInfluencers.forEach(row => {
          fetchedInfluencers.push({
            id: row.id,
            selectedProviderId: row.staffID,
            isProviders: row.isProviders,
            isPayers: row.isPayers,
            isEmployers: row.isEmployers,
            isPatients: row.isPatients
          })

          row.influenceDetails.forEach(detail => {
            fetchedDetails.push({
              id: detail.id,
              selectedProviderId: row.staffID,
              mediaType: detail.mediaType,
              mediumType: detail.mediumType,
              followerNumber: detail.followerNumber,
              mainAudienceType: detail.mainAudienceType
            })
          })
        })

        // console.log({ fetchedInfluencers, fetchedDetails });

        // renderFactory(allInfluencers)
      }
      catch (error) {
        console.log("fetch influencers: ", error)
      }
    }

    fetchProviders(authUser.id)
    fetchAllInfluencers(authUser.id)

  }, [])

  useEffect(() => {
    localStorage.setItem(`${PAGE_PREFIX}0`, JSON.stringify(influencers))
  }, [influencers])

  useEffect(() => {
    localStorage.setItem(`${PAGE_PREFIX}1`, JSON.stringify(details))
  }, [details])

  const filterSubMedium = (detail) => {
    let subfiltered = [{ label: 'No Options', value: null }]
    if (detail.mediaType) {
      subfiltered = MEDIUM_TYPES
        .filter(md => md.typeId === (TYPES.find(t => t.value === detail.mediaType))?.id)

      if (subfiltered.length > 0) {
        return subfiltered.map(row => ({ label: row.label, value: row.value }))
      }
    }
    return subfiltered
  }

  const handleSaves = async () => {
    const requests = requestsFactory(influencers, details)

    commitLoadingStatus(true)

    const res = await saveInfluencers(adminProvider.id, requests)

    commitLoadingStatus(false)

    if (res) {
      toast.success(MESSAGES.save_data_success, { position: 'top-right' })
    }
    else {
      toast.success(MESSAGES.server_error, { position: 'top-right' })
    }
  }

  return (
    <DashboardLayout>
      
      <InfluencersWrapper>
        <SimpleBar style={{maxHeight: panelHeight}}>
        <ExplanationWrapper>
          <div className="title-note">Be our influencer or brand ambassador</div>
          <ul>
            <li>Promote our products and services</li>
            <li>On social media, Press, TV, podcast, talks, presentations, etc.</li>
            <li>Must sign up a minimum of 100 providers/clinicians in the first year</li>
            <li>Earn additional 5% discount on the monthly charge for 1 year for every 100 providers/clinicians signed up, e.g. sign up 500 clinicians, additional 25% discount for 1 year</li>
            <li>And earn referral fees for every provider/clinician who signs up.</li>
            <li>Discounts and fees earned apply only to the influencer/brand ambassador provider/clinician </li>
            <li>New providers/clinicians subscribers must maintain their subscriptions continuously for a minimum of 3 months before credits will be applied</li>
            <li>Terms, conditions and limitations apply</li>
          </ul>
          <AudienceTableWrapper>
            <div className="table-header">
              <div className="header-row">
                <div className="col-title"></div>
                <div className="col-span">Audience</div>
                <div className="col-action"></div>
                <div className="col-add"></div>
              </div>
              <div className="header-row">
                <div className="col-title">Provider/clinician influencer/<br />brand ambassador</div>
                <div className="col">Providers/<br />clinicians</div>
                <div className="col">Payers</div>
                <div className="col">Employers</div>
                <div className="col">Patients</div>
                <div className="col-action"></div>
                <div className="col-add"></div>
              </div>
            </div>
            <div className="table-body">
              <AudienceTBodyComponent
                influencers={influencers}
                providerList={providerList}
                menuWidth={menuWidth}
                menuHeight={menuHeight}
                influencerDispatch={influencerDispatch}
              />
            </div>
          </AudienceTableWrapper>
        </ExplanationWrapper>

        <MediumTypeDetailWrapper>
          <div className="title-note">Details of medium type and followers</div>
          <MediumTypeTableWrapper>
            <div className="table-header">
              <div className="row">
                <div className="col-title">Provider/clinician</div>
                <div className="col">Type</div>
                <div className="col">Medium</div>
                <div className="col">No. of followers</div>
                <div className="col">Main audience</div>
                <div className="col-action"></div>
              </div>
            </div>
            <div className="table-body">
              {details && details.length > 0 && details.map((row, i) => (
                <div key={i} className="row">
                  <div className="col-title">
                    <CustomDropDownComponentNoBorder
                      row={row}
                      menuWidth={'160px'}
                      menuHeight={'20px'}
                      dispatchType={ACTIONS.SELECT_PROVIDER}
                      detailDispatch={detailDispatch}
                      options={influencers
                        .filter(row => row.selectedProviderId !== null)
                        .map(row => ({
                          label: (providerList.find(p => p.id === row.selectedProviderId))?.fullName,
                          value: row.selectedProviderId
                        }))
                      }
                      selectedValue={row?.selectedProviderId}
                    />
                  </div>
                  <div className="col">
                    <CustomDropDownComponentNoBorder
                      row={row}
                      menuWidth={'100px'}
                      menuHeight={'20px'}
                      dispatchType={ACTIONS.SELECT_TYPE}
                      detailDispatch={detailDispatch}
                      options={TYPES.map(type => ({ label: type.label, value: type.value }))}
                      selectedValue={row?.mediaType}
                    />
                  </div>
                  <div className="col">
                    <CustomDropDownComponentNoBorder
                      row={row}
                      menuWidth={'100px'}
                      menuHeight={'20px'}
                      dispatchType={ACTIONS.SELECT_MEDIUM}
                      detailDispatch={detailDispatch}
                      options={filterSubMedium(row)}
                      selectedValue={row?.mediumType}
                    />
                  </div>
                  <div className="col">
                    <input
                      className="count-follow-input"
                      type={'number'}
                      name="follow number"
                      value={row.followerNumber}
                      onChange={(e) => detailDispatch({
                        type: ACTIONS.INPUT_FOLLOWER_NUMBER,
                        payload: {
                          rowId: row.id,
                          followerNumber: e.target.value
                        }
                      })}
                      placeholder={'000'}
                    />
                  </div>
                  <div className="col">
                    <CustomDropDownComponentNoBorder
                      row={row}
                      menuWidth={'100px'}
                      menuHeight={'20px'}
                      dispatchType={ACTIONS.SELECT_MAIN_AUDIENCE}
                      detailDispatch={detailDispatch}
                      options={MAIN_AUDIENCE.map(main => ({ label: main.label, value: main.value }))}
                      selectedValue={row?.mainAudienceType}
                    />
                  </div>
                  <div className="col-action">
                    <div className="button-group">
                      <Image
                        src={ICONS.editUnderline}
                        width={12} height={15}
                        layout={'fixed'}
                      />
                      <Image
                        src={ICONS.redClose}
                        width={15} height={15}
                        layout={'fixed'}
                        onClick={() => detailDispatch({
                          type: ACTIONS.ROW_DELETE,
                          payload: { rowId: row.id }
                        })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <AddButtonWrapper>
              <div className="add-one">
                <ButtonWrapper
                  onClick={() => detailDispatch({
                    type: ACTIONS.ROW_ADD,
                    payload: null
                  })}
                >Add another</ButtonWrapper>
              </div>
              <div className="save-all-wrapper">
                <div className="button-group">
                  <button className="cancel">Cancel</button>
                  <button
                    disabled={!enableSaveAllButton(influencers, details)}
                    className={enableSaveAllButton(influencers, details) ? 'active save' : 'save'}
                    onClick={handleSaves}
                  >Save All</button>
                </div>
              </div>
            </AddButtonWrapper>
          </MediumTypeTableWrapper>
          <DetailWrapper>
            <div className="title-note">Instructions</div>
            <ol>
              <li>Select Type - choices are Social media, Press, Talks/presentations</li>
              <li>Choices in Medium are based on selection in Type</li>
              <li>Social media - choices are Twitter, Facebook, Instagram, WhatsApp, Tik Tok, YouTube, Snap</li>
              <li>Press - choices are Print regular, Print specialty (journals, publications), TV local, TV national, Radio, Podcast</li>
              <li>Talks/presentations - choices are General (non-medical), Specialty (medical, specialties)</li>
              <li>Main audience - choices are Providers/clinicians, Payers, Employers, Patients.</li>
            </ol>
          </DetailWrapper>
        </MediumTypeDetailWrapper>
        </SimpleBar>
      </InfluencersWrapper>
    </DashboardLayout>
  )
}

function AudienceTBodyComponent(props) {
  const {
    influencers,
    providerList,
    menuWidth,
    menuHeight,
    influencerDispatch,
  } = props

  return (
    <>
      {influencers && influencers.length > 0 && influencers.map((influencer, i) => (
        <div key={i} className="table-row">
          <div className="col-title">
            <CustomDropDownComponent
              influencer={influencer}
              influencerDispatch={influencerDispatch}
              menuWidth={menuWidth}
              menuHeight={menuHeight}
              options={providerList.map(pvd => ({ value: pvd.id, label: pvd.fullName }))}
              selectedValue={influencer.selectedProviderId}
            />
            <div className="top-label">Provider</div>
          </div>
          <div className="col">
            <input
              className="custom-checkbox"
              type={'checkbox'}
              checked={influencer.isProviders}
              value={influencer.isProviders}
              onChange={() => influencerDispatch({
                type: ACTIONS.CHANGE_AUDIENCE,
                payload: {
                  influencerId: influencer.id,
                  field: 'isProviders'
                }
              })}
            />
          </div>
          <div className="col">
            <input
              className="custom-checkbox"
              type={'checkbox'}
              checked={influencer.isPayers}
              value={influencer.isPayers}
              onChange={() => influencerDispatch({
                type: ACTIONS.CHANGE_AUDIENCE,
                payload: {
                  influencerId: influencer.id,
                  field: 'isPayers'
                }
              })}
            />
          </div>
          <div className="col">
            <input
              className="custom-checkbox"
              type={'checkbox'}
              checked={influencer.isEmployers}
              value={influencer.isEmployers}
              onChange={() => influencerDispatch({
                type: ACTIONS.CHANGE_AUDIENCE,
                payload: {
                  influencerId: influencer.id,
                  field: 'isEmployers'
                }
              })}
            />
          </div>
          <div className="col">
            <input
              className="custom-checkbox"
              type={'checkbox'}
              checked={influencer.isPatients}
              value={influencer.isPatients}
              onChange={() => influencerDispatch({
                type: ACTIONS.CHANGE_AUDIENCE,
                payload: {
                  influencerId: influencer.id,
                  field: 'isPatients'
                }
              })}
            />
          </div>
          <div className="col-action">
            <div className="button-group">
              <Image
                src={ICONS.editUnderline}
                width={12} height={15}
                layout={'fixed'}
              />
              <Image
                src={ICONS.redClose}
                width={15} height={15}
                layout={'fixed'}
                onClick={() => influencerDispatch({ type: ACTIONS.ROW_DELETE, payload: { deleteId: influencer.id } })}
              />
            </div>
          </div>
          <div className="col-add">
            {i === influencers.length - 1 &&
              <ButtonWrapper
                onClick={() => influencerDispatch({ type: ACTIONS.ROW_ADD, payload: null })}
              >Add another</ButtonWrapper>
            }
          </div>
        </div>
      ))}
    </>
  )
}


function CustomDropDownComponent(props) {
  const {
    influencer,
    influencerDispatch,
    menuWidth,
    menuHeight,
    options,
    selectedValue
  } = props
  return (
    <Select
      styles={{
        indicatorSeparator: () => { }, // removes the "stick"
        control: (css) => ({
          ...css,
          width: menuWidth || "auto",
          height: menuHeight,
          opacity: menuWidth ? 1 : 0
        }),
        menu: ({ width, ...css }) => ({
          ...css,
          width: "max-content",
          minWidth: menuWidth
        }),
      }}
      components={{ DropdownIndicator }}
      defaultValue={options && options.find(item => item.value == selectedValue) || null}
      onChange={(newValue) => influencerDispatch({
        type: ACTIONS.CHOOSE_PROVIDER,
        payload: {
          influencerId: influencer.id,
          providerId: newValue.value
        }
      })}
      options={options}
    />
  )
}


function CustomDropDownComponentNoBorder({
  row,
  dispatchType,
  detailDispatch,
  menuWidth,
  menuHeight,
  options,
  selectedValue,
}) {
  return (
    <Select
      styles={{
        indicatorSeparator: () => { }, // removes the "stick"
        control: (css) => ({
          ...css,
          width: menuWidth || "auto",
          height: menuHeight,
          border: 'none',
          outline: 'none',
          borderRadius: '0',
          boxShadow: 'none',
          forcedColorAdjust: "none",
          opacity: menuWidth ? 1 : 0
        }),
        menu: (provided, state) => ({
          ...provided,
          width: "max-content",
          outline: "none",
          minWidth: menuWidth
        }),
      }}
      components={{ DropdownIndicator }}
      defaultValue={options.find(item => item.value === selectedValue)}
      onChange={(newValue) => detailDispatch({
        type: dispatchType,
        payload: {
          rowId: row.id,
          value: newValue.value
        }
      })}
      options={options}
    />
  )
}


export default Influencer