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

const isValidDate = (value) => {
  const timestamp = Date.parse(value);
  return !isNaN(timestamp);
};

const PHONE_NO_REGEX = /^[0-9\- ]{12}$/
export const schema = yup.object().shape({
  planName: yup
    .string()
    .required("Plan name is required"),
  planIssuer: yup
    .string(),
  effectiveDate: yup
    .string().required('Effective Date is required')
    .length(10, "Invalid date format")
    .test('isValidDate', 'Invalid date', isValidDate),
  nameOnCard: yup
    .string()
    .required('Name on card is required'),
  memberId: yup
    .string()
    .required('Member ID is required'),
  planAddress: yup
    .string()
    .nullable(true),
  groupPlanId: yup
    .string(),
  patientSupportPhoneNumber: yup
    .string()
    .matches(PHONE_NO_REGEX, { message: "Invalid phone number format", excludeEmptyString: true }),
  providerSupportPhoneNumber: yup
    .string()
    .matches(PHONE_NO_REGEX, { message: "Invalid phone number format", excludeEmptyString: true }),
}).required();