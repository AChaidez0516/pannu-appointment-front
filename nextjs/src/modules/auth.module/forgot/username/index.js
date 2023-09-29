import Image from 'next/image'

import { format, parse } from 'date-fns'

import MenuItem from '@mui/material/MenuItem'

import Layout from '../../../../components/Layout'

import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import {
    MESSAGES,
    PREFIX,
    SUFFIX
} from '../../../../common/constant/global'
import { useLoadingStatus } from '../../../../redux/hooks/useCommonStore'
import {
  InputFieldLabel,
  InputDiv,
  Input,
  CenteredRow,
  Wrapper,
  FormWrapper,
  FormContainer,
  FigureWrapper,
  MobileViewer,
  DesktopViewer,
  Flex,
  LinkButton,
} from '../../../../common/styleds/common.styled'
import { MUISelect } from '../../../../common/styleds/select.styled'
import { MaskInput } from '../../../../common/styleds/imask.styled'
import {
    Title,
} from '../shared/styled'

import { findUserName, forgotUserNameQuestions } from '../../../../common/lib/user'

function ForgotUserName() {
    const router = useRouter()
    const SsnMask = '000-00-00000'
    const DateMask = '00/00/0000'

    const requiredClass = 'required'

    const { commitLoadingStatus } = useLoadingStatus()

    const [answerList, setAnswerList] = useState([])
    const [questionList, setQuestionList] = useState([])
    const [invalidAnswerList, setInvalidAnswerList] = useState([])
    const [prefix, setPrefix] = useState()
    const [suffix, setSuffix] = useState()
    const [fullName, setFullName] = useState('')
    const [ssn, setSsn] = useState('')
    const [dob, setDob] = useState('')

    const [invalidFullName, setInvalidFullName] = useState(false)
    const [invalidSsn, setInvalidSsn] = useState(false)
    const [invalidDob, setInvalidDob] = useState(false)

    const [showQuestions, setShowQuestions] = useState(false)

    const find = () => {
        if (fullName == '') {
            setInvalidFullName(true)
            return
        }
        else {
            setInvalidFullName(false)
        }

        if (ssn == '') {
            setInvalidSsn(true)
            return
        }
        else {
            setInvalidSsn(false)
        }

        if (dob == '') {
            setInvalidDob(true)
            return
        }
        else {
            setInvalidDob(false)
        }

        let reqData = {
            fullName: fullName,
            ssn: ssn,
            dob: format(parse(dob, 'MM/dd/yyyy', new Date()), 'yyyy-MM-dd'),
            prefix: prefix,
            suffix: suffix,
            questionAnswers: [

            ]
        }

        if (!showQuestions) {
            const getQuestions = async () => {
                commitLoadingStatus(true)

                const res  = await forgotUserNameQuestions(reqData)

                commitLoadingStatus(false)

                if (!res || res.length == 0) {
                    toast.error(MESSAGES.server_error)
                    return
                }

                setShowQuestions(true)

                let list1 = res.filter(v => !v.isCustom)
                let list2 = res.filter(v => v.isCustom)

                setQuestionList([...list1, ...list2])
                setAnswerList(Array.from(new Array(res.length), () => ''))
                setInvalidAnswerList(Array.from(new Array(res.length), (val, index) => index == 0 ? true : false))
            }

            getQuestions().catch(e => console.log(e))

            return
        }

        for (let idx = 0; idx < questionList.length; idx++) {
            if (idx == 0 && (answerList[idx] == ''))
            {
                invalidAnswerList[idx] = true
                setInvalidAnswerList([...invalidAnswerList])
                return
            }

            if (idx > 0 && answerList[idx - 1] != '' && answerList[idx] == '') {
                invalidAnswerList[idx] = true
                setInvalidAnswerList([...invalidAnswerList])
                return
            }

            invalidAnswerList[idx] = false
        }

        setInvalidAnswerList([...invalidAnswerList])

        questionList.forEach((v, i) => {
            if (answerList[i])
            reqData.questionAnswers.push({
                questionId: v.id,
                answer: answerList[i]
            })
        })

        commitLoadingStatus(true)

        findUserName(reqData).then(res => {
            commitLoadingStatus(false)
            if (!res) {
                toast.error(MESSAGES.server_error)
                return
            }

            if (res.status) {
                router.push({pathname: '/auth/forgot-username/recovered', query: {token: res.message}})
            }
            else {
                toast.error(res.message)
            }

        })
    }

    return (
        <Wrapper>
            <FigureWrapper>
                <CenteredRow marginTop={170}>
                    <Image src="/assets/images/forgotusername_banner.png" width="522" height="342" />
                </CenteredRow>
            </FigureWrapper>
            <FormWrapper>
                <FormContainer>
                    <Layout title="Forgot username" hasDesktopTitle={true}>
                        <MobileViewer>
                            <CenteredRow marginTop={20}>
                                <Image src="/assets/images/forgotusername_banner.png" width="200" height="130" />
                            </CenteredRow>
                        </MobileViewer>
                        <Flex>
                            <InputDiv style={{ width: '15%', marginRight: 5 }}>
                                <InputFieldLabel>Prefix</InputFieldLabel>
                                <MUISelect style={{ width: '100%' }} value={prefix} onChange={e => setPrefix(e.target.value)}>
                                    {PREFIX.map((v, i) => (<MenuItem key={i} value={v.toUpperCase()}>{v}</MenuItem>))}
                                </MUISelect>
                            </InputDiv>
                            <InputDiv style={{ flex: "1 0 230px", marginRight: 5 }} className={invalidFullName ? requiredClass : ''}>
                                <InputFieldLabel>Full name on government issued ID*</InputFieldLabel>
                                <Input value={fullName} onChange={e => setFullName(e.target.value)} />
                            </InputDiv>
                            <InputDiv style={{ width: '15%' }}>
                                <InputFieldLabel>Suffix</InputFieldLabel>
                                <MUISelect style={{ width: '100%' }} value={suffix} onChange={e => setSuffix(e.target.value)}>
                                    {SUFFIX.map((v, i) => (<MenuItem key={i} value={v.toUpperCase()}>{v}</MenuItem>))}
                                </MUISelect>
                            </InputDiv>
                        </Flex>
                        <div style={{ display: 'flex' }}>
                            <InputDiv style={{ flex: "1 0 160px", marginRight: 15 }} className={invalidSsn ? requiredClass : ''}>
                                <InputFieldLabel>Social Security Number*</InputFieldLabel>
                                <MaskInput mask={SsnMask} type="tel" placeholder="123-45-6789" value={ssn} onAccept={v => setSsn(v)} />
                            </InputDiv>
                            <InputDiv style={{ flex: '1 0 160px' }} className={invalidDob ? requiredClass : ''}>
                                <InputFieldLabel>Date of birth*</InputFieldLabel>
                                <MaskInput mask={DateMask} type="tel" placeholder="MM/DD/YYYY" value={dob} onAccept={v => setDob(v)} />
                            </InputDiv>
                        </div>

                        { (showQuestions)&& (
                            <>
                                <Title className="small mt-20 left">Answer your security questions</Title>
                                { questionList && questionList.map((data, index) => {
                                    if (index == 0 || (index > 0 && answerList[index - 1] != ''))
                                        return (
                                            <>
                                                { (questionList[index].isCustom)&& <Title className="small mt-20 left">Answer your secret question</Title> }
                                                <InputDiv style={{width: '100%', marginRight: 5}} className={invalidAnswerList[index] ? requiredClass : ''}>
                                                    <InputFieldLabel>{questionList[index].question}</InputFieldLabel>
                                                    <Input value={answerList[index]}
                                                           onChange={ e => {
                                                               answerList[index] = e.target.value
                                                               setAnswerList([...answerList])
                                                           }} />
                                                </InputDiv>
                                            </>
                                        )
                                    else
                                        return (
                                            <></>
                                        )
                                }) }
                            </>
                        ) }
                        <CenteredRow style={{ marginTop: 50 }}>
                            <LinkButton className="big" onClick={find}>Continue</LinkButton>
                        </CenteredRow>
                    </Layout>
                </FormContainer>
            </FormWrapper>
        </Wrapper>
    )
}

export default ForgotUserName;