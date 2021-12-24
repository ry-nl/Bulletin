import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
    return (
        // <Router>
        //     <Route path='/' element={<Home />}></Route>
        // </Router>
        <h1>Hello!</h1>
    )
}


// import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
// import { onError } from '@apollo/client/link/error'

// const errorLink = onError(({ graphqlErrors, networkError }) => {
//         if(graphqlErrors) {
//                 graphqlErrors.map(({ message, location, path }) => {
//                         alert('API error ' + message)
//                 })
//         }
// })
// const link = from([
//         errorLink,
//         new HttpLink({ uri: 'http://localhost:3000/api '}),
// ])

// const client = new ApolloClient({
//         cache: new InMemoryCache(),
//         link: link,
// })

// function App() {
//         return (
//                 <ApolloProvider client={client}>

//                 </ApolloProvider>
//         )
// }

export default App;
