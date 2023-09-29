import client from "./apollo";
import { gql } from "@apollo/client";

export async function getProviderDetail(providerId) {
  let PROVIDER_DETAIL = gql`
    query Provider($providerId: BigInteger) @api(name: registration) {
      providerDetail(providerId: $providerId) {
        id
        memberID
        internalEmail
        fullName
        dob
        userStatus
        userType
        avatar {
          url
          fileName
        }
        basicData {
          id
          email
          ssn
          currentAddress
          employment {
            position
          }
        }
        npi
        specialty
        facilityName
        institutionName
        institutionType
        providerPhone
        businessAddress
        taxID
        ownership
        contacts {
          contactType
          fullName
          email
          phoneNumber
          position
        }
        serviceLocations {
          id
          legalName
          address
          workHours {
            sun {
              startTime
              closeTime
              duration
              busyStartTime
              busyCloseTime
              busyDuration
            }
            mon {
              startTime
              closeTime
              duration
              busyStartTime
              busyCloseTime
              busyDuration
            }
            tue {
              startTime
              closeTime
              duration
              busyStartTime
              busyCloseTime
              busyDuration
            }
            wed {
              startTime
              closeTime
              duration
              busyStartTime
              busyCloseTime
              busyDuration
            }
            thu {
              startTime
              closeTime
              duration
              busyStartTime
              busyCloseTime
              busyDuration
            }
            fri {
              startTime
              closeTime
              duration
              busyStartTime
              busyCloseTime
              busyDuration
            }
            sat {
              startTime
              closeTime
              duration
              busyStartTime
              busyCloseTime
              busyDuration
            }
          }
        }
        billingEntities {
          id
          entityName
          entityType
          npi
        }
        staffs {
          id
          staffType
          memberID
          fullName
          email
          position
          simpleName
        }
        clinicianRelationships {
          id
          serviceLocationID
          billingEntityID
          staffID
          daysWorkedHours {
            id
            presentDays {
              mon
              tue
              thi
              fri
              sat
              sun
            }
            startTime
            endTime
            hoursWorked
          }
          totalHoursWorked
          scribesFTE
        }
        outsourcedStaffs {
          id
          serviceLocationID
          billingEntityID
          staffType
          daysWorkedHours {
            id
            staffName
            presentDays {
              mon
              tue
              wed
              thi
              fri
              sat
              sun
            }
            startTime
            endTime
            numberOfStaff
            hoursWorked
          }
          totalHoursWorked
          scribesFTE
        }
        acceptedPlans {
          planID
          planName
          planType
        }
        planGroups {
          groupName
        }
        clinicianGroups {
          groupName
        }
        pcrGroups {
          planGroup {
            groupName
          }
          serviceLocation
          clinicianGroup {
            groupName
          }
          isPCP
          isSpecialist
          isAcceptNewPatient
          isInNetwork
          isOutNetwork
        }
        profile {
          callMeDoctorName
          bio
          coverPhoto
        }
        employeeProviders {
          billingEntityID
          email
          fullName
          inviteCode {
            code
            expiryDate
          }
          position
          simpleName
        }
      }
    }
  `;
  try {
    let { data, loading, error } = await client.query({
      query: PROVIDER_DETAIL,
      variables: { providerId },
      fetchPolicy: "no-cache",
    });
    return data.providerDetail;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function getBillingEntityDetail(id) {
  let ENTITY_DETAIL = gql`
    query billingEntityDetail($billingEntityId: BigInteger)
    @api(name: registration) {
      billingEntityDetail(billingEntityId: $billingEntityId) {
        id
        npi
        entityName
        businessAddress
        entityType
        ownershipType
        taxID
        phoneNumber
      }
    }
  `;

  try {
    let { data, loading, error } = await client.query({
      query: ENTITY_DETAIL,
      variables: { billingEntityId: id },
      fetchPolicy: "no-cache",
    });
    return data.billingEntityDetail;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getBillingEntityList(providerId) {
  let BILLING_ENTITY_LIST = gql`
    query BillingEntities($providerId: BigInteger) @api(name: registration) {
      billingEntitiesByProviderId(providerId: $providerId) {
        id
        npi
        entityName
        businessAddress
        entityType
        ownershipType
        taxID
        phoneNumber
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: BILLING_ENTITY_LIST,
    variables: { providerId: providerId },
    fetchPolicy: "no-cache",
  });
  return data.billingEntitiesByProviderId;
}

export async function deleteBillingEntity(id) {
  let DELETE_BILLING_ENTITY = gql`
    mutation Response($billingEntityId: BigInteger) @api(name: registration) {
      deleteBillingEntity(billingEntityId: $billingEntityId) {
        status
        message
      }
    }
  `;

  try {
    let { data, loading, errpr } = await client.mutate({
      mutation: DELETE_BILLING_ENTITY,
      variables: { billingEntityId: id },
    });
    return data.deleteBillingEntity;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function saveBillingEntity(providerId, billingEntityList) {
  let SAVE_BILLING_ENTITY = gql`
    mutation BillingEntity($request: BillingEntitySavePatternInput)
    @api(name: registration) {
      saveBillingEntity(request: $request) {
        id
        npi
        entityName
        businessAddress
        entityType
        taxID
        phoneNumber
        ownershipType
      }
    }
  `;

  try {
    let { data, loading, error } = await client.mutate({
      mutation: SAVE_BILLING_ENTITY,
      variables: { request: { providerId, billingEntityList } },
    });

    return data.saveBillingEntity;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function updateBillingEntity(id, billingEntity) {
  let UPDATE_BILLING_ENTITY = gql`
    mutation BillingEntity(
      $billingEntityId: BigInteger
      $entity: BillingEntityInput
    ) @api(name: registration) {
      updateBillingEntity(billingEntityId: $billingEntityId, entity: $entity) {
        id
        npi
        entityName
        businessAddress
        entityType
        ownershipType
        taxID
        phoneNumber
      }
    }
  `;

  try {
    let { data, loading, error } = await client.mutate({
      mutation: UPDATE_BILLING_ENTITY,
      variables: { billingEntityId: id, entity: billingEntity },
    });
    return data.updateBillingEntity;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function getServiceLocationList(providerId) {
  let SERVICE_LOCATIONS = gql`
    query ServiceLocation($providerId: BigInteger) @api(name: registration) {
      serviceLocationsByProviderId(providerId: $providerId) {
        id
        address
        legalName
        commonName
        simpleName
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: SERVICE_LOCATIONS,
    variables: { providerId },
    fetchPolicy: "no-cache",
  });

  return data.serviceLocationsByProviderId;
}

export async function getServiceLocationDetail(serviceLocationId) {
  let SERVICE_LOCATION_DETAIL = gql`
    query ServiceLocation($serviceLocationId: BigInteger) {
      serviceLocationDetail(serviceLocationId: $serviceLocationId)
        @api(name: registration) {
        id
        address
        legalName
        commonName
        simpleName
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: SERVICE_LOCATION_DETAIL,
    variable: { serviceLocationId },
    fetchPolicy: "no-cache",
  });
  return data.serviceLocationDetail;
}

export async function saveServiceLocation(providerId, serviceLocation) {
  let SAVE_SERVICE_LOCATION = gql`
    mutation ServiceLocation(
      $request: ServiceLocationInput
      $providerId: BigInteger
    ) @api(name: registration) {
      saveServiceLocation(request: $request, providerId: $providerId) {
        id
        address
        legalName
        commonName
        simpleName
      }
    }
  `;

  try {
    let { data, loading, error } = await client.mutate({
      mutation: SAVE_SERVICE_LOCATION,
      variables: {
        providerId,
        request: serviceLocation,
      },
    });
    return data.saveServiceLocation;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function updateServiceLocation(id, serviceLocation) {
  let UPDATE_SERVICE_LOCATION = gql`
    mutation ServiceLocation(
      $request: ServiceLocationInput
      $serviceLocationId: BigInteger
    ) @api(name: registration) {
      updateServiceLocation(
        request: $request
        serviceLocationId: $serviceLocationId
      ) {
        id
        address
        legalName
        commonName
        simpleName
      }
    }
  `;

  try {
    let { data, loading, error } = await client.mutate({
      mutation: UPDATE_SERVICE_LOCATION,
      variables: { serviceLocationId: id, request: serviceLocation },
    });
    return data.updateServiceLocation;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function deleteServiceLocation(id) {
  let DELETE_SERVICE_LOCATION = gql`
    mutation Response($serviceLocationId: BigInteger) @api(name: registration) {
      deleteServiceLocation(serviceLocationId: $serviceLocationId) {
        status
        message
      }
    }
  `;

  try {
    let { data, loading, error } = await client.mutate({
      mutation: DELETE_SERVICE_LOCATION,
      variables: { serviceLocationId: id },
    });
    return data.deleteServiceLocation;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function saveStaff(providerId, staff) {
  let SAVE_STAFF = gql`
    mutation Staffs($request: StaffSavePatternInput) @api(name: registration) {
      saveStaffs(request: $request) {
        staffType
        memberID
        npi
        fullName
        specialty
        position
        simpleName
        email
        inviteCode {
          code
          expiryDate
        }
      }
    }
  `;

  try {
    let { data, loading, error } = await client.mutate({
      mutation: SAVE_STAFF,
      variables: {
        request: { providerId, staffs: staff },
      },
    });
    return data.saveStaffs;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function updateStaff(id, staff) {
  let UPDATE_STAFF = gql`
    mutation Staff($staff: StaffInput, $staffId: BigInteger)
    @api(name: registration) {
      updateStaff(staff: $staff, staffId: $staffId) {
        staffType
        memberID
        npi
        fullName
        position
        simpleName
        email
        inviteCode {
          inviteCode
          expired
        }
      }
    }
  `;
  try {
    let { data, loading, error } = await client.mutate({
      mutation: UPDATE_STAFF,
      variables: { staff, staffId: id },
    });
    return data.updateStaff;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function deleteStaff(id) {
  let DELETE_STAFF = gql`
    mutation Response($staffId: BigInteger) @api(name: registration) {
      deleteStaff(staffId: $staffId) {
        status
        message
      }
    }
  `;

  try {
    let { data, loading, error } = await client.mutate({
      mutation: DELETE_STAFF,
      variables: { staffId: id },
    });

    return data.deleteStaff;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function getStaffList(providerId) {
  let GET_STAFFS = gql`
    query Staffs($providerId: BigInteger) @api(name: registration) {
      staffsByProviderId(providerId: $providerId) {
        id
        staffType
        memberID
        npi
        fullName
        position
        simpleName
        email
        inviteCode {
          code
        }
        provider {
          id
          fullName
        }
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: GET_STAFFS,
    variables: { providerId },
    fetchPolicy: "no-cache",
  });

  return data.staffsByProviderId;
}

export async function getStaffDetail(staffId) {
  let STAFF_DETAIL = gql`
    query Staff($staffId: BigInteger) @api(name: registration) {
      staffDetail(staffId: $staffId) {
        staffType
        memberID
        npi
        fullName
        position
        simpleName
        email
        inviteCode {
          code
        }
        provider {
          id
          fullName
        }
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: STAFF_DETAIL,
    variables: { staffId },
  });

  return data.staffDetail;
}

export async function searchProviderByNpi(npi) {
  let SEARCH_PROVIDER_BY_NPI = gql`
    query Provider($npi: String) @api(name: registration) {
      searchProviderByNpi(npi: $npi) {
        id
        memberID
        internalEmail
        fullName
        dob
        userStatus
        userType
        basicData {
          id
          email
          ssn
          currentAddress
          employment {
            position
          }
        }
        npi
        specialty
        facilityName
        institutionName
        institutionType
        providerPhone
        businessAddress
        taxID
        ownership
        serviceLocations {
          workHours {
            sun {
              startTime
              closeTime
              duration
              busyStartTime
              busyCloseTime
              busyDuration
            }
            mon {
              startTime
              closeTime
              duration
              busyStartTime
              busyCloseTime
              busyDuration
            }
            tue {
              startTime
              closeTime
              duration
              busyStartTime
              busyCloseTime
              busyDuration
            }
            wed {
              startTime
              closeTime
              duration
              busyStartTime
              busyCloseTime
              busyDuration
            }
            thu {
              startTime
              closeTime
              duration
              busyStartTime
              busyCloseTime
              busyDuration
            }
            fri {
              startTime
              closeTime
              duration
              busyStartTime
              busyCloseTime
              busyDuration
            }
            sat {
              startTime
              closeTime
              duration
              busyStartTime
              busyCloseTime
              busyDuration
            }
          }
        }
        contacts {
          contactType
          fullName
          email
          phoneNumber
          position
        }
        billingEntities {
          entityName
          entityType
          npi
        }
        staffs {
          staffType
          memberID
          fullName
          email
          position
          simpleName
        }
        employeeProviders {
          billingEntityID
          email
          fullName
          inviteCode {
            code
            expiryDate
          }
          position
          simpleName
        }
        acceptedPlans {
          planID
          planName
          planType
        }
        planGroups {
          groupName
        }
        clinicianGroups {
          groupName
        }
        pcrGroups {
          planGroup {
            groupName
          }
          serviceLocation
          clinicianGroup {
            groupName
          }
          isPCP
          isSpecialist
          isAcceptNewPatient
          isInNetwork
          isOutNetwork
        }
        profile {
          callMeDoctorName
          bio
          coverPhoto  
        }
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: SEARCH_PROVIDER_BY_NPI,
    variables: { npi },
  });
  return data.searchProviderByNpi;
}

export async function searchProviderByMemberID(memberID) {
  let SEARCH_PROVIDER_BY_MEMBERID = gql`
    query Provider($memberID: String) @api(name: registration) {
      searchProviderByMemberID(memberID: $memberID) {
        id
        memberID
        internalEmail
        fullName
        dob
        userStatus
        userType
        basicData {
          id
          email
          ssn
          currentAddress
          employment {
            position
          }
        }
        npi
        specialty
        facilityName
        institutionName
        institutionType
        providerPhone
        businessAddress
        taxID
        ownership
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: SEARCH_PROVIDER_BY_MEMBERID,
    variables: { memberID },
    fetchPolicy: "no-cache",
  });
  return data.searchProviderByMemberID;
}

export async function getClinicianRelationshipList(providerId) {
  let RELATIONSHIP_LIST = gql`
    query ClinicianRelationship($providerId: BigInteger)
    @api(name: registration) {
      clinicianRelationshipsByProviderId(providerId: $providerId) {
        id
        serviceLocationID
        billingEntityID
        staffID
        daysWorkedHours {
          id
          presentDays {
            mon
            tue
            wed
            thi
            fri
            sat
            sun
          }
          startTime
          endTime
        }
        totalHoursWorked
        scribesFTE
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: RELATIONSHIP_LIST,
    variables: { providerId },
    fetchPolicy: "no-cache",
  });
  return data.clinicianRelationshipsByProviderId;
}

export async function getClinicianRelationshipDetail(relationId) {
  let GET_RELATIONSHIP_DETAIL = gql`
    query ClinicianRelationship($clinicianRelationshipId: BigInteger)
    @api(name: registration) {
      clinicianRelationshipDetail(
        clinicianRelationshipId: $clinicianRelationshipId
      ) {
        id
        serviceLocationID
        billingEntityID
        staffID
        daysWorkedHours {
          id
          presentDays {
            mon
            tue
            wed
            thi
            fri
            sat
            sun
          }
          startTime
          endTime
          hoursWorked
        }
        totalHoursWorked
        scribesFTE
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: GET_RELATIONSHIP_DETAIL,
    variables: { clinicianRelationshipId: relationId },
    fetchPolicy: "no-cache",
  });

  return data.clinicianRelationshipDetail;
}

export async function saveClinicianRelationship(providerId, request) {
  let SAVE_RELATIONSHIP = gql`
    mutation ClinicianRelationship(
      $request: ClinicianRelationshipSavePatternInput
      $providerId: BigInteger
    ) @api(name: registration) {
      saveClinicianRelationship(request: $request, providerId: $providerId) {
        id
        serviceLocationID
        billingEntityID
        staffID
      }
    }
  `;

  try {
    let { data, loading, error } = await client.mutate({
      mutation: SAVE_RELATIONSHIP,
      variables: { providerId, request },
    });

    return data.saveClinicianRelationship;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function updateClinicianRelationship(id, relationship) {
  let UPDATE_RELATIONSHIP = gql`
    mutation ClinicianRelationship(
      $request: ClinicianRelationshipInput
      $clinicianRelationshipId: BigInteger
    ) @api(name: registration) {
      updateClinicianRelationship(
        request: $request
        clinicianRelationshipId: $clinicianRelationshipId
      ) {
        id
        serviceLocationID
        billingEntityID
        staffID
      }
    }
  `;
  let { data, loading, error } = await client.mutate({
    mutation: UPDATE_RELATIONSHIP,
    variables: { clinicianRelationshipId: id, request: relationship },
  });

  return data.updateClinicianRelationship;
}

export async function deleteClinicianRelationship(id) {
  let DELETE_RELATIONSHIP = gql`
    mutation Response($clinicianRelationshipId: BigInteger)
    @api(name: registration) {
      deleteClinicianRelationship(
        clinicianRelationshipId: $clinicianRelationshipId
      ) {
        status
        message
      }
    }
  `;
  try {
    let { data, loading, error } = await client.mutate({
      mutation: DELETE_RELATIONSHIP,
      variables: { clinicianRelationshipId: id },
    });

    return data.deleteClinicianRelationship;
  } catch (e) {
    console.log(e);
  }

  return null;
}

///////////////////////////////////////////////////////////
/////////// Please remove this controller, jin 04-21 //////
///////////////////////////////////////////////////////////
export async function saveWorkedHours(relationhipId, workedHourList) {
  let SAVE_WORKED_HOURS = gql`
    mutation DaysWorkedHours(
      $request: [DaysWorkedHoursInput]
      $clinicianRelationshipId: BigInteger
    ) @api(name: registration) {
      saveDaysWorkedHours(
        request: $request
        clinicianRelationshipId: $clinicianRelationshipId
      ) {
        id
        presentDays {
          mon
          tue
          wed
          thi
          fri
          sat
          sun
        }
        startTime
        endTime
        hoursWorked
      }
    }
  `;

  let { data, loading, error } = await client.mutate({
    mutation: SAVE_WORKED_HOURS,
    variables: {
      clinicianRelationshipId: relationhipId,
      request: workedHourList,
    },
  });

  return data.saveDaysWorkedHours;
}

export async function updateWorkedHours(id, workedHour) {
  let UPDATE_WORKED_HOURS = gql`
    mutation DaysWorkedHours(
      $request: DaysWorkedHoursInput
      $daysWorkedHoursId: BigInteger
    ) @api(name: registration) {
      updateDaysWorkedHours(
        request: $request
        daysWorkedHoursId: $daysWorkedHoursId
      ) {
        id
        presentDays {
          mon
          tue
          wed
          thi
          fri
          sat
          sun
        }
        startTime
        endTime
        hoursWorked
      }
    }
  `;

  let { data, loading, error } = await client.mutate({
    mutation: UPDATE_WORKED_HOURS,
    variables: { daysWorkedHoursId: id, request: workedHour },
  });

  return data.updateDaysWorkedHours;
}

export async function deleteWorkedHours(id) {
  let DELETE_WORKEDHOURS = gql`
    mutation Response($daysWorkedHoursId: BigInteger) {
      deleteDaysWorkedHours(daysWorkedHoursId: $daysWorkedHoursId) {
        status
        message
      }
    }
  `;

  let { data, loading, error } = await client.mutate({
    mutation: DELETE_WORKEDHOURS,
    variables: { daysWorkedHoursId: id },
  });

  return data.deleteDaysWorkedHours;
}

export async function saveReserve(providerId, reserveData) {
  let SAVE_RESERVE = gql`
    mutation Reserve($request: ReserveInput, $providerId: BigInteger)
    @api(name: registration) {
      saveReserve(request: $request, providerId: $providerId) {
        id
        companyName
        fullName
        email
        mobileNumber
        cardDetail {
          nameOnCard
          cardNumber
          cvv
          expiryDate
          billingAddress
        }
        reservedAmount
        balanceToPaid
      }
    }
  `;

  let { data, loading, error } = await client.mutate({
    mutation: SAVE_RESERVE,
    variables: { providerId, request: reserveData },
  });
  return data.saveReserve;
}

export async function getOutsourcedStaffList(providerId) {
  let GET_OUTSOURCED_STAFF_LIST = gql`
    query OutsourcedStaffs($providerId: BigInteger) @api(name: registration) {
      outsourcedStaffsByProviderId(providerId: $providerId) {
        id
        serviceLocationID
        billingEntityID
        staffType
        daysWorkedHours {
          id
          staffName
          presentDays {
            mon
            tue
            wed
            thi
            fri
            sat
            sun
          }
          startTime
          endTime
          numberOfStaff
          hoursWorked
        }
        totalHoursWorked
        scribesFTE
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: GET_OUTSOURCED_STAFF_LIST,
    variables: { providerId },
  });
  return data.outsourcedStaffsByProviderId;
}

export async function getOutsourcedStaffDetail(id) {
  let GET_OUTSOURCED_STAFF_DETAIL = gql`
    query OutsourcedStaff($outsourcedStaffId: BigInteger)
    @api(name: registration) {
      outsourcedStaffDetail(outsourcedStaffId: $outsourcedStaffId) {
        id
        serviceLocationID
        billingEntityID
        staffType
        daysWorkedHours {
          id
          staffName
          presentDays {
            mon
            tue
            wed
            thi
            fri
            sat
            sun
          }
          startTime
          endTime
          numberOfStaff
          hoursWorked
        }
        totalHoursWorked
        scribesFTE
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: GET_OUTSOURCED_STAFF_DETAIL,
    variables: { outsourcedStaffId: id },
  });
  return data.foutsourcedStaffDetail;
}

export async function saveOutsourcedStaff(providerId, outsourcedData) {
  let SAVE_OUTSOURCED_STAFF = gql`
    mutation OutsourcedStaff(
      $request: OutsourcedStaffInput
      $providerId: BigInteger
    ) @api(name: registration) {
      saveOutsourcedStaff(request: $request, providerId: $providerId) {
        id
        serviceLocationID
        billingEntityID
        staffType
      }
    }
  `;

  try {
    let { data, loading, error } = await client.mutate({
      mutation: SAVE_OUTSOURCED_STAFF,
      variables: { request: outsourcedData, providerId },
    });
    return data.saveOutsourcedStaff;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateOutsourcedStaff(id, outsourcedData) {
  let UPDATE_OUTSOURCED_STAFF = gql`
    mutation OutsourcedStaff(
      $request: OutsourcedStaffInput
      $outsourcedStaffId: BigInteger
    ) @api(name: registration) {
      updateOutsourcedStaff(
        request: $request
        outsourcedStaffId: $outsourcedStaffId
      ) {
        id
        serviceLocationID
        billingEntityID
        staffType
      }
    }
  `;

  let { data, loading, error } = await client.mutate({
    mutation: UPDATE_OUTSOURCED_STAFF,
    variables: { request: outsourcedData, outsourcedStaffId: id },
  });
  return data.updateOutsourcedStaff;
}

export async function deleteOutsourcedStaff(id) {
  let DELETE_OUTSOURCED_STAFF = gql`
    mutation Response($outsourcedStaffId: BigInteger) @api(name: registration) {
      deleteOutsourcedStaff(outsourcedStaffId: $outsourcedStaffId) {
        status
        message
      }
    }
  `;
  try {
    let { data, loading, error } = await client.mutate({
      mutation: DELETE_OUTSOURCED_STAFF,
      variables: { outsourcedStaffId: id },
    });

    return data.deleteOutsourcedStaff;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function saveWorkedHoursOutsourced(id, workedHourList) {
  let SAVE_WORKED_HOURS = gql`
    mutation DaysWorkedHoursOutsourceds(
      $request: [DaysWorkedHoursOutsourcedInput]
      $outsourcedStaffId: BigInteger
    ) @api(name: registration) {
      saveDaysWorkedHoursOutsourced(
        request: $request
        outsourcedStaffId: $outsourcedStaffId
      ) {
        id
        staffName
        presentDays {
          mon
          tue
          wed
          thi
          fri
          sat
          sun
        }
        startTime
        endTime
        numberOfStaff
        hoursWorked
      }
    }
  `;

  let { data, loading, error } = await client.mutate({
    mutation: SAVE_WORKED_HOURS,
    variables: {
      outsourcedStaffId: id,
      request: workedHourList,
    },
  });
  return data.saveDaysWorkedHoursOutsourced;
}

export async function updateWorkedHoursOutsourced(id, workedHourData) {
  let UPDATE_WORKED_HOURS = gql`
    mutation DaysWorkedHoursOutsourced(
      $request: DaysWorkedHoursOutsourcedInput
      $daysWorkedHoursOutsourcedId: BigInteger
    ) @api(name: registartion) {
      updateDaysWorkedHoursOutsourced(
        request: $request
        daysWorkedHoursOutsourcedId: $daysWorkedHoursOutsourcedId
      ) {
        id
        staffName
        presentDays {
          mon
          tue
          wed
          thi
          fri
          sat
          sun
        }
        startTime
        endTime
        numberOfStaff
        hoursWorked
      }
    }
  `;

  let { data, loading, error } = await client.mutate({
    mutation: UPDATE_WORKED_HOURS,
    variables: {
      request: workedHourData,
      daysWorkedHoursOutsourcedId: id,
    },
  });
  return data.updateDaysWorkedHoursOutsourced;
}

export async function deleteWorkedHoursOutsourced(id) {
  let DELETE_WORKED_HOURS = gql`
    mutation Response($daysWorkedHoursOutsourcedId: BigInteger)
    @api(name: registration) {
      deleteDaysWorkedHoursOutsourced(
        daysWorkedHoursOutsourcedId: $daysWorkedHoursOutsourcedId
      ) {
        status
        message
      }
    }
  `;

  let { data, loading, error } = await client.mutate({
    mutation: DELETE_WORKED_HOURS,
    variables: { daysWorkedHoursOutsourcedId: id },
  });
  return data.deleteDaysWorkedHoursOutsourced;
}

export async function saveProviderGeneralInfo(generalInfo) {
  let SAVE_GENERAL_INFO = gql`
    mutation Provider($request: ProviderGeneralInfoPatternInput)
    @api(name: registration) {
      saveProviderGeneralInfo(request: $request) {
        id
        institutionName
        institutionType
        businessAddress
        npi
        taxID
        ownership
        phoneNumber
        facilityName
        specialty
        fullName
      }
    }
  `;
  try {
    let { data, loading, error } = await client.mutate({
      mutation: SAVE_GENERAL_INFO,
      variables: { request: generalInfo },
    });
    return data.saveProviderGeneralInfo;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function saveProviderContact(providerId, contactList) {
  let SAVE_CONTRACT = gql`
    mutation Contacts($request: ContactSavePatternInput)
    @api(name: registration) {
      saveProviderContact(request: $request) {
        id
        contactType
        email
        fullName
        phoneNumber
        position
      }
    }
  `;
  try {
    let { data, loading, error } = await client.mutate({
      mutation: SAVE_CONTRACT,
      variables: { request: { providerId, contactList } },
    });

    return data.saveProviderContact;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function updateProviderContact(contactId, contact) {
  console.log(contact);
  let UPDATE_CONTACT = gql`
    mutation UpdatedContact($contact: ContactInput, $contactId: BigInteger)
    @api(name: registration) {
      updateContact(contact: $contact, contactId: $contactId) {
        id
        fullName
        email
        phoneNumber
        position
      }
    }
  `;
  try {
    let { data, loading, error } = await client.mutate({
      mutation: UPDATE_CONTACT,
      variables: { contact, contactId },
    });
    return data.updateContact;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function deleteProviderContact(contactId) {
  let DELETE_CONTACT = gql`
    mutation Response($contactId: BigInteger) @api(name: registration) {
      deleteContact(contactId: $contactId) {
        status
        message
      }
    }
  `;
  try {
    let { data, loading, error } = await client.mutate({
      mutation: DELETE_CONTACT,
      variables: { contactId },
    });
    return data.deleteContact;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getProviderContactListByType(providerId, contactType) {
  let GET_CONACT_LIST = gql`
    query Contacts($providerId: BigInteger, $contactType: CONTACTTYPE)
    @api(name: registration) {
      contactsByContactType(
        providerId: $providerId
        contactType: $contactType
      ) {
        id
        contactType
        email
        fullName
        phoneNumber
        position
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: GET_CONACT_LIST,
    variables: { providerId, contactType },
    fetchPolicy: "no-cache",
  });
  return data.contactsByContactType;
}

export async function getProviderContactList(providerId) {
  let GET_CONTACT_LIST = gql`
    query Contacts($providerId: BigInteger) @api(name: registration) {
      allContactsByProviderId(providerId: $providerId) {
        id
        contactType
        email
        fullName
        phoneNumber
        position
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: GET_CONTACT_LIST,
    variables: { providerId },
    fetchPolicy: "no-cache",
  });
  return data.allContactsByProviderId;
}

export async function searchProvidersFromPatient(selected, typed) {
  let SEARCH_PROVIDER_LIST = gql`
    query Provider($selected: SEARCHITEM, $typed: String)
    @api(name: registration) {
      searchProviderFromPatient(selected: $selected, typed: $typed) {
        id
        fullName
        userStatus
        userType
        specialty
        facilityName
        businessAddress
        geography {
          lat
          lng
          plusCode
        }
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: SEARCH_PROVIDER_LIST,
    variables: { selected, typed },
    fetchPolicy: "no-cache",
  });
  return data.searchProviderFromPatient;
}

export async function getAllProviders() {
  let ALL_PROVIDERS = gql`
    query Providers @api(name: registration) {
      allProviders {
        id
        fullName
        userStatus
        userType
        specialty
        facilityName
        businessAddress
        geography {
          lat
          lng
          plusCode
        }
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: ALL_PROVIDERS,
    variables: {},
    fetchPolicy: "no-cache",
  });
  return data.allProviders;
}

export async function getPreSignedURLFrom(fileName) {
  let GET_PRE_SIGNED_URL = gql`
    query Response($fileName: String) @api(name: registration) {
      generateURLToAWS(fileName: $fileName) {
        status
        message
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: GET_PRE_SIGNED_URL,
    variables: { fileName },
    fetchPolicy: "no-cache",
  });
  return data.generateURLToAWS;
}

export async function getResponseOCRServer(frontFileUrl, backFileUrl) {
  let RESPONSE_OCR = gql`
    query Response($frontFileUrl: String, $backFileUrl: String)
    @api(name: registration) {
      responseOCRServer(frontFileUrl: $frontFileUrl, backFileUrl: $backFileUrl)
    }
  `;

  let { data, loading, error } = await client.query({
    query: RESPONSE_OCR,
    variables: { frontFileUrl, backFileUrl },
    fetchPolicy: "no-cache",
  });
  return data.responseOCRServer;
}

export async function getResponseSelfie(videoUrl, imageUrl) {
  const RESPONSE_SELFIE = gql`
    query string($videoUrl: String, $imageUrl: String)
    @api(name: registration) {
      faceRecognition(videoUrl: $videoUrl, imageUrl: $imageUrl) {
        status
        message
      }
    }
  `;

  let { data, loading, error } = await client.query({
    query: RESPONSE_SELFIE,
    variables: { frontFileUrl, imageUrl },
    fetchPolicy: "no-cache",
  });
  return data.faceRecognition;
}

export async function allInfluencersByProviderId(providerId) {
  const QUERY = gql`
    query influencers($providerId: BigInteger) @api(name: registration) {
      allInfluencersByProviderId(providerId: $providerId) {
        id
        staffID
        isProviders
        isPayers
        isEmployers
        isPatients
        influenceDetails {
          id
          mediaType
          mediumType
          followerNumber
          mainAudienceType
        }
      }
    }
  `;
  let { data, loading, error } = await client.query({
    query: QUERY,
    variables: { providerId },
    fetchPolicy: "no-cache",
  });
  return data.allInfluencersByProviderId;
}

export async function saveInfluencers(providerId, requests) {
  const QUERY = gql`
    mutation influencers(
      $requests: [InfluencerSavePatternInput]
      $providerId: BigInteger
    ) @api(name: registration) {
      saveInfluencers(requests: $requests, providerId: $providerId) {
        id
        staffID
        isProviders
        isPayers
        isEmployers
        isPatients
      }
    }
  `;

  try {
    let { data, loading, error } = await client.query({
      query: QUERY,
      variables: { providerId, requests },
      fetchPolicy: "no-cache",
    });
    return data.saveInfluencers;
  } catch (e) {
    console.log(e);
  }

  return null;
}

export async function saveInfluencer(providerId, influencer) {
  const QUERY = gql`
    mutation influencer($influencer: InfluencerInput, $providerId: BigInteger)
    @api(name: registration) {
      saveInfluencer(influencer: $influencer, providerId: $providerId) {
        id
        staffID
        isProviders
        isPayers
        isEmployers
        isPatients
      }
    }
  `;
  let { data, loading, error } = await client.query({
    query: QUERY,
    variables: { providerId, influencer },
    fetchPolicy: "no-cache",
  });
  return data.saveInfluencer;
}

export async function updateInfluencer(influencerId, influencer) {
  const QUERY = gql`
    mutation influencer($influencer: InfluencerInput, $influencerId: BigInteger)
    @api(name: registration) {
      updateInfluencer(influencer: $influencer, influencerId: $influencerId) {
        id
        staffID
        isProviders
        isPayers
        isEmployers
        isPatients
      }
    }
  `;
  let { data, loading, error } = await client.query({
    query: QUERY,
    variables: { influencerId, influencer },
    fetchPolicy: "no-cache",
  });
  return data.updateInfluencer;
}

export async function deleteInfluencer(influencerId) {
  const QUERY = gql`
    mutation influencer($influencerId: BigInteger) @api(name: registration) {
      updateInfluencer(influencerId: $influencerId) {
        status
        message
      }
    }
  `;
  let { data, loading, error } = await client.query({
    query: QUERY,
    variables: { influencerId },
    fetchPolicy: "no-cache",
  });
  return data.updateInfluencer;
}

export async function saveInfluenceDetail(influencerId, detail) {
  const QUERY = gql`
    mutation influencer(
      $detail: InfluenceDetailInput
      $influencerId: BigInteger
    ) @api(name: registration) {
      saveInfluenceDetail(detail: $detail, influencerId: $influencerId) {
        id
        mediaType
        mediumType
        followerNumber
        mainAudienceType
      }
    }
  `;
  let { data, loading, error } = await client.query({
    query: QUERY,
    variables: { detail, influencerId },
    fetchPolicy: "no-cache",
  });
  return data.saveInfluenceDetail;
}

export async function updateInfluenceDetail(detailId, detail) {
  const QUERY = gql`
    mutation influencer($detail: InfluenceDetailInput, $detailId: BigInteger)
    @api(name: registration) {
      updateInfluenceDetail(detail: $detail, detailId: $detailId) {
        id
        mediaType
        mediumType
        followerNumber
        mainAudienceType
      }
    }
  `;
  let { data, loading, error } = await client.query({
    query: QUERY,
    variables: { detail, detailId },
    fetchPolicy: "no-cache",
  });
  return data.updateInfluenceDetail;
}

export async function deleteInfluenceDetail(detailId) {
  const QUERY = gql`
    mutation influencer($detailId: BigInteger) @api(name: registration) {
      deleteInfluenceDetail(detailId: $detailId) {
        istatus
        message
      }
    }
  `;
  let { data, loading, error } = await client.query({
    query: QUERY,
    variables: { detailId },
    fetchPolicy: "no-cache",
  });
  return data.deleteInfluenceDetail;
}

export async function getLocationsByProviderId(providerId) {
  const QUERY = gql`
    query Provider($providerId: BigInteger) @api(name: registration) {
      providerDetail(providerId: $providerId) {
        serviceLocations {
          id
          legalName
          address
          simpleName
        }
      }
    }
  `;
  let { data, loading, error } = await client.query({
    query: QUERY,
    variables: {
      providerId,
    },
    fetchPolicy: "no-cache",
  });
  return data.providerDetail.serviceLocations;
}
