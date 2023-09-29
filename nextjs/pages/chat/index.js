import Chat from '../../src/modules/chat.module'
import PageLayout from '../../src/components/PageLayout'

export async function getStaticProps() {
  return { props: {} }
}

function ChatPage() {
    return (
      <PageLayout>
        <Chat />
      </PageLayout>
    )
}

export default ChatPage
