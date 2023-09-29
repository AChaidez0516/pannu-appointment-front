import Image from 'next/image'
import Layout from '../../../../components/Layout'

import 'react-datepicker/dist/react-datepicker.css'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { MESSAGES } from '../../../../common/constant/global'
import { getUserDetail } from '../../../../common/lib/user'
import { useRegUser, useLoadingStatus } from '../../../../redux/hooks/useCommonStore'
import { format, parse } from 'date-fns'
import {
  Wrapper,
  FormContainer,
  FormWrapper,
  LinkButton, CenteredRow,
  BottomWrapper,
} from '../../../../common/styleds/common.styled'
import {
  Description,
  TableDiv,
  Tr,
  Td,
  TdText,
} from '../shared/styled'
import { MaskInput_2 } from '../../../../common/styleds/imask.styled'
import { CDatePicker } from '../../../../common/styleds/datepicker.styled'
import {
  TopWrapper,
  TopText,
  TextWrapper,
  Text
} from './styled'
import { checkCreditCard } from "../../../../common/utils/checkCreditCard";

function Pending () {

    const router = useRouter()
    const dollarUSLocale = Intl.NumberFormat('en-US');

    const { regUser } = useRegUser()
    const { commitLoadingStatus } = useLoadingStatus()

    const [paymentCardData, setPaymentCardData] = useState([])

    const [editable, setEditable] = useState(false)

    useEffect(() => {
        const getCardList = async () => {
            if (!regUser || !regUser.id)
                return

            commitLoadingStatus(true)

            const res = await getUserDetail(regUser.id)

            commitLoadingStatus(false)

            if (res) {
                let list = []
                res.paymentCards.forEach(v => {
                    list.push({
                        paymentCardId: v.id,
                        nameOnCard: v.nameOnCard,
                        cardNumber: v.cardNumber,
                        priority: v.priority,
                        fee: 0,
                        amount: 0,
                        dateToCharge: format(parse(v.dateToCharge, 'yyyy-MM-dd', new Date()), 'MM/dd/yyyy')
                    })
                })
                setPaymentCardData([...list])
            }
            else {
                toast.error(MESSAGES.server_error)

                /*setPaymentCardData([
                    {
                        paymentCardId: 1,
                        nameOnCard: 'TEST1',
                        cardNumber: '12345678',
                        priority: 1,
                        fee: 0,
                        amount: 0,
                        dateToCharge: format(new Date(), 'MM/dd/yyyy')
                    },
                    {
                        paymentCardId: 2,
                        nameOnCard: 'TEST2',
                        cardNumber: '411234678',
                        priority: 1,
                        fee: 0,
                        amount: 0,
                        dateToCharge: format(new Date(), 'MM/dd/yyyy')
                    },
                ])*/
            }
        }

        getCardList().catch(e => console.log(e))
    }, [])

    const getTotalPayment = () => {
        let sum = 0
        paymentCardData.forEach(v => {
            sum += v.amount - v.fee
        })

        return sum
    }

    const done = () => {

    }

    return (
        <Wrapper className="center">
            <FormWrapper>
                <FormContainer>
                    <Layout title="Pending payments" hasDesktopTitle={true}>
                        <div style={{display: 'flex', justifyContent: 'center', margin: 20}}>
                            <Image src="/assets/images/payment_pending.png" width="218" height="181" />
                        </div>
                        <Description style={{ marginTop: 5, marginBottom: 10 }}>
                            <TopWrapper>
                                <TopText>Credit cards will be charged 2% convenience fee</TopText>
                            </TopWrapper>
                        </Description>

                        <TableDiv>
                            <Tr className="header justify-end" style={{ background: 'transparent', boxShadow: 'unset' }}>
                                <Td>
                                    <TdText onClick={() => setEditable(!editable)} style={{ textAlign: 'center', color: '#173FD4' }}>{!editable? 'Edit' : 'Done'}</TdText>
                                </Td>
                            </Tr>
                            <Tr className="header">
                                <Td style={{ width: '20%' }}>
                                    <TdText>Account </TdText>
                                </Td>
                                <Td style={{ width: '20%' }}>
                                    <TdText className="center">Date to charge</TdText>
                                </Td>
                                <Td style={{ width: '20%' }}>
                                    <TdText className="center">Amount</TdText>
                                </Td>
                                <Td style={{ width: '20%' }}>
                                    <TdText className="center">Conv. fee</TdText>
                                </Td>
                                <Td style={{ width: '20%' }}>
                                    <TdText className="center">Total charge</TdText>
                                </Td>
                            </Tr>
                            { paymentCardData&& paymentCardData.map((data, index) => {
                                if (index == paymentCardData.length - 1)
                                    return (<div key={index}></div>)

                                return (
                                  <Tr key={index} className={ index == paymentCardData.length - 1 ? 'footer' : '' }>
                                      <Td className="row align-center" style={{ width: '20%' }}>
                                          { (checkCreditCard(data.cardNumber))&& <img src="/assets/images/bank-ico.png" width="22px" height="15px" /> }
                                          <TdText>{data.nameOnCard}</TdText>
                                      </Td>
                                      <Td className="row align-center justify-center" style={{ width: '20%' }}>
                                          { (editable) ? (
                                            <TdText style={{ border: '1px solid' }}>
                                                <div className="calendar-wrapper">
                                                    <CDatePicker selected={new Date(data.dateToCharge)}
                                                                 disabledKeyboardNavigation
                                                                 withPortal
                                                                 onChange={ (date) => {
                                                                     paymentCardData[index].dateToCharge = format(date, 'MM/dd/yyyy')
                                                                     setPaymentCardData([...paymentCardData])
                                                                 } }
                                                    />
                                                    <div className="icon"><Image src="/assets/images/ic-calendar-blue.png" width="13" height="13" /></div>
                                                </div>
                                            </TdText>
                                          ) : (
                                            <TdText>{data.dateToCharge}</TdText>
                                          ) }
                                      </Td>
                                      <Td className="row align-center justify-center" style={{ width: '20%' }}>
                                          { (editable) ? (
                                            <TdText style={{ border: '1px solid' }}>
                                                <MaskInput_2 mask={Number} value={data.amount + ''}
                                                           onAccept={
                                                               v => {
                                                                   paymentCardData[index].amount = v
                                                                   if (checkCreditCard(data.cardNumber))
                                                                       paymentCardData[index].fee = v * 0.02
                                                                   setPaymentCardData([...paymentCardData])
                                                               }
                                                           } />
                                            </TdText>
                                          ) : (
                                            <TdText>{data.amount}</TdText>
                                          ) }

                                      </Td>
                                      <Td className="justify-center" style={{ width: '20%' }}>
                                          <TdText className="center">{data.fee}</TdText>
                                      </Td>
                                      <Td className="justify-center" style={{ width: '20%' }}>
                                          <TdText className="center">{data.amount - data.fee}</TdText>
                                      </Td>
                                  </Tr>
                                )
                            }) }
                            { (!paymentCardData || paymentCardData.length == 0)&& (
                                <Tr className="footer" style={{ marginTop: -5, boxShadow: 'none' }}>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                    <Td></Td>
                                </Tr>
                            ) }
                        </TableDiv>
                        <div style={{ marginTop: 20 }}>
                            <TextWrapper>
                                <Text className="right">Total Payment</Text>
                                <Text className="right">{getTotalPayment()}</Text>
                            </TextWrapper>
                        </div>
                        <BottomWrapper>
                            <CenteredRow marginTop={50}>
                                <LinkButton onclick="done" className="big">Done</LinkButton>
                            </CenteredRow>
                        </BottomWrapper>
                    </Layout>
                </FormContainer>
            </FormWrapper>
        </Wrapper>
    )
}

export default Pending;
