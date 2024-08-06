
import { Provider } from 'react-redux'
import './App.css'
import Fetching from './component/Fetching'
import store from './functions/store'
import Filter from './functions/Filter'


function App() {
  

  return (
    <Provider store={store}>
      
  <Fetching />
  </Provider>
  )
}

export default App
