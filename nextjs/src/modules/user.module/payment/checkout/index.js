import Image from "next/image";

import "react-datepicker/dist/react-datepicker.css";

import TransactionResult from "../../../../modules/manual.module/payment/result-manual";
import Layout from "../../../../components/Layout";
import CustomButton from "../../../../components/Button/SwipableButton/CustomButton";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { format, parse, isBefore } from "date-fns";

import { checkCreditCard } from "../../../../common/utils/checkCreditCard";
import { MESSAGES } from "../../../../common/constant/global";
import { getUserDetail, saveTransaction } from "../../../../common/lib/user";
import {
  useRegUser,
  useLoadingStatus,
} from "../../../../redux/hooks/useCommonStore";

import {
  Wrapper,
  FormWrapper,
  FormContainer,
  LinkButton,
  CenteredRow,
} from "../../../../common/styleds/common.styled";
import { Description, TableDiv, Tr, Td, TdText } from "../shared/styled";
import { MaskInput_2 } from "../../../../common/styleds/imask.styled";
import { CDatePicker } from "../../../../common/styleds/datepicker.styled";
import { TextWrapper, Text, TopWrapper, TopText } from "./styled";

function Checkout() {
  const router = useRouter();
  const { referrer } = { ...router.query };

  const dollarUSLocale = Intl.NumberFormat("en-US");

  const { regUser } = useRegUser();
  const { commitLoadingStatus } = useLoadingStatus();

  const { amountDue, employerContribution, netDue } = { ...router.query };
  const [paymentCardData, setPaymentCardData] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const [result, setResult] = useState(false);
  const [transactions, setTransactions] = useState({ succeed: [], failed: [] });

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
            paymentCardId: v.id,
            nameOnCard: v.nameOnCard,
            cardNumber: v.cardNumber,
            priority: v.priority,
            fee: 0,
            amount: 0,
            dateToCharge: format(new Date(), "MM/dd/yyyy"),
          });
        });
        setPaymentCardData([...list]);
      } else {
        toast.error(MESSAGES.server_error);

        setPaymentCardData([
          {
            paymentCardId: 1,
            nameOnCard: "TEST1",
            cardNumber: "12345678",
            priority: 1,
            fee: 0,
            amount: 0,
            dateToCharge: format(new Date(), "MM/dd/yyyy"),
          },
          {
            paymentCardId: 2,
            nameOnCard: "TEST2",
            cardNumber: "411234678",
            priority: 1,
            fee: 0,
            amount: 0,
            dateToCharge: format(new Date(), "MM/dd/yyyy"),
          },
        ]);
      }
    };

    getCardList().catch((e) => console.log(e));
  }, []);

  const getTotalPayment = () => {
    let sum = 0;
    paymentCardData.forEach((v) => {
      sum += v.amount - v.fee;
    });

    return sum;
  };

  const getBalance = () => {
    let sum = 0;
    paymentCardData.forEach((v) => {
      sum += v.amount - v.fee;
    });
    return netDue - sum;
  };

  const done = () => {
    setResult(true);

   

    let data = {
        userId: regUser.id,
        date: format(new Date(), 'yyyy-MM-dd'),
        atomicTransactions: []
    }

    let bl = true
    let curDate = parse(format(new Date(), 'MM/dd/yyyy'), 'MM/dd/yyyy', new Date())
    paymentCardData.forEach(v => {
        if (isBefore(parse(v.dateToCharge, 'MM/dd/yyyy', new Date()), curDate) || v.amount == 0 || v.amount == "")
        {
            bl = false
            return
        }

        data.atomicTransactions.push({
            paymentCardId: v.paymentCardId,
            amount: v.amount,
            fee: v.fee,
            dateToCharge: format(parse(v.dateToCharge, 'MM/dd/yyyy', new Date()), 'yyyy-MM-dd')
        })
    })

    if (!bl) {
        toast.error('Date or amount value is invalid.')
        setIsRefresh(true)
        return
    }

    commitLoadingStatus(true)

    const res =  saveTransaction(data)

    commitLoadingStatus(false)

    if (res) {
        setResult(true)
        let succeedTransactions = []
        let failedTransactions = []
        res.forEach(v => {
            if (v.status == 'SUCCESS') {
                succeedTransactions.push(v)
            }
            else {
                failedTransactions.push(v)
            }
        })
        setTransactions({
            succeed: succeedTransactions,
            failed: failedTransactions
        })
    }
    else {
        toast.error(MESSAGES.server_error)
    }
  };

  const addCard = () => {
    router.push({
      pathname: "/manual/payment",
      query: { type: "add_card", referrer: "checkout" },
    });
  };

  const styles = {
    slide: {
      padding: 15,
      minHeight: 100,
      color: "#fff",
    },
    slide1: {
      backgroundColor: "#FEA900",
    },
    slide2: {
      backgroundColor: "#B3DC4A",
    },
    slide3: {
      backgroundColor: "#6AC0FF",
    },
  };

  return (
    <Wrapper className="center">
      <FormWrapper>
        <FormContainer>
          {!result ? (
            <Layout title="Check out" hasDesktopTitle={true}>
              <Description style={{ marginTop: 5, marginBottom: 10 }}>
                <TopWrapper>
                  <TopText>
                    Credit cards will be charged 2% convenience fee
                  </TopText>
                </TopWrapper>
              </Description>

              <TextWrapper>
                <Text className="left">Amount due</Text>
                <Text className="right">
                  {dollarUSLocale.format(amountDue)}
                </Text>
              </TextWrapper>
              <TextWrapper>
                <Text className="left">Employer contribution</Text>
                <Text className="right">
                  {dollarUSLocale.format(employerContribution)}
                </Text>
              </TextWrapper>
              <TextWrapper>
                <Text className="left">Net due</Text>
                <Text className="right">{dollarUSLocale.format(netDue)}</Text>
              </TextWrapper>

              <TableDiv>
               
                <Tr className="header">
                  <Td style={{ width: "25%" }}>
                    <TdText>Account </TdText>
                  </Td>
                  <Td style={{ width: "20%" }}>
                    <TdText className="center">Date to charge</TdText>
                  </Td>
                  <Td style={{ width: "20%" }}>
                    <TdText className="center">Amount</TdText>
                  </Td>
                  <Td style={{ width: "20%" }}>
                    <TdText className="center">Conv. fee</TdText>
                  </Td>
                  <Td style={{ width: "15%" }}>
                    <TdText className="center">Total charge</TdText>
                  </Td>
                </Tr>
                {paymentCardData &&
                  paymentCardData.map((data, index) => {
                    return (
                      <Tr
                        key={index}
                        className={
                          index == paymentCardData.length - 1 ? "footer" : ""
                        }
                      >
                        <Td
                          className="row align-center justify-start"
                          style={{ width: "25%" }}
                        >
                          {checkCreditCard(data.cardNumber) && (
                            <img
                              src="/assets/images/bank-ico.png"
                              width="22px"
                              height="15px"
                            />
                          )}
                          <TdText>{data.nameOnCard}</TdText>
                        </Td>
                        <Td
                          className="row align-center justify-center"
                          style={{ width: "20%", margin: 5 }}
                        >
                          <TdText style={{ border: "1px solid" }}>
                            <div className="calendar-wrapper">
                              <CDatePicker
                                selected={new Date(data.dateToCharge)}
                                disabledKeyboardNavigation
                                withPortal
                                onChange={(date) => {
                                  paymentCardData[index].dateToCharge = format(
                                    date,
                                    "MM/dd/yyyy"
                                  );
                                  setPaymentCardData([...paymentCardData]);
                                }}
                              />
                              <div className="icon">
                                <Image
                                  src="/assets/images/ic-calendar-blue.png"
                                  width="13"
                                  height="13"
                                />
                              </div>
                            </div>
                          </TdText>
                        </Td>
                        <Td
                          className="row align-center justify-center"
                          style={{ width: "20%" }}
                        >
                          <TdText style={{ border: "1px solid" }}>
                            <MaskInput_2
                              mask={Number}
                              value={data.amount + ""}
                              type="phone"
                              onAccept={(v) => {
                                paymentCardData[index].amount = v;
                                if (checkCreditCard(data.cardNumber))
                                  paymentCardData[index].fee = v * 0.02;
                                setPaymentCardData([...paymentCardData]);
                              }}
                            />
                          </TdText>
                        </Td>
                        <Td className="justify-center" style={{ width: "20%" }}>
                          <TdText className="center">{data.fee}</TdText>
                        </Td>
                        <Td className="justify-center" style={{ width: "15%" }}>
                          <TdText className="center">
                            {data.amount - data.fee}
                          </TdText>
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
                    <LinkButton onClick={addCard} className="small">
                      Add another card
                    </LinkButton>
                  </Td>
                </Tr>
              </TableDiv>

              <div style={{ marginTop: 20 }}>
                <TextWrapper>
                  <Text className="right">Total Payment</Text>
                  <Text className="right">{getTotalPayment()}</Text>
                </TextWrapper>
                <TextWrapper>
                  <Text className="right">Balance to be paid</Text>
                  <Text className="right">
                    <span
                      style={{
                        border: "1px solid #ccc",
                        padding: 5,
                        borderRadius: 5,
                      }}
                    >
                      {getBalance()}
                    </span>
                  </Text>
                </TextWrapper>
              </div>

              <CenteredRow marginTop={50}>
                <CustomButton onSuccess={() => done()} refresh={isRefresh} />
              </CenteredRow>
            </Layout>
          ) : (
            <TransactionResult
              transactions={transactions}
              referrer={referrer}
            />
          )}
        </FormContainer>
      </FormWrapper>
    </Wrapper>
  );
}

export default Checkout;