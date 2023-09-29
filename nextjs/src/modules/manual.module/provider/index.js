import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useWindowDimensions, {
  DEVICE_TYPE,
} from "../../../common/hooks/useWindowDimensions";
import {
  filterAppointment,
  getAppointmentDetail,
  getAptDateByPrevdate
} from "../../../common/lib/appointment";
import { getLocationsByProviderId } from "../../../common/lib/provider";
import { GlobalLoading } from "../../../components/GlobalLoading";
import ProviderAppointmentCalendar from "./calendar";
import AppointmentDetails from "./details";
import FollowUpAppointment from "./followup";
import { SCREENS, SHOW_SECTIONS } from "./shared/data";
import { Layout } from "./shared/Layout";
import { APT_DETAIL, APT_LIST } from "./shared/mock";

export const ProviderApt = ({ providerId }) => {
  const INIT_FILTER = {
    providerUserId: providerId,
    dateRange: {
      startDate: moment().format("YYYY-MM-DD"),
      endDate: moment().format("YYYY-MM-DD"),
    },
    locationId: null,
  };
  const route = useRouter();
  const { device } = useWindowDimensions();

  const [filter, setFilter] = useState(INIT_FILTER);
  const [showSection, setShowSection] = useState(SHOW_SECTIONS);
  const [apts, setApts] = useState(null);
  const [aptDetail, setAptDetail] = useState(null);
  const [timeBlockName, setTimeBlockName] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isChangedApt, setIsChangedApt] = useState(false);
  const [locations, setLocations] = useState([]);
  const [editBox, setEditBox] = useState({ type: "", show: false });
  const [newTitle, setNewTitle] = useState("");

  /** state to switch mock/real */
  const [isMock, setIsMock] = useState(false); // set "true" when mock data is used

  useEffect(() => {
    const fetchLocationsByProviderId = async () => {
      try {
        const res = await getLocationsByProviderId(parseInt(providerId));
        setLocations(res);
        const locationId = 52; // set the default location
        setFilter({
          ...filter,
          locationId,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocationsByProviderId();
  }, []);

  useEffect(() => {
    const fetchFilterdApts = async () => {
      try {
        if (isMock) {
          setApts(APT_LIST);
        } else {

          const apts = await filterAppointment(filter);
          if (apts.length == 0) {
            handlePrevDate()
          }
          apts.sort(
            (a, b) =>
              new Date(`${a.aptDate}T${a.aptTime}`).getTime() -
              new Date(`${b.aptDate}T${b.aptTime}`).getTime()
          );
          setApts(apts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFilterdApts();
  }, [filter, isMock]);

  const handlePrevDate = async() => {
    const INIT_FILTER = {
      providerUserId: filter.providerUserId,
      dateRange: {
        startDate: filter.dateRange.startDate,
        endDate: filter.dateRange.endDate
      }
    }
    const prevDate = await getAptDateByPrevdate(INIT_FILTER)
    if (prevDate != null) {
      setFilter({
        ...filter,
        dateRange: {
          "startDate": prevDate,
          "endDate": prevDate
        }
      })
    }
  }

  const fetchAptDetail = async (aptId) => {
    try {
      if (isMock) {
        setAptDetail(APT_DETAIL);
      } else {
        const aptDetail = await getAppointmentDetail(aptId);
        setAptDetail(aptDetail);
      }
    } catch (error) {
    } finally {
    }
  };

  const shouldShowSection = (sectionName) => {
    if (device === DEVICE_TYPE.DESKTOP) {
      return showSection.find((ss) => ss.name === sectionName).show;
    }
    return showSection.find((ss) => ss.name === sectionName).current;
  };

  const changeCurrentScreen = (screenName) => {
    const targetSection = showSection.find((ss) => ss.name === screenName);
    const _showSection = showSection.map((s) => ({
      ...s,
      show: s.id <= targetSection.id,
      current: s.id === targetSection.id,
    }));
    setShowSection(_showSection);
  };

  const goToHomeScreen = () => {
    changeCurrentScreen(SCREENS.HOME);
  };

  const goToDetails = async (id) => {
    await fetchAptDetail(id);
    changeCurrentScreen(SCREENS.DETAILS);
  };

  const goToFolowUp = async (id) => {
    if (!aptDetail) {
      await fetchAptDetail(id);
    }

    if (isMock) {
      setAptDetail(APT_DETAIL);
    }
    changeCurrentScreen(SCREENS.FOLLOWUP);
  };

  const goToEditor = () => {
    changeCurrentScreen(SCREENS.EDITOR);
  };

  const layoutProps = {
    showSection,
    goToHomeScreen,
    goToDetails,
  };

  if (loading) {
    /** maybe global loading later */
    return <GlobalLoading />;
  }

  return (
    <Layout {...layoutProps}>
      {shouldShowSection(SCREENS.HOME) && (
        <ProviderAppointmentCalendar
          goToFolowUp={goToFolowUp}
          apts={apts}
          setApts={setApts}
          filter={filter}
          setFilter={setFilter}
          timeBlockName={timeBlockName}
          setTimeBlockName={setTimeBlockName}
          selectedApt={aptDetail}
          title={showSection.find((s) => s.name === SCREENS.HOME).title}
          onArrowBack={() => route.push("/auth/login/")}
          locations={locations}
        />
      )}

      {shouldShowSection(SCREENS.FOLLOWUP) && (
        <FollowUpAppointment
          aptDetails={aptDetail}
          setAptDetail={setAptDetail}
          goToHomeScreen={goToHomeScreen}
          goToDetails={goToDetails}
          isMock={isMock}
          setIsChangedApt={setIsChangedApt}
          title={showSection.find((s) => s.name === SCREENS.FOLLOWUP).title}
          onArrowBack={() => goToDetails(aptDetail?.id)}
          editBox={editBox}
          setEditBox={setEditBox}
          setNewTitle={setNewTitle}
        />
      )}
      {shouldShowSection(SCREENS.DETAILS) && (
        <AppointmentDetails
          aptDetails={aptDetail}
          filter={filter}
          setFilter={setFilter}
          setAptDetail={setAptDetail}
          goToHomeScreen={goToHomeScreen}
          goToDetails={goToDetails}
          isMock={isMock}
          setIsChangedApt={setIsChangedApt}
          title={showSection.find((s) => s.name === SCREENS.DETAILS).title}
          onArrowBack={() => goToDetails(aptDetail?.id)}
          editBox={editBox}
          setEditBox={setEditBox}
          setNewTitle={setNewTitle}
          locations={locations}
        />
      )}
      {/* {editBox.show &&  (
        <RichTextEditor
          title={showSection.find(s => s.name === SCREENS.EDITOR).title}
          onArrowBack={() => goToFolowUp()}
          editBox={editBox}
          setEditBox={setEditBox}
          newTitle={newTitle}
          setNewTitle={setNewTitle}
        />
      )} */}
    </Layout>
  );
};
