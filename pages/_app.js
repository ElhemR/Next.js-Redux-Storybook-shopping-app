

import '../styles/globals.css'
import { store, getStock } from '../redux/store';
import {Provider, connect} from 'react-redux'
// if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
//   require('mocks')
// }
function MyApp({ Component, pageProps}) {
  return   <Provider store={store}> <Component {...pageProps} /></Provider>
}

 export default MyApp
