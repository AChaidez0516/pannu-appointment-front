import client from './apollo'
import { gql } from '@apollo/client'

export async function loginUser(username, password, isEmail) {
  const LOGIN_USER = gql`
  mutation ($username: String!, $password: String!, $isEmail: Boolean) @api(name: registration) {
      loginUser(request: {username: $username, password: $password, isEmail: $isEmail}) {
        id
        fullName
        dob
        memberID
        internalEmail
        basicData {
            id
            ssn
            currentAddress
            email
        }
      }
    }
  `

  try {
    const { data, loading, error } = await client.mutate({
      mutation: LOGIN_USER,
      variables: {
        username: username,
        password: password,
        isEmail: isEmail
      }
    })

    return data.loginUser
  }
  catch (e) {
    console.log(e)
  }
  return null
}

export async function getSuggestionNameList(userName, isEmail) {
  const GET_SUGGEST_USERNAME = gql`
    mutation ($suggestUsername: String!, $isEmail: Boolean!) @api(name: registration) {
        suggestUsername(proposedName: $suggestUsername, isEmail: $isEmail)
    }
  `
  try {
    const { data, loading, error } = await client.mutate({
      mutation: GET_SUGGEST_USERNAME,
      variables: { suggestUsername: userName, isEmail: isEmail },
      fetchPolicy: "no-cache"
    })

    return data.suggestUsername
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function registerUser(userData) {
  const REGISTER_USER = gql`
    mutation regUser($fullName: String, $idenfier: String, $password: String, $dob: Date, $phoneNumber: String,
      $userType: USERTYPE, $prefix: PREFIX, $suffix: SUFFIX, $inviteCode: String, $referralCode: String,
      $email: String, $ssn: String, $gender: GENDER, $maritalStatus: MARITALSTATUS,
      $addressList: [AddressDetailInput], 
      $employeeNumber: String, $employerName: String, $employerAddress: String, $yearInWork: Int, 
      $monthInWork: Int, $occupation: String, $position: String, $annualIncome: Float) @api(name: registration)
      {
      registerUser(
        request: {
          user: {
              fullName: $fullName
              dob: $dob
              phoneNumber: $phoneNumber
              suffix: $suffix
              prefix: $prefix
              inviteCode: $inviteCode
              referralCode: $referralCode
              userType: $userType
              authInfo: {
                username: $idenfier,
                password: $password
              }
          },
          basicData: {
              email: $email
              ssn: $ssn
              gender: $gender
              maritalStatus: $maritalStatus
          },
          addressList: $addressList
          employment: {
              employeeNumber: $employeeNumber
              employerName: $employerName
              employerAddress: $employerAddress
              yearInWork: $yearInWork
              monthInWork: $monthInWork
              occupation: $occupation
              position: $position
              annualIncome: $annualIncome
          }
        }) {
          id          
          fullName
          internalEmail
        }
      }
  `

  try {
    let { data, loading, error } = await client.mutate({
      mutation: REGISTER_USER,
      variables: { ...userData }
    })
    return data.registerUser
  }
  catch (e) {
    console.log(e)
    return null
  }
}

export async function checkIdentifier(identifier) {
  const GET_USER_BY_NAME = gql`
    query checkUserName($userName: String) @api(name: registration) {
        userDetail (fullname: $userName) {
            id,
            fullname
        }    
      }
  `
  const { loading, error, data } = await client.query({
    query: GET_USER_BY_NAME,
    variables: { identifier },
  })
  return data.checkUserName
}

export async function getAllUsers() {
  const GET_ALL_USERS = gql`
   query GetAllUsers  @api(name: registration) {
      allUsers {
          id
          userType
          userStatus
          fullName
          dob
          basicData {
              email
              ssn
              gender
          }
          memberID
          phoneNumber
          internalEmail
      }
    }
  `
  const { loading, error, data } = await client.query({
    query: GET_ALL_USERS
  })
  return data.allUsers
}

export async function getUserDetail(userId) {
  let GET_USER_DETAIL = gql`
    query User($userId: BigInteger) @api(name: registration) {
    userDetail(userId: $userId) {
        id
        prefix
        fullName
        suffix
        dob
        userStatus
        userType
        internalEmail
        memberID
        inviteCode
        referralCode
        phoneNumber
        avatar {
          url
        }
        authInfo {
            username
        }
        securityAnswers {
            id
            answer
            securityQuestion{
                id
                question
                isCustom
            }
        }
        basicData {
            id
            email
            gender
            ssn
            maritalStatus
            currentAddress
            addressList {
                id
                address
                street
                city
                country
                month
                year
                homeStatus
                geography {
                    lat
                    lng
                    plusCode
                }
            }
            employment {
                id
                employerName
                employerAddress
                occupation
                position
                yearInWork
                monthInWork
                annualIncome
                employeeNumber
            }
        }
        insuranceInfos {
          id
          planName
          planIssuer
          effectiveDate
          subscriberName
          memberId
          planAddress
          groupPlanId
          patientPhoneNumber
          providerPhoneNumber
        }
        paymentCards {
            id
            cardFrontImageURL
            cardBackImageURL
            nameOnCard
            cardNumber
            cvv
            expiryDate
            billingAddress
            priority
        },
        transactions {
            atomicTransactions {
                paymentCard {
                    cardNumber
                }
                amount
                fee
                dateToCharge
            }
        }
    }
  }
  `

  try {
    let { data, loading, error } = await client.query({
      query: GET_USER_DETAIL,
      variables: { userId },
      fetchPolicy: "no-cache"
    })

    return data.userDetail
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function getUserDetailWithQuery(userId, query) {
  let GET_USER_DETAIL = gql`
    query User($userId: BigInteger) @api(name: registration) {
    userDetail(userId: $userId) {
        ${query}
    }
  }
  `

  try {
    let { data, loading, error } = await client.query({
      query: GET_USER_DETAIL,
      variables: { userId },
      fetchPolicy: "no-cache"
    })

    return data.userDetail
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function sendVerifyEmail(email) {
  const SEND_VERIFY_EMAIL = gql`
    mutation sendVerifyEmail ($email: String) @api(name: registration) {
      sendEmailToVerify(email: $email) {
          status
          message
      }
    }
    `
  const { data, loading, error } = await client.mutate({
    mutation: SEND_VERIFY_EMAIL,
    variables: { email }
  })
  return data.sendVerifyEmail
}

export async function checkVerifyEmail() {
  const CHECK_VERIFY_EMAIL = gql`
    query Booleans ($email: String) @api(name: registration) {
      checkEmailVerified(email: $email) 
  }
  `
  const { loading, error, data } = await client.query({
    query: CHECK_VERIFY_EMAIL
  })
  return data.checkEmailVerified
}

export async function getUserInfoByInviteCode(inviteCode) {
  const GET_USER_BY_INVITE_CODE = gql`
    query UserInfo ($inviteCode: String) @api(name: registration) {
      userInfoByInviteCode(inviteCode: $inviteCode) {
        id
        fullName
        email
        position
        inviteCode
        invitedtype
      }
    }
  `
  const { loading, error, data } = await client.query({
    query: GET_USER_BY_INVITE_CODE,
    variables: { inviteCode: inviteCode }
  })

  return data.userInfoByInviteCode
}

export async function saveInsuranceInfo(userId, insuranceData) {
  let SAVE_INSURANCE_DATA = gql`
  mutation InsuranceInfo($request: InsuranceSavePatternInput, $userId: BigInteger!) @api(name: registration) {
    saveInsuranceInfo(request: $request, userId: $userId) {
        id
        type
        fullNameOnID
        prefix
        suffix
        relationship
        dob
        gender
        ssn
        maritalStatus
        address
        startDate
        endDate
        responsibleParty {
            frType
            frRelationship
            frFullNameOnID
            frAddress
            frPhoneNumber
            frEmail
        },
        plans {
            type
            planName
            planIssuer
            effectiveDate
            nameOnCard
            memberId
            planAddress
            groupPlanId
            patientSupportPhoneNumber
            providerSupportPhoneNumber
            email
            oopCost {
                isInNetworkBenefit
                inNetworkIndividualDeductible
                inNetworkIndividualMaximumOOP
                inNetworkFamilyDeductible
                inNetworkFamilyMaximumOOP
                isOutNetworkBenefit
                outNetworkIndividualDeductible
                outNetworkIndividualMaximumOOP
                outNetworkFamilyDeductible
                outNetworkFamilyMaximumOOP
            }
        }
    }
  }
  `
  try {
    let { data, loading, error } = await client.mutate({
      mutation: SAVE_INSURANCE_DATA,
      variables: {
        userId: userId,
        request: insuranceData
      }
    })

    return data.saveInsuranceInfo
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function updateInsuranceInfo(insuredId, insuranceData) {
  let SAVE_INSURANCE_DATA = gql`
  mutation InsuranceInfo($request: InsuranceSavePatternInput, $infoId: BigInteger) @api(name: registration) {
    updateInsuranceInfo(request: $request, infoId: $infoId) {
        id
        type
        fullNameOnID
        prefix
        suffix
        relationship
        dob
        gender
        ssn
        maritalStatus
        address
        startDate
        endDate
        responsibleParty {
            frType
            frRelationship
            frFullNameOnID
            frAddress
            frPhoneNumber
            frEmail
        },
        plans {
            type
            planName
            planIssuer
            effectiveDate
            nameOnCard
            memberId
            planAddress
            groupPlanId
            patientSupportPhoneNumber
            providerSupportPhoneNumber
            email
            oopCost {
                isInNetworkBenefit
                inNetworkIndividualDeductible
                inNetworkIndividualMaximumOOP
                inNetworkFamilyDeductible
                inNetworkFamilyMaximumOOP
                isOutNetworkBenefit
                outNetworkIndividualDeductible
                outNetworkIndividualMaximumOOP
                outNetworkFamilyDeductible
                outNetworkFamilyMaximumOOP
            }
        }
    }
  }
  `
  try {
    let { data, loading, error } = await client.mutate({
      mutation: SAVE_INSURANCE_DATA,
      variables: {
        infoId: insuredId,
        request: insuranceData
      }
    })

    return data.updateInsuranceInfo
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function deleteInsuranceInfo(insuredId) {
  const DELETE_INSURANCE = gql`
  mutation Response($infoId: BigInteger) @api(name: registration) {
    deleteInsuranceInfo(infoId: $infoId) {
     status
     message
    }
  }
  `

  try {
    const { data, loading, error } = await client.mutate({
      mutation: DELETE_INSURANCE,
      variables: {
        infoId: insuredId
      }
    })

    return data.deleteInsuranceInfo
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function updateInsurancePlan(planId, insurancePlan) {
  let UPDATE_INSURANCE_PLAN = gql`
  mutation InsurancePlan($insurancePlan: InsurancePlanInput, $planId: BigInteger) @api(name: registration) {
    updateInsurancePlan(
      plan: $insurancePlan, 
      planId: $planId) {
        id
        planName
        planIssuer
        planAddress
        groupPlanId
        memberId
        nameOnCard
    }
  }
  `
  try {
    let { data, loading, error } = await client.mutate({
      mutation: UPDATE_INSURANCE_PLAN,
      variables: { planId, insurancePlan }
    })

    return data.updateInsurancePlan
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function updateResponsibleParty(planId, responsibleParty) {
  let UPDATE_PARTY = gql`
  mutation InsurancePlan($party: FRPartyInput, $planId: BigInteger) @api(name: registration) {
    updateResponsibleParty(party: $party, planId: $planId) {
      id
      responsibleParty {
        fullNameOnID
        address
        relationship
        responsiblePartyType
        email
      }
    }
  }
  `

  try {
    let { data, loading, error } = await client.mutate({
      mutation: UPDATE_PARTY,
      variables: { party: responsibleParty, planId }
    })
    return data.updateResponsibleParty
  }
  catch (e) {
    console.log(e)
  }
  return null
}

export async function updateFRParty(responsibleParty) {
  let UPDATE_PARTY = gql`
  mutation InsurancePlan($request: UpdateFRPartyRequestInput) @api(name: registration) {
    updateFRParty(request: $request) {
      id
      fullName
      address
      relation
      phoneNumber
      type
      userId
    }
  }
  `

  try {
    let { data, loading, error } = await client.mutate({
      mutation: UPDATE_PARTY,
      variables: { request: responsibleParty }
    })
    return data.updateFRParty
  }
  catch (e) {
    console.log(e)
  }
  return null
}

export async function createFRParty(responsibleParty) {
  let CREATE_PARTY = gql`
  mutation InsurancePlan($request: CreateFRPartyRequestInput) @api(name: registration) {
    createFRParty(request: $request) {
      id
      fullName
      address
      relation
      phoneNumber
      type
      userId
    }
  }
  `

  try {
    let { data, loading, error } = await client.mutate({
      mutation: CREATE_PARTY,
      variables: { request: responsibleParty }
    })
    return data.createFRParty
  }
  catch (e) {
    console.log(e)
  }
  return null
}

export async function updateUser(userData) {
  let UPDATE_USER = gql`
  mutation updateUser($request: UpdateUserRequestInput) @api(name: registration) {
    updateUser(request: $request) {
      message
    	key
    	status
    }
  }
  `

  try {
    let { data, loading, error } = await client.mutate({
      mutation: UPDATE_USER,
      variables: { request: userData }
    })
    return data.updateUser
  }
  catch (e) {
    console.log(e)
  }
  return null
}

export async function deleteFRParty(userId) {
  let DELETE_PARTY = gql`
  mutation InsurancePlan($userId: BigInteger) @api(name: registration) {
    deleteFRParty(userId: $userId) {
      message
    	key
    	status
    }
  }
  `

  try {
    let { data, loading, error } = await client.mutate({
      mutation: DELETE_PARTY,
      variables: { userId: userId }
    })
    return data.deleteFRParty
  }
  catch (e) {
    console.log(e)
  }
  return null
}

export async function getFRParty(userId) {
  const GET_PARTY = gql`
    query InsurancePlan ($userId: BigInteger) @api(name: registration) {
      fRParty(userId: $userId) {
        id
        fullName
        address
        relation
        phoneNumber
        type
        userId
      }
    }
  `
  const { loading, error, data } = await client.query({
    query: GET_PARTY,
    variables: { userId: userId }
  })

  return data.fRParty
}

export async function updateOopCost(param) {
  let UPDATE_OOP_COST = gql`
  mutation InsurancePlan($oopCost: OOPCostInput, $planId: BigInteger) @api(name: registration) {
    updateOopCost(oopCost: $oopCost, planId: $planId) {
      id
      planName
      planIssuer
      planAddress
      groupPlanId
      memberId
      nameOnCard
      responsibleParty {
        fullNameOnID
        address
        relationship
        responsiblePartyType
        email
      }
      oopCost {
        inNetworkFamilyDeductible
        inNetworkFamilyMaximumOOP
        inNetworkIndividualDeductible
        inNetworkIndividualMaximumOOP
        isInNetworkBenefit
        isOutNetworkBenefit
        outNetworkFamilyDeductible
        outNetworkFamilyMaximumOOP
        outNetworkIndividualDeductible
        outNetworkIndividualMaximumOOP
      }
    }
  }
  `
  try {
    let { data, loading, error } = await client.mutate({
      mutation: UPDATE_OOP_COST,
      variables: { oopCost: param.oopCost, planId: param.planId }
    })
    return data.updateOopCost
  }
  catch (e) {
    console.log(e)
  }
  return null
}

export async function deleteInsurancePlan(planId) {
  let DELETE_INSURANCE_PLAN = gql`
  mutation Response($planId: BigInteger) @api(name: registration) {
    deleteInsurancePlan(planId: $planId) {
     status
     message
    }
  }
  `

  try {
    let { data, loading, error } = await client.mutate({
      mutation: DELETE_INSURANCE_PLAN,
      variables: { planId }
    })
    return data.deleteInsurancePlan
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function getInsurancePlanDetail(planId) {
  const GET_INSURANCE_PLAN_DETAIL = gql`
  query InsurancePlan($planId: BigInteger) @api(name: registration) {
    insurancePlanDetail(planId: $planId) {
      id
      planName
      planIssuer
      planAddress
      groupPlanId
      memberId
      nameOnCard
      effectiveDate
      patientSupportPhoneNumber
      providerSupportPhoneNumber
      responsibleParty {
        fullNameOnID
        address
        relationship
        responsiblePartyType
        email
      }
      insureds {
        id
        prefix
        fullNameOnID
        suffix
        dob
        insuredType
        maritalStatus
        relationship
      }
      oopCost {
        inNetworkFamilyDeductible
        inNetworkFamilyMaximumOOP
        inNetworkIndividualDeductible
        inNetworkIndividualMaximumOOP
        isInNetworkBenefit
        isOutNetworkBenefit
        outNetworkFamilyDeductible
        outNetworkFamilyMaximumOOP
        outNetworkIndividualDeductible
        outNetworkIndividualMaximumOOP
      }
    }
  }
  `

  let { data, loading, error } = await client.query({
    query: GET_INSURANCE_PLAN_DETAIL,
    variables: { planId }
  })

  return data.insurancePlanDetail
}

export async function getAllQuestionList() {
  let ALL_QUESTION = gql`
  query @api(name: registration) {
      allQuestions {
          id
          question
      }
  }
  `

  try {
    let { data, loading, error } = await client.query({
      query: ALL_QUESTION
    })

    return data.allQuestions
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function saveAnswerForQuestion(reqData) {
  let SAVE_ANSWER_FOR_QUESTION = gql`
  mutation answers($requests: [QIdAnswerStringPatternInput], $userId: BigInteger) @api(name: registration) {
    answersForQuestions(requests: $requests, userId: $userId) {
        id
        answer 
        securityQuestion{
            question
        }
    }
  }
  `

  try {
    let { data, loading, error } = await client.mutate({
      mutation: SAVE_ANSWER_FOR_QUESTION,
      variables: { requests: reqData.requests, userId: reqData.userId }
    })

    return data.answersForQuestions
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function saveSecretQA(reqData) {
  let SAVE_QUESTION_AND_ANSWER = gql`
  mutation question($request: QAStringPatternInput, $userId: BigInteger) @api(name: registration) {
    createQAByUser(request: $request, userId: $userId) {
        id
        answer 
        securityQuestion{
            question
        }
    }
  }
  `

  try {
    let { data, loading, error } = await client.mutate({
      mutation: SAVE_QUESTION_AND_ANSWER,
      variables: { request: reqData.request, userId: reqData.userId }
    })
    return data.createQAByUser
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function forgotUserNameQuestions(reqData) {
  let FORGOT_USERNAME_QUESTIONS = gql`
  query Response ($fullName: String, $prefix: String, $suffix: String, $ssn: String, $dob: Date ) @api(name: registration)
  {
    forgotUserNameQuestions(
    request: {
      prefix: $prefix, suffix: $suffix, fullNameOnID: $fullName, 
      ssn: $ssn, dob: $dob
    }) {
        id
        question
        isCustom
    }
  }
  `

  try {
    let { data, loading, error } = await client.query({
      query: FORGOT_USERNAME_QUESTIONS,
      variables: {
        fullName: reqData.fullName, prefix: reqData.prefix,
        suffix: reqData.suffix, ssn: reqData.ssn, dob: reqData.dob
      }
    })

    return data.forgotUserNameQuestions
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function findUserName(reqData) {
  let FIND_USERNAME = gql`
    mutation findUserName ($prefix: String, $suffix: String, $fullName: String, $ssn: String
      $dob: Date, $questionAnswers: [QIdAnswerStringPatternInput]) @api(name: registration) {
      forgotUserName (
        request: {
          prefix: $prefix, 
          suffix: $suffix, 
          fullNameOnID: $fullName, 
          ssn: $ssn, 
          dob: $dob, 
          questionAnswers: $questionAnswers 
        }) {
          status
          message
      }
  }
  `

  try {
    let { data, loading, error } = await client.mutate({
      mutation: FIND_USERNAME,
      variables: {
        fullName: reqData.fullName, prefix: reqData.prefix, suffix: reqData.suffix,
        dob: reqData.dob, ssn: reqData.ssn, questionAnswers: reqData.questionAnswers
      }
    })

    return data.forgotUserName
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function forgotPasswordQuestions(reqData) {
  const FORGOT_PASSWORD_QUESTIONS = gql`
  query Response($prefix: String, $suffix: String, $fullName: String, $ssn: String,
    $dob: Date, $userName: String) @api(name: registration)
  {
    forgotPasswordQuestions(
      request: {
        prefix: $prefix, suffix: $suffix, fullNameOnID: $fullName, ssn: $ssn, 
        dob: $dob, username: $userName
      }) {
        id
        question
        isCustom
    }
  }
  `
  try {
    let { data, loading, error } = await client.query({
      query: FORGOT_PASSWORD_QUESTIONS,
      variables: {
        prefix: reqData.prefix, suffix: reqData.suffix, fullName: reqData.fullName,
        ssn: reqData.ssn, dob: reqData.dob, userName: reqData.userName
      }
    })

    return data.forgotPasswordQuestions
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function findUserPassword(reqData) {
  let FIND_USER_PASSWORD = gql`
  mutation findUserPassword ($prefix: String, $suffix: String, $fullName: String, $ssn: String
      $dob: Date, $userName: String, $questionAnswers: [QIdAnswerStringPatternInput]) @api(name: registration) {
      forgotPassword(
        request: 
        {
          prefix: $prefix, 
          suffix: $suffix, 
          fullNameOnID: $fullName, 
          ssn: $ssn, 
          dob: $dob, 
          username: $userName, 
          questionAnswers: $questionAnswers 
        }) {
          status
          message
      }
  }
  `

  try {
    let { data, loading, error } = await client.mutate({
      mutation: FIND_USER_PASSWORD,
      variables: {
        fullName: reqData.fullName, userName: reqData.userName, prefix: reqData.prefix, suffix: reqData.suffix,
        ssn: reqData.ssn, dob: reqData.dob, questionAnswers: reqData.questionAnswers
      }
    })

    return data.forgotPassword
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function resetPassword(pwd, token) {
  let RESET_PASSWORD = gql`
  mutation Response ($newPassword: String, $token: String) @api(name: registration) {
    resetPassword(newPassword: $newPassword, token: $token) {
        status
        message
    }
  }
  `

  try {
    let { data, loading, error } = await client.mutate({
      mutation: RESET_PASSWORD,
      variables: { newPassword: pwd, token: token }
    })
    return data.resetPassword
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function savePaymentCard(userId, reqData) {
  const SAVE_PAYMENT_CARD = gql`
  mutation($paymentCard: PaymentCardInput!, $userId: BigInteger!) @api(name: registration) {
    savePaymentCard(request: {paymentCard: $paymentCard,  userId: $userId}) {
      user {
        basicData {
          email,
          gender,
          ssn,
          maritalStatus,
          currentAddress
        }
      },
      cardFrontImageURL,
      cardBackImageURL,
      nameOnCard,
      cardNumber,
      cvv,
      expiryDate,
      billingAddress
    }
  }
  `

  try {
    let { data, loading, error } = await client.mutate({
      mutation: SAVE_PAYMENT_CARD,
      variables: {
        paymentCard: reqData,
        userId: userId
      }
    })
    return data.savePaymentCard
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function updatePaymentCard(cardId, reqData) {
  const UPDATE_PAYMENT_CARD = gql`
  mutation($paymentCard: PaymentCardInput!, $id: BigInteger!) @api(name: registration) {
    updatePaymentCard(paymentCard: $paymentCard,  id: $id) {
      user {
        basicData {
          email,
          gender,
          ssn,
          maritalStatus,
          currentAddress
        }
      },
      cardFrontImageURL,
      cardBackImageURL,
      nameOnCard,
      cardNumber,
      cvv,
      expiryDate,
      billingAddress
    }
  }
  `

  try {
    let { data, loading, error } = await client.mutate({
      mutation: UPDATE_PAYMENT_CARD,
      variables: {
        paymentCard: reqData,
        id: cardId
      }
    })
    return data.updatePaymentCard
  }
  catch (e) {
    console.log(e)
  }
  return null
}

export async function deletePaymentCard(cardId) {
  const DELETE_PAYMENT_CARD = gql`
  mutation($cardId: BigInteger) @api(name: registration) {
    deletePaymentCard(cardId: $cardId) {
      message
      status
    }
  }
  `

  try {
    let { data, loading, error } = await client.mutate({
      mutation: DELETE_PAYMENT_CARD,
      variables: {
        cardId: cardId
      }
    })

    return data.deletePaymentCard
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function changeUserName(reqData) {
  const CHANGE_USER_NAME = gql`
    mutation Response($userId: BigInteger, $userName: String, $requests: [QIdAnswerStringPatternInput]) @api(name: registration) {
      changeUserName(requests: $requests, newUsername: $userName, userId: $userId) {
          status
          message
      }
  }
  `

  try {
    const { data, loading, error } = await client.mutate({
      mutation: CHANGE_USER_NAME,
      variables: {
        userId: reqData.userId, userName: reqData.userName,
        requests: reqData.questionAnswers
      }
    })

    return data.changeUserName
  }
  catch (e) {
    console.log(e)
  }

  return null
}

export async function saveTransaction(reqData) {
  const SAVE_TRANSACTION = gql`
  mutation ($atomicTransactions: [AtomicTransactionPatternInput], $date: Date, $userId: BigInteger) @api(name: registration) {
    saveTransaction(request: {
      atomicTransactions: $atomicTransactions,
      userId: $userId,
      date: $date
    }) {
      atomicTransactions {
        paymentCard {
          nameOnCard
        }
        amount
        fee
        dateToCharge
        status
      }
      date
      user {
        id
        authInfo {
          username
          userEmail
        }
      }
    }
  }

  `
  try {
    const { data, loading, error } = await client.mutate({
      mutation: SAVE_TRANSACTION,
      variables: {
        atomicTransactions: reqData.atomicTransactions,
        date: reqData.date,
        userId: reqData.userId
      }
    })

    return data.saveTransaction
  }
  catch (e) {
    console.log(e)
  }
  return false
}

export async function setPaymentCardPriority(reqData) {
  const UPDATE_CARD_PRIORITY = gql`
    mutation($priorities: [PaymentCardPriorityPatternInput]) @api(name: registration) {
      updatePaymentCardPriority(priorities: $priorities) {
          id
              cardFrontImageURL
              cardBackImageURL
              nameOnCard
              cardNumber
              cvv
              expiryDate
              billingAddress
              priority
      }
  }
  `

  try {
    const { data, loading, error } = await client.mutate({
      mutation: UPDATE_CARD_PRIORITY,
      variables: { priorities: reqData }
    })

    return data.updatePaymentCardPriority
  }
  catch (e) {
    console.log(e)
  }

  return null
}
