import { ICONS } from "../../common/utils/styleGuide";
import Image from "next/image";
import { TrFooter, Td, TdText } from "./styled";
import { MaskInput_3 } from "../../common/styleds/imask.styled";

export default function InsurancePlanOrderRecord({
  data,
  index,
  length,
  editInsurance,
  confirmDeleteInsuranceData,
  rollOverRefund,
  setRollOverRefund
}) {
  return (
    <TrFooter key={index}>
      <Td className={`firstColumn dataColumn ${index !== length - 1 ? "borderRadiusZero" : "borderRadiusLeft"}`}>
        <TdText>{data.plans[0].planName}</TdText>
        <TdText>
          Member ID - {data.plans[0].memberId} Group ID -{" "}
          {data.plans[0].groupPlanId}
        </TdText>
      </Td>      

      <Td className="secondColumn">
        <MaskInput_3
          mask={Number}
          type="tel"
          className="border cl-gray normal center"
          value={data.priority}
          onAccept={(v) => {
            data.priority = v;
          }}
        />
      </Td>
    </TrFooter>
  );
}
