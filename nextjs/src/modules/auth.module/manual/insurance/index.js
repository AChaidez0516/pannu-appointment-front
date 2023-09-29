import {
  AppointmentWrapper,
  LeftWrapper,
  InputFieldLabel,
  Flex,
} from "../appointment/styled";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  PlantypeWrapper,
  ContentLB,
  MaskInput,
  FooterWrapper,
  HeaderWrapper,
} from "./styled";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { ICONS } from "../../../../common/utils/styleGuide";

import { FormControllWrapper } from "../../../../components/input/styled";
import {
  AutoCompleteComponent,
  AddressType,
} from "../../../../components/autocomplete";

import { HEADER_HEIGHT } from "../../shared/constants";

var currentAddressType = null;

function Insurance({
  appointmentStatus = 1,
  editInsuranceData = {},
  setAppointmentStatus,
  updateInsuranceData,
}) {
  const headerProps = {
    title: "Edit Insurance data",
    backUrl: localStorage.getItem("parentUrl")
      ? localStorage.getItem("parentUrl")
      : "/auth/login/",
    countOfNotifications: 20,
  };
  const [isUpdate, setUpdate] = useState(false);
  const [insuranceData, setInsuranceData] = useState({});
  const [addressType, setAddressType] = useState(0);
  const [validAddress, setValidAddress] = useState(false);
  const [planAddress, setPlanAddress] = useState(
    editInsuranceData.planAddress ?? ""
  );

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
      id: editInsuranceData.id ?? "",
      planName: editInsuranceData.planName ?? "",
      planIssuer: editInsuranceData.planIssuer ?? "",
      effectiveDate: editInsuranceData.effectiveDate ?? "",
      memberId: editInsuranceData.memberId ?? "",
      nameOnCard: editInsuranceData.nameOnCard ?? "",
      planAddress: editInsuranceData.planAddress ?? "",
      groupPlanId: editInsuranceData.groupPlanId ?? "",
      patientSupportPhoneNumber:
        editInsuranceData.patientSupportPhoneNumber ?? "",
      providerSupportPhoneNumber:
        editInsuranceData.providerSupportPhoneNumber ?? "",
    },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  useEffect(async () => {
    if (appointmentStatus == 2 && editInsuranceData) {
      setValue("id", editInsuranceData.id ?? "");
      setValue("planName", editInsuranceData.planName ?? "");
      setValue("planIssuer", editInsuranceData.planIssuer ?? "");
      setValue("effectiveDate", editInsuranceData.effectiveDate ?? "");
      setValue("memberId", editInsuranceData.memberId ?? "");
      setValue("nameOnCard", editInsuranceData.nameOnCard ?? "");
      setValue("planAddress", editInsuranceData.planAddress ?? "");
      setValue("groupPlanId", editInsuranceData.groupPlanId ?? "");
      setValue(
        "patientSupportPhoneNumber",
        editInsuranceData.patientSupportPhoneNumber ?? ""
      );
      setValue(
        "patientSupportPhoneNumber",
        editInsuranceData.patientSupportPhoneNumber ?? ""
      );
    }
  }, [appointmentStatus, editInsuranceData]);

  const onSubmit = async (data) => {
    updateInsuranceData(appointmentStatus, data);
  };

  const onInvalidAddress = (isInvalid) => {
    if (isInvalid && currentAddressType != AddressType.GOOGLE) {
      setError("planAddress", {
        message: "Please enter a valid USPS serviceable address",
      });
      setValidAddress(false);
      return;
    }
    clearErrors("planAddress");
    setValidAddress(true);
  };

  return (
    <AppointmentWrapper>
      <HeaderWrapper headerHeight={HEADER_HEIGHT}>
        <div className="left">
          <div className="arrow-back">
            <Image
              style={{ cursor: "pointer" }}
              src={ICONS.arrowLeft}
              width={10}
              height={13}
              layout={"fixed"}
              quality={100}
              alt="back arrow"
              onClick={() => {
                setAppointmentStatus(0);
              }}
            />
          </div>
        </div>
        <div className="center">
          {appointmentStatus == 1 ? "Insurance data" : "Edit Insurance data"}
        </div>
      </HeaderWrapper>
      <LeftWrapper>
        <div style={{ marginTop: 7 }}>
          <PlantypeWrapper>
            <div className="selected-type">
              <button className="transparent-btn-jin">Health Main</button>
            </div>
            <div className="">
              <button className="transparent-btn-jin"></button>
            </div>
            <div className="">
              <button className="transparent-btn-jin"></button>
            </div>
          </PlantypeWrapper>
        </div>
        <div style={{ marginTop: 12 }}>
          <ContentLB>
            This is the current insurance data we have. Please change any values
            as needed.
          </ContentLB>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 10 }}>
          <Flex className="justify-between">
            <FormControllWrapper
              style={{ width: "30%", marginRight: 5, marginTop: 34 }}
              className="planName"
              isInvalid={!!frontErrors?.planName?.message}
            >
              <InputFieldLabel>Plan name* </InputFieldLabel>
              <Controller
                name="planName"
                control={control}
                render={({ field }) => (
                  <MaskInput
                    autoComplete="off"
                    mask={
                      "********************************************************************************"
                    }
                    placeholder="XXXX"
                    onAccept={(v) => {
                      setValue("planName", v);
                    }}
                    {...field}
                  />
                )}
              />
              <div className="error-message">
                {frontErrors?.planName?.message}
              </div>
            </FormControllWrapper>
            <FormControllWrapper
              style={{ width: "30%", marginRight: 5, marginTop: 34 }}
              className="planIssuer"
              isInvalid={!!frontErrors?.planIssuer?.message}
            >
              <InputFieldLabel>Plan issuer </InputFieldLabel>
              <Controller
                name="planIssuer"
                control={control}
                render={({ field }) => (
                  <MaskInput
                    autoComplete="off"
                    mask={
                      "********************************************************************************"
                    }
                    placeholder="XXXX"
                    onAccept={(v) => {
                      setValue("planIssuer", v);
                    }}
                    {...field}
                  />
                )}
              />
              <div className="error-message">
                {frontErrors?.planIssuer?.message}
              </div>
            </FormControllWrapper>
            <FormControllWrapper
              style={{ width: "30%", marginRight: 5, marginTop: 34 }}
              className="effectiveDate"
              isInvalid={!!frontErrors?.effectiveDate?.message}
            >
              <InputFieldLabel>Effective date* </InputFieldLabel>
              <Controller
                name="effectiveDate"
                control={control}
                render={({ field }) => (
                  <MaskInput
                    type="tel"
                    mask={"0000-00-00"}
                    pattern="\d{4}-\d{2}-\d{2}"
                    autoComplete="off"
                    placeholder="YYYY-MM-DD"
                    onAccept={(v) => {
                      setValue("effectiveDate", v);
                    }}
                    {...field}
                  />
                )}
              />
              <div className="error-message">
                {frontErrors?.effectiveDate?.message}
              </div>
            </FormControllWrapper>
          </Flex>
          <Flex className="justify-between">
            <FormControllWrapper
              style={{ width: "65%", marginRight: 5, marginTop: 34 }}
              className="nameOnCard"
              isInvalid={!!frontErrors?.nameOnCard?.message}
            >
              <InputFieldLabel>Name on card* </InputFieldLabel>
              <Controller
                name="nameOnCard"
                control={control}
                render={({ field }) => (
                  <MaskInput
                    autoComplete="off"
                    mask={
                      "********************************************************************************"
                    }
                    placeholder="XXXX"
                    onAccept={(v) => {
                      setValue("nameOnCard", v);
                    }}
                    {...field}
                  />
                )}
              />
              <div className="error-message">
                {frontErrors?.nameOnCard?.message}
              </div>
            </FormControllWrapper>
            <FormControllWrapper
              style={{ width: "35%", marginRight: 5, marginTop: 34 }}
              className="memberId"
              isInvalid={!!frontErrors?.memberId?.message}
            >
              <InputFieldLabel>Member ID* </InputFieldLabel>
              <Controller
                name="memberId"
                control={control}
                render={({ field }) => (
                  <MaskInput
                    autoComplete="off"
                    mask={"********************"}
                    placeholder="XXXX"
                    onAccept={(v) => {
                      setValue("memberId", v);
                    }}
                    {...field}
                  />
                )}
              />
              <div className="error-message">
                {frontErrors?.memberId?.message}
              </div>
            </FormControllWrapper>
          </Flex>
          <Flex className="justify-between">
            <FormControllWrapper
              style={{ width: "65%", marginRight: 5, marginTop: 34 }}
              className="planAddress"
              isInvalid={!!frontErrors?.planAddress?.message}
            >
              <InputFieldLabel>Plan address</InputFieldLabel>
              <Controller
                name="planAddress"
                control={control}
                render={({ field }) => (
                  <AutoCompleteComponent
                    style={{
                      marginTop: "20px",
                      fontWeight: "600",
                      borderColor: "#5a585d",
                    }}
                    addressType={addressType}
                    pvalue={planAddress}
                    onAddressType={(value) => {
                      setAddressType(value);
                      currentAddressType = value;
                    }}
                    onChangePlace={(value) => {
                      setValue("planAddress", value);
                      setPlanAddress(value);
                    }}
                    onInvalidAddress={onInvalidAddress}
                    {...field}
                  />
                )}
              />
              <div className="error-message">
                {frontErrors?.planAddress?.message}
              </div>
            </FormControllWrapper>
            <FormControllWrapper
              style={{ width: "35%", marginRight: 5, marginTop: 34 }}
              className="groupPlanId"
              isInvalid={!!frontErrors?.groupPlanId?.message}
            >
              <InputFieldLabel>Group plan ID </InputFieldLabel>
              <Controller
                name="groupPlanId"
                control={control}
                render={({ field }) => (
                  <MaskInput
                    autoComplete="off"
                    mask={"********************"}
                    placeholder="XXXX"
                    onAccept={(v) => {
                      setValue("groupPlanId", v);
                    }}
                    {...field}
                  />
                )}
              />
              <div className="error-message">
                {frontErrors?.groupPlanId?.message}
              </div>
            </FormControllWrapper>
          </Flex>
          <Flex className="justify-between">
            <FormControllWrapper
              style={{ width: "50%", marginRight: 5, marginTop: 34 }}
              className="patientSupportPhoneNumber"
              isInvalid={!!frontErrors?.patientSupportPhoneNumber?.message}
            >
              <InputFieldLabel>Patient support phone no.</InputFieldLabel>
              <Controller
                name="patientSupportPhoneNumber"
                control={control}
                render={({ field }) => (
                  <MaskInput
                    style={{
                      marginTop: "5px",
                      fontWeight: "600",
                      borderColor: "#5a585d",
                    }}
                    type="tel"
                    mask={"000-000-0000"}
                    autoComplete="off"
                    placeholder="123-456-7890"
                    onAccept={(v) => {
                      setValue("patientSupportPhoneNumber", v);
                    }}
                    {...field}
                  />
                )}
              />
              <div className="error-message">
                {frontErrors?.patientSupportPhoneNumber?.message}
              </div>
            </FormControllWrapper>
            <FormControllWrapper
              style={{ width: "50%", marginRight: 5, marginTop: 34 }}
              className="providerSupportPhoneNumber"
              isInvalid={!!frontErrors?.providerSupportPhoneNumber?.message}
            >
              <InputFieldLabel>Provider support phone no.</InputFieldLabel>
              <Controller
                name="providerSupportPhoneNumber"
                control={control}
                render={({ field }) => (
                  <MaskInput
                    style={{
                      marginTop: "5px",
                      fontWeight: "600",
                      borderColor: "#5a585d",
                    }}
                    type="tel"
                    mask={"000-000-0000"}
                    autoComplete="off"
                    placeholder="123-456-7890"
                    onAccept={(v) => {
                      setValue("providerSupportPhoneNumber", v);
                    }}
                    {...field}
                  />
                )}
              />
              <div className="error-message">
                {frontErrors?.providerSupportPhoneNumber?.message}
              </div>
            </FormControllWrapper>
          </Flex>
          <div style={{ marginTop: 34 }}>
            <FooterWrapper>
              <div className="btn btn-cancel">
                <button
                  onClick={() => {
                    setAppointmentStatus(0);
                  }}
                >
                  Cancel
                </button>
              </div>
              <div className="btn btn-next">
                <button type="submit">
                  {appointmentStatus == 1 ? "Done" : "Update"}
                </button>
              </div>
            </FooterWrapper>
          </div>
        </form>
      </LeftWrapper>
    </AppointmentWrapper>
  );
}

export default Insurance;
