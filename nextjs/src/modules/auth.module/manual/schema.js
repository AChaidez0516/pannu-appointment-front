import * as yup from "yup";

const isValidDate = (value) => {
  const timestamp = Date.parse(value);
  return !isNaN(timestamp);
};

export const schema = yup.object().shape({
  dob: yup
    .string().required('Date of birth is required')
    .length(10, "Invalid date format")
    .test('isValidDate', 'Invalid date of birth', isValidDate),
  ssn: yup
    .string().required('The last 4 digits of SSN is required')
    .length(4, "Invalid SSN format"),
  lastName: yup
    .string()
    .required("Please enter the last name")
}).required();