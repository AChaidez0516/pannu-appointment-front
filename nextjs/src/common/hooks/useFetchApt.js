import { useEffect, useState } from "react"
import { getAppointmentDetail } from "../lib/appointment"

export const useFetchApt = (aptId) => {
    const [apt, setApt] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const aptDetail = await getAppointmentDetail(aptId);
                setApt(aptDetail);
            } catch (error) {
                console.error("server error: ", error);
            }
        };

        fetchData();
    }, []);

    return {
        apt
    };
};