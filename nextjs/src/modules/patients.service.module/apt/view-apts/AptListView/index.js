import Link from "next/link";
import { useReducer, useState } from "react";

import useWindowDimensions from "../../../../../common/hooks/useWindowDimensions";
import SlideTab from "../shared/SlideTab";
import {
  HEADER_HEIGHT,
  MAIN_BODY_PADDING_Y
} from "../../make-apt/shared/constants";
import AptButton from "../../shared/AptButton";
import AptCard from "../shared/apt-card";
import AptCardListComponent from "../shared/AptCardListComponent";
import Calendar from '../shared/Calendar';
import {
  APT_STATUS,
  APT_TYPE_TO_SEARCH,
  VIEW_TYPE,
  AptList
} from "../shared/data";
import {
  AptListViewWrapper,
  TabsWrapper,
  ProviderSearchLink,
  AptTypeWrapper,
  CalendarViewWrapper
} from "./styled";
import { useEffect } from "react";
import moment from "moment";


export default function ViewApts({ apts, setApts, onViewPreparations, onViewTransactionHistory, onReschedule, onCancel, onRepeatApt, onMakeNewApt, numApts }) {
  const { height } = useWindowDimensions()
  const sectionHeight = height
    - HEADER_HEIGHT
    - 2 * MAIN_BODY_PADDING_Y
  const sectionPaddingY = 15;
  const providerSearchBtnHeight = 44;
  const headingHeight = 42;
  const tabsHeight = 115;
  const searchToAptTypeHeight = 124;
  const cardListHeightOnDesktop = sectionHeight - 
    - 2 * sectionPaddingY
    - providerSearchBtnHeight
    - headingHeight
    - tabsHeight
    - searchToAptTypeHeight - 60

  const [selectedAptStatus, setSelectedStatusType] = useState(APT_STATUS.ACTIVE);
  const [selectedViewType, setSelectedViewType] = useState(VIEW_TYPE.LIST_VIEW);
  const [selectedAptType, setSelectedAptType] = useState(APT_TYPE_TO_SEARCH.ALL);



  const aptStatusTabProps = {
    tabs: [
      {
        id: APT_STATUS.ACTIVE,
        name: 'Active appointments',
      }, {
        id: APT_STATUS.ARCHIVED,
        name: 'Archived',
      },
    ],
    selectedTabId: selectedAptStatus,
    setActiveTab: setSelectedStatusType
  }

  const viewTypeTabProps = {
    tabs: [
      {
        id: VIEW_TYPE.LIST_VIEW,
        name: 'List'
      }, {
        id: VIEW_TYPE.CALENDAR_VIEW,
        name: 'Calendar'
      }
    ],
    selectedTabId: selectedViewType,
    setActiveTab: setSelectedViewType
  }


  useEffect( () => {
    if (selectedAptType != APT_TYPE_TO_SEARCH.ALL) {
      console.log(selectedAptType)
    }
  },[selectedAptType])

  const handleGoProviderSearch = () => {
    localStorage.setItem('parentUrl','/patients/appointment/view-apts');
  }

  return (
    <div className="section">
      <AptListViewWrapper>
        <div className="header-desktop">All apointments</div>
        <ProviderSearchLink>
          <Link href={'/patients/provider-search'} passHref >
            <button className="transparent-btn-jin" onClick={handleGoProviderSearch}>Provider search</button>
          </Link>
        </ProviderSearchLink>
        <TabsWrapper>
          <div className="apt-status-tab">
            <SlideTab
              {...aptStatusTabProps}
            />
          </div>
          {selectedAptStatus == APT_STATUS.ACTIVE && (
            <div className="view-type-tab">
              <SlideTab
                {...viewTypeTabProps}
                tabType={'UNDERLINE_TAB'}
              />
            </div>
          )}
        </TabsWrapper>
        {selectedAptStatus == APT_STATUS.ACTIVE && (
          <AptTypeWrapper>
            <div className="all">
              <button 
                className={`transparent-btn-jin${selectedAptType != APT_TYPE_TO_SEARCH.ALL ? ' active' : ''}`}
                onClick={() => setSelectedAptType(APT_TYPE_TO_SEARCH.ALL)}
              >All Appointments</button>
            </div>
            <div className="btn-group">
              <AptButton
                aptType={ APT_TYPE_TO_SEARCH.PREFERRED }
                btnText={'Preferred'}
                isActive={selectedAptType == APT_TYPE_TO_SEARCH.PREFERRED ? true : false}
                onClick={() => setSelectedAptType(APT_TYPE_TO_SEARCH.PREFERRED)}
                missed={numApts.preferred}
              />
              <AptButton
                aptType={ APT_TYPE_TO_SEARCH.URGENT }
                btnText={'Urgent'}
                isActive={selectedAptType == APT_TYPE_TO_SEARCH.URGENT ? true : false}
                onClick={() => setSelectedAptType(APT_TYPE_TO_SEARCH.URGENT)}
                missed={numApts.urgent}
              />
              <AptButton
                aptType={ APT_TYPE_TO_SEARCH.WAIT_LIST }
                btnText={'Wait list'}
                isActive={selectedAptType == APT_TYPE_TO_SEARCH.WAIT_LIST ? true : false}
                onClick={() => setSelectedAptType(APT_TYPE_TO_SEARCH.WAIT_LIST)}
                missed={numApts.waitlist}                
              />
              <AptButton
                aptType={ APT_TYPE_TO_SEARCH.MISSED }
                btnText={'Missed'}
                isActive={selectedAptType == APT_TYPE_TO_SEARCH.MISSED ? true : false}
                onClick={() => setSelectedAptType(APT_TYPE_TO_SEARCH.MISSED)}
                missed={numApts.missed}
                />              
            </div>
          </AptTypeWrapper>
        )}
        {(selectedAptStatus == APT_STATUS.ARCHIVED || viewTypeTabProps.selectedTabId == VIEW_TYPE.LIST_VIEW) && (
          <AptCardListComponent
            cardListHeightOnDesktop={cardListHeightOnDesktop}
          >
            {apts.map(apt => {

              if (
                  selectedAptType!=APT_TYPE_TO_SEARCH.ALL && 
                  selectedAptType!=APT_TYPE_TO_SEARCH.MISSED &&
                  moment(apt.aptDate).isBefore(moment(new Date()).format("YYYY-MM-DD"))) 
                return;

              if (selectedAptType==APT_TYPE_TO_SEARCH.MISSED && moment(apt.aptDate).isBefore(moment(new Date()).format("YYYY-MM-DD"))) {
                return (
                  <AptCard 
                    key={apt.id} 
                    apt={apt}
                    setApt={(v) => setApts(apts.map(u => u.id == apt.id ? v : u))}
                    onViewPreparations={onViewPreparations}
                    onViewTransactionHistory={onViewTransactionHistory}
                    onReschedule={() => onReschedule(apt)}
                    onCancel={() => onCancel(apt)}
                    onRepeatApt={ () => onRepeatApt(apt) }
                    onMakeNewApt= { () => onMakeNewApt(apt) }
                    missed={true}
                  />
                )
              }
              if (selectedAptStatus == APT_STATUS.ACTIVE && apt.aptState != 'ACTIVE')
                return;
              if (selectedAptStatus == APT_STATUS.ARCHIVED && apt.aptState == 'ACTIVE')
                return;
              if (selectedAptType == APT_TYPE_TO_SEARCH.ALL || 
                  apt.aptType == selectedAptType                   
                ) {
                return (
                  <AptCard 
                    key={apt.id} 
                    apt={apt}
                    setApt={(v) => setApts(apts.map(u => u.id == apt.id ? v : u))}
                    onViewPreparations={onViewPreparations}
                    onViewTransactionHistory={onViewTransactionHistory}
                    onReschedule={() => onReschedule(apt)}
                    onCancel={() => onCancel(apt)}
                    onRepeatApt={ () => onRepeatApt(apt) }
                    onMakeNewApt= { () => onMakeNewApt(apt) }
                    missed={moment(apt.aptDate).isBefore(moment(new Date()).format("YYYY-MM-DD"))?true:false}
                  />
                )
              }
            })}
          </AptCardListComponent>
        )}
        {selectedAptStatus == APT_STATUS.ACTIVE && viewTypeTabProps.selectedTabId == VIEW_TYPE.CALENDAR_VIEW && (
          <CalendarViewWrapper>
            <div className="headline">Click the appointment card to view more information</div>
            <Calendar 
              apts={apts} 
              setApts={setApts} 
              selectedAptType={selectedAptType} 
              onViewPreparations={onViewPreparations} 
              onViewTransactionHistory={onViewTransactionHistory}
              onReschedule={onReschedule}
              onCancel={onCancel}
            />
          </CalendarViewWrapper>
        )}
      </AptListViewWrapper>
    </div>
  )
}
