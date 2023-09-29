import { useEffect, useState } from "react"
import { getProviderDetail } from "../lib/provider"

export const useFetchProvider = (providerId) => {
    const [provider, setProvider] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const providerDetail = await getProviderDetail(providerId);
                setProvider(providerDetail);
            } catch (error) {
                console.error("server error: ", error);
            }
        };

        fetchData();
    }, []);

    return {
        provider
    };
};