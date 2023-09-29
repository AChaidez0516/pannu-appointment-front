import Link from 'next/link'
import Image from 'next/image'

import Layout from '../../../../components/Layout'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
    CenteredRow,
    FigureWrapper,
    FormContainer,
    FormWrapper,
    Input,
    InputDiv,
    InputFieldLabel,
    MobileViewer,
    Wrapper,
    LinkButton,
} from '../../../../common/styleds/common.styled'
import {
    ResultTitle,
    Title
} from './styled'

import { changeUserName, getUserDetail } from '../../../../common/lib/user'
import { useLoadingStatus } from '../../../../redux/hooks/useCommonStore'
import { useRegUser } from '../../../../redux/hooks/useCommonStore'
import { EyeWrapper } from "../../../auth.module/forgot/shared/styled";
import { MESSAGES } from "../../../../common/constant/global";


const ChangeUserName = () => {
    const requiredClass = 'required'
    const { regUser } = useRegUser()
    const { commitLoadingStatus } = useLoadingStatus()

    const [answerList, setAnswerList] = useState([])
    const [questionList, setQuestionList] = useState([])
    const [invalidAnswerList, setInvalidAnswerList] = useState([])

    const [showNewUserName, setShowNewUserName] = useState(false)

    const [showUserName, setShowUserName] = useState(false)
    const [userName, setUserName] = useState('')
    const [invalidUserName, setInvalidUserName] = useState(false)
    const [result, setResult] = useState(false)

    useEffect(() => {
        const getUserInfo = async () => {

            if (!regUser.id)
                return

            commitLoadingStatus(true)

            const res  = await getUserDetail(regUser.id)

            commitLoadingStatus(false)

            if (!res) {
                toast.error(MESSAGES.server_error)
                return
            }

            let list1 = res.securityAnswers.filter(v => !v.securityQuestion.isCustom)
            let list2 = res.securityAnswers.filter(v => v.securityQuestion.isCustom)

            setQuestionList([...list1, ...list2])
            setAnswerList(Array.from(new Array(res.securityAnswers.length), () => ''))

        }

        getUserInfo().catch(e => console.log(e))

    }, [])

    const find = () => {
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

        setShowNewUserName(true)
    }

    const reset = () => {

        if (userName.length == 0) {
            setInvalidUserName(true)
            return
        }
        else {
            setInvalidUserName(false)
        }

        let data = {
            userName: userName,
            userId: regUser.id,
            questionAnswers: []
        }

        questionList.forEach((v, i) => {
            if (answerList[i])
                data.questionAnswers.push({
                    questionId: v.id,
                    answer: answerList[i]
                })
        })

        commitLoadingStatus(true)

        changeUserName(data).then(res => {
            commitLoadingStatus(false)

            if (!res) {
                toast.error(MESSAGES.server_error)
                return
            }

            setResult(res.status)
        })
    }

    return (
        <Wrapper>
            <FigureWrapper>
                <CenteredRow marginTop={170}>
                    <Image src="/assets/images/change_username_banner.png" width="522" height="342" />
                </CenteredRow>
            </FigureWrapper>
            <FormWrapper>
                <FormContainer>
                    <Layout title="Change username" hasDesktopTitle={true}>
                        { (!showNewUserName) &&
                            <MobileViewer>
                                <CenteredRow marginTop={20}>
                                    <Image src="/assets/images/change_username_banner.png" width="200" height="130"/>
                                </CenteredRow>
                            </MobileViewer>
                        }
                        { (!showNewUserName) ? (
                            questionList && questionList.map((data, index) => {
                                if (index == 0 || (index > 0 && answerList[index - 1] != ''))
                                    return (
                                        <div key={index}>
                                            { (!questionList[index].securityQuestion.isCustom && index == 0)&& <Title className="small mt-20 left">Answer your security questions</Title> }

                                            { (questionList[index].securityQuestion.isCustom)&& <Title className="small mt-20 left">Answer your secret question</Title> }
                                            <InputDiv style={{width: '100%', marginRight: 5}} className={invalidAnswerList[index] ? requiredClass : ''}>
                                                <InputFieldLabel>{questionList[index].securityQuestion.question}</InputFieldLabel>
                                                <Input value={answerList[index]}
                                                       onChange={ e => {
                                                           answerList[index] = e.target.value
                                                           setAnswerList([...answerList])
                                                       }} />
                                            </InputDiv>
                                        </div>
                                    )
                            })
                        ) : (
                            (!result) ? (
                                <>
                                    <MobileViewer>
                                        <CenteredRow marginTop={20}>
                                            <Image src="/assets/images/change_username_banner.png" width="200" height="130" />
                                        </CenteredRow>
                                    </MobileViewer>
                                    <Title className="small left mt-40">Set up new unique Username</Title>
                                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                        <InputDiv style={{ width: '70%', marginRight: 30 }} className={invalidUserName ? 'required' : ''} >
                                            <InputFieldLabel>Unique Username only used here*</InputFieldLabel>
                                            <Input type={showUserName? 'text' : 'password'} value={userName} onChange={e => setUserName(e.target.value)} />
                                            <EyeWrapper>
                                                <Image onClick={() => setShowUserName(!showUserName)} src="/assets/images/eye_ico.png" width="21" height="17" />
                                            </EyeWrapper>
                                        </InputDiv>
                                    </div>
                                    <CenteredRow marginTop={42}>
                                        <LinkButton onClick={reset}>Update username</LinkButton>
                                    </CenteredRow>
                                </>
                            ) : (
                                <>
                                    <ResultTitle>Username updated</ResultTitle>
                                    <CenteredRow marginTop={50}>
                                        <Image src="/assets/images/recovered_banner.png" width="270" height="224" />
                                    </CenteredRow>
                                    <CenteredRow>
                                        <Link href="/auth/login">
                                            <LinkButton>Sign in</LinkButton>
                                        </Link>
                                    </CenteredRow>
                                </>
                            )
                        ) }

                        { (!showNewUserName)&& <CenteredRow marginTop={50}><LinkButton className="big" onClick={find}>Continue</LinkButton></CenteredRow> }
                    </Layout>
                </FormContainer>
            </FormWrapper>
        </Wrapper>
    )
}

export default ChangeUserName