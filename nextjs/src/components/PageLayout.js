import dynamic from 'next/dynamic'
const LoadingScreen = dynamic(() => import('./LoadingScreen'))
import Cookie from 'js-cookie'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useLoadingStatus } from '../redux/hooks/useCommonStore'
import { useAuthUser } from '../redux/hooks/useCommonStore';
import checkAuthentication from "../common/utils/checkAuthentication";
import { AppUrls } from '../common/constant/global'

const PageLayout = ({ children }) => {
  const { loadingStatus } = useLoadingStatus()
  const { authUser, commitAuthUser } = useAuthUser()
  const router = useRouter()

  useEffect(() => {
    const path = router.asPath
    const hostname = location.hostname
    const bl = checkAuthentication(path)
    // if (!bl) {
    //   if (hostname.indexOf('localhost') > -1)
    //     location.href = 'http://localhost:3000'
    //   else if (hostname.indexOf('apps.pannucorp.com'))
    //     location.href = 'https://apps.pannucorp.com'
    //   else
    //     location.href = AppUrls.REGISTRATION
    //  return
    // }

    // let user = null
    // try {
    //   user = JSON.parse(Cookie.get('user'))
    // }
    // catch (e) {
    //
    // }
    //
    // if (user && !authUser)
    //   commitAuthUser(user)

  }, [])

  return (
    <>
      { loadingStatus ? <LoadingScreen /> : <></> }
      { children }
    </>
  )
}

export default PageLayout