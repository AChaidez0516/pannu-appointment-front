import {
        InfoWrapper
} from "./styled";

import { FRPartyDetail } from '../responsible-party-detail';

export default function InsuranceInformation({}) {
        return (
                <InfoWrapper>
                        <div className="title">
                                Confirm identification & insurance information
                        </div>
                        <div className="content">
                                Refer to your insurance benefits for this information.
                        </div>
                        <FRPartyDetail />
                </InfoWrapper>
        );
}
