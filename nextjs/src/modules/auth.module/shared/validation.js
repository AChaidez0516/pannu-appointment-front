import * as Yup from 'yup';

export const PATIENT_LOGIN_VALIDATION = Yup.object({
  username: Yup.string()
    .max(5, 'Username must be 5 characters or more')
    .required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .required(),
})