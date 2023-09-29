import Image from 'next/image'
import { ICONS, IMGS } from '../../../common/utils/styleGuide'
import {
  TopWrapper,
  LoginWrapper,
  ProviderInfoWrapper,
  AnnouncementWrapper,
  AppointmentInformationWrapper,
  NoteWrapper,
  LeftWrapper,
  Caption,
  InputDiv,
  InputFieldLabel,
  CenteredRow,
  LinkButton,
  Flex,
  Input,
  MaskInput
} from "./styled";

import { useRouter } from 'next/router';

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from './schema';
import { FormControllWrapper } from '../../../components/input/styled';
import { getAppointmentData } from '../../../common/lib/appointment';
import { useFetchProvider } from '../../../common/hooks/useFetchProvider';
import LoadingButton from '../../../components/Button/LoadingButton';
import { SpinnerWrapper } from '../../../common/styleds/common.styled';
import { CircularProgress } from "@mui/material";
import { useState } from 'react';

const changeDobFormat = (dob) => {
  const dateParts = dob.split("-");
  const month = dateParts[0];
  const day = dateParts[1];
  const year = dateParts[2];

  return `${year}-${month}-${day}`;
}

function ManualSignIn() {
  const router = useRouter()

  const { control, handleSubmit, clearErrors, getValues, setValue, setError, formState: { errors: frontErrors } } = useForm({
    defaultValues: {
      id: '',
      ssn: '',
      lastName: '',
      dob: ''
    },
    mode: 'onBlur',
    resolver: yupResolver(schema)
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const info = {
      dob: changeDobFormat(data.dob),
      lastName: data.lastName,
      providerId: '1',
      ssnLastDigits: data.ssn,
    };

    let response = await getAppointmentData(info);
    setIsLoading(false);
    if (response && response.data.existingPatientId && response.data.existingPatientId.patientId > 0) {
      router.push("/manual/appointment");
    } else {
      router.push("/manual/noinformation");
    }
  };

  const { provider } = useFetchProvider(16);// default provider id is "16"

  return (
    <LoginWrapper>
      <TopWrapper>
        <div className="login-corner">
          <img src={IMGS.leftEllipseBGSVG} />
          <img src={IMGS.topEllipseBGSVG} />
        </div>
        <div className='header'>
          <div className='title'>Pannu Corp</div>
          <div className='bg-wrapper'>
            <div className='login-bg'>
              <Image
                src={IMGS.signupBG}
                width={176} height={140}
                layout={'fixed'}
                priority={false}
              />
            </div>
          </div>
        </div>
      </TopWrapper>
      <LeftWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <NoteWrapper>
            <div className='title'>Welcome</div>
          </NoteWrapper>
          { provider? (
              <ProviderInfoWrapper>
                <div className="img-wrapper">
                  <div>
                    <Image
                      src={provider && provider?.avatar.url !== null ? provider?.avatar.url : IMGS.avatarDoctor1}
                      width={93} height={85}
                      layout={'fixed'}
                      alt='provider user avatar'
                    />
                  </div>
                </div>
                <div className="right">
                  <div className="header-title" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div className="name">{provider?.fullName}</div>
                    <div className="specialty">{provider?.specialty}</div>
                  </div>
                  <div className="body">
                    <div className="facility">{provider?.facilityName}</div>
                    <div className="address">{provider?.businessAddress}</div>
                  </div>
                </div>
              </ProviderInfoWrapper>
            ):(
              <SpinnerWrapper>
                <CircularProgress size={20}/>
              </SpinnerWrapper>
            )
          }
          <AnnouncementWrapper>
            <Caption>
              We have signed up with Pannu Corp to provide better quality care more efficiently at lower cost. You will only need their app to interact with all your healthcare providers and related issues.
            </Caption>
            <Caption>
              They are helping us with our appointments function to implement advanced features that will improve patient’s experience and our performance. You will be able to make, reschedule and cancel appointments conveniently through the app.
            </Caption>
            <Caption>
              You will also be able to communicate with us on any issues conveniently and faster using the Zulip app. More advanced features will be coming soon.
            </Caption>
          </AnnouncementWrapper>
          <AppointmentInformationWrapper>
            <Caption style={{ marginBottom: 16 }}>
              Enter the data to get your appointment information
            </Caption>
            <Flex className="justify-between">
              <FormControllWrapper className="dob" isInvalid={!!frontErrors?.dob?.message}>
                <InputFieldLabel>Date of birth*</InputFieldLabel>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) =>
                    <MaskInput
                      type="tel"
                      mask={"00-00-0000"}
                      pattern="\d{2}-\d{2}-\d{4}"
                      autoComplete="off"
                      placeholder="MM-DD-YYYY"
                      onAccept={v => {
                        setValue("dob", v);
                      }}
                      {...field}
                    />
                  }
                />
                <div className='error-message'>{frontErrors?.dob?.message}</div>
              </FormControllWrapper>
              <FormControllWrapper className="ssn" isInvalid={!!frontErrors?.ssn?.message}>
                <InputFieldLabel>Last 4 of SSN*</InputFieldLabel>
                <Controller
                  name="ssn"
                  control={control}
                  render={({ field }) =>
                    <MaskInput
                      type="tel"
                      mask={"0000"}
                      pattern="\d{4}"
                      autoComplete="off"
                      placeholder="XXXX"
                      onAccept={v => {
                        setValue("ssn", v);
                      }}
                      {...field}
                    />
                  }
                />
                <div className='error-message'>{frontErrors?.ssn?.message}</div>
              </FormControllWrapper>
            </Flex>
            <Flex className="justify-between">
              <FormControllWrapper className="lastName" isInvalid={!!frontErrors?.lastName?.message}>
                <InputFieldLabel>Last name* </InputFieldLabel>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) =>
                    <MaskInput
                      autoComplete="off"
                      placeholder=""
                      onAccept={v => {
                        setValue("lastName", v);
                      }}
                      {...field}
                    />
                  }
                />
                <div className='error-message'>{frontErrors?.lastName?.message}</div>
              </FormControllWrapper>
            </Flex>
          </AppointmentInformationWrapper>
          <CenteredRow marginTop={27}>
            <LoadingButton isLoading={isLoading}>
                <LinkButton type="submit" className="big strong">Get your information</LinkButton>
            </LoadingButton>
          </CenteredRow>
        </form>
      </LeftWrapper>
    </LoginWrapper>
  )
}

export default ManualSignIn