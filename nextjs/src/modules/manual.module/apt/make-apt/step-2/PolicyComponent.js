import styled from "styled-components";

export default function FeesComponent(props) {
  const {
    children,
    usePoem,
    setUsePoem,
    agreeTerms,
    setAgreeTerms,
    isSubmit,
    onOpenPolicies
  } = props

  return (
    <PolicyWrapper>
      <div className="header" onClick={onOpenPolicies}>Our policies</div>
      <div className="content"><strong>Important</strong>: You may receive additional forms and instructions from the provider when the appointment is confirmed</div>
    </PolicyWrapper>
  )
}

const PolicyWrapper = styled.div`
  margin-bottom: 10px;
  .header {
    cursor: pointer;
    font-weight: 500;
    font-size: 16px;
    line-height: 10px;
    color: #173FD4;
    margin-bottom: 9px;
  }
  .content {
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
    strong {
      font-weight: 600;
      font-size: 14px;
    }
  }
`