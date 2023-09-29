//import mobile from './mobile'
import desktop from './desktop'
import { isClientMobile } from '../../common/lib/browser'

const Component = isClientMobile() ? desktop : desktop

function Chat() {
    return (
        <Component />
    )
}
export default Chat
