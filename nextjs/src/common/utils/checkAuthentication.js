import Cookie from "js-cookie";

const checkAuthentication = (path) => {
  let arr = path.split('?')
  path = arr[0]

  let user = Cookie.get('user')
  try {
    user = JSON.parse(user)
  }
  catch (e) {
    user = null
  }

  const list = [
    '/',
    '/test_signin',
    '/auth/login',
    '/auth/signup',
    '/forgot/password',
    '/forgot/username',
    '/auth/signup/agreement',
    '/auth/signup/basic-data',
    '/auth/signup/biometric',
    '/auth/signup/index',
    '/auth/signup',
    '/auth/signup/security-questions',
    '/auth/signup/verify-email',
    '/auth/signup/verify-phone',
    '/user/insurance/add-profile',
    '/user/insurance/index',
    '/user/insurance',
    '/user/insurance/oop',
    '/user/insurance/summary',
    '/user/insurance/plan-data',
    '/user/payment',
    '/user/payment/index',
    '/user/payment/add-card',
    '/user/payment/checkout',
    '/user/payment/pending',
    '/user/scan-ID',
    '/user/selfie',

  ]

  if ((!user || !user.id) && !list.includes(path))
    return false

  return true
}

export default checkAuthentication