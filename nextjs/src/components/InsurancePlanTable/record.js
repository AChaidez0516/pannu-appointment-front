import { ICONS } from "../../common/utils/styleGuide";
import Image from "next/image";
import { TrFooter, Td, TdText } from "./styled";

export default function InsurancePlanRecord({
  data,
  index,
  editInsurance,
  confirmDeleteInsuranceData,
  rollOverRefund,
  setRollOverRefund
}) {
  return (
    <TrFooter key={index}>
      <Td style={{ width: "55%" }}>
        <TdText>{data.planName}</TdText>
        <TdText>
          Member ID - {data.memberId} Group ID -{" "}
          {data.groupPlanId}
        </TdText>
      </Td>
      <Td
        style={{
          width: "30%",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Image
          src="/assets/images/ico-edit.png"
          width="16"
          height="20"
          style={{ cursor: "pointer" }}
          onClick={() => editInsurance(index)}
        />
        <Image
          src="/assets/images/ico-delete.png"
          width="20"
          height="20"
          style={{ cursor: "pointer" }}
          onClick={() => confirmDeleteInsuranceData(data.id)}
        />
      </Td>
      <Td
        style={{
          width: "15%",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Image
          src={rollOverRefund ? ICONS.checkOn : ICONS.checkOff}
          width={22}
          height={22}
          layout={"fixed"}
          style={{ cursor: "pointer" }}
          onClick={() => setRollOverRefund(!rollOverRefund)}
        />
      </Td>
    </TrFooter>
  );
}
