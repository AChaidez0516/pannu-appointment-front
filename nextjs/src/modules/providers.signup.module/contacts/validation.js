import * as Yup from 'yup';
export const VALIDATION_SCHEMA = Yup.object({
  contactList: Yup.array().of(
    Yup.object().shape({
      fullName: Yup.string().required(),
      position: Yup.string().required(),
      phoneNumber: Yup.string().required(),
      email: Yup.string().required().email()
    })
  )
})