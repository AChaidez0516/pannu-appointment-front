import Image from 'next/image'

import Layout from '../../../../components/Layout'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import {
    getAllQuestionList,
    saveAnswerForQuestion,
    saveSecretQA
} from '../../../../common/lib/user'
import { useRegUser, useLoadingStatus } from '../../../../redux/hooks/useCommonStore'
import {
    CenteredRow,
    InputFieldLabel,
    InputDiv,
    CSelect,
    Input,
    Wrapper,
    FormWrapper,
    FormContainer,
    MobileViewer,
    DesktopViewer,
    FigureWrapper,
    LinkButton,
    BottomWrapper,
} from '../../../../common/styleds/common.styled'
import {
    Title
} from '../../shared/styled'
import {
    CreateNewQuestion,
    QuestionDesc,
} from './styled'
import { MESSAGES } from "../../../../common/constant/global";

function Index() {
    const requiredClass = 'required'

    const router = useRouter()
    const { regUser } = useRegUser()
    const { commitLoadingStatus } = useLoadingStatus()

    const [questionList, setQuestionList] = useState([])

    const [question1, setQuestion1] = useState('')
    const [question2, setQuestion2] = useState('')
    const [question3, setQuestion3] = useState('')

    const [answer1, setAnswer1] = useState('')
    const [answer2, setAnswer2] = useState('')
    const [answer3, setAnswer3] = useState('')

    const [userQuestion, setUserQuestion] = useState('')
    const [userAnswer, setUserAnswer] = useState('')

    const [invalidAnswer1, setInvalidAnswer1] = useState(false)
    const [invalidAnswer2, setInvalidAnswer2] = useState(false)
    const [invalidAnswer3, setInvalidAnswer3] = useState(false)
    const [invalidUserQuestion, setInvalidUserQuestion] = useState(false)
    const [invalidUserAnswer, setInvalidUserAnswer] = useState(false)

    const getQuestionText = (qid) => {
        let q = questionList.filter(v => v.id == qid)
        return q[0].question
    }

    useEffect(() => {
        const getQuestions = async () => {
            commitLoadingStatus(true)

            const data = await getAllQuestionList()

            commitLoadingStatus(false)

            setQuestionList([...data])
        }
        getQuestions().catch(e => console.log(e))
    }, [])

    const done = () => {
        if (question1 != '' && answer1 == '') {
            setInvalidAnswer1(true)
            return
        }
        else {
            setInvalidAnswer1(false)
        }

        if (question2 != '' && answer2 == '')
        {
            setInvalidAnswer2(true)
            return
        }
        else {
            setInvalidAnswer2(false)
        }

        if (question3 != '' && answer3 == '') {
            setInvalidAnswer3(true)
            return
        }
        else {
            setInvalidAnswer2(false)
        }

        if (userQuestion == '') {
            setInvalidUserQuestion(true)
            return
        }
        else {
            setInvalidUserQuestion(false)
        }

        if (userQuestion != '' && userAnswer == '') {
            setInvalidUserAnswer(true)
            return
        }
        else {
            setInvalidUserAnswer(false)
        }

        let data1 = {
            userId: regUser.id,
            requests: [
                {
                    questionId: question1,
                    answer: answer1
                },
                {
                    questionId: question2,
                    answer: answer2
                },
                {
                    questionId: question3,
                    answer: answer3
                }
            ]
        }

        let data2 = {
            userId: regUser.id,
            request: {
                question: userQuestion,
                answer: userAnswer
            }
        }

        commitLoadingStatus(true)
        saveSecretQA(data2).then(res => {
            if (res) {
                saveAnswerForQuestion(data1).then(res => {
                    commitLoadingStatus(false)

                    toast.success(MESSAGES.save_data_success, {
                        onClose: () => {
                            router.push('/auth/signup/biometric')
                        }
                    })
                })
            }
            else {
                commitLoadingStatus(false)
                toast.error(MESSAGES.server_error)
            }
        })
    }

    return (
      <Wrapper style={{ justifyContent: 'center' }}>
          <FigureWrapper>
              <CenteredRow marginTop={150}>
                  <Image src="/assets/images/security_question_banner.png" width="522" height="369" />
              </CenteredRow>
          </FigureWrapper>
          <FormWrapper>
              <FormContainer>
                  <Layout title="Set up security questions">
                      <MobileViewer>
                          <CenteredRow marginTop={20}>
                              <Image src="/assets/images/security_question_banner.png" width="275" height="195" />
                          </CenteredRow>
                      </MobileViewer>
                      <DesktopViewer><Title className="small-big left">Set up security questions</Title></DesktopViewer>
                      <Title className="normal left mt-20">Ansewer 3 security questions{' '}</Title>
                      <div>
                          <InputDiv className={invalidAnswer1 ? requiredClass : ''}>
                              { (question1 != '')&& (
                                <>
                                    <InputFieldLabel>{getQuestionText(question1)}</InputFieldLabel>
                                    <Input value={answer1} onChange={(e) => setAnswer1(e.target.value)} />
                                </>
                              ) }
                              { (question1 == '')&& (
                                <CSelect value={question1} onChange={(e) => setQuestion1(e.target.value)}>
                                    <option></option>
                                    {questionList && questionList.map((data) => (
                                      <option key={data.id} value={data.id}>{data.question}</option>
                                    ))}
                                </CSelect>
                              ) }
                          </InputDiv>
                      </div>
                      { (question1 != '')&& (
                        <div style={{ marginTop: 25 }}>
                            <InputDiv className={invalidAnswer2 ? requiredClass : ''}>
                                { (question2 != '')&& (
                                  <>
                                      <InputFieldLabel>{getQuestionText(question2)}</InputFieldLabel>
                                      <Input value={answer2} onChange={(e) => setAnswer2(e.target.value)} />
                                  </>
                                ) }
                                { (question2 == '')&& (
                                  <CSelect value={question2} onChange={(e) => setQuestion2(e.target.value)}>
                                      <option></option>
                                      {questionList && questionList.map((data) => {
                                            if (data.id != question1)
                                                return (
                                                  <option key={data.id} value={data.id}>{data.question}</option>
                                                )
                                        }
                                      )}
                                  </CSelect>
                                )}
                            </InputDiv>
                        </div>
                      ) }
                      { (question2 != '')&& (
                        <div style={{ marginTop: 25 }}>
                            <InputDiv className={invalidAnswer3 ? requiredClass : ''}>
                                {(question3)&& (
                                  <>
                                      <InputFieldLabel>{getQuestionText(question3)}</InputFieldLabel>
                                      <Input value={answer3} onChange={(e) => setAnswer3(e.target.value)} />
                                  </>
                                )}
                                { (!question3)&& (
                                  <CSelect value={question3} onChange={(e) => setQuestion3(e.target.value)}>
                                      <option></option>
                                      {questionList && questionList.map((data) => {
                                            if (data.id != question1 && data.id != question2)
                                                return (
                                                  <option key={data.id} value={data.id}>{data.question}</option>
                                                )
                                        }
                                      )}
                                  </CSelect>
                                )}
                            </InputDiv>
                        </div>
                      )}
                      { (question3 != '')&& (
                        <>
                            <CreateNewQuestion>Create your secret question</CreateNewQuestion>
                            <QuestionDesc>
                                Be careful. Only you must know the answer. You will need it to
                                retrieve or create a username. Don’t use an obvious or easy to guess
                                answer. Enter the question and answer in the boxes.
                            </QuestionDesc>
                            <InputDiv className={invalidUserQuestion ? requiredClass : ''}>
                                <InputFieldLabel>Create your question </InputFieldLabel>
                                <Input value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)} />
                            </InputDiv>
                            <InputDiv className={invalidUserAnswer ? requiredClass : ''}>
                                <InputFieldLabel>Create your answer </InputFieldLabel>
                                <Input value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
                            </InputDiv>
                            <BottomWrapper>
                                <CenteredRow marginTop={30}>
                                    <LinkButton className="big" onClick={done}>Set up biometric<br />authentication</LinkButton>
                                </CenteredRow>
                            </BottomWrapper>
                        </>
                      )}
                  </Layout>
              </FormContainer>
          </FormWrapper>
      </Wrapper>
    )
}

export default Index
