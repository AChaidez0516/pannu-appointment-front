import Image from "next/image";
import { useState, useEffect, useReducer } from "react";
import { ICONS } from "../../../../common/utils/styleGuide";
import {
  getUserDetailWithQuery,
  updateInsurancePlan,
  getFRParty,
  updateUser
} from "../../../../common/lib/user";
import { AddressType } from "../../../../components/autocomplete";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import AptInfoComponent from "../../../../components/AptInfoComponent";
import ResponsibleParty from "../../../user.module/insurance/responsible-party";
import { RESPONSIBLE_PARTY_KEYS, RPARTY_RELATIONSHIPS, RPARTY_RELATIONSHIP_KEY, } from '../../../user.module/insurance/index/data'
import ConfirmDelete from "../../../user.module/insurance/shared/modals/ConfirmDelete";
import Header from "../../shared/header";
import {
  AppointmentWrapper,
  LeftWrapper,
  ButtonOrder,
  ButtonsBottomRow,
  LinkButton,
} from "./styled";
import { getUserDetail } from "../../../../common/lib/user";
import { useRouter } from "next/router";
import ProviderInfoComponent from "../../../../components/ProviderInfoComponent";
import IdentificationInfo from "../../../../components/IdentificationInfo";
import InsurancePlanTable from "../../../../components/InsurancePlanTable";
import InsuranceInformation from "../../../../components/InsuranceInformation";
import Insurance from "../insurance";
import { useResponsibleParty, useResponsiblePartyType } from '../../../../redux/hooks/useInsuranceStore'
import InsurancePlanTableOrder from "../../../../components/InsurancePlanTableOrder";
import LoadingButton from "../../../../components/Button/LoadingButton";

const requiredClass = "required";
var currentAddressType = null;

function AppointmentData() {
  const router = useRouter();
  const headerProps = {
    title: "Appointment",
    backUrl: localStorage.getItem("parentUrl")
      ? localStorage.getItem("parentUrl")
      : "/auth/login/",
    countOfNotifications: 20,
  };
  const [isUsername, setIsUsername] = useState(true);
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState("");

  const { responsiblePartyType, commitResponsiblePartyType } = useResponsiblePartyType()
  const { responsibleParty, initResponsibleParty, updateResponsibleParty, commitResponsibleParty } = useResponsibleParty()

  const initData = {
    planName: "",
    planIssuer: "",
    effectiveDate: "",
    nameOnCard: "",
    memberId: "",
    planAddress: "",
    groupPlanId: "",
    patientSupportPhoneNumber: "",
    providerSupportPhoneNumber: "",
  };

  const INSURANCE_DATA_ACTION_TYPES = {
    UPDATE_SINGLE: "UPDATE_SINGLE",
    UPDATE_INSURANCE_DATA: "UPDATE_INSURANCE_DATA",
  };

  const reducerData = (state, { type, payload }) => {
    switch (type) {
      case INSURANCE_DATA_ACTION_TYPES.UPDATE_SINGLE:
        return { ...state, [payload.key]: payload.value };
      case INSURANCE_DATA_ACTION_TYPES.UPDATE_INSURANCE_DATA:
        return { ...state, ...payload };
      default:
        return state;
    }
  };

  const updateSingle = (key, value) => ({
    type: INSURANCE_DATA_ACTION_TYPES.UPDATE_SINGLE,
    payload: { key, value },
  });

  const [insuranceData, dispatchData] = useReducer(reducerData, initData);
  const [showUname, setShowUname] = useState(false);
  const [invalidPlanName, setInvalidPlanName] = useState(false);
  const [validAddress, setValidAddress] = useState(false);
  const [insuranceInfos, setInsuranceInfos] = useState([]);
  const [rollOverRefund, setRollOverRefund] = useState(true);
  const [editInsuranceData, setEditInsuranceData] = useState({});
  const [alertPropsToDelete, setAlertPropsToDelete] = useState(null);
  const [appointmentStatus, setAppointmentStatus] = useState(0);
  const [isChangeOrder, setIsChangeOrder] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const initiate = async () => {
    const query = `
    id
    fullName
    basicData {
        currentAddress
    }
    insuranceInfos {
        id
        planName
        planIssuer
        effectiveDate
        subscriberName
        memberId
        planAddress
        groupPlanId
        patientPhoneNumber
        providerPhoneNumber
    }
    `;
    let userData = await getUserDetailWithQuery(1, query);
    if (!userData) {
      userData = {};
    } else {
      setValue(
        "patientSupportPhoneNumber",
        userData.insuranceInfos[0].patientPhoneNumber
          ? userData.insuranceInfos[0].patientPhoneNumber
          : ""
      );
      setValue(
        "providerSupportPhoneNumber",
        userData.insuranceInfos[0].providerPhoneNumber
          ? userData.insuranceInfos[0].providerPhoneNumber
          : ""
      );
    }
    setUsername(userData.fullName);
    setAddress(userData.basicData?.currentAddress);
    setUserId(userData.id);
    setInsuranceInfos(userData.insuranceInfos ?? []);

    let frpData = await getFRParty(1);
    initResponsibleParty();
    if (frpData) {
      commitResponsibleParty({
        fullName: frpData.fullName,
        address: frpData.address,
        phoneNumber: frpData.phoneNumber,
        isFetched: true,
        relationship: frpData.relation ? frpData.relation : RPARTY_RELATIONSHIP_KEY.PARENT,
        responsiblePartyType: frpData.type == 'OTHER' ? RESPONSIBLE_PARTY_KEYS.OTHER : RESPONSIBLE_PARTY_KEYS.ME,
      })
    }

    const mockInsuranceInfos = [
      {
        plans:[
          {
            planName: "Abc Insurance company",
            memberId: "***123",
            groupPlanId: "**12"
          }
        ],
        priority: "1",
      },
      {
        plans:[
          {
            planName: "DEF Insurance company",
            memberId: "***456",
            groupPlanId: "**34"
          }
        ],
        priority: "2",
      },
      {
        plans:[
          {
            planName: "GHI Insurance company",
            memberId: "***789",
            groupPlanId: "**56"
          }
        ],
        priority: "3",
      },
    ]

    // setInsuranceInfos(mockInsuranceInfos); // set Mockdata
    setInsuranceInfos(userData.insuranceInfos ?? []);
  };

  useEffect(async () => {
    await initiate();
  }, []);

  const {
    control,
    handleSubmit,
    clearErrors,
    getValues,
    setValue,
    setError,
    formState: { errors: frontErrors },
  } = useForm({
    defaultValues: {
      id: "",
      planName: "",
      planIssuer: "",
      effectiveDate: "",
      nameOnCard: "",
      planAddress: "",
      groupPlanId: "",
      patientSupportPhoneNumber: "",
      providerSupportPhoneNumber: "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onInvalidAddress = (isInvalid) => {
    if (isInvalid && currentAddressType != AddressType.GOOGLE) {
      setError("mainAddress", {
        message: "Please enter a valid USPS serviceable address",
      });
      setValidAddress(false);
      return;
    }
    clearErrors("mainAddress");
    setValidAddress(true);
  };

  const cancel = () => {
    router.push("/manual/auth");
  };

  const checkOut = async () => {
    router.push("/manual/payment");
  };

  const reschedule = () => {
    router.push("/manual/appointment/available-apts");
  };

  const cancelAppointment = () => {
    router.push("/manual/cancel");
  };

  const editInsurance = (editId) => {
    setAppointmentStatus(2);
    setEditInsuranceData(insuranceInfos[editId].plans[0]);
  };

  const addInsuranceData = () => {
    setAppointmentStatus(1);
    setEditInsuranceData({});
  };

  const confirmDeleteInsuranceData = (deleteId) => {
    const insuranceDataToDelete = insuranceInfos.find(
      (data) => data.plans[0].id === deleteId
    );
    setAlertPropsToDelete({
      isOpened: true,
      id: deleteId,
      message: `Are you sure you want to delete ${insuranceDataToDelete?.plans[0].planName}?`,
    });
  };

  const removeInsuranceData = () => {
    setAlertPropsToDelete(null);
  };

  const updateInsuranceData = (mode, updatedData) => {
    if (mode == 1) {
      setAppointmentStatus(0);
    } else if (mode == 2) {
      const rltData = {
        planName: updatedData.planName,
        planIssuer: updatedData.planIssuer,
        nameOnCard: updatedData.nameOnCard,
        memberId: updatedData.memberId,
        planAddress: updatedData.planAddress,
        groupPlanId: updatedData.groupPlanId,
        effectiveDate: updatedData.effectiveDate,
        patientSupportPhoneNumber: updatedData.patientSupportPhoneNumber,
        providerSupportPhoneNumber: updatedData.providerSupportPhoneNumber,
      };
      updateInsurancePlan(updatedData.id, rltData)
        .then(async () => {
          await initiate();
          setAppointmentStatus(0);
        })
        .catch((e) => {
          console.log("error", e);
        });
    }
  };

  return (
    <AppointmentWrapper>
      {appointmentStatus == 0 ? (
        <>
          <Header {...headerProps} />
          <LeftWrapper>
            <ProviderInfoComponent providerId={16} hideHMO={true} />
            <AptInfoComponent
              aptId={2}
              showRescheduleAndCancelBtns={true}
              isNotCancel={true}
            />
            <IdentificationInfo
              username={username}
              setUsername={setUsername}
              address={address}
              setAddress={setAddress}
            />
            <InsuranceInformation />
            <InsurancePlanTable
              insuranceInfos={insuranceInfos}
              editInsurance={editInsurance}
              confirmDeleteInsuranceData={confirmDeleteInsuranceData}
              rollOverRefund={rollOverRefund}
              setRollOverRefund={setRollOverRefund}
            />
            
            {!isChangeOrder && (
              <ButtonOrder>
                <LinkButton
                    className="normal"                  
                    onClick={() => setIsChangeOrder(true)}
                  >
                    Change order of insurances
                </LinkButton>
              </ButtonOrder>
            )}

            {!isChangeOrder? (
              <InsurancePlanTable
                insuranceInfos={insuranceInfos}
                editInsurance={editInsurance}
                confirmDeleteInsuranceData={confirmDeleteInsuranceData}
                rollOverRefund={rollOverRefund}
                setRollOverRefund={setRollOverRefund}
              />
              ):(
              <InsurancePlanTableOrder
                insuranceInfos={insuranceInfos}
                editInsurance={editInsurance}
                confirmDeleteInsuranceData={confirmDeleteInsuranceData}
                rollOverRefund={rollOverRefund}
                setRollOverRefund={setRollOverRefund}
              />
              )
            }
            <ButtonsBottomRow>
              <LinkButton
                style={{ fontSize: "16px" }}
                onClick={() => addInsuranceData()}
              >
                Add more insurances
              </LinkButton>
              <LoadingButton isLoading={isLoading}>
                <LinkButton className="big strong" onClick={() => checkOut()}>
                  Done
                </LinkButton>
              </LoadingButton>
            
            </ButtonsBottomRow>
          </LeftWrapper>
          <ConfirmDelete
            {...alertPropsToDelete}
            onRemove={removeInsuranceData}
            onCancel={() => setAlertPropsToDelete(null)}
          />
        </>
      ) : (
        <Insurance
          appointmentStatus={appointmentStatus}
          editInsuranceData={editInsuranceData}
          setAppointmentStatus={setAppointmentStatus}
          updateInsuranceData={updateInsuranceData}
        />
      )}
    </AppointmentWrapper>
  );
}

export default AppointmentData;
