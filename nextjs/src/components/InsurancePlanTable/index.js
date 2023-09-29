import { IdentificationWrapper, Flex, InputGroupWrpper } from "./styled";
import { ICONS } from "../../common/utils/styleGuide";
import Image from "next/image";
import { TableDiv, TrHeader, TrFooter, Td, TdText } from "./styled";
import InsurancePlanRecord from "./record";

export default function InsurancePlanTable({
  insuranceInfos,
  editInsurance,
  confirmDeleteInsuranceData,
  rollOverRefund,
  setRollOverRefund,
}) {
  return (
    <TableDiv>
      <TrHeader>
        <Td style={{ width: "55%" }}>
          <TdText>Insurance company</TdText>
        </Td>
        <Td style={{ width: "30%", textAlign: "center" }}>
          <TdText>Insurance info</TdText>
        </Td>
        <Td style={{ width: "15%" }}>
          <TdText style={{ textAlign: "center" }}>Confirm</TdText>
        </Td>
      </TrHeader>

      {insuranceInfos.map((data, index) => (
        <InsurancePlanRecord
          data={data}
          index={index}
          editInsurance={editInsurance}
          confirmDeleteInsuranceData={confirmDeleteInsuranceData}
          rollOverRefund={rollOverRefund}
          setRollOverRefund={setRollOverRefund}
        />
      ))}
    </TableDiv>
  );
}
