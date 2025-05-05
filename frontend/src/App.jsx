
import AppBar from './components/Appbar'
import './App.css'
import Homescreen from './components/homepage/Homepage'
import { Box } from '@mui/material'
import { Routes, Route, } from 'react-router-dom'
import Profilepage from './components/profilepage/Profilepage'
function App() {

  return (
    <Box>
      <AppBar />
      <Routes>
        <Route path='/' element={<Homescreen/>}/>
        <Route path='/profile' element={<Profilepage />} />
      </Routes>
    </Box>
    
  )
}

export default App
