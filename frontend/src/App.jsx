
import AppBar from './components/Appbar'
import './App.css'
import Homescreen from './components/Homescreen'
import { Box } from '@mui/material'

function App() {

  return (
    <Box sx={{paddingTop:0,margin:0}}>
      <AppBar />
      <Box className='content'>
        <Homescreen />
      </Box>
      
    </Box>
    
  )
}

export default App
