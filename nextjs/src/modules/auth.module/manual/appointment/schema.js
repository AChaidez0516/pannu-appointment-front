import * as yup from "yup";
import { validateAddress } from "../../../../components/autocomplete";

function debounce(func, wait, immediate) {
  var timeout;
  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

const PHONE_NO_REGEX = /^[0-9\- ]{12}$/
export const schema = yup.object().shape({
  nameOnGovernmentIssuedID: yup
    .string()
    .required("Please enter name as on government issued ID"),
  practiceName: yup
    .string()
    .required("Please enter practice or provider name as used to obtain NPI"),
  specialty: yup
    .string()
    .required("Please enter specialty as used to obtain NPI"),
  yourPosition: yup
    .string()
    .required('Please enter your position in the organization'),
  npi: yup
    .string()
    .required("Please enter the NPI of the practice or provider")
    .length(12, "Invalid NPI format")
    .nullable(true),
  mainAddress: yup
    .string()
    .required("Please enter a valid USPS serviceable address"),
  emailAddress: yup
    .string()
    .required("Please enter your work email address")
    .email('Invalid email format'),
  numberOfClinicians: yup
    .number()
    .typeError('Please enter number of clinicians working at this practice')
    .min(1, 'Min value 1'),
  telephone: yup
    .string()
    .length(12, "Invalid phone number format")
    .nullable(true),
  patientSupportPhoneNumber: yup
    .string()
    .matches(PHONE_NO_REGEX, { message: "Invalid phone number format", excludeEmptyString: true }),
  providerSupportPhoneNumber: yup
    .string()
    .matches(PHONE_NO_REGEX, { message: "Invalid phone number format", excludeEmptyString: true }),
  yourTimeZone: yup
    .string()
    .required("Please select the time zone where you are"),
  preferredTimes: yup
    .array()
    .min(1, "Please select the best date and time to contact you"),
}).required();