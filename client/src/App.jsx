import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Devices from './component/Devices'
import DeviceDetail from './component/DeviceDetail';



function App() {
  

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Devices />} />
      <Route path="/:id" element={<DeviceDetail />} />
    </Routes>
  </Router>
  )
}

export default App
