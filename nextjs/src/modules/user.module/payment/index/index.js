import ScanID from "../../../../components/ScanID";
import Layout from "../../../../components/Layout";
import Image from 'next/image'
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from 'moment';

import { MESSAGES } from "../../../../common/constant/global";
import { handleOCR } from "../../../../common/utils/handleOCR";
import {
  getUserDetail,
  savePaymentCard,
  updatePaymentCard,
} from "../../../../common/lib/user";
import {
  useRegUser,
  useLoadingStatus,
} from "../../../../redux/hooks/useCommonStore";
import {
  Wrapper,
  FormWrapper,
  FormContainer,
  Input,
  InputDiv,
  InputFieldLabel,
  CenteredRow,
  Flex,
  DesktopViewer,
  LinkButton,
  BottomWrapper,
} from "../../../../common/styleds/common.styled";
import { ICONS } from '../../../../common/utils/styleGuide'
import { MaskInput } from "../../../../common/styleds/imask.styled";
import { AddressInput } from "../../../../common/styleds/autocomplete.styled";
import { Description } from "../shared/styled";
import { IOSSwitch } from "../../../../common/styleds/switch.styled";
import LoadingButton from "../../../../components/Button/LoadingButton";

function Payment() {
  const router = useRouter();
  const { regUser } = useRegUser();
  const { commitLoadingStatus } = useLoadingStatus();

  const { type, card_id, referrer } = { ...router.query };

  const requiredClass = "required";
  const DateMask = "00/0000";


  const [manually, setManually] = useState(false);

  const [selectedBackFile, setSelectedBackFile] = useState();
  const [selectedFrontFile, setSelectedFrontFile] = useState();

  const [billingAddress, setBillingAddress] = useState("");
  const [isDefaultCard, setIsDefaultCard] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  const [useSamePrimaryAddress, setUseSamePrimaryAddress] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const isValidDate = (value) => {
    const format = 'MM/YY';
    const currentDate = moment();
    const inputDate = moment(value, format, true);

    if (!inputDate.isValid()) {
      return false;
    }

    if (inputDate.isBefore(currentDate)) {
      return false;
    }

    return true;
  };

  const schema = yup.object().shape({
    fullName: yup
      .string().required('Please enter the name'),
    cardNumber: yup
      .string().required()
      .length(19, "Please check your card. Enter 16 digits"),
    cvv: yup
      .string().required("Please enter 3 digit code")
      .length(3, 'Please enter 3 digit code'),
    expiryDate: yup
      .string().required('Please enter 4 digits as MM/YY')
      .length(5, "Please enter 4 digits as MM/YY")
      .test('isValidDate', 'Invalid MM/YY', isValidDate),
  });

  const { control, handleSubmit, setValue, formState: { errors: errors } } = useForm({
    defaultValues: {
      fullName: '',
      cardNumber: '',
      cvv: '',
      expiryDate: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  function changedFile(file, type) {
    if (type == "back_file") setSelectedBackFile(file);

    if (type == "front_file") setSelectedFrontFile(file);
  }

  const submit = async () => {
    setIsLoading(true);
    if (!selectedFrontFile || !selectedBackFile) {
      alert("please upload both files");
      setIsLoading(false);
      return false;
    }

    commitLoadingStatus(true);
    // get data of card images from OCR service
    const responseOCR = await handleOCR(selectedFrontFile, selectedBackFile);
    setIsLoading(false);
    commitLoadingStatus(false);

    if (responseOCR) {
      parseData(responseOCR);
    } else {
      const fakeData = {
        card_type: "visa",
        is_debit: "false",
        bank_name: "",
        name_on_card: "ACH",
        card_number: "523416457",
        cvv: "123",
        expiry_date: "",
      };
      parseData(fakeData);
    }
  };

  const parseData = (data) => {
    setFullName(data.name_on_card);
    setCardNumber(data.card_number);
    setBillingAddress("");
  };

  const next = (info) => {
    let primaryAddress = "";
    if (useSamePrimaryAddress) {
      primaryAddress = regUser.currentAddress;
    }

    if (!regUser || !regUser.id) return;

    let data = {
      cardFrontImageURL: "",
      cardBackImageURL: "",
      nameOnCard: info.fullName,
      cardNumber: info.cardNumber,
      cvv: info.cvv,
      expiryDate: info.expiryDate,
      billingAddress: primaryAddress != "" ? primaryAddress : billingAddress,
    };

    

    if (type == "" || type === undefined || type == "add_card") {
      commitLoadingStatus(true);
      let url =
        referrer != undefined
          ? `/manual/payment/${referrer}`
          : `/manual/payment/add-card`;
      savePaymentCard(regUser.id, data).then((res) => {
        commitLoadingStatus(false);
        if (res) {
          toast.success(MESSAGES.save_data_success, {
            onClose: () => {
              router.push({ pathname: url });
            },
          });
        } else {
          toast.error(MESSAGES.server_error);
        }
      });
    } else {
      commitLoadingStatus(true);
      updatePaymentCard(parseInt(card_id, 10), data).then((res) => {
        commitLoadingStatus(false);
        if (res) {
          toast.success(MESSAGES.save_data_success, {
            onClose: () => {
              router.push({ pathname: "/manual/payment/add-card" });
            },
          });
        } else {
          toast.error(MESSAGES.server_error);
        }
      });
    }
  };

  useEffect(() => {
    if (type != "edit_card" || !card_id) return;

    setManually(true);
    commitLoadingStatus(true);

    getUserDetail(regUser.id).then((res) => {
      commitLoadingStatus(false);

      if (res) {
        let cardData = res.paymentCards.filter((v) => v.id == card_id);
        if (cardData.length == 0) return;
        setFullName(cardData[0].nameOnCard);
        setCardNumber(cardData[0].cardNumber);
        setCvv(cardData[0].cvv);
        setExpiryDate(cardData[0].expiryDate);
        setBillingAddress(cardData[0].billingAddress);
      }
    });
  }, [type]);

  return (
    <Wrapper className="center">
      <FormWrapper>
        <FormContainer>
          <Layout title="Payment method">
            <DesktopViewer>
              <Description className="center big">Payment method</Description>
            </DesktopViewer>
            <Description>
              Add the debit and credit cards you want to use to pay your
              charges. You can enter multiple cards and make one the default.
            </Description>
            <Description>
              You can change the card used for payment and split your payment
              among multiple cards.
            </Description>
            <Description>
              Take a photo of front and back of your insurance card. Acceptable
              formats are jpg, jpeg, png, and pdf.*
            </Description>
            <ScanID changedFile={changedFile} />

            <Flex className="justify-between row" marginTop={15}>
              <LinkButton
                className={"small " + (manually ? "cl-gray" : "")}
                onClick={() => setManually(true)}
              >
                Enter manually
              </LinkButton>
              <LoadingButton isLoading={isLoading}>
                <LinkButton
                  className={"small " + (manually ? "cl-gray" : "")}
                  onClick={submit}
                >
                  Submit
                </LinkButton>
              </LoadingButton>
            </Flex>

            {manually && (
              <form onSubmit={handleSubmit(next)}>
                <Description>Please complete all fields</Description>
                 <Flex marginTop={15}>
                  <InputDiv style={{ width: '60%' }}  lassName={errors.fullName ? requiredClass : ""} isInvalid={!!errors?.fullName?.message} >
                    <div className='err-msg'>{errors?.fullName?.message}</div>
                    <InputFieldLabel>Name on card*</InputFieldLabel>
                      <Controller
                        type="text"
                        name="fullName"
                        control={control}
                        render={({ field }) =>
                          <MaskInput
                            autoComplete="off"
                            onAccept={v => {
                              setValue("fullName", v);
                            }}
                            {...field}
                          />
                        }
                      />
                  </InputDiv>
                </Flex>
                <Flex className="justify-between" marginTop={20}>
                  <InputDiv
                    style={{ width: "50%", marginRight: 8 }}
                    className={errors.cardNumber ? requiredClass : ""}
                    isInvalid={!!errors?.cardNumber?.message}
                  >
                    <div className='err-msg'>{errors?.cardNumber?.message}</div>
                    <InputFieldLabel>Card number*</InputFieldLabel>
                    <Controller
                        type="text"
                        name="cardNumber"
                        control={control}
                        render={({ field }) =>
                          <MaskInput
                            mask={"0000 0000 0000 0000"}
                            placeholder="1234 5678 9012 3456"
                            pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                            onAccept={v => {
                              setValue("cardNumber", v);
                            }}
                            {...field}
                          />
                        }
                    />
                  </InputDiv>
                  <InputDiv
                    style={{ width: "20%", marginRight: 8 }}
                    className={errors.cvv ? requiredClass : ""}
                    isInvalid={!!errors?.cvv?.message}
                  >
                    <div className='err-msg' style={{ top: -45}}>{errors?.cvv?.message}</div>
                    <InputFieldLabel>CVV*</InputFieldLabel>
                    <Controller
                        type="text"
                        name="cvv"
                        control={control}
                        render={({ field }) =>
                          <MaskInput
                            type={!showCvv ? 'text' : 'password'}
                            mask="000"
                            pattern="\d{3}"
                            onAccept={v => {
                              setValue("cvv", v);
                            }}
                            placeholder="000"
                            {...field}
                          />
                        }
                    />
                    <div className='eye-icon'>
                      <Image
                        src={!showCvv ? ICONS.eyeOn : ICONS.eyeOff}
                        width={20} height={19}
                        layout={'fixed'}
                        quality={100}
                        onClick={() => setShowCvv(!showCvv)}
                      />
                    </div>
                  </InputDiv>
                  <InputDiv
                    style={{ width: "30%" }}
                    className={errors.expiryDate ? requiredClass : ""}
                    isInvalid={!!errors?.expiryDate?.message}
                  >
                    <div className='err-msg' style={{ top: -45}}>{errors?.expiryDate?.message}</div>
                    <InputFieldLabel>Expiry date*</InputFieldLabel>
                    <Controller
                        type="text"
                        name="expiryDate"
                        control={control}
                        render={({ field }) =>  
                          <MaskInput
                            mask={"00/00"}
                            pattern="\d{2}/\d{2}"
                            placeholder="00/00"
                            onAccept={v => {
                              setValue("expiryDate", v);
                            }}
                            {...field}
                          />
                        }
                    />
                  </InputDiv>
                </Flex>
                <Flex marginTop={15}>
                  <InputDiv style={{ width: "60%" }}>
                    <InputFieldLabel>Billing address</InputFieldLabel>
                    <AddressInput
                      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                      libraries={["places"]}
                      options={{
                        componentRestrictions: {
                          country: ['us'],
                        },
                        types: [],
                        fields: ["formatted_address"],
                      }}
                      onPlaceSelected={(place) =>
                        setBillingAddress(place.formatted_address)
                      }
                      defaultValue={billingAddress}
                      placeholder="123, Any St, Any town, ST, 12345"
                      onChange={(e) => {
                        setBillingAddress(e.target.value);
                      }}
                    />
                  </InputDiv>
                </Flex>
                <Flex className="justify-between" marginTop={15}>
                  <Description>Same as primary address</Description>
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={useSamePrimaryAddress}
                    onChange={(e) => setUseSamePrimaryAddress(e.target.checked)}
                  />
                </Flex>
                <Flex className="row" marginTop={15}>
                  <input
                    type="checkbox"
                    style={{
                      height: 15,
                      background: "#EEEEEE",
                      margin: "0 13px 0 0",
                    }}
                    value={isDefaultCard}
                    onChange={(e) => setIsDefaultCard(e.target.value)}
                  />
                  <Description className="mt-0 ">
                    Make this the default payment method
                  </Description>
                </Flex>
                <BottomWrapper>
                  <CenteredRow marginTop={30}>
                    <LinkButton className="big" type="submit">
                      Next
                    </LinkButton>
                  </CenteredRow>
                </BottomWrapper>
              </form>
            )}
          </Layout>
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  );
}

export default Payment;
