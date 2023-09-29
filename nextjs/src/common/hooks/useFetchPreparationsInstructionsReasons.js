import { useEffect } from "react";
import { useState } from "react"
import { getPreparationsAndInstructionsAndReasons } from "../lib/appointment";

export const useFetchPreparationsInstructionsReasons = (providerId) => {
    const [preparationsInstructionsReasosns, setPreparationsInstructionsReasosns] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = getPreparationsAndInstructionsAndReasons(providerId);
                setPreparationsInstructionsReasosns(response);
            }catch(error){
                console.error("server error: ", error);
            }
        }
        fetchData();
    }, [])
    return {
        preparationsInstructionsReasosns
    }
}