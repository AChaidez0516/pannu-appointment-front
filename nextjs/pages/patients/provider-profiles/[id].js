import { getProviderDetail } from '../../../src/common/lib/provider'
import ProviderProfile from "../../../src/modules/patients.service.module/provider-profile"

export const getServerSideProps = async (context) => {
  try {
    const providerDetail = await getProviderDetail( parseInt(context.params.id)) 
    return {
      props: {providerDetail}
    }
  } catch (error) {
    console.log("server error: ", error);
  }
}


function ProfilePage ({providerDetail}) {
  if (!providerDetail || !providerDetail?.profile) {
    return <p>Sorry!, this provider doesn't have profile in public</p>
  }

  return (
    <ProviderProfile providerDetail={providerDetail} />
  )
  
}

export default ProfilePage