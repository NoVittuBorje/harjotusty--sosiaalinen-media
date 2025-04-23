
import AppBar from './components/Appbar'
import './App.css'
import Homescreen from './components/Homescreen'
import { Box } from '@mui/material'

function App() {

  return (
    <>
      <AppBar />
      <Box className='content'>
        <Homescreen />
      </Box>
      
    </>
    
  )
}

export default App
