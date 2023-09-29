import Modal from '../../Modal'
import {
  Wrapper, Text
} from './styled'

function PasswordHelper({ isOpened, onCancel, onOk }) {
  return (
    <Modal isOpened={isOpened}>
      <Wrapper>
        <div className="header"><span className="close" onClick={onCancel}>Close</span></div>
        <div className="body">
          <div className="txt" style={{ textDecorationLine: 'underline' }}>
            Password Instructions
          </div>
          <div className="txt">Password must not be the same as used for the email account used for sign in.</div>
          <div className="txt">&nbsp;</div>
          <div className="txt">Minimum 8 characters. At least 2 each of:</div>
          <div className="txt">-upper case</div>
          <div className="txt">-lower case</div>
          <div className="txt">-numbers 0-9, and</div>
          <div className="txt">-special characters &, %, $, #, @, !, ^, *, (, )</div>
          <div className="txt">-don’t repeat or use consecutive characters</div>
          <div className="txt">&nbsp;</div>
          <div className="txt">
            A better idea is to use 4 complete words, each longer than 4 characters, that are easy for you to remember.
            Hint: Use them in a sentence that is complete nonsense to make a funny mnemonic or rhyme.
            Add foreign words to make it even stronger.
          </div>
        </div>
        <div className="footer">
          <button className="btn" onClick={onOk}>Okay</button>
        </div>
      </Wrapper>
    </Modal>
  )
}

export default PasswordHelper