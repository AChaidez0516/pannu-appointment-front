import PropTypes from 'prop-types'
import styled from 'styled-components'


export default function DetailReasonComponent(props) {
  const {
    detailReason,
    setDetailReason,
  } = props

  return (
    <DetailReasonWrapper>
      <div className='title'>
        <div className='note-wrapper'>
          <div className='note'>Complete this form</div>
          <div className='detail'>
            <button className='transparent-btn-jin'>Details about reason</button>
          </div>
        </div>
        <div className='edit-btn'>
          <button className='transparent-btn-jin'>Edit</button>
        </div>
      </div>
      <div className='desc'>Describe any other issues and problems</div>
      <div className='detail-text'>
        <textarea
          placeholder='Describe...'
          value={detailReason}
          onChange={(e) => setDetailReason(e.target.value)}
        ></textarea>
      </div>
    </DetailReasonWrapper>
  )
}

DetailReasonComponent.propTypes = {
  detailReason: PropTypes.string,
  setDetailReason: PropTypes.func.isRequired
}


export const DetailReasonWrapper = styled.div`
  margin-top: 15px;
  padding: 10px 7px;
  border: 2px solid rgba(41, 176, 90, 0.5);
  border-radius: 5px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .note-wrapper {
      display: flex;
      align-items: center;
      .note {
        font-weight: 600;
        font-size: 14px;
        line-height: 14px
      }
      .detail button {
        margin-left: 6px;
        padding: 0px 0px 4px 0px;
        font-weight: 500;
        font-size: 12px;
        line-height: 12px;
        color: #173FD4;
      }
    }
    .edit-btn button {
      padding: 0px;
      font-weight: 500;
      font-size: 14px;
      line-height: 10px;
      color: #173FD4;
      cursor: pointer;
    }
    margin-bottom: 8px;
  }
  .desc {
    font-weight: 600;
    font-size: 10px;
    line-height: 14px;
    margin-bottom: 6px;
  }
  .detail-text textarea {
    max-width: 100%;
    width: 100%;
    border: 2px solid #CCCCCC;
    border-radius: 5px;
    outline: none;
    padding: 9px 5px;
    resize: none;
  }
  margin-bottom: 15px;
`
