import Image from 'next/image'

import { format, parse } from 'date-fns'

import MenuItem from '@mui/material/MenuItem'

import Layout from '../../../../components/Layout'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useLoadingStatus } from '../../../../redux/hooks/useCommonStore'
import {
    MESSAGES,
    PREFIX,
    SUFFIX
} from '../../../../common/constant/global'
import {
    Wrapper,
    FigureWrapper,
    FormWrapper,
    FormContainer,
    InputFieldLabel,
    InputDiv,
    Input,
    CenteredRow,
    MobileViewer,
    LinkButton,
    Flex,
    BottomWrapper,
} from '../../../../common/styleds/common.styled'
import { MaskInput } from '../../../../common/styleds/imask.styled'
import { MUISelect } from '../../../../common/styleds/select.styled'
import {
    Title,
} from '../shared/styled'
import {
    Popup,
    Text
} from './styled'

import {
    findUserPassword,
    forgotPasswordQuestions,
} from '../../../../common/lib/user'

function ForgotPassword() {
    const SsnMask = '000-00-00000'
    const DateMask = '00/00/0000'

    const requiredClass = 'required'

    const router = useRouter()
    const { commitLoadingStatus } = useLoadingStatus()

    const [answerList, setAnswerList] = useState([])
    const [questionList, setQuestionList] = useState([])
    const [prefix, setPrefix] = useState()
    const [suffix, setSuffix] = useState()
    const [fullName, setFullName] = useState('')
    const [ssn, setSsn] = useState('')
    const [dob, setDob] = useState('')
    const [username, setUsername] = useState('')

    const [invalidUserName, setInvalidUserName] = useState(false)
    const [invalidFullName, setInvalidFullName] = useState(false)
    const [invalidSsn, setInvalidSsn] = useState(false)
    const [invalidDob, setInvalidDob] = useState(false)

    const [invalidAnswerList, setInvalidAnswerList] = useState([])

    const [showQuestions, setShowQuestions] = useState(false)
    const [error, setError] = useState(false)

    const find = () => {
        if (username == '') {
            setInvalidUserName(true)
            return
        }
        else {
            setInvalidUserName(false)
        }

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
            userName: username,
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

                const res  = await forgotPasswordQuestions(reqData)

                commitLoadingStatus(false)

                if (!res || res.length == 0) {
                    setError(true)
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

        findUserPassword(reqData).then(res => {
            commitLoadingStatus(false)

            if (!res) {
                toast.error(MESSAGES.server_error)
                return
            }

            if (res.status) {
                router.push({pathname: '/auth/forgot-password/reset', query: {token: res.message}})
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
                  <Image src="/assets/images/forgotpassword_banner.png" width="512" height="357" />
              </CenteredRow>
          </FigureWrapper>
          <FormWrapper>
              <FormContainer>
                  <Layout title="Forgot password" hasDesktopTitle={true}>
                      <MobileViewer>
                          <Flex className="justify-center" marginTop={20}>
                              <Image src="/assets/images/forgotpassword_banner.png" width="244" height="170" />
                          </Flex>
                      </MobileViewer>
                      <InputDiv style={{ width: '60%', marginTop: 40 }} className={invalidUserName ? requiredClass : ''}>
                          <InputFieldLabel>Username*</InputFieldLabel>
                          <Input value={username} onChange={e => setUsername(e.target.value)} />
                      </InputDiv>
                      <Flex>
                          <InputDiv style={{ width: '15%', marginRight: 5 }}>
                              <InputFieldLabel style={{ left: 5 }}>Prefix</InputFieldLabel>
                              <MUISelect style={{ width: '100%' }} value={prefix} onChange={e => setPrefix(e.target.value)}>
                                  {PREFIX.map((v, i) => (<MenuItem key={i} value={v.toUpperCase()}>{v}</MenuItem>))}
                              </MUISelect>
                          </InputDiv>
                          <InputDiv style={{ flex: "1 0 230px", marginRight: 5 }} className={invalidFullName ? requiredClass : ''}>
                              <InputFieldLabel>Full name on government issued ID*</InputFieldLabel>
                              <Input value={fullName} onChange={e => setFullName(e.target.value)} />
                          </InputDiv>
                          <InputDiv style={{ width: '15%' }}>
                              <InputFieldLabel style={{ left: 5 }}>Suffix</InputFieldLabel>
                              <MUISelect style={{ width: '100%' }} value={suffix} onChange={e => setSuffix(e.target.value)}>
                                  {SUFFIX.map((v, i) => (<MenuItem key={i} value={v.toUpperCase()}>{v}</MenuItem>))}
                              </MUISelect>
                          </InputDiv>
                      </Flex>
                      <Flex>
                          <InputDiv style={{ flex: "1 0 170px", marginRight: 15 }} className={invalidSsn ? requiredClass : ''}>
                              <InputFieldLabel>Social Security Number*</InputFieldLabel>
                              <MaskInput mask={SsnMask} type="tel" placeholder="123-45-6789" value={ssn} onAccept={v => setSsn(v)} />
                          </InputDiv>
                          <InputDiv style={{ flex: '1 0 170px' }} className={invalidDob ? requiredClass : ''}>
                              <InputFieldLabel>Date of birth*</InputFieldLabel>
                              <MaskInput mask={DateMask} type="tel" placeholder="MM/DD/YYYY" value={dob} onAccept={v => setDob(v)} />
                          </InputDiv>
                      </Flex>
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
                      <CenteredRow marginTop={50}>
                          <LinkButton className="big" onClick={find}>Continue</LinkButton>
                      </CenteredRow>

                      {error && (
                        <Popup>
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <Image onClick={() => setError(!error)} src="/assets/images/popup-close.png" width="29" height="29" />
                            </div>
                            <div
                              style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                              }}
                            >
                                <Image src="/assets/images/alert.png" width="70" height="70" />
                                <Text>We cannot verify your ID.</Text>
                                <Text>Sorry for the inconvenience.</Text>
                                <Text style={{ marginTop: 10 }}>Please contact our customer</Text>
                                <Text style={{ marginBottom: 20 }}>
                                    service for further assistance.
                                </Text>
                                <Text style={{ marginBottom: 15 }}>123-456-7890</Text>
                            </div>
                        </Popup>
                      )}
                  </Layout>
              </FormContainer>
          </FormWrapper>
      </Wrapper>
    )
}

export default ForgotPassword
