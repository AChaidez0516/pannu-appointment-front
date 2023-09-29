import { useEffect, useState } from "react"
import { getAllCPTCodes } from "../lib/appointment";

export const useGetAllCPTCodes = () => {
    const [cptCodes, setCptCodes] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const { result } = await getAllCPTCodes();
                setCptCodes(result);
            } catch (e){
                console.log(e);
            }
        }
        fetchData();
    }, [])
    return {
        cptCodes
    }
}