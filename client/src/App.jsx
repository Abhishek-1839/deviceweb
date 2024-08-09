import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Fetching from './component/Fetching'
import DeviceDetail from './component/DeviceDetail';



function App() {
  

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Fetching />} />
      <Route path="/device/:id" element={<DeviceDetail />} />
    </Routes>
  </Router>
  )
}

export default App
