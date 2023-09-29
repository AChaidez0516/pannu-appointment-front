import { CircularProgress } from "@mui/material";
import styled from "styled-components";

export default function LoadingButton({isLoading, children}) {
    return (
        <>
            {
                !isLoading && children
            }
            {
                isLoading && (
                    <LoadingButtonWrapper>
                        <DisabledWrapper>
                            {children}
                        </DisabledWrapper>

                        <SpinnerWrapper>
                            <CircularProgress size={20} />
                        </SpinnerWrapper>
                    </LoadingButtonWrapper>)
            }
        </>
    )
}

const LoadingButtonWrapper = styled.div`
    display: flex; 
    justify-content: center;
    align-items: start;
`

const DisabledWrapper =  styled.div`
    align-self: center;
    margin-right: 2px;
    * {
        opacity: 0.5;
        cursor: not-allowed !important;
    }
`

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  * {
    color: lightgray;
  }
`