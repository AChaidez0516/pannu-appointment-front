import { useEffect, useState } from "react"
import { getAllICD10Codes } from "../lib/appointment";

export const useGetAllICD10Codes = () => {
    const [icd10Codes, setIcd10Codes] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const { result } = await getAllICD10Codes();
                setIcd10Codes(result);
            } catch (e){
                console.log(e);
            }
        }
        fetchData();
    }, [])
    return {
        icd10Codes
    }
}