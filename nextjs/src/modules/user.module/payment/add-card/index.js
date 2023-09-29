import Image from "next/image";

import Layout from "../../../../components/Layout";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { checkCreditCard } from "../../../../common/utils/checkCreditCard";
import { MESSAGES } from "../../../../common/constant/global";
import {
  deletePaymentCard,
  getUserDetail,
  setPaymentCardPriority,
} from "../../../../common/lib/user";
import {
  useRegUser,
  useLoadingStatus,
} from "../../../../redux/hooks/useCommonStore";
import {
  Wrapper,
  FormContainer,
  FormWrapper,
  CenteredRow,
  LinkButton,
  BottomWrapper,
} from "../../../../common/styleds/common.styled";
import {
  Description,
  TableDiv,
  TrHeader,
  TrFooter,
  Tr,
  Td,
  TdText,
} from "../shared/styled";
import { MaskInput_2 } from "../../../../common/styleds/imask.styled";

function AddCard() {
  const router = useRouter();
  const { regUser } = useRegUser();
  const { commitLoadingStatus } = useLoadingStatus();

  // make it commented for now until before we integrate the api properly
  // const [paymentCardData, setPaymentCardData] = useState([]);
  const [paymentCardData, setPaymentCardData] = useState([
    {
      nameOnCard: "Ronald Richards",
      cardNumber: 4111111111111111,
      expiryDate: "07/30",
    },
    {
      nameOnCard: "Phillip Richards",
      cardNumber: 4111111111111111,
      expiryDate: "01/29",
    },
  ]);
  const [priorityMode, setPriorityMode] = useState(false);

  useEffect(() => {
    const getCardList = async () => {
      if (!regUser || !regUser.id) return;

      commitLoadingStatus(true);
      const res = await getUserDetail(regUser.id);
      commitLoadingStatus(false);

      if (res) {
        let list = [];
        res.paymentCards.forEach((v) => {
          list.push({
            id: v.id,
            nameOnCard: v.nameOnCard,
            cardNumber: v.cardNumber,
            priority: !v.priority ? "1" : v.priority + "",
            expiryDate: v.expiryDate,
            cvv: v.cvv,
            billingAddress: v.billingAddress,
          });
        });

        setPaymentCardData([...list]);
      } else {
        toast.error(MESSAGES.server_error);
      }
    };

    getCardList().catch((e) => console.log(e));
  }, []);

  const addCard = () => {
    router.push({
      pathname: "/manual/payment",
      query: { type: "add_card", referrer: "add-card" },
    });
  };

  const editCard = (index) => {
    router.push({
      pathname: "/manual/payment",
      query: { type: "edit_card", card_id: paymentCardData[index].id },
    });
  };

  const deleteCard = (index) => {
    if (index >= paymentCardData.length) return;

    const cardId = paymentCardData[index].id;

    commitLoadingStatus(true);

    deletePaymentCard(cardId).then((res) => {
      commitLoadingStatus(false);

      if (res && res.status) {
        paymentCardData.splice(index, 1);

        setPaymentCardData([...paymentCardData]);

        toast.success(MESSAGES.remove_data_success);
      } else {
        toast.error(MESSAGES.server_error);
      }
    });
  };

  const saveCardPriority = async () => {
    let data = [];
    paymentCardData.forEach((v) => {
      data.push({
        paymentCardId: v.id,
        priority: v.priority,
      });
    });

    commitLoadingStatus(true);
    const res = setPaymentCardPriority(data);
    commitLoadingStatus(false);
    if (res) {
      toast.success(MESSAGES.save_data_success, {
        onClose: () => {
          router.push({ pathname: '/manual/payment/checkout' })
        },
      });
    } else {
      toast.error(MESSAGES.server_error);
    }
  };

  return (
    <Wrapper className="center">
      <FormWrapper>
        <FormContainer>
          <Layout title="Payment method" hasDesktopTitle={true}>
            <Description style={{ marginTop: 5, marginBottom: 10 }}>
              Add the debit and credit cards you want to use to pay your
              charges. You can enter multiple cards and make one the default.{" "}
            </Description>
            <Description style={{ marginTop: 5, marginBottom: 10 }}>
              You can change the card used for payment and split your payment
              among multiple cards.{" "}
            </Description>
            <CenteredRow style={{ margin: 30 }}>
              <Image
                src="/assets/images/payment_banner.png"
                width="244"
                height="178"
              />
            </CenteredRow>
            <TableDiv>
              <Tr
                className="header justify-end"
                style={{ background: "transparent", boxShadow: "unset" }}
              >
                {!priorityMode ? (
                  <Td>
                    <LinkButton
                      className="smallest"
                      onClick={() => setPriorityMode(true)}
                    >
                      Move
                    </LinkButton>
                  </Td>
                ) : (
                  <Td className="justify-between">
                    <LinkButton
                      className="smallest"
                      onClick={() => setPriorityMode(false)}
                    >
                      Cancel
                    </LinkButton>
                  </Td>
                )}
              </Tr>
              <Tr className="header">
                <Td style={{ width: "15%" }} className="justify-center">
                  <TdText>Name </TdText>
                </Td>
                <Td style={{ width: "35%" }} className="justify-center">
                  <TdText>Card number</TdText>
                </Td>
                <Td style={{ width: "25%" }} className="justify-center">
                  <TdText className="center">Expiry date</TdText>
                </Td>
                <Td style={{ width: "25%" }}>
                  {priorityMode && <TdText className="center">No.</TdText>}
                </Td>
              </Tr>
              {paymentCardData &&
                paymentCardData.map((data, index) => {
                  return (
                    <Tr
                      key={data.id}
                      className={
                        index == paymentCardData.length - 1 ? "footer" : ""
                      }
                    >
                      <Td
                        className={
                          "justify-center " + (priorityMode ? "gray" : "")
                        }
                        style={{ width: "15%" }}
                      >
                        <TdText>Default</TdText>
                        <TdText>{data.nameOnCard}</TdText>
                      </Td>
                      <Td
                        className={
                          "row align-center " + (priorityMode ? "gray" : "")
                        }
                        style={{ width: "35%" }}
                      >
                        {checkCreditCard(data.cardNumber) && (
                          <img
                            src="/assets/images/bank-ico.png"
                            width="22px"
                            height="15px"
                          />
                        )}
                        <TdText>{data.cardNumber}</TdText>
                      </Td>
                      <Td
                        className={
                          "row align-center justify-center " +
                          (priorityMode ? "gray" : "")
                        }
                        style={{ width: "25%" }}
                      >
                        <TdText>{data.expiryDate}</TdText>
                      </Td>
                      <Td
                        className="row align-center justify-around"
                        style={{ width: "25%" }}
                      >
                        {!priorityMode ? (
                          <>
                            <Image
                              onClick={() => editCard(index)}
                              src="/assets/images/ico-edit.png"
                              width="16"
                              height="20"
                            />
                            <Image
                              onClick={() => deleteCard(index)}
                              src="/assets/images/ico-delete.png"
                              width="20"
                              height="20"
                            />
                          </>
                        ) : (
                          <MaskInput_2
                            mask={Number}
                            type="tel"
                            className="border cl-gray normal center"
                            value={data.priority}
                            onAccept={(v) => {
                              paymentCardData[index].priority = v;
                              setPaymentCardData([...paymentCardData]);
                            }}
                          />
                        )}
                      </Td>
                    </Tr>
                  );
                })}
              {(!paymentCardData || paymentCardData.length == 0) && (
                <Tr
                  className="footer"
                  style={{ marginTop: -5, boxShadow: "none" }}
                >
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              )}
              <Tr style={{ background: "transparent", boxShadow: "unset" }}>
                <Td className="align-end" style={{ width: "100%" }}>
                  <LinkButton
                    onClick={() => {
                      !priorityMode ? addCard() : {};
                    }}
                    className={"small " + (!priorityMode ? "" : "cl-gray")}
                  >
                    Add another card
                  </LinkButton>
                </Td>
              </Tr>
            </TableDiv>

            <BottomWrapper>
              <CenteredRow marginTop={50}>
                <LinkButton onClick={saveCardPriority} className="big">
                  Done
                </LinkButton>
              </CenteredRow>
            </BottomWrapper>
          </Layout>
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  );
}

export default AddCard;
