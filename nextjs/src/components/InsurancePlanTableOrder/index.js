import { ICONS } from "../../common/utils/styleGuide";
import Image from "next/image";
import { TableDiv, TrHeader, TrHeader2, Td, TdTextCaption,ChangeBtn } from "./styled";
import InsurancePlanOrderRecord from "./record";

export default function InsurancePlanTableOrder({
  insuranceInfos,
  editInsurance,
  confirmDeleteInsuranceData,
  rollOverRefund,
  setRollOverRefund,
}) {
  return (
    <TableDiv>
      <TrHeader2>
        <ChangeBtn>Change</ChangeBtn>        
      </TrHeader2>
      <TrHeader>
        <Td className="firstColumn">
          <TdTextCaption>Insurance company</TdTextCaption>
        </Td>
        <Td className="secondColumn weight-600">
          <TdTextCaption>Order</TdTextCaption>
        </Td>
      </TrHeader>

      {insuranceInfos.map((data, index) => (
        <InsurancePlanOrderRecord
          data={data}
          length = {insuranceInfos.length}
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
