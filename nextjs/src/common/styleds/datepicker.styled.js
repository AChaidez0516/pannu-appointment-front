import styled from "styled-components";
import dynamic from "next/dynamic";
const DatePicker = dynamic(() => import("react-datepicker"))

export const CDatePicker = styled(DatePicker)`
    outline: none;
    border: none;
    box-sizing: border-box;
    height: 36px;
    width: 100%;
    font-size: 10px;
`