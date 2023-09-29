import Link from "next/link";
import Image from "next/image";

import Layout from "../../../../components/Layout";
import ResponsibleParty from "../../../user.module/insurance/responsible-party";
import ConfirmDelete from "../../../user.module/insurance/shared/modals/ConfirmDelete";

import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { format, parse } from "date-fns";

import {
  useRegUser,
  useLoadingStatus,
} from "../../../../redux/hooks/useCommonStore";
import {
  useInsuredType,
  useInsurance,
} from "../../../../redux/hooks/useInsuranceStore";
import {
  getUserDetail,
  deleteInsuranceInfo,
} from "../../../../common/lib/user";
import { MESSAGES } from "../../../../common/constant/global";
import {
  Wrapper,
  FormWrapper,
  FormContainer,
  FigureWrapper,
  MobileViewer,
  CenteredRow,
  LinkButton,
  BottomWrapper,
  Flex,
} from "../../../../common/styleds/common.styled";
import {
  AnserTitle,
  CreateNewQuestion,
  QuestionDesc,
  InsuranceInfoWrapper,
  HeaderWrapper,
  LeftWrapper,
  FooterWrapper,
  Tab,
  TabPanel,
  TabsList,
  TableDiv,
  TrHeader,
  TrFooter,
  Td,
  Tr,
  TdText,
} from "./styled";
import { INSURED_TYPE_KEYS } from "./data";

import { CheckMark } from "../../../../common/utils/Icons";
import { ICONS } from "../../../../common/utils/styleGuide";
import { HEADER_HEIGHT } from "../../shared/constants";
import {
  getFRParty,
  updateFRParty,
  createFRParty,
} from "../../../../common/lib/user";
import {
  useResponsibleParty,
  useResponsiblePartyType,
} from "../../../../redux/hooks/useInsuranceStore";
import { getProviderContactListByType } from "../../../../common/lib/provider";

function InsuranceInfo() {
  const router = useRouter();
  const { commitRegUser } = useRegUser();
  const { gotosummary: type } = router.query;

  const { regUser } = useRegUser();
  const { commitLoadingStatus } = useLoadingStatus();
  const { insuredType, commitInsuredType } = useInsuredType();
  const { commitInsurance, initInsurance } = useInsurance();

  const [insuredList, setInsuredList] = useState({ child: [], dependent: [] });

  const [confirmRemoveProps, setConfirmRemovePopupProps] = useState(null);

  const { responsiblePartyType, commitResponsiblePartyType } =
    useResponsiblePartyType();
  const {
    responsibleParty,
    initResponsibleParty,
    updateResponsibleParty,
    commitResponsibleParty,
  } = useResponsibleParty();

  useEffect(() => {
    const getUserInfo = async () => {
      commitLoadingStatus(true);
      const res = await getUserDetail(regUser ? regUser.id : 1);
      commitLoadingStatus(false);
      if (!res) {
        // toast.error(MESSAGES.server_error);
        return;
      }
      commitRegUser(res);

      const plans = res.insuranceInfos;
      const list = { child: [], dependent: [] };
      plans.forEach((v, i) => {
        if (v.type == INSURED_TYPE_KEYS.MINOR_AGE_CHILE) {
          list.child.push(v);
        } else if (v.type == INSURED_TYPE_KEYS.ADULT_DEPENDENT) {
          list.dependent.push(v);
        }
      });

      setInsuredList(list);
    };

    getUserInfo().catch((e) => console.log(e));
    if (type != "edit") initInsurance();
  }, []);

  const removeInsured = (id) => {
    let insuredName = "";
    if (insuredType == INSURED_TYPE_KEYS.MINOR_AGE_CHILE)
      insuredName = insuredList.child.filter((v) => v.id == id)[0].fullNameOnID;
    else
      insuredName = insuredList.dependent.filter((v) => v.id == id)[0]
        .fullNameOnID;

    setConfirmRemovePopupProps({
      isOpened: true,
      id: id,
      message: `Are you sure you want to delete ${insuredName}?`,
    });
  };

  const updateInsured = (id) => {
    let insuranceInfo = null;
    if (insuredType == INSURED_TYPE_KEYS.MINOR_AGE_CHILE)
      insuranceInfo = insuredList.child.filter((v) => v.id == id)[0];
    else insuranceInfo = insuredList.dependent.filter((v) => v.id == id)[0];

    if (insuranceInfo == undefined || insuranceInfo == null) return;

    const data = {
      insured: {
        id: uuidv4(),
        originalId: insuranceInfo.id,
        insuredType: insuranceInfo.type,
        isValidated: true,
        prefix: insuranceInfo.prefix,
        suffix: insuranceInfo.suffix,
        fullNameOnID: insuranceInfo.fullNameOnID,
        dob: insuranceInfo.dob
          ? format(
              parse(insuranceInfo.dob, "yyyy-MM-dd", new Date()),
              "MM/dd/yyyy"
            )
          : "",
        gender: insuranceInfo.gender,
        relationship: insuranceInfo.relationship,
        ssn: insuranceInfo.ssn,
        maritalStatus: insuranceInfo.maritalStatus,
        address: insuranceInfo.address,
      },
      ui: {
        insuredType: insuranceInfo.type,
        responsiblePartyType: insuranceInfo.responsibleParty?.frType,
        planType: null,
      },
      responsibleParty: {
        fullName: insuranceInfo.responsibleParty?.frFullNameOnID,
        relationship: insuranceInfo.responsibleParty?.frRelationship,
        address: insuranceInfo.responsibleParty?.frAddress,
        phoneNumber: insuranceInfo.responsibleParty?.frPhoneNumber,
        responsiblePartyType: insuranceInfo.responsibleParty?.frType,
        primaryEmail: insuranceInfo.responsibleParty?.frEmail,
        isValidate: true,
        isFetched: true,
        isInvited: false,
        avatar: null,
      },

      plans: [],
    };

    insuranceInfo.plans.forEach((v) => {
      data.plans.push({
        id: uuidv4(),
        originalId: v.id,
        planName: v.planName,
        planIssuer: v.planIssuer,
        effectiveDate: v.effectiveDate
          ? format(
              parse(v.effectiveDate, "yyyy-MM-dd", new Date()),
              "MM/dd/yyyy"
            )
          : "",
        nameOnCard: v.nameOnCard,
        memberId: v.memberId,
        planAddress: v.planAddress,
        groupPlanId: v.groupPlanId,
        patientSupportPhoneNumber: v.patientSupportPhoneNumber,
        providerSupportPhoneNumber: v.providerSupportPhoneNumber,
        planType: v.type,
        email: v.email,

        oop: {
          isInNetworkBenefit: v.oopCost.isInNetworkBenefit,
          inNetworkIndividualDeductible:
            v.oopCost.inNetworkIndividualDeductible,
          inNetworkIndividualMaximumOOP:
            v.oopCost.inNetworkIndividualMaximumOOP,
          inNetworkFamilyDeductible: v.oopCost.inNetworkFamilyDeductible,
          inNetworkFamilyMaximumOOP: v.oopCost.inNetworkFamilyMaximumOOP,
          isOutNetworkBenefit: v.oopCost.isOutNetworkBenefit,
          outNetworkIndividualDeductible:
            v.oopCost.outNetworkIndividualDeductible,
          outNetworkIndividualMaximumOOP:
            v.oopCost.outNetworkIndividualMaximumOOP,
          outNetworkFamilyDeductible: v.oopCost.outNetworkFamilyDeductible,
          outNetworkFamilyMaximumOOP: v.oopCost.outNetworkFamilyMaximumOOP,
        },
      });
    });

    commitInsurance(data);

    router.push("/users/insurance/summary");
  };

  const removeProc = async () => {
    setConfirmRemovePopupProps({ isOpened: false, ...confirmRemoveProps });

    if (confirmRemoveProps == null || confirmRemoveProps.id == 0) return;

    commitLoadingStatus(true);

    const res = await deleteInsuranceInfo(confirmRemoveProps.id);

    commitLoadingStatus(false);

    if (res) {
      let new_ = [];
      if (insuredType == INSURED_TYPE_KEYS.MINOR_AGE_CHILE) {
        new_ = insuredList.child.filter((v) => v.id != confirmRemoveProps.id);
        setInsuredList({ ...insuredList, child: new_ });
      } else {
        new_ = insuredList.dependent.filter(
          (v) => v.id != confirmRemoveProps.id
        );
        setInsuredList({ ...insuredList, dependent: new_ });
      }

      toast.success(MESSAGES.remove_data_success);
    } else {
      toast.error(MESSAGES.server_error);
    }

    setConfirmRemovePopupProps(null);
  };

  const cancalInsuranceInfo = () => {
    router.push("/manual/appointment");
  };

  const updateInsuranceInfo = async () => {
    let frpData = await getFRParty(1);
    let partyData = {
      userId: 1,
      type: responsibleParty.responsiblePartyType,
      relation: responsibleParty.relationship,
      phoneNumber: responsibleParty.phoneNumber,
      fullName: responsibleParty.fullName,
      address: responsibleParty.address,
    };

    if (responsibleParty && responsibleParty.fullName) {
      if (frpData) {
        let updateData = await updateFRParty(partyData);
        router.push("/manual/appointment");
      } else {
        let createData = await createFRParty(partyData);
        router.push("/manual/appointment");
      }
    } else {
      router.push("/manual/appointment");
    }
  };

  return (
    <InsuranceInfoWrapper>
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
                cancalInsuranceInfo();
              }}
            />
          </div>
        </div>
        <div className="center">Insurance information</div>
      </HeaderWrapper>
      <LeftWrapper>
        <AnserTitle style={{ marginTop: 10 }}>
          Refer to your insurance benefits for this information.{" "}
        </AnserTitle>
        <CreateNewQuestion>Healthcare claims </CreateNewQuestion>
        <QuestionDesc>
          Dependents who want to view their own claims must set up their own
          accounts{" "}
        </QuestionDesc>
        <QuestionDesc>
          Add adult dependents who cannot manage their own accounts and minor
          age children as your dependents{" "}
        </QuestionDesc>
        <TabPanel>
          <CenteredRow marginTop="20">
            <Image
              src="/assets/images/insurance_banner.png"
              width="304"
              height="215"
            />
          </CenteredRow>
          <ResponsibleParty />
        </TabPanel>
        <div style={{ marginTop: 60 }}>
          <FooterWrapper>
            <div className="btn btn-cancel">
              <button
                onClick={() => {
                  cancalInsuranceInfo();
                }}
              >
                Cancel
              </button>
            </div>
            <div className="btn btn-next">
              <button
                type="submit"
                onClick={() => {
                  updateInsuranceInfo();
                }}
              >
                Done
              </button>
            </div>
          </FooterWrapper>
        </div>
        <ConfirmDelete
          {...confirmRemoveProps}
          onRemove={removeProc}
          onCancel={() => setConfirmRemovePopupProps(null)}
        />
      </LeftWrapper>
    </InsuranceInfoWrapper>
  );
}

export default InsuranceInfo;
