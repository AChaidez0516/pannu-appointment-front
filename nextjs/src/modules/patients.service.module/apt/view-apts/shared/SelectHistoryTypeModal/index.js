import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css';
import SelectPopupModal from '../../../../../../components/modals/SelectPopupModal'
import { Wrapper } from './styled'

export default function SelectHistoryTypeModal(props) {
  const {
    isOpened,
    setIsOpened,
    onSelect
  } = props

  return (
    <SelectPopupModal
      onClose={() => setIsOpened(false)}
      show={isOpened}
      items={[]}
      isConformButton={false}
      handleCancel={() => setIsOpened(false)}
      maxWidth={375}
    >
      <SimpleBar style={{ maxHeight: 400 }}>
        <Wrapper>
          <div className="transaction-history" onClick={() => onSelect('transaction')}>Transaction history</div>
          <div className="appointment-history" onClick={() => onSelect('appointment')}>Appointment history</div>
        </Wrapper>
      </SimpleBar>
    </SelectPopupModal>
  )
}