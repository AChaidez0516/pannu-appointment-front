import {
  IdentificationWrapper,
  Flex,
  InputGroupWrpper,
} from "./styled";
import { ICONS } from "../../common/utils/styleGuide";
import Image from "next/image";

export default function IdentificationInfo({
  username = '',
  setUsername,
  address = '',
  setAddress,
}) {
  return (
    <IdentificationWrapper>
      <div className="title">
        Confirm identification & insurance information
      </div>
      <Flex className="justify-between">
        <InputGroupWrpper
          style={{ width: "100%", marginRight: 5, marginTop: 35 }}
        >
          <span className="caption">{"Full Name"}</span>
          <input
            type={"text"}
            className="input-box"
            autoComplete={username.toString()}
            value={username}
            placeholder="Manish Malhotra"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="edit-icon">
            <Image
              src={ICONS.editUnderline}
              width={12}
              height={17}
              layout={"fixed"}
              quality={100}
            />
          </div>
        </InputGroupWrpper>
      </Flex>
      <Flex>
        <InputGroupWrpper
          style={{ width: "100%", marginRight: 5, marginTop: 35 }}
        >
          <span className="caption">{"Address"}</span>
          <input
            type={"text"}
            className="input-box"
            autoComplete={address.toString()}
            value={address}
            placeholder="Bey Minette AL 3087, USA"
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="edit-icon">
            <Image
              src={ICONS.editUnderline}
              width={12}
              height={17}
              layout={"fixed"}
              quality={100}
            />
          </div>
        </InputGroupWrpper>
      </Flex>
    </IdentificationWrapper>
  );
}
