import ChooseProvider from "../../../src/modules/patients.service.module/choose-provider"
import { getAllProviders } from '../../../src/common/lib/provider'
import { getAptFetchAllFromDate } from '../../../src/common/lib/appointment'
import moment from 'moment'

export const getServerSideProps = async (context) => {
  const today = moment(new Date()).format('YYYY-MM-DD');
  let providers = []
  let apts = []
  try {
    [ 
      providers,
      apts
    ] = await Promise.all([
      getAllProviders(),
      getAptFetchAllFromDate(today)   
      ])
    
  } catch (error) {
    console.log("server error: ", error);
  } finally {
    return {
      props: { providers, apts }
    }
  }
}

function ChooseProviderPage ({providers, apts}) {
  
  if(providers.length > 0) {
    const events = apts.map(apt => {
      const providerId = apt.providerUserId;
      const provider = providers.find(pvd => pvd?.id === providerId)
      const start = new Date(apt.aptDate + " " + apt.aptTime)
      return {
        start,
        end: new Date(moment(start).add(25, 'minutes')),
        provider: {
          ...provider, 
          isPPO: provider?.id > 22 ? true : false, 
          isPOEM: apt?.id > 30 ? true : false
        },
        rating: 4
      }
    })
    return (
      <ChooseProvider providersFromServer={providers} events={events} />
    )
  }
  return (
    <p style={{textAlign: 'center'}}>Sorry, No data to display from server</p>
  )
  
}

export default ChooseProviderPage