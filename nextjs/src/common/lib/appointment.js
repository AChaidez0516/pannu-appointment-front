import { useQuery, gql, useMutation } from "@apollo/client";
import { ApolloClient, InMemoryCache } from '@apollo/client'
import client from "../lib/apollo";

export async function getNewReasons(providerId) {
  const GET_NEW_REASONS = gql`
    query get_new_reasons($providerId: BigInteger) @api(name: appointment) {
      newReasons(providerId: $providerId) {
        title
        description
        reasonId
      }
    }
  `;

  const { loading, error, data } = await client.query({
    query: GET_NEW_REASONS,
    variables: { providerId },
  });

  return data.newReasons;
}

export async function getPreviousReasons(providerId) {
  const GET_PREVIOUS_REASONS = gql`
    query get_previous_reasons($providerId: BigInteger)
    @api(name: appointment) {
      previousReasons(providerId: $providerId) {
        title
        reasonId
        isNew
        isChangeable
        lastSeenDate
        futureDate
      }
    }
  `;

  const { loading, error, data } = await client.query({
    query: GET_PREVIOUS_REASONS,
    variables: { providerId },
  });

  return data.previousReasons;
}

export async function getAvailableTimeslots(selectedDate, providerUserId) {
  const GET_AVAILABLE_TIMESLOTS = gql`
    query getAvailableTimeslots(
      $selectedDate: Date
      $providerUserId: BigInteger
    ) @api(name: appointment) {
      getAvailableTimeSlots(
        startDate: $selectedDate
        providerUserId: $providerUserId
      ) {
        date
        weekday
        startTime
        endTime
        busyTimes {
          startTime
          endTime
        }
        bookedTimes {
          startTime
          endTime
        }
      }
    }
  `;

  const { loading, error, data } = await client.query({
    query: GET_AVAILABLE_TIMESLOTS,
    variables: { selectedDate, providerUserId },
  });

  return data.getAvailableTimeSlots;
}

export async function getReasonsToSelectForPatient(value) {
  const GET_REASONS = gql`
    query reasonListToSelectForPatient($value: BigInteger)
    @api(name: appointment) {
      AllReasonsForSelect(patientId: $value) {
        id
        isAvailable
        lastSeenDate
        futureDate
        title
      }
    }
  `;

  const { loading, error, data } = await client.query({
    query: GET_REASONS,
    variables: { value },
  });

  return data.AllReasonsForSelect;
}

export async function getDoctorCalendar({ providerUserId, serviceLocationId, date }) {
  const GET_DOCTOR_CALENDAR = gql`
    query availableTimeSlots(
      $providerUserId: BigInteger!
      $serviceLocationId: BigInteger
      $date: Date!
    ) @api(name: appointment) {
      availableTimeSlots(
        providerUserId: $providerUserId
        serviceLocationId: $serviceLocationId
        date: $date
      ) {
        date
        day
        startTimeOfWork
        endTimeOfWork
        duration
        busyStartTime
        busyEndTime
        busyDuration
        bookedSlots {
          slot
          aptType
        }
        freeSlots {
          slot
          aptType
        }
      }
    }
  `;
  const { loading, error, data } = await client.query({
    query: GET_DOCTOR_CALENDAR,
    variables: {
      providerUserId,
      serviceLocationId,
      date,
    },
  });

  return data.availableTimeSlots;
}

export async function getAppointments(filterData) {
  const GET_APPOINTMENTS = gql`
    query filter_appointments($filterData: AppointmentFilterModelInput)
    @api(name: appointment) {
      apts: appointments(filter: $filterData) {
        id
        aptDate
        aptTime
        aptType
        aptState
        meetingType
        details
        patientUserId
        providerUserId
        duration
        followUpData
        priority
        preference
        providerFacilityName

        reasons {
          id
          providerId
          title
          description
        }
        patient {
          id
          fullName
          dob
        }
        provider {
          id
          fullName
          specialty
          facilityName
        }
        location {
          id
          address
          simpleName
          legalName
          commonName
        }
        preparations {
          id
          title
          description
        }
        instructions {
          id
          title
          description
        }
      }
    }
  `;

  const { loading, error, data } = await client.query({
    query: GET_APPOINTMENTS,
    variables: { filterData },
  });

  return data.apts;
}

export async function createAppointment(newApt) {
  const SET_APPOINTMENT = gql`
    mutation createAppointment($newApt: AppointmentPatternInput)
    @api(name: appointment) {
      createAppointment(newApt: $newApt) {
        id
        aptDate
        details
        reasons {
          id
          title
        }
      }
    }
    # mutation create @api(name: appointment) {
    #   createAppointment(
    #     appointment: {
    #       providerId: 2
    #       patientId: 2
    #       appointmentType: PREFERRED
    #       appointmentStatus: PENDING
    #       details: "patient2 request an appointment to doctor2"
    #       firstAvailableTime: "2022-02-10T09:30"
    #       duration: 50
    #       waitLists: [
    #         { startTime: "2023-02-04T08:00" }
    #         { startTime: "2023-02-05T08:50" }
    #         { startTime: "2023-02-06T08:00" }
    #         { startTime: "2023-02-07T08:50" }
    #         { startTime: "2023-02-08T09:40" }
    #       ]
    #       reasons: [{ id: 6 }, { id: 7 }, { id: 8 }]
    #     }
    #   ) {
    #     resourceId
    #     appointmentId
    #     resourceName
    #     detail
    #     aptDate
    #     aptTime
    #     slotPatternList {
    #       day
    #       date
    #       duration
    #       startTimeOfWork
    #       endTimeOfWork
    #       availableTimeSlots
    #     }
    #   }
    # }
  `;
  const { loading, error, data } = await client.mutate({
    mutation: SET_APPOINTMENT,
    variables: {
      newApt: newApt,
    },
  });

  return data.doctorCalendar;
}

export async function updateAppointment(updatedApt) {
  const UPDATE_APPOINTMENT = gql`
    mutation update_appointment($updatedApt: AppointmentPatternInput) {
      updateAppointment(updatedApt: $updatedApt) {
        status
        message
      }
    }
  `;
  const { loading, error, data } = await client.mutate({
    mutation: UPDATE_APPOINTMENT,
    variables: {
      updatedApt: updatedApt,
    },
  });

  return data.doctorCalendar;
}

export async function getAptFetchAllFromDate(date) {
  const SEARCH_APPOINTMENT = gql`
    query apts($specifiedDate: Date) @api(name: appointment) {
      apt_fetchAllFromDate(specifiedDate: $specifiedDate) {
        id
        aptDate
        aptTime
        aptType
        aptState
        patientUserId
        providerUserId
      }
    }
  `;
  const { loading, error, data } = await client.query({
    query: SEARCH_APPOINTMENT,
    variables: {
      specifiedDate: date,
    },
    fetchPolicy: "no-cache",
  });

  return data.apt_fetchAllFromDate;
}

export async function filterAppointment(filterData) {
  const FILTER_APPOINTMENT = gql`
    query filter_appointments($filterData: AppointmentFilterModelInput)
    @api(name: appointment) {
      apts: appointments(filter: $filterData) {
        id
        aptDate
        aptTime
        aptType
        aptState
        patientUserId
        providerUserId
        reasons {
          id
          providerId
          title
          description
        }
        patient {
          id
          fullName
          dob
        }
        provider {
          id
          fullName
          specialty
        }
        location {
          id
          address
          simpleName
          legalName
          commonName
        }
        preparations {
          id
          title
          description
        }
        instructions {
          id
          title
          description
        }
        duration
        patientNotes
      }
    }
  `;

  const { loading, error, data } = await client.query({
    query: FILTER_APPOINTMENT,
    variables: {
      filterData,
    },
    fetchPolicy: "no-cache",
  });

  return data.apts;
}

export async function getAptDateByPrevdate(filterData) {
  const GET_APTDATE_PREVDATE = gql`
    query getAptDateByPrevdate($filterData: AppointmentFilterModelInput) @api(name: appointment) {
      aptDateByPrevdate(filter: $filterData)
    }
  `

  const { loading, error, data } = await client.query({
    query: GET_APTDATE_PREVDATE,
    variables: {
      filterData
    },
    fetchPolicy: "no-cache",
  })

  return data.aptDateByPrevdate
}

export async function getAptDateByNextdate(filterData) {
  const GET_APTDATE_NEXTDATE = gql`
    query getAptDateByNextdate($filterData: AppointmentFilterModelInput) @api(name: appointment) {
      aptDateByNextdate(filter: $filterData)
    }
  `

  const { loading, error, data } = await client.query({
    query: GET_APTDATE_NEXTDATE,
    variables: {
      filterData
    },
    fetchPolicy: "no-cache",
  })

  return data.aptDateByNextdate
}

export async function getAppointmentDetail(aptId) {
  const APPOINTMENT_DETAILS = gql`
    query apt_fetchAptDetail($aptId: BigInteger) @api(name: appointment) {
      appointment(aptId: $aptId) {
        id
        aptDate
        aptTime
        aptType
        aptState
        patientUserId
        providerUserId
        patient {
          id
          fullName
          dob
        }
        provider {
          id
          fullName
          specialty
          facilityName
        }
        duration
        preparations {
          description
          id
          providerId
          title
        }
        reasons {
          id
          title
          description
        }
        instructions {
          id
          description
          providerId
          title
        }
      }
    }
  `;

  const { loading, error, data } = await client.query({
    query: APPOINTMENT_DETAILS,
    variables: {
      aptId,
    },
    fetchPolicy: "no-cache",
  });

  return data.appointment;
}

export async function getFollowupAppointmentDetail(aptId) {
  const FOLLOWUP_APT_DETAILS = gql`
    query appointment_detail($aptId: BigInteger) @api(name: appointment) {
      appointment(aptId: $aptId) {
        id
        aptDate
        aptTime
        aptType
        aptState
        patientUserId
        providerUserId
        patient {
          id
          fullName
          dob
        }
        provider {
          id
          fullName
          specialty
        }
        location {
          id
          address
          simpleName
          legalName
          commonName
        }
        reasons {
          id
          providerId
          title
          description
        }
        preparations {
          id
          title
          description
        }
        instructions {
          id
          title
          description
        }
      }
    }
  `;

  // preparations: preparationsByAppointmentId(appointmentId: $aptId) {
  //   id
  //   providerId
  //   title
  //   description
  // }
  // instructions: instructionsByAppointmentId(appointmentId: $aptId) {
  //   id
  //   providerId
  //   title
  //   description
  // }

  const { loading, error, data } = await client.query({
    query: FOLLOWUP_APT_DETAILS,
    variables: {
      aptId,
    },
    fetchPolicy: "no-cache",
  });

  // const appointment = data.appointment;
  // if (appointment) {
  //   appointment['preparations'] = data.preparations;
  //   appointment['instructions'] = data.instructions;
  // }

  return data.appointment;
}

export async function getPreparationsAndInstructionsAndReasons(providerId) {
  const PreparationsAndInstructions = gql`
    query preparations_instructions($providerId: BigInteger)
    @api(name: appointment) {
      preparations: preparationsByProviderUserId(providerId: $providerId) {
        id
        title
        description
      }
      instructions: instructionsByProviderUserId(providerId: $providerId) {
        id
        title
        description
      }
      reasons: reasonsByProviderUserId(providerId: $providerId) {
        id
        title
        description
      }
    }
  `;

  const { loading, error, data } = await client.query({
    query: PreparationsAndInstructions,
    variables: {
      providerId,
    },
    fetchPolicy: "no-cache",
  });

  return data;
}

export async function updateFollowUpAppointment(updatedAppointment) {
  const UPDATE_APPOINTMENT = gql`
    mutation updateFollowUpAppointment($updatedApt: AppointmentPatternInput)
    @api(name: appointment) {
      result: updateAppointment(updatedApt: $updatedApt) {
        status
        message
      }
    }
  `;
  const { loading, error, data } = await client.mutate({
    mutation: UPDATE_APPOINTMENT,
    variables: {
      updatedApt: updatedAppointment,
    },
  });

  return data.result;
}

export async function getActivitiesByAptId(aptId) {
  const ACTIVITYIES_BY_APT_ID = gql`
    query AppointmentQuery($aptId: BigInteger) @api(name: appointment) {
      activities(aptId: $aptId) {
        id
        title
        plannedStartTime
        plannedEndTime
        plannedDuration
        notes
        activityDate
        actualStartTime
        actualEndTime
        activityStatus
        processList
        appointmentId
        patientUserId
        providerUserId
        rating
      }
    }
  `;

  const { loading, error, data } = await client.query({
    query: ACTIVITYIES_BY_APT_ID,
    variables: {
      aptId,
    },
    fetchPolicy: "no-cache",
  });

  return data.activities;
}

export async function cancelAppointment(aptId, title = "cancel", description = "cancel") {
  const CANCEL_APPOINTMENT_QUERY = gql`
    mutation cancelAppointment($aptId: BigInteger, $title: String, $description: String) @api(name: appointment){
      result: cancelAppointment(aptId: $aptId, title: $title, description: $description){
        status,
        message,
        appointment {
          id
        }
      }
    }
  `
  try {
    const { loading, error, data } = await client.mutate({
      mutation: CANCEL_APPOINTMENT_QUERY,
      variables: {
        aptId,
        title,
        description
      }
    });
    return data.result;
  }
  catch (e) {
    console.log(e);
  }
  return null;

}

export async function updateActivity(activity) {
  const UPDATE_QUERY = gql`
    mutation updateActivity($act: ActivityInput) @api(name: appointment) {
      result: updateActivity(act: $act) {
        id
        title
      }
    }
  `;
  const { loading, error, data } = await client.mutate({
    mutation: UPDATE_QUERY,
    variables: {
      act: activity,
    },
  });

  return data.result;
}

export async function updateFollowUp(updatedApt, reasons) {
  const UPDATE_QUERY = gql`
    mutation updateFollowUpAppointment(
      $updatedApt: AppointmentPatternInput
      $reasons: [ReasonPatternInput]
    ) @api(name: appointment) {
      result: updateFollowUpAppointment(
        updatedApt: $updatedApt
        reasons: $reasons
      ) {
        message
        status
      }
    }
  `;
  const { loading, error, data } = await client.mutate({
    mutation: UPDATE_QUERY,
    variables: {
      updatedApt,
    },
  });

  return data;
}

export async function checkoutAppointment(checkoutData) {
  const CHECKOUT_DATA = gql`
  mutation checkoutAppointment($checkoutData: CheckoutAppointmentInput) @api(name: appointment) {
      checkoutData: checkoutAppointment() {
       key
       status
       message       
      }
    }
  `;

  try {
    const { data, loading, error } = await client.mutate({
      mutation: CHECKOUT_DATA,
      variables: {
        ...checkoutData,
      },
    });

    return data.checkoutData;
  } catch (e) {
    console.log(e);
  }
  return null;
}
export async function getAllICD10Codes(){
  const ICD10_CODES = gql`
    query getAllICD10Codes @api(name: appointment){
      result: getAllICD10Codes {
        id,
        title
      }
    }
  `
  try {
    const {data, loading, error} = await client.query({
      query: ICD10_CODES
    });
   
    return data;
  } catch (e) {
    console.log(e);
  }
}
export async function getAllCPTCodes(){
  const CPT_CODES = gql`
    query getAllCPTCodes @api(name: appointment){
      result: getAllCPTCodes {
        id,
        title
      }
    }
  `
  try {
    const {data, loading, error} = await client.query({
      query: CPT_CODES
    });
   
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getAppointmentData(Data) {
  const registerClient = new ApolloClient({
    uri: 'https://registration.pannucorp.com/graphql/', // Replace with your GraphQL server endpoint
    cache: new InMemoryCache(),
  });
  const GET_EXISTING_PATIENT = gql`
    query existingPatientId($request: GetExistingPatientRequestInput) {
      existingPatientId(request: $request) {
        msg
        patientId
      }
    }
  `;

  try {
    const response = await registerClient.query({
      query: GET_EXISTING_PATIENT,
      variables: {
        request: Data,
      },
    });
    return response;
  } catch (e) {
    console.log(e);
  }
  return null;
}
