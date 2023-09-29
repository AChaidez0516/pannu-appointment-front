import { ProviderApt } from "../../../../src/modules/providers.appointment.module/index/index"

export const getServerSideProps = async (context) => {
  try {
    // const appointmentDetail = await getAppointmentDetail( parseInt(context.params.aptId))
    return {
      props: { providerId: context.params.providerId }
    }
  } catch (error) {
    console.log("server error: ", error);
  }
}

function ProvidersAptPage({ providerId }) {
  return <ProviderApt providerId={providerId} />
}

export default ProvidersAptPage