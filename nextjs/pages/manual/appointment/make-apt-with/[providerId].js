import MakeApt from "../../../../src/modules/manual.module/apt/make-apt/index/index";
import { getProviderDetail } from "../../../../src/common/lib/provider";

export const getServerSideProps = async (context) => {
  try {
    const providerDetail = await getProviderDetail(
      parseInt(context.params.providerId)
    );
    return {
      props: { providerDetail },
    };
  } catch (error) {
    console.log("server error: ", error);
  }
};

function MakeAptPage({ providerDetail }) {
  return <MakeApt provider={providerDetail} />;
}

export default MakeAptPage;
