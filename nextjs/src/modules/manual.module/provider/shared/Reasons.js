import styled from "styled-components"
import { useState, useEffect } from "react";
import Modal from '../../../../components/Modal'
import Image from "next/image";
import { ICONS } from "../../../../common/utils/styleGuide";
import SimpleBar from "simplebar-react";
import { render } from "nprogress";

const DescriptionComponent = ({ description, onClickMore }) => {
  const [isNeedShrink, setIsNeedShrink] = useState(false);

  useEffect(() => {
    if (description && description.length > 50) {
      setIsNeedShrink(true);
    } else {
      setIsNeedShrink(false);
    }
  }, [description]);

  return (
    <DescriptionWrapper>
      {isNeedShrink && (
        <>
          <span>{description.substr(0, 50)}</span>
          <span className="btn" onClick={() => onClickMore(description)}>...More</span>
        </>
      )}
      {!isNeedShrink && (
        <span>{description}</span>
      )}
    </DescriptionWrapper>
  )
}

export default function Reasons(props) {
  const {
    setIsDisabled,
    reasons,
    setReasons,
  } = props

  const [searchReason, setSearchReason] = useState('');
  const [modalDescription, setModalDescription] = useState('');
  const [_reasons, _setReasons] = useState(reasons)
  const [render, setRender] = useState(false)

  useEffect(() => {
    setIsDisabled(!_reasons.some(r => r.checked))
    if (render) {
      setReasons(_reasons.filter(r => r.checked).map(r => r.id))
    }
  }, [_reasons, render])

  const onClickMore = (description) => {
    setModalDescription(description);
  }

  const handleSelect = (reason) => {
    _setReasons(_reasons.map(r => r.id === reason.id ? ({ ...r, checked: !r?.checked }) : r))
    setRender(true)
  }
  
  return (
    <ContentWrapper>
      <div className="title">Select from reasons</div>
      <div className="search-wrapper">
        <input className="input-search" value={searchReason} onChange={e => setSearchReason(e.target.value)} placeholder="Search" />
        <div className="search-icon">
          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.7701 14.8539L12.6582 11.0502C13.7612 9.87718 14.429 8.34667 14.429 6.67387C14.429 2.99161 11.1913 0 7.21452 0C3.23397 0 0 2.99508 0 6.67387C0 10.3526 3.23772 13.3477 7.21452 13.3477C9.02284 13.3477 10.6773 12.73 11.9454 11.7096L16.0573 15.5134C16.1548 15.6036 16.2861 15.6522 16.4137 15.6522C16.5413 15.6522 16.6726 15.6071 16.7701 15.5134C16.9652 15.3329 16.9652 15.0344 16.7701 14.8539ZM1.00921 6.67387C1.00921 3.50873 3.79297 0.937048 7.21077 0.937048C10.6323 0.937048 13.4123 3.5122 13.4123 6.67387C13.4123 9.83554 10.6323 12.4142 7.21077 12.4142C3.79297 12.4142 1.00921 9.83901 1.00921 6.67387Z" fill="black" />
          </svg>
        </div>
      </div>
      <div className="list">
        <div className="list-header">
          <div className="row">
            <div className="reason">Reason</div>
            <div className="action-wrapper">
              <div className="description">Description</div>
              <div className="to-select">Select</div>
            </div>
          </div>
        </div>
        <SimpleBar style={{ maxHeight: 250 }}>
          <div className="list-body">
            {_reasons && Object.keys(_reasons).length > 0 && _reasons.map(reason => {
              // if (!reason.title.toLowerCase().includes(searchReason.toLowerCase()))
              //   return;
              return (
                <div key={reason.id} className="row">
                  <div className="reason">{reason?.title}</div>
                  <div className="action-wrapper">
                    <DescriptionComponent description={reason.description} onClickMore={onClickMore} />
                    <div className="to-select2">
                      <Image
                        src={reason?.checked ? ICONS.checkOn : ICONS.checkOff}
                        width={18} height={18}
                        layout={'fixed'}
                        onClick={() => handleSelect(reason)}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </SimpleBar>
      </div>
      <Modal isOpened={modalDescription ? true : false}>
        <ModalContent>
          <p>{modalDescription}</p>
          <button onClick={() => setModalDescription('')}>Okay</button>
        </ModalContent>
      </Modal>
    </ContentWrapper>
  )
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
  background: #F9F9F9;
  border-radius: 12px;
  padding: 21px 12px;
  p {
    margin: 0px 0px 19px 0px;
    font-weight: 500;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    color: #000000;
  }
  button {
    font-family: 'SF Pro Text';
    font-weight: 500;
    font-size: 14px;
    line-height: 14px;
    color: #173FD4;
    background: none;
    border: none;
    outline: none;
    :hover {
      cursor: pointer;
    }
  }
`;

const DescriptionWrapper = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #000000;
  .btn {
    color: #173FD4;
    :hover {
      cursor: pointer;
    }
  }
`;

const ContentWrapper = styled.div`
  font-family: 'SF Pro Text';
  .title {
    font-weight: 500;
    font-size: 14px;
    line-height: 12px;
    padding-bottom: 9px;
    border-bottom: 0.5px solid #BBBBBE;
    margin-bottom: 10px;
    text-align: center;
  }
  .search-wrapper {
    position: relative;
    margin: 12px 0px 11px 0px;
    input {
      width: 100%;
      font-family: 'SF Pro Text';
      font-weight: 500;
      font-size: 14px;
      line-height: 14px;
      padding: 7px 40px 6px 25px;
      border: 1px solid #000000;
      border-radius: 6px;
      background: #FFFFFF;
    }
    .search-icon {
      position: absolute;
      top: 8px;
      right: 15px;
    }
  }
  .list {
    * {
        font-weight: 500;
        font-size: 12px;
        line-height: 12px;
      }
    .row {
      display: flex;
      align-items: center;
      column-gap: 16px;
      justify-content: space-between;
      :hover {
        background: #DEE1EB;
      }
      .reason {
        flex: 1;
        max-width: 91px;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      }
      .action-wrapper {
        flex: 4;
        display: flex;
        align-items: center;
        column-gap: 26px;
        > div:first-child {
          flex: 1;
        }
        .description {
          flex: 1;
          width: 180px;
          text-align: center;
          word-break: break-all;
        }
        .to-select {
          width: 30px;
          input[type=checkbox] {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            border: 2px solid #173FD4;
            border-radius: 2px;
          }
          input[type=checkbox]:checked {
            -webkit-appearance: revert;
            -moz-appearance: revert;
            appearance: revert;
            width: 20px;
            height: 20px;
          }
          > span {
            cursor: pointer;
          }
        }
      }
    }
    .list-header {
      padding: 0 12px;
      margin-bottom: 15px;
    }
    .list-body {
      background: white;
      input {
        width: 18px;
        height: 18px;
      } 
      border-radius: 9px 9px 0 0;
      .row {
        padding: 14px 12px;
        border-bottom: 0.5px solid #BBBBBE;
      }
    }
    .list-body.new {
      margin-top: 10px;
    }
  }
`

const NewItem = styled.div`
  margin-top: 10px;
`