import styled from "styled-components"


export default function AptKindComponent(props) {
  const {
    aptKinds,
    setAptKind,
    setChooseAptTypeModal,
  } = props
  return (
    <Wrapper>
      {aptKinds.map((aptKind, i) => (
        <div
          key={i}
          className="apt-type-unit"
          onClick={() => {
            setChooseAptTypeModal(false)
            setAptKind(aptKind)
          }}
        >{aptKind?.label}</div>
      ))}
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  font-family: 'SF Pro Text';
  background: #FFFFFF;
  border-radius: 9px 9px 0px 0px;
  .apt-type-unit {
    padding: 16px 0;
    border-bottom: 0.5px solid #BBBBBE;
    text-align: center;
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    color: #173FD4;
    cursor: pointer;
  }
  margin-bottom: 6px;
`