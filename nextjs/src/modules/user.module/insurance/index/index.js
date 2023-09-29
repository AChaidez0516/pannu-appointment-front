import Link from 'next/link'
import Image from 'next/image'

import Layout from '../../../../components/Layout'
import ResponsibleParty from '../responsible-party'
import ConfirmDelete from '../shared/modals/ConfirmDelete'

import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { format, parse } from 'date-fns'

import { useRegUser, useLoadingStatus } from '../../../../redux/hooks/useCommonStore'
import { useInsuredType, useInsurance } from '../../../../redux/hooks/useInsuranceStore'
import { getUserDetail, deleteInsuranceInfo } from '../../../../common/lib/user'
import { MESSAGES } from '../../../../common/constant/global'
import {
	Wrapper,
	FormWrapper,
	FormContainer,
	FigureWrapper,
	MobileViewer,
	CenteredRow,
	LinkButton,
	BottomWrapper,
	Flex,
} from '../../../../common/styleds/common.styled'
import {
	AnserTitle,
	CreateNewQuestion,
	QuestionDesc,
	Tab,
	TabPanel,
	TabsList,
	TableDiv,
	TrHeader,
	TrFooter,
	Td,
	Tr,
	TdText
} from './styled'
import {
	INSURED_TYPE_KEYS,
} from './data'

import { CheckMark } from '../../../../common/utils/Icons'

function Insurance() {
	const router = useRouter()
	const { gotosummary : type } = router.query

	const { regUser } = useRegUser()
	const { commitLoadingStatus } = useLoadingStatus()
	const { insuredType, commitInsuredType } = useInsuredType()
	const { commitInsurance, initInsurance } = useInsurance()

	const [insuredList, setInsuredList] = useState({ child: [], dependent: [] })

	const [confirmRemoveProps, setConfirmRemovePopupProps] = useState(null)

	useEffect(() => {
		const getUserInfo = async () => {
			commitLoadingStatus(true)
			const res = await getUserDetail(regUser.id)
			commitLoadingStatus(false)
			if (!res) {
				toast.error(MESSAGES.server_error)
				return
			}

			const plans = res.insuranceInfos
			const list = { child: [], dependent: [] }
			plans.forEach((v, i) => {
				if (v.type == INSURED_TYPE_KEYS.MINOR_AGE_CHILE) {
					list.child.push(v)
				}
				else if (v.type == INSURED_TYPE_KEYS.ADULT_DEPENDENT) {
					list.dependent.push(v)
				}
			})

			setInsuredList(list)
		}

		getUserInfo().catch(e => console.log(e))
		if (type != 'edit')
			initInsurance()

	}, [])

	const removeInsured = (id) => {
		let insuredName = ''
		if (insuredType == INSURED_TYPE_KEYS.MINOR_AGE_CHILE)
			insuredName = insuredList.child.filter(v => v.id == id)[0].fullNameOnID
		else
			insuredName = insuredList.dependent.filter(v => v.id == id)[0].fullNameOnID

		setConfirmRemovePopupProps({
			isOpened: true,
			id: id,
			message: `Are you sure you want to delete ${insuredName}?`,
		})
	}

	const updateInsured = (id) => {
		let insuranceInfo = null
		if (insuredType == INSURED_TYPE_KEYS.MINOR_AGE_CHILE)
			insuranceInfo = insuredList.child.filter(v => v.id == id)[0]
		else
			insuranceInfo = insuredList.dependent.filter(v => v.id == id)[0]

		if (insuranceInfo == undefined || insuranceInfo == null)
			return

		console.log(insuranceInfo)
		const data = {
			insured: {
				id: uuidv4(),
				originalId: insuranceInfo.id,
				insuredType: insuranceInfo.type,
				isValidated: true,
				prefix: insuranceInfo.prefix,
				suffix: insuranceInfo.suffix,
				fullNameOnID: insuranceInfo.fullNameOnID,
				dob: insuranceInfo.dob ? format(parse(insuranceInfo.dob, 'yyyy-MM-dd', new Date()), 'MM/dd/yyyy') : '',
				gender: insuranceInfo.gender,
				relationship: insuranceInfo.relationship,
				ssn: insuranceInfo.ssn,
				maritalStatus: insuranceInfo.maritalStatus,
				address: insuranceInfo.address,
			},
			ui: {
				insuredType: insuranceInfo.type,
				responsiblePartyType: insuranceInfo.responsibleParty?.frType,
				planType: null
			},
			responsibleParty: {
				fullName: insuranceInfo.responsibleParty?.frFullNameOnID,
				relationship: insuranceInfo.responsibleParty?.frRelationship,
				address: insuranceInfo.responsibleParty?.frAddress,
				phoneNumber: insuranceInfo.responsibleParty?.frPhoneNumber,
				responsiblePartyType: insuranceInfo.responsibleParty?.frType,
				primaryEmail: insuranceInfo.responsibleParty?.frEmail,
				isValidate: true,
				isFetched: true,
				isInvited: false,
				avatar: null,
			},

			plans: []
		}

		insuranceInfo.plans.forEach(v => {
			data.plans.push({
				id: uuidv4(),
				originalId: v.id,
				planName: v.planName,
				planIssuer: v.planIssuer,
				effectiveDate: v.effectiveDate ? format(parse(v.effectiveDate, 'yyyy-MM-dd', new Date()), 'MM/dd/yyyy') : '',
				nameOnCard: v.nameOnCard,
				memberId: v.memberId,
				planAddress: v.planAddress,
				groupPlanId: v.groupPlanId,
				patientSupportPhoneNumber: v.patientSupportPhoneNumber,
				providerSupportPhoneNumber: v.providerSupportPhoneNumber,
				planType: v.type,
				email: v.email,

				oop: {
					isInNetworkBenefit: v.oopCost.isInNetworkBenefit,
					inNetworkIndividualDeductible: v.oopCost.inNetworkIndividualDeductible,
					inNetworkIndividualMaximumOOP: v.oopCost.inNetworkIndividualMaximumOOP,
					inNetworkFamilyDeductible: v.oopCost.inNetworkFamilyDeductible,
					inNetworkFamilyMaximumOOP: v.oopCost.inNetworkFamilyMaximumOOP,
					isOutNetworkBenefit: v.oopCost.isOutNetworkBenefit,
					outNetworkIndividualDeductible: v.oopCost.outNetworkIndividualDeductible,
					outNetworkIndividualMaximumOOP: v.oopCost.outNetworkIndividualMaximumOOP,
					outNetworkFamilyDeductible: v.oopCost.outNetworkFamilyDeductible,
					outNetworkFamilyMaximumOOP: v.oopCost.outNetworkFamilyMaximumOOP
				}
			})
		})

		commitInsurance(data)

		router.push('/users/insurance/summary')
	}

	const removeProc = async () => {
		setConfirmRemovePopupProps({ isOpened: false, ...confirmRemoveProps })

		if (confirmRemoveProps == null || confirmRemoveProps.id == 0)
			return

		commitLoadingStatus(true)

		const res = await deleteInsuranceInfo(confirmRemoveProps.id)

		commitLoadingStatus(false)

		if (res) {
			let new_ = []
			if (insuredType == INSURED_TYPE_KEYS.MINOR_AGE_CHILE) {
				new_ = insuredList.child.filter(v => v.id != confirmRemoveProps.id)
				setInsuredList({ ...insuredList, child: new_ })
			}
			else {
				new_ = insuredList.dependent.filter(v => v.id != confirmRemoveProps.id)
				setInsuredList({ ...insuredList, dependent: new_ })
			}

			toast.success(MESSAGES.remove_data_success)
		}
		else {
			toast.error(MESSAGES.server_error)
		}

		setConfirmRemovePopupProps(null)
	}

	return (
		<Wrapper>
			<FigureWrapper>
				<CenteredRow marginTop={130}>
					{ (insuredType === INSURED_TYPE_KEYS.YOU)&& (
						<Image src="/assets/images/insurance_banner.png" width="514" height="362" />
					)}
					{ (insuredType == INSURED_TYPE_KEYS.MINOR_AGE_CHILE)&& (
						<Image src="/assets/images/children_banner.png" width="502" height="372" />
					)}
					{ (insuredType == INSURED_TYPE_KEYS.ADULT_DEPENDENT)&& (
						<Image src="/assets/images/dependent_banner.png" width="556" height="362" />
					)}
				</CenteredRow>
			</FigureWrapper>
			<FormWrapper>
				<FormContainer>
					<Layout title="Insurance information" hasDesktopTitle={true}>
						<AnserTitle style={{ marginTop: 10 }}>
							Refer to your insurance benefits for this information.{' '}
						</AnserTitle>
						<CreateNewQuestion>Healthcare claims </CreateNewQuestion>
						<QuestionDesc>
							Dependents who want to view their own claims must set up their own
							accounts{' '}
						</QuestionDesc>
						<QuestionDesc>
							Add adult dependents who cannot manage their own accounts and minor age
							children as your dependents{' '}
						</QuestionDesc>

						<TabsList>
							<Tab className={ insuredType == INSURED_TYPE_KEYS.YOU ? 'selected' : '' } onClick={() => commitInsuredType(INSURED_TYPE_KEYS.YOU)}>You</Tab>
							<Tab className={ insuredType == INSURED_TYPE_KEYS.MINOR_AGE_CHILE ? 'selected' : '' } onClick={() => commitInsuredType(INSURED_TYPE_KEYS.MINOR_AGE_CHILE)}>Minor age child</Tab>
							<Tab className={ insuredType == INSURED_TYPE_KEYS.ADULT_DEPENDENT ? 'selected' : '' } onClick={() => commitInsuredType(INSURED_TYPE_KEYS.ADULT_DEPENDENT)}>Adult dependent</Tab>
						</TabsList>
						{ (insuredType == INSURED_TYPE_KEYS.YOU)&&
							<TabPanel>
								<MobileViewer>
									<CenteredRow marginTop="20">
										<Image src="/assets/images/insurance_banner.png" width="304" height="215" />
									</CenteredRow>
								</MobileViewer>
								<ResponsibleParty />
							</TabPanel>
						}
						{(insuredType == INSURED_TYPE_KEYS.MINOR_AGE_CHILE) &&
							<TabPanel>
								<QuestionDesc>
									Fill this section for each minor age dependent. Complete the OOP info only if the minor is covered by
									separate insurance from you.{' '}
								</QuestionDesc>
								<MobileViewer>
									<CenteredRow marginTop="20">
										<Image src="/assets/images/children_banner.png" width="219" height="163"/>
									</CenteredRow>
								</MobileViewer>
								{ (insuredList.child.length > 0) &&
									<Flex className="col">
										<TableDiv>
											<TrHeader>
												<Td style={{width: '20%'}}>
													<TdText>Child</TdText>
												</Td>
												<Td style={{width: '30%'}}>
													<TdText className="center">Insurance info</TdText>
												</Td>
												<Td style={{width: '30%'}}>
													<TdText className="center">OOP Costs</TdText>
												</Td>
												<Td style={{width: '20%'}}>
													<TdText className="center">Actions</TdText>
												</Td>
											</TrHeader>
											{ insuredList.child.map(v => (
												<TrFooter key={v.id}>
													<Td style={{width: '20%'}}>
														<TdText>{v.fullNameOnID}</TdText>
													</Td>
													<Td style={{width: '30%'}}>
														<TdText className="center">{ v.plans.length > 0&& <CheckMark/> }</TdText>
													</Td>
													<Td style={{width: '30%'}}>
														<TdText className="center"></TdText>
													</Td>
													<Td className="row justify-between" style={{width: '20%'}}>
														<Image onClick={() => updateInsured(v.id)} src="/assets/images/ico-edit.png" width="16"
																	 height="20"/>
														<Image onClick={() => removeInsured(v.id)} src="/assets/images/ico-delete.png" width="20"
																	 height="20"/>
													</Td>
												</TrFooter>
											)) }
										</TableDiv>
									</Flex>
								}
								<Flex marginTop={20}>
									<Link passHref href={{pathname: '/users/insurance/add-profile/'}}>
										<LinkButton className="normal">Add child</LinkButton>
									</Link>
								</Flex>
							</TabPanel>
						}
						{ (insuredType == INSURED_TYPE_KEYS.ADULT_DEPENDENT) &&
							<TabPanel>
								<QuestionDesc>
									Fill this section for each adult dependent. Complete the
									OOP info only if the dependent is covered by separate insurance
									from you AND you want the POEM service to help manage out of pocket expenses{' '}
								</QuestionDesc>
								<MobileViewer>
									<CenteredRow marginTop="20">
										<Image src="/assets/images/dependent_banner.png" width="220" height="148"/>
									</CenteredRow>
								</MobileViewer>
								{ (insuredList.dependent.length > 0)&&
									<Flex className="col">
										<TableDiv>
											<TrHeader>
												<Td style={{width: '20%'}}>
													<TdText>Child</TdText>
												</Td>
												<Td style={{width: '30%'}}>
													<TdText className="center">Insurance info</TdText>
												</Td>
												<Td style={{width: '30%'}}>
													<TdText className="center">OOP Costs</TdText>
												</Td>
												<Td style={{width: '20%'}}>
													<TdText className="center">Actions</TdText>
												</Td>
											</TrHeader>
											{ insuredList.dependent.map(v => (
												<TrFooter key={v.id}>
													<Td style={{width: '20%'}}>
														<TdText>{v.fullNameOnID}</TdText>
													</Td>
													<Td style={{width: '30%'}}>
														<TdText className="center">{ v.plans.length > 0&& <CheckMark/> }</TdText>
													</Td>
													<Td style={{width: '30%'}}>
														<TdText className="center"></TdText>
													</Td>
													<Td className="row justify-between" style={{width: '20%'}}>
														<Image onClick={() => updateInsured(v.id)} src="/assets/images/ico-edit.png" width="16"
																	 height="20"/>
														<Image onClick={() => removeInsured(v.id)} src="/assets/images/ico-delete.png" width="20"
																	 height="20"/>
													</Td>
												</TrFooter>
											)) }
										</TableDiv>
									</Flex>
								}
								<Flex marginTop={20}>
									<Link href={{pathname: '/users/insurance/add-profile/'}}>
										<LinkButton className="normal">Add Dependent</LinkButton>
									</Link>
								</Flex>
							</TabPanel>
						}
						<BottomWrapper>
							<CenteredRow marginTop={30}>
								<Link href="/users/poem/">
									<LinkButton className="big">Go to POEM summary</LinkButton>
								</Link>
							</CenteredRow>

							<CenteredRow marginTop={10}>
								Skip
							</CenteredRow>
						</BottomWrapper>
						<ConfirmDelete { ...confirmRemoveProps }
							onRemove={removeProc} onCancel={ () => setConfirmRemovePopupProps(null) } />
					</Layout>
				</FormContainer>
			</FormWrapper>
		</Wrapper>

	)
}

export default Insurance
