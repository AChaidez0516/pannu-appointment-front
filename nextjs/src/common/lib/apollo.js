import { ApolloClient, InMemoryCache } from '@apollo/client'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  
  link: ApolloLink.from([
    new MultiAPILink({
      endpoints: {
        registration: process.env.NEXT_PUBLIC_REGISTRATION_URL,
        appointment: process.env.NEXT_PUBLIC_APPOINTMENT_URL,
        chatting: process.env.NEXT_PUBLIC_CHATTING_URL
      },
      createHttpLink: () => createHttpLink(),
      httpSuffix: ''
    })
  ]),
})

/*const link = createHttpLink({
  uri: 'http://appointment.pannucorp.com/graphql',
  uri: 'http://appointment.pannucorp.com/graphql',
  credentials: 'same-origin',

})

const client = new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache()
});*/

export default client
